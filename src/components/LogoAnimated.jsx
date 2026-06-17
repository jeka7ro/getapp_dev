import React from "react";

export default function LogoAnimated({ size = 44 }) {
  return (
    <svg
      width={size * 5.5}
      height={size}
      viewBox="0 0 220 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ===== ICON: Atom / Orbit ===== */}
      <g>
        {/* Outer ring 1 - rotates */}
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 22 22"
          to="360 22 22"
          dur="8s"
          repeatCount="indefinite"
        />
        {/* Center dot */}
        <circle cx="22" cy="22" r="4" fill="#3b82f6" />

        {/* Orbit ring 1 */}
        <g>
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 22 22"
            to="360 22 22"
            dur="6s"
            repeatCount="indefinite"
            additive="replace"
          />
          <ellipse
            cx="22"
            cy="22"
            rx="18"
            ry="7"
            stroke="#3b82f6"
            strokeWidth="1.5"
            fill="none"
            opacity="0.9"
          />
          <circle cx="40" cy="22" r="2.5" fill="#60a5fa" />
        </g>

        {/* Orbit ring 2 - tilted 60deg */}
        <g transform="rotate(60 22 22)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="60 22 22"
            to="420 22 22"
            dur="9s"
            repeatCount="indefinite"
            additive="replace"
          />
          <ellipse
            cx="22"
            cy="22"
            rx="18"
            ry="7"
            stroke="#818cf8"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          <circle cx="40" cy="22" r="2" fill="#a5b4fc" />
        </g>

        {/* Orbit ring 3 - tilted 120deg */}
        <g transform="rotate(120 22 22)">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="120 22 22"
            to="480 22 22"
            dur="12s"
            repeatCount="indefinite"
            additive="replace"
          />
          <ellipse
            cx="22"
            cy="22"
            rx="18"
            ry="7"
            stroke="#38bdf8"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          <circle cx="40" cy="22" r="1.8" fill="#7dd3fc" />
        </g>
      </g>

      {/* ===== TEXT: Get App ===== */}
      <text
        x="52"
        y="30"
        fontFamily="'Inter', 'Segoe UI', sans-serif"
        fontSize="22"
        fontWeight="800"
        letterSpacing="-0.5"
      >
        <tspan fill="#ffffff">Get</tspan>
        <tspan fill="#3b82f6">App</tspan>
      </text>
    </svg>
  );
}
