"use client";

import { useEffect, useRef } from "react";

type ProjectFlowProps = {
  path: string;
  nodeX: number;
};

type PointerPosition = {
  clientX: number;
  clientY: number;
};

type PathSample = {
  length: number;
  point: DOMPoint;
  normalX: number;
  normalY: number;
};

type NearestPathPosition = {
  distance: number;
  length: number;
};

type Ripple = {
  centerLength: number;
  startedAt: number;
  duration: number;
};

const POINTER_PROXIMITY = 18;
const POINTER_RELEASE_DISTANCE = 24;
const RIPPLE_INTERVAL_MS = 620;
const RIPPLE_RELEASE_MS = 240;
const RIPPLE_SPEED = 360;
const RIPPLE_WAVELENGTH = 76;
const RIPPLE_FRONT_WIDTH = 38;
const RIPPLE_TRAIL_LENGTH = 170;
const RIPPLE_AMPLITUDE = 13;
const RIPPLE_MAX_DISPLACEMENT = 26;
const RIPPLE_DECAY_SECONDS = 1.45;
const MAX_ACTIVE_RIPPLES = 6;

function samplePath(path: SVGPathElement, totalLength: number): PathSample[] {
  const sampleCount = Math.max(180, Math.ceil(totalLength / 6));
  const points = Array.from({ length: sampleCount + 1 }, (_, index) => {
    const length = (index / sampleCount) * totalLength;
    return { length, point: path.getPointAtLength(length) };
  });

  return points.map(({ length, point }, index) => {
    const previous = points[Math.max(0, index - 1)].point;
    const next = points[Math.min(sampleCount, index + 1)].point;
    const tangentX = next.x - previous.x;
    const tangentY = next.y - previous.y;
    const tangentLength = Math.hypot(tangentX, tangentY) || 1;

    return {
      length,
      point,
      normalX: -tangentY / tangentLength,
      normalY: tangentX / tangentLength,
    };
  });
}

function findNearestPathPosition(
  samples: PathSample[],
  screenMatrix: DOMMatrix,
  target: PointerPosition,
): NearestPathPosition {
  let nearestLength = 0;
  let nearestDistanceSquared = Number.POSITIVE_INFINITY;

  for (const sample of samples) {
    const screenX =
      screenMatrix.a * sample.point.x +
      screenMatrix.c * sample.point.y +
      screenMatrix.e;
    const screenY =
      screenMatrix.b * sample.point.x +
      screenMatrix.d * sample.point.y +
      screenMatrix.f;
    const distanceX = screenX - target.clientX;
    const distanceY = screenY - target.clientY;
    const distanceSquared = distanceX * distanceX + distanceY * distanceY;

    if (distanceSquared < nearestDistanceSquared) {
      nearestDistanceSquared = distanceSquared;
      nearestLength = sample.length;
    }
  }

  return {
    distance: Math.sqrt(nearestDistanceSquared),
    length: nearestLength,
  };
}

function createRipplePath(
  samples: PathSample[],
  ripples: Ripple[],
  timestamp: number,
  releaseStartedAt: number | null,
) {
  const releaseEnvelope =
    releaseStartedAt === null
      ? 1
      : Math.exp(-(timestamp - releaseStartedAt) / (RIPPLE_RELEASE_MS / 3));

  return samples
    .map(({ length, point, normalX, normalY }, index) => {
      let displacement = 0;

      for (const ripple of ripples) {
        const elapsedSeconds = (timestamp - ripple.startedAt) / 1000;
        const distanceFromImpact = Math.abs(length - ripple.centerLength);
        const distanceFromFront = distanceFromImpact - elapsedSeconds * RIPPLE_SPEED;
        const aheadOfWave = Math.max(distanceFromFront, 0);
        const behindWave = Math.max(-distanceFromFront, 0);
        const envelope =
          Math.exp(-((aheadOfWave / RIPPLE_FRONT_WIDTH) ** 2)) *
          Math.exp(-behindWave / RIPPLE_TRAIL_LENGTH) *
          Math.exp(-elapsedSeconds / RIPPLE_DECAY_SECONDS);
        const oscillation = Math.sin((distanceFromFront / RIPPLE_WAVELENGTH) * Math.PI * 2);

        displacement += oscillation * envelope * RIPPLE_AMPLITUDE;
      }

      const boundedDisplacement = Math.max(
        -RIPPLE_MAX_DISPLACEMENT,
        Math.min(RIPPLE_MAX_DISPLACEMENT, displacement),
      );
      const offset = boundedDisplacement * releaseEnvelope;
      const command = index === 0 ? "M" : "L";

      return `${command}${(point.x + normalX * offset).toFixed(2)} ${(point.y + normalY * offset).toFixed(2)}`;
    })
    .join("");
}

