export interface NavItem {
  label: string;
  href: string;
}

export const MAIN_NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Services", href: "/services" },
    { label: "Consultancy Approach", href: "/about#approach" },
    { label: "Company Values", href: "/about#values" },
    { label: "Contact & Enquiries", href: "/contact" },
  ],
  services: [
    { label: "Business Strategy", href: "/services#business-strategy" },
    { label: "Operations Consulting", href: "/services#operations-consulting" },
    { label: "Business Advisory", href: "/services#business-advisory" },
    { label: "Growth Opportunities", href: "/services#growth-opportunities" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ],
};
