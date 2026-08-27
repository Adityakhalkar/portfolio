import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt =
  "Aditya Khalkar - Freelance Full-Stack Developer & Design Engineer, available for contract work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BRACKET = 3;
const CORNER = 44;
const INSET = 48;

export default async function Image() {
  const bracket = (pos: React.CSSProperties, sides: React.CSSProperties) => ({
    position: "absolute" as const,
    width: CORNER,
    height: CORNER,
    ...pos,
    ...sides,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: 88,
          position: "relative",
          fontFamily: "sans-serif",
        }}
      >
        {/* corner brackets, same motif as the site */}
        <div style={bracket({ top: INSET, left: INSET }, { borderTop: `${BRACKET}px solid #fff`, borderLeft: `${BRACKET}px solid #fff` })} />
        <div style={bracket({ top: INSET, right: INSET }, { borderTop: `${BRACKET}px solid #fff`, borderRight: `${BRACKET}px solid #fff` })} />
        <div style={bracket({ bottom: INSET, left: INSET }, { borderBottom: `${BRACKET}px solid #fff`, borderLeft: `${BRACKET}px solid #fff` })} />
        <div style={bracket({ bottom: INSET, right: INSET }, { borderBottom: `${BRACKET}px solid #fff`, borderRight: `${BRACKET}px solid #fff` })} />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#10b981" }} />
          <div style={{ fontSize: 22, letterSpacing: 5, textTransform: "uppercase", color: "#a1a1aa" }}>
            Available for freelance work
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ fontSize: 108, fontWeight: 700, color: "#fff", lineHeight: 1, letterSpacing: -3 }}>
            Aditya Khalkar
          </div>
          <div style={{ fontSize: 40, color: "#e4e4e7", lineHeight: 1.25, maxWidth: 900 }}>
            I help technical products explain themselves and sell.
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 24, color: "#71717a", letterSpacing: 2 }}>
            React · Next.js · Node · Python
          </div>
          <div style={{ fontSize: 24, color: "#71717a", letterSpacing: 2 }}>adityakhalkar.me</div>
        </div>
      </div>
    ),
    size
  );
}