export function ProjectFlow({ path, nodeX }: ProjectFlowProps) {
  const flowRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    const flow = flowRef.current;
    const svg = svgRef.current;
    const line = pathRef.current;
    const row = flow?.closest<HTMLElement>(".project-row");

    if (!flow || !svg || !line || !row) return;

    const activeSvg = svg;
    const activeLine = line;

    const totalLength = activeLine.getTotalLength();
    const samples = samplePath(activeLine, totalLength);
    let pointerPosition: PointerPosition | null = null;
    let pointerNearPath = false;
    let ripples: Ripple[] = [];
    let lastRippleAt = 0;
    let releaseStartedAt: number | null = null;
    let animationFrame: number | null = null;

    // This hover-only interaction is the agreed local exception to reduced-motion handling.
    function emitRipple(centerLength: number, timestamp: number) {
      if (ripples.length >= MAX_ACTIVE_RIPPLES) {
        ripples = ripples.slice(1);
      }

      ripples.push({
        centerLength,
        startedAt: timestamp,
        duration: Math.max(
          Math.max(centerLength, totalLength - centerLength) / RIPPLE_SPEED + 0.35,
          (RIPPLE_INTERVAL_MS / 1000) * 1.5,
        ),
      });
      lastRippleAt = timestamp;
    }

    function clearRipple() {
      ripples = [];
      releaseStartedAt = null;
      activeLine.setAttribute("d", path);
    }

    function updateFrame(timestamp: number) {
      animationFrame = null;

      if (pointerPosition) {
        const screenMatrix = activeSvg.getScreenCTM();

        if (screenMatrix) {
          const nearest = findNearestPathPosition(samples, screenMatrix, pointerPosition);

          if (nearest.distance <= POINTER_PROXIMITY) {
            if (!pointerNearPath) {
              pointerNearPath = true;
              ripples = [];
              releaseStartedAt = null;
              emitRipple(nearest.length, timestamp);
            } else if (timestamp - lastRippleAt >= RIPPLE_INTERVAL_MS) {
              emitRipple(nearest.length, timestamp);
            }
          } else if (nearest.distance >= POINTER_RELEASE_DISTANCE && pointerNearPath) {
            pointerNearPath = false;
            releaseStartedAt = timestamp;
          }
        }
      }

      ripples = ripples.filter((ripple) => (timestamp - ripple.startedAt) / 1000 < ripple.duration);

      if (
        !pointerNearPath &&
        releaseStartedAt !== null &&
        timestamp - releaseStartedAt >= RIPPLE_RELEASE_MS
      ) {
        clearRipple();
        return;
      }

      if (ripples.length > 0) {
        activeLine.setAttribute("d", createRipplePath(samples, ripples, timestamp, releaseStartedAt));
      } else {
        clearRipple();
      }

      if (pointerNearPath || ripples.length > 0) {
        animationFrame = window.requestAnimationFrame(updateFrame);
      }
    }

    function scheduleFrame() {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updateFrame);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || !event.isPrimary) return;

      pointerPosition = { clientX: event.clientX, clientY: event.clientY };
      scheduleFrame();
    }

    function handlePointerLeave() {
      pointerPosition = null;
      if (pointerNearPath) {
        pointerNearPath = false;
        releaseStartedAt = performance.now();
      }
    }

    row.addEventListener("pointermove", handlePointerMove, { passive: true });
    row.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      row.removeEventListener("pointermove", handlePointerMove);
      row.removeEventListener("pointerleave", handlePointerLeave);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }

      clearRipple();
    };
  }, [path]);

  return (
    <div className="project-flow" ref={flowRef}>
      <svg
        aria-hidden="true"
        className="project-flow-svg"
        focusable="false"
        preserveAspectRatio="none"
        ref={svgRef}
        viewBox="0 0 1440 80"
      >
        <path className="project-flow-path" d={path} ref={pathRef} />
        <circle className="project-flow-node" cx={nodeX} cy="64" r="4.5" />
      </svg>
    </div>
  );
}
