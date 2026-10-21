import { useState } from 'react'
import {
  ArrowDownRight, ArrowRight, CheckCircle2, ChevronDown, CircleHelp,
  Clock3, Instagram, MapPin, Menu, MessageCircle, Phone, Play,
  Settings2, ShieldCheck, Sparkles, Wrench, X, Zap
} from 'lucide-react'

const PHONE = '918483050143'
const DISPLAY_PHONE = '+91 84830 50143'
const EMAIL = 'souignymithri@gmail.com'
// Add the Instagram username (without @) once the account is created to show it in the contact section
const INSTAGRAM_USERNAME = ''

const services = [
  { icon: Wrench, number: '01', title: 'Laser Head Service & Repair', text: 'Inspection and troubleshooting support for industrial fiber laser cutting heads.' },
  { icon: Sparkles, number: '02', title: 'Lens Cleaning & Replacement', text: 'Collimator and focus lens inspection, cleaning or replacement as appropriate.' },
  { icon: Settings2, number: '03', title: 'Beam Alignment', text: 'Alignment and adjustment support to help achieve consistent cutting performance.' },
  { icon: Zap, number: '04', title: 'Cutting Quality Troubleshooting', text: 'Investigating common laser head issues that may affect cut quality and operation.' },
  { icon: ShieldCheck, number: '05', title: 'Preventive Maintenance', text: 'Maintenance checks designed to help identify wear and issues before they grow.' },
  { icon: CircleHelp, number: '06', title: 'Consumables Replacement', text: 'Nozzle, ceramic and related consumables replacement, depending on the equipment.' }
]

