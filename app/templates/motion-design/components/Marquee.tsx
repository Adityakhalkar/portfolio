"use client";

const PROJECTS = [
  { name: "Onboarding Flow", type: "Micro-interaction", bg: "#F5F0EC" },
  { name: "Product Tour", type: "Walkthrough", bg: "#F0F0ED" },
  { name: "Loading States", type: "Feedback", bg: "#F2EDEA" },
  { name: "Page Transitions", type: "Navigation", bg: "#F5F2EE" },
  { name: "Scroll Animations", type: "Engagement", bg: "#EEECEA" },
  { name: "Hover Effects", type: "Interaction", bg: "#F3EFEB" },
  { name: "Data Viz Motion", type: "Dashboard", bg: "#F0EDEA" },
  { name: "Gesture Controls", type: "Mobile", bg: "#F4F1ED" },
];

export default function Marquee() {
  const items = [...PROJECTS, ...PROJECTS];

  return (
    <section
      style={{
        backgroundColor: "#FAFAF8",
        borderTop: "1px solid #E8E8E8",
        borderBottom: "1px solid #E8E8E8",
        overflow: "hidden",
        padding: "2rem 0",
      }}
    >
      <style>{`
        @keyframes motive-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .motive-marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>
      <div
        className="motive-marquee-track"
        style={{
          display: "flex",
          gap: "1rem",
          width: "max-content",
          animation: "motive-marquee 35s linear infinite",
        }}
      >
        {items.map((project, i) => (
          <div
            key={i}
            style={{
              backgroundColor: project.bg,
              padding: "1rem 1.5rem",
              minWidth: "200px",
              border: "1px solid #E8E8E8",
              borderRadius: "0px",
            }}
          >
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "0.875rem",
                color: "#1A1A1A",
                display: "block",
                marginBottom: "0.125rem",
                letterSpacing: "-0.01em",
              }}
            >
              {project.name}
            </span>
            <span
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 400,
                fontSize: "0.6875rem",
                color: "#717171",
              }}
            >
              {project.type}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
