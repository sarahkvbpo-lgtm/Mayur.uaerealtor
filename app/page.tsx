"use client";

import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { ArrowUpRight, ArrowRight, Check, X, Menu, MapPin, Home, KeyRound, Building2, Landmark, ChartNoAxesCombined, ShieldCheck, Plus, Minus, Phone, Mail, Copy } from "lucide-react";
import site from "../content/site.json";
import { enquirySchema } from "../lib/enquiry-validation";
import { buildEnquiryEmail } from "../lib/enquiry-email";
import BrandIdentity from "../components/brand-identity";
import AdvisorIdentity from "../components/advisor-identity";
import SocialLinks from "../components/social-links";

type Service = "Buy" | "Sell" | "Rent" | "Mortgage" | "Invest";
type Lead = {service: Service; location: string; propertyType: string; budget: string; timeline: string; message: string; name: string; email: string; phone: string; contactMethod: string; consent: boolean; website: string};
const initial: Lead = {service: "Buy", location: site.locations[0], propertyType: site.propertyTypes[0], budget: site.buyBudgets[0], timeline: "Just exploring", message: "", name: "", email: "", phone: "", contactMethod: "Email", consent: false, website: ""};
const icons = [Home, KeyRound, Building2, Landmark, ChartNoAxesCombined];
const Arrow = () => <ArrowUpRight size={19} aria-hidden="true" />;

