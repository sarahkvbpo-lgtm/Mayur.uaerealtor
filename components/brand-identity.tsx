import site from "../content/site.json";

export default function BrandIdentity() {
  return <span className="brand-identity">
    <span className="brand-mark"><img src={site.logo} alt="" aria-hidden="true" /></span>
    <span className="brand-copy"><strong>{site.brand}</strong><span className="brand-descriptors"><span className="brand-profession">{site.brandDescriptor}</span><span className="brand-specialty">{site.brandSpecialty}</span></span><span className="brand-tagline">{site.brandTagline}</span></span>
  </span>;
}
