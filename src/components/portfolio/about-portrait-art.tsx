export function AboutPortraitArt() {
  return (
    <svg
      aria-hidden="true"
      className="about-portrait__ornament"
      fill="none"
      focusable="false"
      viewBox="0 0 640 640"
    >
      <defs>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="about-portrait-wash"
          x1="0"
          x2="640"
          y1="0"
          y2="640"
        >
          <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.14" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient
          gradientUnits="userSpaceOnUse"
          id="about-portrait-water"
          x1="0"
          x2="640"
          y1="590"
          y2="548"
        >
          <stop offset="0%" stopColor="var(--brand-accent)" stopOpacity="0.24" />
          <stop offset="100%" stopColor="var(--signal)" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      <g className="about-portrait__group about-portrait__group--formation">
        <path
          className="about-portrait__surface about-portrait__surface--book"
          d="M8 421c39-20 75-18 108 1v65c-34-19-70-20-108-1v-65Zm108 1c35-20 69-21 105-3v65c-36-18-70-17-105 3v-65Z"
        />
        <path
          className="about-portrait__path about-portrait__formation-book-outline"
          d="M8 421c39-20 75-18 108 1v65c-34-19-70-20-108-1v-65Zm108 1c35-20 69-21 105-3v65c-36-18-70-17-105 3v-65Z"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__formation-book-writing"
          d="M116 422v65m-87-45c18-7 34-6 51 1m-51 15c18-7 34-6 51 1m61-17c18-6 34-7 51-2m-51 16c18-6 34-7 51-2"
          pathLength={1}
        />
        <text
          className="about-portrait__code-line about-portrait__code-line--one"
          x="425"
          y="214"
        >
          <tspan className="about-portrait__code-keyword">string</tspan>
          {' '}
          <tspan className="about-portrait__code-method">ShapeIdea</tspan>
          {'(string idea) =>'}
        </text>
        <text
          className="about-portrait__code-line about-portrait__code-line--two"
          x="441"
          y="230"
        >
          <tspan className="about-portrait__code-keyword">string</tspan>
          .IsNullOrWhiteSpace(idea)
        </text>
        <text
          className="about-portrait__code-line about-portrait__code-line--three"
          x="457"
          y="246"
        >
          ? <tspan className="about-portrait__code-string">"Curiosidad"</tspan>
        </text>
        <text
          className="about-portrait__code-line about-portrait__code-line--four"
          x="457"
          y="262"
        >
          : idea.Trim();
        </text>
      </g>

      <g className="about-portrait__group about-portrait__group--experience">
        <path
          className="about-portrait__surface about-portrait__surface--screen"
          d="M492 188h151q7 0 7 7v113q0 7-7 7H492q-7 0-7-7V195q0-7 7-7Z"
        />
        <path
          className="about-portrait__path about-portrait__experience-frame"
          d="M492 188h151q7 0 7 7v113q0 7-7 7H492q-7 0-7-7V195q0-7 7-7Zm-7 23h165"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__experience-ui"
          d="M501 233h54v48h-54zm69 0h69v18h-69zm0 28h69v20h-69Z"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__experience-details"
          d="M495 201h3m10 0h3m10 0h3m24 76c18-9 29-9 49 0m-49 10c18-8 29-8 49 0m-8-39 19 29-9-2-4 9-5-2 4-8-8-1 3-25Z"
          pathLength={1}
        />
      </g>

      <g className="about-portrait__group about-portrait__group--growth">
        <path
          className="about-portrait__path about-portrait__path--accent"
          d="M4 539c54-8 70-43 118-52 52-10 70 14 114-7 42-19 49-63 98-72 50-9 71 16 112-7 39-22 47-59 96-70 29-6 54-1 94-19"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__path--soft"
          d="M75 515c-3-15 3-28 15-39m145-12c-1-15 5-28 17-39m189-33c4-15 14-25 29-32"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__path--signal"
          d="M494 343c17-13 35-17 54-13m-176 59c17-4 30-2 45 6"
          pathLength={1}
        />
        <path
          className="about-portrait__growth-bars"
          d="M453 545v-32h15v32zm26 0v-54h15v54zm26 0v-76h15v76z"
        />
        <path
          className="about-portrait__path about-portrait__path--late"
          d="m449 503 36-27 24-31 27-21"
          pathLength={1}
        />
        <circle className="about-portrait__spark" cx="122" cy="487" r="6" />
        <circle
          className="about-portrait__spark about-portrait__spark--signal"
          cx="327"
          cy="407"
          r="6"
        />
        <circle className="about-portrait__spark" cx="541" cy="337" r="6" />
      </g>

      <g className="about-portrait__group about-portrait__group--interests">
        <path
          className="about-portrait__mountain-wash about-portrait__mountain-wash--left"
          d="m-12 379 78-114 43 49 59-124 73 130 24 110H-12V379Z"
        />
        <path
          className="about-portrait__mountain-wash about-portrait__mountain-wash--right"
          d="m374 420 73-117 42 43 59-132 104 159v92H374v-45Z"
        />
        <path
          className="about-portrait__path about-portrait__interest-mountain-left"
          d="m-12 379 78-114 43 49 59-124 73 130"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__interest-mountain-right"
          d="m374 420 73-117 42 43 59-132 104 159"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__interest-contours"
          d="m66 265 20 62 22-7m440-106 20 73 44 24"
          pathLength={1}
        />
        <path
          className="about-portrait__path about-portrait__path--trail"
          d="M30 459c22-25 42-44 60-68 21-29 38-61 60-98"
          pathLength={1}
        />
        <path
          className="about-portrait__river-wash"
          d="M-8 559c65-26 101-2 157 8 60 10 93-17 151-15 75 3 102 38 172 25 53-10 91-30 184-18v16c-93-12-131 8-184 18-70 13-97-22-172-25-58-2-91 25-151 15-56-10-92-34-157-8v-16Z"
        />
        <path
          className="about-portrait__river about-portrait__river--shadow"
          d="M-4 563c63-27 104-1 158 9 61 11 95-17 153-15 75 3 104 39 172 26 55-11 92-31 164-19"
          pathLength={1}
        />
        <path
          className="about-portrait__river"
          d="M-4 559c63-27 104-1 158 9 61 11 95-17 153-15 75 3 104 39 172 26 55-11 92-31 164-19"
          pathLength={1}
        />
        <path
          className="about-portrait__river about-portrait__river--glint"
          d="M12 555c47-16 75-4 112 5m211 7c33 7 56 16 87 14m104-34c22-6 43-10 67-9"
          pathLength={1}
        />
      </g>
    </svg>
  );
}
