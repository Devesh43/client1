export interface CompanyInfo {
  legalName: string;
  displayName: string;
  category: string;
  director: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  phoneTel: string;
  cin: string;
  cinNote?: string;
  address: {
    line1: string;
    line2: string;
    locality: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    full: string;
  };
  googleMapsUrl: string;
  values: {
    title: string;
    description: string;
  }[];
  hours: string;
  siteUrl: string;
}

export const COMPANY: CompanyInfo = {
  legalName: "ANVARD GLOBAL PRIVATE LIMITED",
  displayName: "ANVARD GLOBAL",
  category: "Business Consultancy & Advisory",
  director: "Ankit Sharma",
  email: "Anvardglobal@gmail.com",
  phone: "+91 8010416869",
  phoneDisplay: "+91 80104 16869",
  phoneTel: "+918010416869",
  cin: "U56290DL2026PTC469327",
  cinNote: "Transcribed verbatim from official corporate business card (Plot No. 494-A Kh. No. 296 G/F, Shyam Vihar Ph-1, E-Block, Najafgarh Delhi-110043).",
  address: {
    line1: "Plot No. 494-A, Kh. No. 296, Ground Floor",
    line2: "Shyam Vihar Phase 1, E-Block",
    locality: "Najafgarh",
    city: "New Delhi",
    state: "Delhi",
    postalCode: "110043",
    country: "India",
    full: "Plot No. 494-A, Kh. No. 296, Ground Floor, Shyam Vihar Phase 1, E-Block, Najafgarh, Delhi – 110043, India.",
  },
  // Exact Google Maps directions query based on verified office address
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Plot+No+494-A+Kh+No+296+Shyam+Vihar+Phase+1+E-Block+Najafgarh+Delhi+110043",
  values: [
    {
      title: "Integrity",
      description: "Uncompromising ethical standards, transparent communication, and genuine accountability in every advisory engagement.",
    },
    {
      title: "Innovation",
      description: "Pragmatic, forward-looking approaches that identify novel avenues for organizational efficiency and value creation.",
    },
    {
      title: "Growth",
      description: "Sustainable, structured progress designed to strengthen core business capabilities and unlock viable market opportunities.",
    },
    {
      title: "Excellence",
      description: "Meticulous attention to detail, rigorous analysis, and dedication to delivering practical, high-caliber solutions.",
    },
  ],
  hours: "Monday – Friday: 9:30 AM – 6:30 PM IST",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://anvardglobal.com",
};
