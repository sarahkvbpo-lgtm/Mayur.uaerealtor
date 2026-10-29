import { z } from "zod";
import site from "../content/site.json";

export const enquirySchema = z.object({
  service: z.enum(["Buy", "Sell", "Rent", "Mortgage", "Invest"]),
  location: z.string().refine(v => site.locations.includes(v), "Choose a location."),
  propertyType: z.string().refine(v => site.propertyTypes.includes(v), "Choose a property type."),
  budget: z.string().refine(v => [...site.buyBudgets, ...site.rentBudgets].includes(v), "Choose a budget."),
  timeline: z.enum(["Just exploring", "Within 3 months", "3–6 months", "6–12 months"]),
  message: z.string().trim().max(2000),
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid email address.").max(254),
  phone: z.string().trim().max(30).refine(v => v === "" || (/^[+\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 7), "Enter a valid phone number."),
  contactMethod: z.enum(["Email", "Phone"]),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
}).refine(v => v.contactMethod !== "Phone" || v.phone.replace(/\D/g, "").length >= 7, {message: "Add a phone number for a phone response.", path: ["phone"]});
