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
  { name: "Landing page", price: "$2,500", note: "Designed and built" },
  { name: "Site + design system", price: "$5,000", note: "Four pages, extendable" },
  { name: "UI audit and fixes", price: "$1,800", note: "On your existing product" },
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
