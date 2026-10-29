import { ArrowUpRight } from "lucide-react";
import site from "../content/site.json";

export default function SocialLinks() {
  return <nav className="social-grid" aria-label="Mayur social media contacts">
    {site.socialLinks.map(link => <a className={`social-card social-${link.name.toLowerCase()}`} key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`${link.name}: ${link.action} (${link.handle})`}>
      <span className="social-card-top"><span className="social-symbol" aria-hidden="true">{link.symbol}</span><ArrowUpRight size={17} aria-hidden="true" /></span>
      <span className="social-name">{link.name}</span>
      <span className="social-handle">{link.handle}</span>
      <span className="social-action">{link.action}</span>
    </a>)}
  </nav>;
}
