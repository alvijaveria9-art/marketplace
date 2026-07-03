import type { Service } from "@/types";

export interface WhyChooseItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const whyChooseUs: WhyChooseItem[] = [
  {
    id: "w1",
    title: "Verified Suppliers",
    description: "Every supplier undergoes rigorous verification to ensure authenticity and reliability.",
    icon: "ShieldCheck",
  },
  {
    id: "w2",
    title: "Secure Payments",
    description: "Protected payment gateway with buyer protection on every transaction.",
    icon: "Lock",
  },
  {
    id: "w3",
    title: "Trade Assurance",
    description: "Your orders are protected from production to delivery with our trade assurance program.",
    icon: "BadgeCheck",
  },
  {
    id: "w4",
    title: "Worldwide Shipping",
    description: "Global logistics network covering 190+ countries with real-time tracking.",
    icon: "Globe",
  },
  {
    id: "w5",
    title: "24/7 Support",
    description: "Dedicated support team available around the clock in 12 languages.",
    icon: "Headphones",
  },
  {
    id: "w6",
    title: "Fast Delivery",
    description: "Express shipping options with average delivery time of 5-8 business days.",
    icon: "Truck",
  },
  {
    id: "w7",
    title: "Quality Inspection",
    description: "Third-party quality inspection services before shipment to ensure standards.",
    icon: "SearchCheck",
  },
  {
    id: "w8",
    title: "Global Warehousing",
    description: "Strategic warehouse locations across Asia, Europe, and North America.",
    icon: "Warehouse",
  },
];

export const services: Service[] = [
  {
    id: "sv1",
    title: "Business Matching",
    description: "AI-powered matching connecting buyers with ideal suppliers based on specific requirements.",
    icon: "Handshake",
  },
  {
    id: "sv2",
    title: "Logistics Solutions",
    description: "End-to-end freight forwarding, customs clearance, and door-to-door delivery.",
    icon: "Ship",
  },
  {
    id: "sv3",
    title: "Quality Inspection",
    description: "Professional product inspection and testing services at every production stage.",
    icon: "ClipboardCheck",
  },
  {
    id: "sv4",
    title: "Trade Finance",
    description: "Flexible financing options including letters of credit and supply chain financing.",
    icon: "Banknote",
  },
  {
    id: "sv5",
    title: "Warehousing",
    description: "Secure storage facilities with inventory management and order fulfillment.",
    icon: "Warehouse",
  },
  {
    id: "sv6",
    title: "Import Assistance",
    description: "Complete import/export documentation, compliance, and regulatory support.",
    icon: "FileText",
  },
];
