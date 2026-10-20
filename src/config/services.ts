export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: "TrendingUp" | "SlidersHorizontal" | "Handshake" | "Globe2";
  focusAreas: {
    title: string;
    description: string;
  }[];
  deliverables: string[];
  inquiryPreselect: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "business-strategy",
    slug: "business-strategy",
    title: "Business Strategy",
    shortDescription:
      "Strategic planning, business development guidance, and structured approaches to organizational growth.",
    fullDescription:
      "A structured approach to articulating clear business direction. We assist organizations in evaluating current positions, identifying competitive differentiators, and designing realistic strategic roadmaps aligned with long-term commercial goals.",
    iconName: "TrendingUp",
    focusAreas: [
      {
        title: "Strategic Business Planning",
        description: "Formulating clear, actionable roadmaps that align operational priorities with long-term company visions.",
      },
      {
        title: "Strategic Evaluation & Diagnosis",
        description: "Assessing organizational readiness, strengths, and areas requiring strategic repositioning.",
      },
      {
        title: "Market Opportunity Assessment",
        description: "Evaluating market dynamics, emerging demand patterns, and competitive positioning.",
      },
      {
        title: "Structured Growth Planning",
        description: "Developing milestone-driven plans for sustainable expansion without compromising operational stability.",
      },
    ],
    deliverables: [
      "Strategic roadmap & milestone blueprint",
      "Competitive positioning review",
      "Organizational growth priority matrix",
    ],
    inquiryPreselect: "Business Strategy",
  },
  {
    id: "operations-consulting",
    slug: "operations-consulting",
    title: "Operations Consulting",
    shortDescription:
      "Support for evaluating workflows, identifying operational challenges, and improving business efficiency.",
    fullDescription:
      "Operational friction diminishes profitability and slows execution. We work alongside teams to map existing workflows, pinpoint bottlenecks, and design practical improvements that streamline day-to-day organizational activities.",
    iconName: "SlidersHorizontal",
    focusAreas: [
      {
        title: "Process & Workflow Evaluation",
        description: "Detailed analysis of operational workflows to identify redundancies, delays, and friction points.",
      },
      {
        title: "Workflow Improvement Initiatives",
        description: "Designing streamlined procedures and communication structures that accelerate delivery.",
      },
      {
        title: "Operational Capacity Planning",
        description: "Structuring resource allocation and operational capacity to support business growth comfortably.",
      },
      {
        title: "Efficiency & Cost Considerations",
        description: "Identifying opportunities for cost-effective execution, waste reduction, and enhanced quality control.",
      },
    ],
    deliverables: [
      "Workflow diagnostic report",
      "Process optimization recommendations",
      "Operational standard operating guidelines",
    ],
    inquiryPreselect: "Operations Consulting",
  },
  {
    id: "business-advisory",
    slug: "business-advisory",
    title: "Business Advisory",
    shortDescription:
      "Practical guidance to support business decisions, planning, and the evaluation of new initiatives.",
    fullDescription:
      "Sound decision-making requires objective perspective and clear evaluation. Our advisory discussions provide leadership teams with thoughtful viewpoints, structured decision frameworks, and independent analytical support.",
    iconName: "Handshake",
    focusAreas: [
      {
        title: "Business Decision Support",
        description: "Objective sounding board and analytical backing for critical commercial decisions.",
      },
      {
        title: "Executive Planning Discussions",
        description: "Facilitated planning sessions to align stakeholders and refine organizational priorities.",
      },
      {
        title: "New Initiative Assessment",
        description: "Assessing the feasibility, risks, and resource requirements of proposed business ventures.",
      },
      {
        title: "Organizational Considerations",
        description: "Evaluating governance, team alignments, and execution readiness for new projects.",
      },
    ],
    deliverables: [
      "Decision evaluation memos",
      "Feasibility and risk consideration summaries",
      "Stakeholder alignment frameworks",
    ],
    inquiryPreselect: "Business Advisory",
  },
  {
    id: "growth-opportunities",
    slug: "growth-opportunities",
    title: "Growth Opportunities",
    shortDescription:
      "Exploring potential markets, business opportunities, and approaches to sustainable expansion.",
    fullDescription:
      "Identifying where and how to expand is critical for enduring business health. We guide companies through exploring viable adjacent markets, potential commercial partnerships, and phased expansion strategies.",
    iconName: "Globe2",
    focusAreas: [
      {
        title: "Market Exploration & Entry",
        description: "Researching market viability, regulatory environments, and customer landscape in new segments.",
      },
      {
        title: "Expansion Planning & Phasing",
        description: "Crafting disciplined phased entry plans that minimize capital exposure while testing traction.",
      },
      {
        title: "Business Development Perspectives",
        description: "Identifying commercial avenues, sales channels, and engagement strategies for new offerings.",
      },
      {
        title: "Partnership Opportunity Evaluation",
        description: "Structuring criteria and evaluating potential synergistic business alliances.",
      },
    ],
    deliverables: [
      "Market feasibility assessment",
      "Phased expansion plan",
      "Commercial partnership evaluation matrix",
    ],
    inquiryPreselect: "Growth Opportunities",
  },
];

export const SERVICE_OPTIONS = [
  "Business Strategy",
  "Operations Consulting",
  "Business Advisory",
  "Growth Opportunities",
  "General Enquiry",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];