export default function Page() {
  const [menu, setMenu] = useState(false);
  const [searchService, setSearchService] = useState<Service>("Buy");
  const [searchLocation, setSearchLocation] = useState(site.locations[0]);
  const [searchType, setSearchType] = useState(site.propertyTypes[0]);
  const [searchBudget, setSearchBudget] = useState(site.buyBudgets[0]);
  const [lead, setLead] = useState<Lead>(initial);
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [emailReady, setEmailReady] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showCall, setShowCall] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const privacy = useRef<HTMLDialogElement>(null);
  const callDialog = useRef<HTMLDialogElement>(null);
  const callHeading = useRef<HTMLHeadingElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const callTrigger = useRef<HTMLElement | null>(null);
  const priorFocus = useRef<HTMLElement | null>(null);
  const stepHeading = useRef<HTMLHeadingElement>(null);
  const patch = (values: Partial<Lead>) => setLead(prev => ({...prev, ...values}));

  useEffect(() => {
    if (!showContact && !showPrivacy && !showCall) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {document.body.style.overflow = prev;};
  }, [showContact, showPrivacy, showCall]);
  useEffect(() => { if (showContact) stepHeading.current?.focus(); }, [step, emailReady, showContact]);

  function openCall() {
    callTrigger.current = document.activeElement as HTMLElement;
    setCopyStatus(""); setShowCall(true); setMenu(false);
    callDialog.current?.showModal(); callHeading.current?.focus();
  }
  function closeCall() {
    callDialog.current?.close(); setShowCall(false); callTrigger.current?.focus();
  }
  async function copyPhone() {
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(site.phoneNumber);
      setCopyStatus("Number copied. Paste it into your Phone app.");
    } catch {
      phoneInput.current?.focus(); phoneInput.current?.select();
      setCopyStatus("Number selected. Press and hold, or use your device’s Copy option.");
    }
  }

  function enquire(service: Service = "Buy", location = site.locations[0], fromSearch = false) {
    priorFocus.current = document.activeElement as HTMLElement;
    setLead({...initial, service, location, ...(fromSearch ? {propertyType: searchType, budget: searchBudget} : {})});
    setStep(1); setError(""); setEmailReady(false); setMenu(false);
    setShowContact(true); dialog.current?.showModal();
  }
  function close() { dialog.current?.close(); setShowContact(false); priorFocus.current?.focus(); }
  function changeService(service: Service) { patch({service, budget: "Let’s discuss"}); }
  function privacyOpen() { setShowPrivacy(true); privacy.current?.showModal(); }
  function privacyClose() { privacy.current?.close(); setShowPrivacy(false); }
  function next(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError("");
    if (step === 2) {
      const check = enquirySchema.safeParse(lead);
      if (!check.success) {setError(check.error.issues[0]?.message || "Please check your details."); return;}
    }
    if (step < 3) setStep(step + 1);
  }
  function prepareEmail(event: MouseEvent<HTMLAnchorElement>) {
    const check = enquirySchema.safeParse(lead);
    if (!check.success) {
      event.preventDefault();
      setError(check.error.issues[0]?.message || "Please check your details.");
      return;
    }
    setError(""); setEmailReady(true);
  }
  const emailDraft = buildEnquiryEmail(lead);
  const budgets = lead.service === "Rent" ? site.rentBudgets : site.buyBudgets;
  const searchBudgets = searchService === "Rent" ? site.rentBudgets : site.buyBudgets;

  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="Mayur UAE Realtor home" onClick={() => setMenu(false)}><BrandIdentity /></a>
        <nav id="mobile-navigation" className={menu ? "main-nav is-open" : "main-nav"} aria-label="Main navigation">
          {[["Services", "services"], ["Neighbourhoods", "neighbourhoods"], ["The approach", "approach"], ["Meet Mayur", "about"], ["Connect", "connect"]].map(([title, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)}>{title}</a>)}
          <button type="button" className="button nav-contact call-action"  aria-label={`Call Now: ${site.phoneDisplay}`} aria-haspopup="dialog" onClick={openCall}><Phone size={16} aria-hidden="true" /> Call Now</button>
        </nav>
        <button className="menu-toggle" aria-expanded={menu} aria-controls="mobile-navigation" aria-label={menu ? "Close navigation" : "Open navigation"} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
      </div>
    </header>
    <main id="main">
      <section id="home" className="hero">
        <img className="hero-image" src={site.heroImage} alt="Dubai skyline and the Burj Khalifa in the warm light of sunset" fetchPriority="high" />
        <div className="hero-shade" />
        <div className="container hero-content">
          <div className="hero-topline"><span className="eyebrow light">{site.heroEyebrow}</span><span className="hero-location"><MapPin size={14} /> DUBAI · UNITED ARAB EMIRATES</span></div>
          <h1>{site.heroTitle}<br /><em>{site.heroEmphasis}</em></h1>
          <p>{site.heroDescription}</p>
          <div className="hero-actions"><button type="button" className="button button-gold call-action" aria-label={`Call Now: ${site.phoneDisplay}`} aria-haspopup="dialog" onClick={openCall}><Phone size={16} aria-hidden="true" /> Call Now</button><button className="hero-enquire" onClick={() => enquire()}>Send an enquiry <Arrow /></button></div>
          <a className="hero-explore" href="#neighbourhoods">A city of possibilities <span>Explore the neighbourhoods <ArrowRight size={16} /></span></a>
        </div>
      </section>
      <div className="container search-wrap">
        <form className="property-search" onSubmit={e => {e.preventDefault(); enquire(searchService, searchLocation, true);}} aria-label="Start your property search">
          <div className="search-tabs" role="group" aria-label="Property goal">{(["Buy", "Rent", "Invest"] as Service[]).map(s => <button key={s} type="button" className={searchService === s ? "active" : ""} aria-pressed={searchService === s} onClick={() => {setSearchService(s); setSearchBudget("Let’s discuss");}}>{s}</button>)}<span>A new beginning starts here.</span></div>
          <div className="search-fields">
            <label><span>YOUR LOCATION</span><select aria-label="Preferred location" value={searchLocation} onChange={e => setSearchLocation(e.target.value)}>{site.locations.map(x => <option key={x}>{x}</option>)}</select></label>
            <label><span>PROPERTY TYPE</span><select aria-label="Preferred property type" value={searchType} onChange={e => setSearchType(e.target.value)}>{site.propertyTypes.map(x => <option key={x}>{x}</option>)}</select></label>
            <label><span>{searchService === "Rent" ? "ANNUAL RENT BUDGET" : "YOUR BUDGET"}</span><select aria-label="Preferred budget" value={searchBudget} onChange={e => setSearchBudget(e.target.value)}>{searchBudgets.map(x => <option key={x}>{x}</option>)}</select></label>
            <button className="button search-submit" type="submit">Find my property <ArrowRight size={18} /></button>
          </div>
          <p className="search-note">A personalised shortlist starts with your requirements.</p>
        </form>
      </div>
      <section className="section services container" id="services">
        <div className="section-intro"><div><span className="eyebrow">PROPERTY, WITH PURPOSE</span><h2>{site.introTitle}</h2></div><p>{site.introText}</p></div>
        <div className="service-grid">{site.services.map((service, index) => { const Icon = icons[index]; return <article className="service" key={service.name}><div className="service-top"><Icon size={26} strokeWidth={1.3} /><span>0{index + 1}</span></div><h3>{service.name}</h3><strong>{service.title}</strong><p>{service.text}</p><button className="text-link" onClick={() => enquire(service.name as Service)}>{service.action}<Arrow /></button></article>; })}</div>
      </section>
      <section className="neighbourhood-section" id="neighbourhoods"><div className="container section">
        <div className="section-intro"><div><span className="eyebrow">A PLACE FOR EVERY WAY OF LIVING</span><h2>Find a setting that<br /><em>feels like you.</em></h2></div><p>Skyline mornings or sea-view evenings. Discover the surroundings that could become part of your every day.</p></div>
        <div className="area-grid">{site.areas.map((area, i) => <button className="area-card" key={area.name} onClick={() => enquire("Buy", area.name)} aria-label={`Enquire about ${area.name}`}><img src={area.image} alt={area.alt} loading="lazy" style={{objectPosition: i === 0 ? "48% center" : "center 60%"}} /><span className="area-overlay" /><span className="area-content"><span className="eyebrow light">{area.eyebrow}</span><span className="area-title">{area.name}</span><span className="area-description">{area.text}</span></span><span className="circle-arrow"><Arrow /></span></button>)}<div className="area-invite"><span className="map-decoration"><MapPin size={45} strokeWidth={.7} /></span><span className="eyebrow">YOUR LIFE, YOUR LOCATION</span><h3>Somewhere<br /><em>uniquely yours.</em></h3><p>Have Dubai Marina, Palm Jumeirah, Abu Dhabi or another community in mind? Let’s start there.</p><button className="text-link" onClick={() => enquire()}>Explore your possibilities <Arrow /></button></div></div>
        <p className="image-note">Location photography and architectural inspiration. Images are not property listings.</p>
      </div></section>
      <section className="section container approach" id="approach"><div className="approach-heading"><span className="eyebrow">LESS OVERWHELM. MORE DIRECTION.</span><h2>A clear path.<br /><em>A personal journey.</em></h2><p>Considered decisions begin with understanding. Here’s how we start.</p><button className="button" onClick={() => enquire()}>Start a conversation <Arrow /></button></div><ol className="steps"><li><span>01</span><div><h3>First, we listen.</h3><p>Your lifestyle, your objectives, your non-negotiables. The right questions come before the right property.</p></div></li><li><span>02</span><div><h3>Then, we bring focus.</h3><p>Compare locations and property options against your priorities, with the details made easier to understand.</p></div></li><li><span>03</span><div><h3>Move forward with clarity.</h3><p>Discuss viewings, practical questions and the next steps, at a pace that works for you.</p></div></li></ol></section>
      <section className="about-section" id="about"><div className="container about-grid"><div className="about-image"><img src="/images/architecture.jpg" alt="Contemporary residential architecture with clean lines, a garden and a pool; lifestyle inspiration" loading="lazy" /><div className="image-label">A considered eye for the places we call home.</div></div><div className="about-copy"><span className="eyebrow">MEET YOUR PROPERTY CONSULTANT</span><h2>{site.aboutTitle}</h2><p>{site.aboutText}</p><p>Good advice starts with trust. Expect a conversation focused on your needs, thoughtful comparisons and a clear view of what comes next.</p><AdvisorIdentity /><button className="text-link" onClick={() => enquire()}>Let’s talk about your plans <Arrow /></button></div></div></section>
      <section className="section container faq-section"><div><span className="eyebrow">A LITTLE MORE CLARITY</span><h2>Before we begin.</h2></div><div className="faqs">{site.faqs.map((faq, i) => <div className="faq" key={faq.question}><h3><button aria-expanded={openFaq === i} aria-controls={`faq-${i}`} onClick={() => setOpenFaq(openFaq === i ? null : i)}>{faq.question}{openFaq === i ? <Minus size={18} /> : <Plus size={18} />}</button></h3><div id={`faq-${i}`} hidden={openFaq !== i}><p>{faq.answer}</p></div></div>)}</div></section>
      <section className="connect-section section container" id="connect"><div className="section-intro"><div><span className="eyebrow">LET’S STAY CONNECTED</span><h2>Good conversations.<br /><em>New possibilities.</em></h2></div><p>Message me on WhatsApp, follow my property updates, or connect with me on your favourite platform.</p></div><SocialLinks /></section>
      <section className="contact-section" id="contact"><div className="container contact-inner"><div><span className="eyebrow light">YOUR NEXT CHAPTER STARTS WITH A CONVERSATION</span><h2>Let’s make room<br /><em>for what’s next.</em></h2><p>Tell me what you have in mind. We’ll take it from there.</p></div><div className="contact-actions"><button type="button" className="button button-gold call-action" aria-label={`Call Now: ${site.phoneDisplay}`} aria-haspopup="dialog" onClick={openCall}><Phone size={17} aria-hidden="true" /> Call Now</button><button type="button" className="contact-phone phone-link"  aria-haspopup="dialog" onClick={openCall}>{site.phoneDisplay}</button><button className="contact-enquire" onClick={() => enquire()}>Send an enquiry <Arrow /></button></div></div></section>
    </main>
    <footer><div className="container"><div className="footer-main"><a className="brand" href="#home"><BrandIdentity /></a><p>Personal guidance.<br />Extraordinary possibilities.</p><nav aria-label="Footer services">{site.services.map(s => <button key={s.name} onClick={() => enquire(s.name as Service)}>{s.name}</button>)}</nav><a className="footer-qr" href={site.contactQr.href} target="_blank" rel="noopener noreferrer" aria-label="Open Mayur’s contact and social profiles"><img src={site.contactQr.image} alt="QR code for Mayur’s contact and social profiles" width={164} height={164} loading="lazy" /><span>{site.contactQr.label}</span></a></div><div className="footer-contact"><button type="button" className="phone-link"  aria-haspopup="dialog" onClick={openCall}><Phone size={15} aria-hidden="true" />{site.phoneDisplay}</button><a href={`mailto:${site.contactEmail}`} target="_blank" rel="noopener noreferrer"><Mail size={15} aria-hidden="true" />{site.contactEmail}</a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Mayur UAE Realtor</span><span>Dubai · United Arab Emirates</span><button onClick={privacyOpen}>Privacy & enquiries</button><a href="#home">Back to top ↑</a></div><p className="footer-note">Mortgage terms and eligibility depend on the lender. Property availability and transaction details are confirmed individually. Investment outcomes are not guaranteed.</p></div></footer>
    <div className="mobile-cta"><span>Speak with Mayur<br /><button type="button" className="phone-link"  aria-haspopup="dialog" onClick={openCall}><strong>{site.phoneDisplay}</strong></button></span><button type="button" className="button call-action" aria-label={`Call Now: ${site.phoneDisplay}`} aria-haspopup="dialog" onClick={openCall}><Phone size={15} aria-hidden="true" /> Call Now</button></div>

    <dialog className="enquiry-dialog" ref={dialog} onCancel={e => {e.preventDefault(); close();}} onClick={e => {if (e.target === e.currentTarget) close();}} onClose={() => setShowContact(false)} aria-labelledby="enquiry-title">
      <div className="dialog-inner"><div className="dialog-top"><span className="eyebrow">A CONVERSATION WITH MAYUR</span><button className="icon-button" aria-label="Close enquiry" onClick={close}><X size={22} /></button></div>
      {emailReady ? <div className="success"><span className="success-check"><Mail size={30} /></span><h2 id="enquiry-title" ref={stepHeading} tabIndex={-1}>Finish in your email app.</h2><p>Your enquiry is ready to email to <strong>{site.contactEmail}</strong>. Tap Send in your email app to complete it.</p><p className="muted">If your email app did not open, try the button below. You can also copy your enquiry and send it to the address above.</p><a className="button" href={emailDraft.href} target="_blank" rel="noopener noreferrer">Open email app <Mail size={17} /></a><details className="email-fallback"><summary>View or copy my enquiry</summary><label>Email subject<input readOnly value={emailDraft.subject} onFocus={event => event.currentTarget.select()} /></label><label>Enquiry details<textarea rows={9} readOnly value={emailDraft.body} onFocus={event => event.currentTarget.select()} /></label></details><button className="back-button" onClick={() => setEmailReady(false)}>← Back to review</button></div> : <>
        <div className="form-progress" aria-label={`Step ${step} of 3`}>{["Your plans", "Your details", "Review & email"].map((label, i) => <span className={step >= i + 1 ? "current" : ""} key={label}><b>{i + 1 < step ? <Check size={12} /> : i + 1}</b>{label}</span>)}</div>
        <h2 id="enquiry-title" ref={stepHeading} tabIndex={-1}>{step === 1 ? "What does your next chapter look like?" : step === 2 ? "Let’s make it personal." : "Everything look right?"}</h2>
        <p className="dialog-intro">{step === 1 ? "A few details help us start in the right place." : step === 2 ? "Share the best way for Mayur to reach you." : `Review your details. Your email app will prepare a message to ${site.contactEmail}; tap Send there to complete it.`}</p>
        <form onSubmit={next}>
          {step === 1 && <div className="form-grid"><label className="full">I’m looking to<select value={lead.service} onChange={e => changeService(e.target.value as Service)}>{site.services.map(s => <option key={s.name}>{s.name}</option>)}</select></label><label>Preferred location<select value={lead.location} onChange={e => patch({location: e.target.value})}>{site.locations.map(x => <option key={x}>{x}</option>)}</select></label><label>Property type<select value={lead.propertyType} onChange={e => patch({propertyType: e.target.value})}>{site.propertyTypes.map(x => <option key={x}>{x}</option>)}</select></label><label>{lead.service === "Rent" ? "Annual rent budget" : lead.service === "Sell" ? "Expected property value" : "Indicative budget"}<select value={lead.budget} onChange={e => patch({budget: e.target.value})}>{budgets.map(x => <option key={x}>{x}</option>)}</select></label><label>When are you planning to move?<select value={lead.timeline} onChange={e => patch({timeline: e.target.value})}>{["Just exploring", "Within 3 months", "3–6 months", "6–12 months"].map(x => <option key={x}>{x}</option>)}</select></label><label className="full">Anything else? <span className="optional">(optional)</span><textarea rows={3} maxLength={2000} value={lead.message} onChange={e => patch({message: e.target.value})} placeholder="A particular area, must-have feature, or a question…" /></label></div>}
          {step === 2 && <div className="form-grid"><label className="full">Your name<input autoComplete="name" name="name" minLength={2} maxLength={100} required value={lead.name} onChange={e => patch({name: e.target.value})} placeholder="Full name" /></label><label className="full">Email address<input type="email" autoComplete="email" name="email" maxLength={254} required value={lead.email} onChange={e => patch({email: e.target.value})} placeholder="you@example.com" /></label><label>Preferred response<select value={lead.contactMethod} onChange={e => patch({contactMethod: e.target.value})}><option>Email</option><option>Phone</option></select></label><label>Phone number {lead.contactMethod !== "Phone" && <span className="optional">(optional)</span>}<input type="tel" autoComplete="tel" name="phone" maxLength={30} required={lead.contactMethod === "Phone"} value={lead.phone} onChange={e => patch({phone: e.target.value})} placeholder="Include country code" /></label><label className="honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" value={lead.website} onChange={e => patch({website: e.target.value})} /></label><label className="consent full"><input type="checkbox" required checked={lead.consent} onChange={e => patch({consent: e.target.checked})} /><span>I agree that Mayur may use the details in my enquiry to contact me about my property requirements. <button className="inline-link" type="button" onClick={privacyOpen}>Privacy details</button></span></label></div>}
          {step === 3 && <><dl className="review">{[["Your goal", lead.service], ["Location", lead.location], ["Property", lead.propertyType], [lead.service === "Rent" ? "Annual rent budget" : "Budget / value", lead.budget], ["Timing", lead.timeline], ["Your name", lead.name], ["Email", lead.email], ...(lead.phone ? [["Phone", lead.phone]] : []), ["Preferred response", lead.contactMethod], ...(lead.message ? [["Your message", lead.message]] : [])].map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl><p className="review-note"><ShieldCheck size={17} /> Your email app opens a draft. You choose when to send it.</p></>}
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="form-actions">{step > 1 ? <button type="button" className="back-button" onClick={() => {setStep(step - 1); setError("");}}>← Back</button> : <span className="muted">Step 1 of 3</span>}<span className="form-primary-action">{step === 3 ? <a className="button" href={emailDraft.href} target="_blank" rel="noopener noreferrer" onClick={prepareEmail}>Open email app <Mail size={17} /></a> : <button className="button" type="submit">Continue <ArrowRight size={17} /></button>}</span></div>
        </form>
      </>}
      </div>
    </dialog>

    <dialog className="call-dialog" ref={callDialog} onCancel={event => {event.preventDefault(); closeCall();}} onClick={event => {if (event.target === event.currentTarget) closeCall();}} onClose={() => setShowCall(false)} aria-labelledby="call-title" aria-describedby="call-description">
      <div className="dialog-top"><span className="eyebrow">SPEAK WITH MAYUR</span><button className="icon-button" aria-label="Close call options" onClick={closeCall}><X size={22} /></button></div>
      <span className="brand-mark call-brand-mark"><img src={site.logo} alt="Mayur gold M logo" /></span>
      <h2 id="call-title" ref={callHeading} tabIndex={-1}>Call Mayur</h2>
      <p id="call-description">Open your phone dialler to call {site.phoneDisplay}.</p>
      <label className="call-number-label" htmlFor="call-number">Phone number</label>
      <input id="call-number" className="call-number" ref={phoneInput} readOnly value={site.phoneNumber} onFocus={event => event.currentTarget.select()} />
      <div className="call-options"><a className="button" href={`tel:${site.phoneNumber}`} target="_blank" rel="noopener noreferrer"><Phone size={16} aria-hidden="true" /> Open phone dialler</a><button className="button button-copy" type="button" onClick={copyPhone}><Copy size={16} aria-hidden="true" /> Copy number</button></div>
      <p className="call-status" role="status" aria-live="polite">{copyStatus}</p>
      <p className="call-help">If the dialler does not open, copy the number and paste it into your Phone app.</p>
    </dialog>
    <dialog className="privacy-dialog" ref={privacy} onCancel={privacyClose} onClose={() => setShowPrivacy(false)} aria-labelledby="privacy-title"><div className="dialog-top"><span className="eyebrow">YOUR INFORMATION</span><button className="icon-button" onClick={privacyClose} aria-label="Close privacy details"><X size={22} /></button></div><h2 id="privacy-title">Privacy & enquiries</h2><p>The enquiry form prepares an email with the contact details and property preferences you choose to share. It opens your own email app, addressed to {site.contactEmail}. You must tap Send in that app to send your enquiry.</p><p>Your consent covers responding to this enquiry. It does not subscribe you to a marketing list. No payment information is collected.</p><p>To request a correction or deletion of details you have emailed, contact {site.contactEmail}.</p><button className="button" onClick={privacyClose}>Understood <Check size={17} /></button></dialog>
  </>;
}