const brands = ['RayTools', 'Precitec', 'WSX', 'OSPRI', 'Au3tech', 'BWT']

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [form, setForm] = useState({ name: '', company: '', brand: '', message: '' })

  const whatsappUrl = (message = 'Hello, I need fiber laser head service. Please share more details.') =>
    `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`

  const submitInquiry = (event) => {
    event.preventDefault()
    const message = [
      'Hello Soujany, I would like to enquire about fiber laser head service.',
      `Name: ${form.name.trim() || 'Not provided'}`,
      `Company: ${form.company.trim() || 'Not provided'}`,
      `Laser head brand/model: ${form.brand.trim() || 'Not provided'}`,
      `Issue: ${form.message.trim() || 'Please contact me'}`
    ].join('\n')
    window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="site-shell">
      <div className="topline">
        <div className="container topline-inner">
          <span><MapPin size={14} /> Serving Kolhapur · Sangli · Satara</span>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </div>
      </div>

      <header className="header">
        <div className="container nav-wrap">
          <a href="#home" className="brand-lockup" onClick={closeMenu} aria-label="Laser Head Service home">
            <span className="brand-mark"><Zap size={23} fill="currentColor" /></span>
            <span className="brand-words"><strong>LASER<span>CARE</span></strong><small>HEAD SERVICE & MAINTENANCE</small></span>
          </a>
          <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen} aria-controls="site-nav">
            {menuOpen ? <X /> : <Menu />}
          </button>
          <nav id="site-nav" className={menuOpen ? 'nav-links open' : 'nav-links'}>
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#brands" onClick={closeMenu}>Brands</a>
            <a href="#work" onClick={closeMenu}>Our Work</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a className="nav-cta" href="#contact" onClick={closeMenu}>Get Service <ArrowRight size={16} /></a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-grid"></div>
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span className="eyebrow-dot"></span> INDEPENDENT TECHNICAL SERVICE</div>
              <h1>Precision service.<br /><span>Better cutting.</span></h1>
              <p className="hero-lede">Fiber laser head service, maintenance and troubleshooting for industrial laser cutting operations.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={`tel:+${PHONE}`}><Phone size={17} /> Call for Service</a>
                <a className="button button-outline" href={whatsappUrl()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp Us</a>
              </div>
              <div className="hero-proof">
                <div className="proof-icon"><Clock3 size={20} /></div>
                <div><strong>10+ years of experience</strong><span>Personal service from Soujany Mithari</span></div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="visual-glow"></div>
              <div className="visual-frame">
                <div className="visual-label"><span className="status-dot"></span> INDUSTRIAL LASER SYSTEMS</div>
                <div className="laser-illustration" aria-label="Stylized technical illustration of a fiber laser cutting head">
                  <div className="laser-ring ring-one"></div><div className="laser-ring ring-two"></div>
                  <div className="laser-head">
                    <div className="head-cap"></div><div className="head-body"><div className="head-line"></div><div className="head-line"></div><div className="head-line"></div></div>
                    <div className="head-neck"></div><div className="head-nozzle"></div><div className="laser-beam"></div>
                  </div>
                  <div className="scan-line"></div>
                  <span className="diagram-tag tag-top">FIBER OPTICS</span><span className="diagram-tag tag-bottom">PRECISION ALIGNMENT</span>
                </div>
                <div className="visual-footer"><span>TECHNICAL SUPPORT</span><span>MH · INDIA</span></div>
              </div>
              <div className="floating-card"><span className="floating-check"><CheckCircle2 size={18} /></span><span><strong>Service you can reach</strong><small>Direct engineer contact</small></span></div>
            </div>
          </div>
          <div className="hero-bottom container">
            <span>BUILT AROUND YOUR EQUIPMENT NEEDS</span><a href="#services">Explore services <ArrowDownRight size={16} /></a>
          </div>
        </section>

        <section className="brand-strip" id="brands">
          <div className="container brand-strip-inner">
            <p>BRANDS SERVICED*</p>
            <div className="brand-list">{brands.map(brand => <span key={brand}>{brand}</span>)}</div>
          </div>
          <div className="container brand-note">*Service availability depends on the specific model and issue. Brand names are used only to identify equipment compatibility; this is an independent service.</div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <div className="section-heading">
              <div><div className="eyebrow dark-eyebrow">WHAT WE DO</div><h2>Service support for<br /><span>critical components.</span></h2></div>
              <p>Practical maintenance and troubleshooting support to help your laser cutting equipment operate reliably.</p>
            </div>
            <div className="services-grid">
              {services.map(({ icon: Icon, number, title, text }) => (
                <article className="service-card" key={number}>
                  <div className="service-card-top"><span className="service-icon"><Icon size={21} /></span><span className="service-number">{number}</span></div>
                  <h3>{title}</h3><p>{text}</p>
                  <a href="#contact" aria-label={`Enquire about ${title}`}>Enquire about service <ArrowRight size={15} /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="experience-section" id="about">
          <div className="container experience-layout">
            <div className="experience-visual">
              <div className="experience-card">
                <span className="experience-big">10<span>+</span></span>
                <span className="experience-label">YEARS OF HANDS-ON EXPERIENCE</span>
                <div className="experience-divider"></div>
                <p>Independent service support, with direct communication from engineer to customer.</p>
                <div className="experience-decoration"><Zap size={72} /></div>
              </div>
            </div>
            <div className="experience-copy">
              <div className="eyebrow dark-eyebrow">MEET YOUR SERVICE ENGINEER</div>
              <h2>Technical know-how.<br /><span>Personal accountability.</span></h2>
              <p>Soujany Mithari is an independent fiber laser head service engineer with over 10 years of experience. Customers can discuss their equipment, describe the issue and enquire directly about service availability.</p>
              <ul className="check-list">
                <li><CheckCircle2 size={18} /> Direct contact with the service engineer</li>
                <li><CheckCircle2 size={18} /> Service coverage across three districts</li>
                <li><CheckCircle2 size={18} /> Support for multiple fiber laser head brands</li>
              </ul>
              <a href="#contact" className="text-link">Discuss your service needs <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-heading work-heading">
              <div><div className="eyebrow dark-eyebrow">WORK & DEMONSTRATIONS</div><h2>Real work. Real equipment.</h2></div>
              <p>Work photos and demo videos will be added here as they become available.</p>
            </div>
            <div className="work-grid">
              <article className="work-card work-feature">
                <div className="work-art work-art-one"><div className="art-rings"></div><div className="art-beam"></div><div className="art-label">SERVICE DEMONSTRATION</div><div className="play-button"><Play size={21} fill="currentColor" /></div></div>
                <div className="work-caption"><div><span>DEMO VIDEO</span><h3>Laser head servicing demo</h3></div><span className="coming-soon">Coming soon</span></div>
              </article>
              <article className="work-card">
                <div className="work-art work-art-two"><Wrench size={50} strokeWidth={1.1} /><span className="art-label">MAINTENANCE</span></div>
                <div className="work-caption"><div><span>PHOTO GALLERY</span><h3>Maintenance & inspection</h3></div><span className="coming-soon">Coming soon</span></div>
              </article>
              <article className="work-card">
                <div className="work-art work-art-three"><Settings2 size={50} strokeWidth={1.1} /><span className="art-label">ALIGNMENT</span></div>
                <div className="work-caption"><div><span>PHOTO GALLERY</span><h3>Equipment & components</h3></div><span className="coming-soon">Coming soon</span></div>
              </article>
            </div>
            <p className="work-disclaimer">Photos and videos of real service work will be added here soon.</p>
          </div>
        </section>

        <section className="areas-section">
          <div className="container areas-layout">
            <div><div className="eyebrow">SERVICE LOCATIONS</div><h2>Local support.<br /><span>Across the region.</span></h2><p>Contact us to discuss your location, equipment and service requirements.</p></div>
            <div className="areas-list">
              {['Kolhapur', 'Sangli', 'Satara'].map((city, i) => <div className="area-row" key={city}><span className="area-index">0{i + 1}</span><MapPin size={18} /><strong>{city}</strong><span className="area-state">Maharashtra, India</span></div>)}
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <div className="eyebrow dark-eyebrow">LET'S TALK ABOUT YOUR MACHINE</div>
              <h2>Need service?<br /><span>Let's discuss it.</span></h2>
              <p>Share your laser head brand, model and the issue you're facing. We'll open WhatsApp with your details ready to send.</p>
              <div className="contact-method"><span><Phone size={19} /></span><div><small>CALL DIRECTLY</small><a href={`tel:+${PHONE}`}>{DISPLAY_PHONE}</a></div></div>
              <div className="contact-method"><span><MessageCircle size={19} /></span><div><small>WHATSAPP</small><a href={whatsappUrl()} target="_blank" rel="noreferrer">Start a conversation <ArrowRight size={14} /></a></div></div>
              {INSTAGRAM_USERNAME && <div className="contact-method"><span><Instagram size={19} /></span><div><small>INSTAGRAM</small><a href={`https://www.instagram.com/${INSTAGRAM_USERNAME}/`} target="_blank" rel="noreferrer">@{INSTAGRAM_USERNAME} <ArrowRight size={14} /></a></div></div>}
              <div className="contact-method"><span><MapPin size={19} /></span><div><small>SERVICE AREA</small><strong>Kolhapur · Sangli · Satara</strong></div></div>
            </div>
            <form className="inquiry-form" onSubmit={submitInquiry}>
              <div className="form-head"><span>QUICK SERVICE ENQUIRY</span><small>Usually takes less than a minute</small></div>
              <label>Your name<input value={form.name} required onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" /></label>
              <label>Company name <span className="optional">(optional)</span><input value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your company" /></label>
              <label>Laser head brand / model<input value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} placeholder="e.g. RayTools, WSX..." /></label>
              <label>How can we help?<textarea value={form.message} required onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Describe the issue or service required" rows="4" /></label>
              <button type="submit" className="button button-primary form-submit"><MessageCircle size={17} /> Send enquiry on WhatsApp <ArrowRight size={16} /></button>
              <p className="form-privacy">This form opens WhatsApp. Your details are not stored by this website.</p>
            </form>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-inner">
            <div><div className="eyebrow dark-eyebrow">GOOD TO KNOW</div><h2>Before you enquire</h2></div>
            <div className="faq-list">
              <details><summary>Which locations do you cover? <ChevronDown size={17} /></summary><p>Service enquiries are welcome from Kolhapur, Sangli and Satara. Contact Soujany to confirm availability for your location.</p></details>
              <details><summary>Which laser head brands can you service? <ChevronDown size={17} /></summary><p>The current list includes RayTools, Precitec, WSX, OSPRI, Au3tech and BWT. Service availability depends on the exact model and issue.</p></details>
              <details><summary>What information should I share? <ChevronDown size={17} /></summary><p>Share the brand/model, machine details, a description of the issue and photos or a short video if available. Do not send confidential factory information.</p></details>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <a href="#home" className="brand-lockup footer-brand"><span className="brand-mark"><Zap size={23} fill="currentColor" /></span><span className="brand-words"><strong>LASER<span>CARE</span></strong><small>HEAD SERVICE & MAINTENANCE</small></span></a>
          <p>Independent fiber laser head service<br />Kolhapur · Sangli · Satara</p>
          <a className="footer-contact" href={`tel:+${PHONE}`}><Phone size={16} /> {DISPLAY_PHONE}</a>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Soujany Mithari. All rights reserved.</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>Independent service provider; not an official brand representative unless separately stated.</span></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Contact on WhatsApp"><MessageCircle size={23} /></a>
    </div>
  )
}

export default App
