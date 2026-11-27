export function ContactRouteArt() {
  return (
    <svg
      aria-hidden="true"
      className="contact-route-art"
      fill="none"
      viewBox="0 0 440 148"
    >
      <path
        className="contact-route-art__path"
        d="M8 112C57 112 70 67 119 67s57 47 107 47 66-67 111-67h42"
      />
      <circle className="contact-route-art__origin" cx="8" cy="112" r="4" />
      <circle className="contact-route-art__node" cx="226" cy="114" r="4" />
      <g className="contact-route-art__envelope">
        <rect height="44" rx="2" width="60" x="376" y="28" />
        <path d="m378 31 28 23 28-23M378 69l19-16m37 16-19-16" />
      </g>
      <path
        className="contact-route-art__accent"
        d="M291 120h42m-30 9h24"
      />
    </svg>
  );
}
