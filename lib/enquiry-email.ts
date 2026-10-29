import site from "../content/site.json";

type EnquiryDetails = {
  service: string; location: string; propertyType: string; budget: string;
  timeline: string; message: string; name: string; email: string;
  phone: string; contactMethod: string;
};

export function buildEnquiryEmail(lead: EnquiryDetails) {
  const subject = `Mayur UAE Realtor | ${lead.service} enquiry — ${lead.name.trim()}`;
  const body = [
    "Hello Mayur,", "", "I would like to discuss my property requirements.", "",
    `Service: ${lead.service}`, `Preferred location: ${lead.location}`,
    `Property type: ${lead.propertyType}`,
    `${lead.service === "Rent" ? "Annual rent budget" : lead.service === "Sell" ? "Expected property value" : "Indicative budget"}: ${lead.budget}`,
    `Timeline: ${lead.timeline}`, "", `Name: ${lead.name.trim()}`,
    `Email: ${lead.email.trim()}`, `Phone: ${lead.phone.trim() || "Not provided"}`,
    `Preferred response: ${lead.contactMethod}`, "",
    "Additional requirements:", lead.message.trim() || "None provided", "",
    "Please contact me about this property enquiry.", "", "Thank you.",
  ].join("\r\n");
  return {subject, body, href: `mailto:${site.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}
