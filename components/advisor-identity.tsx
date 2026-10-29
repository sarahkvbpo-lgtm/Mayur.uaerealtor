import site from "../content/site.json";

export default function AdvisorIdentity() {
  return <div className="advisor-identity" aria-label="Mayur’s professional profile">
    <span className="brand-mark advisor-logo"><img src={site.logo} alt="Mayur gold M logo" loading="lazy" /></span>
    <p className="advisor-tagline">{site.brandTagline}</p>
    <h3 className="advisor-name">{site.advisor.name}</h3>
    <p className="advisor-profession">{site.advisor.profession}</p>
    <p className="advisor-specialty">{site.advisor.specialty}</p>
    <p className="advisor-services">{site.advisor.services}</p>
  </div>;
}
