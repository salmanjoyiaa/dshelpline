/**
 * Dream State AI Logo Component
 * Black circle with yellow "DS" text - 75% black, 25% yellow theme
 */

interface DSLogoProps {
  size?: number;
  className?: string;
}

export function DSLogo({ size = 40, className = '' }: DSLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer circle border - yellow */}
      <circle
        cx="50"
        cy="50"
        r="48"
        fill="none"
        stroke="#FFD700"
        strokeWidth="4"
      />

      {/* Inner circle - black background */}
      <circle cx="50" cy="50" r="44" fill="#1a1a1a" />

      {/* DS Text - yellow */}
      <text
        x="50"
        y="60"
        fontFamily="Arial, sans-serif"
        fontSize="54"
        fontWeight="bold"
        fill="#FFD700"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        DS
      </text>
    </svg>
  );
}
