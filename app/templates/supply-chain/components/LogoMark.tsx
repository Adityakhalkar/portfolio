export default function LogoMark({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stylized "T" as intersecting route paths */}
      <path
        d="M4 7h16"
        stroke="#C8956C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 7v12"
        stroke="#C8956C"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Route dots at endpoints */}
      <circle cx="4" cy="7" r="2" fill="#C8956C" />
      <circle cx="20" cy="7" r="2" fill="#C8956C" />
      <circle cx="12" cy="19" r="2" fill="#C8956C" />
      {/* Small waypoint on vertical path */}
      <circle cx="12" cy="13" r="1.2" fill="none" stroke="#C8956C" strokeWidth="0.8" />
    </svg>
  );
}
