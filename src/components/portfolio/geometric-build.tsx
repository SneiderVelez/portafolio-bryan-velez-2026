"use client";

import { useEffect, useRef, type PointerEvent, type ReactNode } from "react";

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const restingArtwork = {
  "--sketch-opacity": "0.94",
  "--code-opacity": "0.2",
  "--data-opacity": "0.22",
  "--assembly-opacity": "0.26",
  "--finish-opacity": "0.18",
  "--build-progress": "1",
  "--flow-opacity": "0.3",
  "--data-parallax-y": "0px",
  "--components-parallax-y": "0px",
  "--finish-y": "10px",
  "--module-nav-x": "-18px",
  "--module-copy-x": "-22px",
  "--module-image-x": "28px",
  "--module-card-y": "20px",
};

function smoothstep(value: number, start: number, end: number) {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

type PointerSample = {
  clientX: number;
  clientY: number;
  scene: HTMLDivElement;
};

export function BuildScene({ children }: { children: ReactNode }) {
  const visualRef = useRef<HTMLElement | null>(null);
  const flowExtensionRef = useRef<SVGSVGElement | null>(null);
  const pointerFrameRef = useRef<number | null>(null);
  const pointerSampleRef = useRef<PointerSample | null>(null);

  function applyPointerPosition({ clientX, clientY, scene }: PointerSample) {
    const visual = visualRef.current;
    if (!visual) return;

    const sceneBounds = scene.getBoundingClientRect();
    const artBounds = visual.getBoundingClientRect();
    if (sceneBounds.width === 0 || artBounds.width === 0) return;

    // The whole hero is the timeline: moving from the copy toward the right
    // walks the drawing from its paper sketch into a finished web interface.
    const progress = clamp((clientX - sceneBounds.left) / sceneBounds.width);
    const verticalPosition = clamp((clientY - sceneBounds.top) / sceneBounds.height) - 0.5;
    const sketchBuild = smoothstep(progress, 0.16, 0.45);
    const codeEnter = smoothstep(progress, 0.28, 0.43);
    const codeExit = smoothstep(progress, 0.64, 0.78);
    const dataEnter = smoothstep(progress, 0.44, 0.6);
    const dataExit = smoothstep(progress, 0.7, 0.84);
    const componentBuild = smoothstep(progress, 0.58, 0.86);
    const finishBuild = smoothstep(progress, 0.82, 0.99);
    const scatter = 1 - componentBuild;
    const flowExtension = flowExtensionRef.current;
    const extensionStart = artBounds.left - artBounds.width * (320 / 1560);
    const extensionEnd = artBounds.left + artBounds.width * (37 / 1560);
    const extensionProgress = clamp(
      (clientX - extensionStart) / (extensionEnd - extensionStart),
    );
    const flowExtensionProgress = smoothstep(extensionProgress, 0, 1);
    const cursorRangeLeft = extensionStart;
    const pointerIsOverArt =
      clientX >= cursorRangeLeft &&
      clientX <= artBounds.right &&
      clientY >= artBounds.top &&
      clientY <= artBounds.bottom;

    if (pointerIsOverArt) scene.dataset.pointerActive = "true";
    else delete scene.dataset.pointerActive;

    visual.style.setProperty("--sketch-opacity", `${0.88 - sketchBuild * 0.83}`);
    visual.style.setProperty("--code-opacity", `${codeEnter * (1 - codeExit)}`);
    visual.style.setProperty("--data-opacity", `${dataEnter * (1 - dataExit)}`);
    visual.style.setProperty("--assembly-opacity", `${0.1 + componentBuild * 0.58}`);
    visual.style.setProperty("--finish-opacity", `${finishBuild}`);
    visual.style.setProperty("--flow-opacity", "0.86");
    visual.style.setProperty("--finish-y", `${18 * (1 - finishBuild)}px`);
    visual.style.setProperty("--build-progress", `${progress}`);
    if (flowExtension) {
      flowExtension.style.left = `${extensionStart - sceneBounds.left}px`;
      flowExtension.style.top = `${artBounds.top - sceneBounds.top}px`;
      flowExtension.style.width = `${artBounds.width * (357 / 1560)}px`;
      flowExtension.style.height = `${artBounds.height}px`;
      flowExtension.style.setProperty(
        "--flow-extension-progress",
        `${flowExtensionProgress}`,
      );
    }
    scene.style.setProperty("--cursor-x", `${clientX - sceneBounds.left}px`);
    scene.style.setProperty("--cursor-y", `${clientY - sceneBounds.top}px`);
    visual.style.setProperty("--data-parallax-y", `${verticalPosition * -14}px`);
    visual.style.setProperty("--components-parallax-y", `${verticalPosition * -8}px`);
    visual.style.setProperty("--module-nav-x", `${-34 * scatter}px`);
    visual.style.setProperty("--module-copy-x", `${-46 * scatter}px`);
    visual.style.setProperty("--module-image-x", `${52 * scatter}px`);
    visual.style.setProperty("--module-card-y", `${38 * scatter}px`);
  }

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch" || !event.isPrimary) return;

    pointerSampleRef.current = {
      clientX: event.clientX,
      clientY: event.clientY,
      scene: event.currentTarget,
    };

    if (pointerFrameRef.current !== null) return;

    pointerFrameRef.current = window.requestAnimationFrame(() => {
      pointerFrameRef.current = null;
      if (pointerSampleRef.current) applyPointerPosition(pointerSampleRef.current);
    });
  }

  useEffect(
    () => () => {
      if (pointerFrameRef.current !== null) {
        window.cancelAnimationFrame(pointerFrameRef.current);
      }
    },
    [],
  );

  function handlePointerLeave(event: PointerEvent<HTMLDivElement>) {
    if (pointerFrameRef.current !== null) {
      window.cancelAnimationFrame(pointerFrameRef.current);
      pointerFrameRef.current = null;
    }
    pointerSampleRef.current = null;

    delete event.currentTarget.dataset.pointerActive;
    event.currentTarget.style.removeProperty("--cursor-x");
    event.currentTarget.style.removeProperty("--cursor-y");

    const flowExtension = flowExtensionRef.current;
    if (flowExtension) {
      flowExtension.style.removeProperty("left");
      flowExtension.style.removeProperty("top");
      flowExtension.style.removeProperty("width");
      flowExtension.style.removeProperty("height");
      flowExtension.style.removeProperty("--flow-extension-progress");
    }

    const visual = visualRef.current;
    if (!visual) return;

    for (const [property, value] of Object.entries(restingArtwork)) {
      visual.style.setProperty(property, value);
    }
  }

  return (
    <div
      className="hero-scene"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <svg
        aria-hidden="true"
        className="build-flow-extension-canvas"
        fill="none"
        ref={flowExtensionRef}
        viewBox="-320 0 357 740"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="build-flow-extension"
          d="M-320 545C-205 532 -117 542 37 552"
          pathLength="1"
          stroke="var(--mauve)"
          strokeLinecap="round"
          strokeWidth="2.4"
        />
      </svg>
      <span className="build-cursor" />
      {children}
      <figure aria-hidden="true" className="hero-visual" ref={visualRef}>
        <svg
          className="build-scene-art"
          fill="none"
          viewBox="0 0 1560 740"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="build-flow"
              x1="96"
              y1="486"
              x2="1510"
              y2="246"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="var(--mauve)" />
              <stop offset=".48" stopColor="var(--brand-accent)" />
              <stop offset="1" stopColor="var(--ink)" />
            </linearGradient>
          </defs>

          <path
            className="build-flow"
            d="M37 552C191 562 313 534 450 486C560 447 591 386 706 361C825 335 900 398 1004 353C1133 297 1224 203 1407 206C1470 207 1510 222 1578 244"
            pathLength="1"
            stroke="url(#build-flow)"
            strokeWidth="3"
          />
          <circle className="build-flow-point build-flow-point--paper" cx="37" cy="552" r="8" fill="var(--mauve)" />
          <circle className="build-flow-point build-flow-point--code" cx="706" cy="361" r="8" fill="var(--brand-accent)" />
          <circle className="build-flow-point build-flow-point--product" cx="1407" cy="206" r="13" fill="var(--ink)" />

          <g className="build-layer build-sketch" stroke="var(--muted-ink)" strokeLinecap="round" strokeLinejoin="round">
            <path d="M91 173C211 165 365 174 489 168C494 287 489 447 497 550C376 556 223 546 91 556C96 432 87 296 91 173Z" strokeWidth="2.2" />
            <path d="M98 180C216 173 359 181 482 176C486 293 482 438 489 543C371 548 226 540 99 549C103 429 95 300 98 180Z" strokeOpacity=".52" strokeWidth="1.1" />
            <path d="M127 216C222 208 329 216 446 211" strokeWidth="2.4" />
            <path d="M127 253C183 247 252 251 303 255M323 254C364 250 406 252 445 257" strokeWidth="2" />
            <path d="M128 294C207 287 294 294 444 289M128 307C189 303 246 308 315 304" strokeWidth="1.8" />
            <path d="M126 342C176 338 229 340 279 345C282 392 282 426 277 462C230 466 175 459 128 467C132 423 123 385 126 342Z" strokeWidth="1.8" />
            <path d="M301 347C347 341 395 346 445 350V397C396 402 349 396 301 402Z" strokeWidth="1.8" />
            <path d="M305 418C348 414 395 418 444 422M305 432C347 429 396 433 442 436M305 446C344 444 391 447 441 450" strokeWidth="1.7" />
            <path d="M129 493C222 487 337 497 446 489" strokeOpacity=".78" strokeWidth="1.8" />
            <path d="M63 579C138 567 204 581 279 569C344 558 407 579 478 562" strokeOpacity=".62" strokeWidth="1.7" />
            <path d="M57 573L75 559L82 578" stroke="var(--mauve)" strokeWidth="2.4" />
            <circle cx="129" cy="216" r="4.5" fill="var(--brand-accent)" stroke="none" />
            <circle cx="444" cy="290" r="4.5" fill="var(--mauve)" stroke="none" />
            <circle cx="129" cy="493" r="4.5" fill="var(--brand-accent)" stroke="none" />
          </g>

          <g className="build-layer build-code" strokeLinecap="round" strokeLinejoin="round">
            <path d="M553 239L523 263L553 288M778 239L808 263L778 288" stroke="var(--ink)" strokeWidth="5" />
            <path d="M650 229L616 296" stroke="var(--mauve)" strokeWidth="5" />
            <text className="build-code-label" x="577" y="348">01  page.tsx</text>
            <text className="build-code-label build-code-label--bright" x="577" y="390">&lt;Header /&gt;</text>
            <text className="build-code-label" x="577" y="431">&lt;Content /&gt;</text>
            <path d="M577 461H735M577 479H696M577 497H716" stroke="var(--muted-ink)" strokeOpacity=".56" strokeWidth="2.4" />
            <path d="M848 317C877 332 890 354 890 384M848 452C877 436 890 414 890 384" stroke="var(--line)" strokeWidth="2" />
            <path d="M861 384H912" stroke="var(--brand-accent)" strokeWidth="3" />
            <path d="M912 384L925 371L938 384L925 397L912 384Z" fill="var(--mauve)" stroke="none" />
          </g>

          <g className="build-layer build-data" strokeLinecap="round" strokeLinejoin="round">
            <path d="M604 554C604 540 671 529 727 529C784 529 840 540 840 554V606C840 620 783 631 727 631C671 631 604 620 604 606V554Z" stroke="var(--muted-ink)" strokeWidth="2" />
            <path d="M604 554C604 568 671 579 727 579C784 579 840 568 840 554M604 580C604 594 671 605 727 605C784 605 840 594 840 580" stroke="var(--muted-ink)" strokeOpacity=".65" strokeWidth="1.7" />
            <path d="M646 543V553M680 538V560M714 535V563M748 535V563M782 538V560M815 543V553" stroke="var(--brand-accent)" strokeWidth="2.5" />
            <text className="build-data-label" x="604" y="659">MODELO DE DATOS</text>
            <path d="M840 579C882 579 891 554 919 529" stroke="var(--brand-accent)" strokeOpacity=".7" strokeWidth="2" />
            <circle cx="920" cy="528" r="5" fill="var(--brand-accent)" stroke="none" />
          </g>

          <g className="build-layer build-components" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(-80 0)">
            <path className="build-module build-module--nav" d="M985 161H1488V224H985Z" stroke="var(--line)" strokeWidth="2" />
            <path d="M1018 185L1032 171L1046 185L1032 199L1018 185Z" fill="var(--mauve)" stroke="none" />
            <path d="M1061 182H1113M1412 184H1452M1464 184H1481" stroke="var(--muted-ink)" strokeOpacity=".72" strokeWidth="3" />

            <path className="build-module build-module--copy" d="M985 251H1275V470H985Z" stroke="none" fill="var(--canvas)" />
            <path d="M1014 282H1151M1014 300H1229" stroke="var(--muted-ink)" strokeOpacity=".54" strokeWidth="3" />
            <path d="M1014 336H1218M1014 354H1185M1014 372H1143" stroke="var(--ink)" strokeWidth="7" />
            <path d="M1014 404H1228M1014 421H1201" stroke="var(--muted-ink)" strokeOpacity=".68" strokeWidth="3" />
            <path d="M1014 447H1101" stroke="var(--brand-accent)" strokeWidth="8" />

            <path className="build-module build-module--image" d="M1294 251H1488V470H1294Z" stroke="none" fill="var(--brand-accent)" fillOpacity=".28" />
            <path d="M1308 425C1349 372 1377 396 1408 345C1435 302 1464 316 1490 280V470H1308Z" fill="var(--brand-accent)" fillOpacity=".68" stroke="none" />
            <path d="M1308 390C1350 365 1383 375 1411 336C1441 295 1461 294 1490 266" stroke="var(--ink)" strokeWidth="2.4" />
            <circle cx="1405" cy="338" r="12" fill="var(--mauve)" stroke="var(--canvas)" strokeWidth="4" />

            <path className="build-module build-module--card-a" d="M985 494H1227V616H985Z" stroke="var(--line)" strokeWidth="2" />
            <path className="build-module build-module--card-b" d="M1243 494H1488V616H1243Z" stroke="var(--line)" strokeWidth="2" />
            <path d="M1010 525H1098M1010 543H1172M1010 561H1152" stroke="var(--muted-ink)" strokeOpacity=".66" strokeWidth="3" />
            <path d="M1010 590H1064" stroke="var(--mauve)" strokeWidth="7" />
            <path d="M1270 523L1285 508L1300 523L1285 538L1270 523Z" fill="var(--brand-accent)" stroke="none" />
            <path d="M1314 520H1457M1270 557H1457M1270 574H1417M1270 591H1378" stroke="var(--muted-ink)" strokeOpacity=".65" strokeWidth="3" />
            </g>
          </g>

          <g className="build-layer build-finish" strokeLinecap="round" strokeLinejoin="round">
            <path d="M930 145C1089 119 1359 116 1515 148" stroke="var(--ink)" strokeOpacity=".46" strokeWidth="2" />
            <path d="M948 642C1110 672 1360 668 1522 640" stroke="var(--mauve)" strokeOpacity=".62" strokeWidth="2" />
            <path d="M1488 224V251M985 470V494M1488 470V494" stroke="var(--brand-accent)" strokeWidth="2" />
            <circle cx="1488" cy="224" r="5" fill="var(--brand-accent)" stroke="none" />
            <circle cx="985" cy="494" r="5" fill="var(--mauve)" stroke="none" />
          </g>
        </svg>
      </figure>
    </div>
  );
}
