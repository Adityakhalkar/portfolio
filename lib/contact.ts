export const EMAIL = "khalkaraditya8@gmail.com";

const mailto = (subject: string, lines: string[]) =>
  `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    ["Hi Aditya,", "", ...lines, "", ""].join("\n")
  )}`;

/* The form is the main path. These stay as the fallback for anyone with JS
   off, and for the "or use email" escape hatch inside the modal. */
export const MAILTO = mailto("Project enquiry", [
  "What we're building:",
  "Where we're stuck:",
  "Timeline:",
  "Budget range:",
]);

export const PACKAGES = [
  { name: "Positioning teardown", price: "Free", note: "What your site says vs what you sell" },
  { name: "Landing page", price: "$2,500", note: "Positioned, designed, built" },
  { name: "Full-stack build", price: "from $8,000", note: "Front end, API and database" },
  { name: "Site + design system", price: "$5,000", note: "Four pages, extendable" },
  { name: "Conversion and UI audit", price: "$1,800", note: "Why it is not landing, then fixed" },
  { name: "Agent workflow setup", price: "$3,000", note: "Claude Code for your team" },
];

export const ELSEWHERE = [
  { label: "X", href: "https://x.com/adityakhalkar_", handle: "@adityakhalkar_" },
  { label: "GitHub", href: "https://github.com/adityakhalkar", handle: "adityakhalkar" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aditya-khalkar-dsai",
    handle: "aditya-khalkar-dsai",
  },
];
