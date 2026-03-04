"use client";

interface AgentCardProps {
  name: string;
  description: string;
  creator: string;
  deploys: string;
  price: string;
  category: string;
  status: "live" | "beta";
}

export default function AgentCard({
  name,
  description,
  creator,
  deploys,
  price,
  category,
  status,
}: AgentCardProps) {
  return (
    <div
      className="group cursor-pointer bg-[#141414] border border-[#2A2A2A] rounded-none p-5 transition-colors duration-100 hover:border-[#E8FF47]"
    >
      {/* Top row: category + status */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] uppercase tracking-[0.08em] text-[#6B6B6B]"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          {category}
        </span>
        <span
          className="text-[10px] uppercase tracking-[0.08em] flex items-center gap-1.5"
          style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
        >
          <span
            className={status === "live" ? "text-[#E8FF47]" : "text-[#FF6B35]"}
          >
            {"\u25CF"}
          </span>
          <span
            className={status === "live" ? "text-[#E8FF47]" : "text-[#FF6B35]"}
          >
            {status === "live" ? "LIVE" : "BETA"}
          </span>
        </span>
      </div>

      {/* Agent name */}
      <h3
        className="text-lg text-[#E8E8E8] uppercase mb-2 leading-tight"
        style={{ fontFamily: "'Space Mono', monospace", fontWeight: 700 }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        className="text-sm text-[#6B6B6B] line-clamp-2 mb-4 leading-relaxed"
        style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 400 }}
      >
        {description}
      </p>

      {/* Bottom metadata bar */}
      <div
        className="text-[11px] text-[#6B6B6B] pt-3 border-t border-[#2A2A2A]"
        style={{ fontFamily: "'Space Mono', monospace", fontWeight: 400 }}
      >
        <span>{creator}</span>
        <span className="mx-2">/</span>
        <span>{deploys}</span>
        <span className="mx-2">/</span>
        <span>{price}</span>
      </div>
    </div>
  );
}
