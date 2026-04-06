import Link from "next/link";
import { cn } from "@/lib/utils";

interface FlipLinkProps {
  href: string;
  children: string;
  className?: string;
  duration?: number;
}

export function FlipLink({
  href,
  children,
  className,
  duration = 300,
}: FlipLinkProps) {
  const transition = `transform ${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)`;

  return (
    <Link
      href={href}
      className={cn("group relative inline-flex overflow-hidden", className)}
    >
      <span
        className="block group-hover:-translate-y-full"
        style={{ transition }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full group-hover:translate-y-0"
        style={{ transition }}
      >
        {children}
      </span>
    </Link>
  );
}

// Demo used in the library preview
export function FlipLinkDemo() {
  return (
    <nav className="flex gap-10">
      {["About", "Work", "Contact", "Blog"].map((label) => (
        <FlipLink
          key={label}
          href="#"
          className="text-concrete text-base font-['Space_Mono'] uppercase tracking-widest"
        >
          {label}
        </FlipLink>
      ))}
    </nav>
  );
}

export const flipLinkCode = `import Link from "next/link";
import { cn } from "@/lib/utils";

interface FlipLinkProps {
  href: string;
  children: string;
  className?: string;
  duration?: number;
}

export function FlipLink({
  href,
  children,
  className,
  duration = 300,
}: FlipLinkProps) {
  const transition = \`transform \${duration}ms cubic-bezier(0.215, 0.61, 0.355, 1)\`;

  return (
    <Link
      href={href}
      className={cn("group relative inline-flex overflow-hidden", className)}
    >
      <span
        className="block group-hover:-translate-y-full"
        style={{ transition }}
      >
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full group-hover:translate-y-0"
        style={{ transition }}
      >
        {children}
      </span>
    </Link>
  );
}`;
