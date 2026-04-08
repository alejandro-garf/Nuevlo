"use client";

import { useState, useEffect, useRef, FormEvent, ReactNode } from "react";
import { translations, Lang } from "./translations";

/* ─── Scroll Reveal Hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "", stagger = false }: { children: ReactNode; className?: string; stagger?: boolean }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`${stagger ? "reveal-stagger" : "reveal"} ${className}`}>
      {children}
    </div>
  );
}

/* ─── Partner data ─── */
const partners = [
  "CARECEN",
  "CHIRLA",
  "Dream Centers CA",
  "Public Counsel",
  "ILRC",
  "MALDEF",
  "California Rural Legal Assistance",
];

/* ═══════════════════════════════════════════ */
/*                MAIN PAGE                    */
/* ═══════════════════════════════════════════ */
export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  /* Hero email */
  const [heroEmail, setHeroEmail] = useState("");
  const [heroSubmitted, setHeroSubmitted] = useState(false);

  /* AI Intake */
  const [intakeLang, setIntakeLang] = useState<Lang>("en");
  const [intakeMessage, setIntakeMessage] = useState("");
  const [intakeResponse, setIntakeResponse] = useState("");
  const [intakeLoading, setIntakeLoading] = useState(false);

  /* Waitlist — individual */
  const [indName, setIndName] = useState("");
  const [indEmail, setIndEmail] = useState("");
  const [indZip, setIndZip] = useState("");
  const [indTopic, setIndTopic] = useState("");
  const [indSuccess, setIndSuccess] = useState(false);

  /* Waitlist — org */
  const [orgName, setOrgName] = useState("");
  const [orgOrg, setOrgOrg] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgRole, setOrgRole] = useState("");
  const [orgSuccess, setOrgSuccess] = useState(false);

  const toggleLang = () => setLang((l) => (l === "en" ? "es" : "en"));
  const toggleIntakeLang = () => setIntakeLang((l) => (l === "en" ? "es" : "en"));

  /* Hero submit */
  async function handleHeroEmail(e: FormEvent) {
    e.preventDefault();
    if (!heroEmail) return;
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "individual", name: "Hero Signup", email: heroEmail }),
    });
    setHeroSubmitted(true);
    setHeroEmail("");
  }

  /* AI intake */
  async function handleIntake(e: FormEvent) {
    e.preventDefault();
    if (!intakeMessage.trim()) return;
    setIntakeLoading(true);
    setIntakeResponse("");
    try {
      const res = await fetch("/api/legal-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: intakeMessage, language: intakeLang }),
      });
      const data = await res.json();
      setIntakeResponse(data.response || data.error || "Something went wrong.");
    } catch {
      setIntakeResponse("Unable to connect. Please try again.");
    }
    setIntakeLoading(false);
  }

  /* Individual waitlist */
  async function handleIndividual(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "individual", name: indName, email: indEmail, zip: indZip, topic: indTopic }),
    });
    setIndSuccess(true);
  }

  /* Org waitlist */
  async function handleOrg(e: FormEvent) {
    e.preventDefault();
    await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "organization", name: orgName, organization: orgOrg, email: orgEmail, role: orgRole }),
    });
    setOrgSuccess(true);
  }

  const intakeT = translations[intakeLang].intake;

  return (
    <main className="min-h-screen relative">
      {/* Floating orbs */}
      <div className="orb w-[500px] h-[500px] bg-orange top-[10%] left-[-10%]" />
      <div className="orb w-[400px] h-[400px] bg-purple top-[40%] right-[-5%]" style={{ animationDelay: "-7s" }} />
      <div className="orb w-[300px] h-[300px] bg-orange bottom-[20%] left-[20%]" style={{ animationDelay: "-13s" }} />

      {/* ═══ NAVBAR ═══ */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D0D0D] pt-2" style={{ isolation: "isolate" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between pb-2">
          <span onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-pacifico text-[26px] text-white tracking-wide wordmark-sm cursor-pointer" data-text="Nuevlo">
            Nuevlo
          </span>
          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })} className="bg-transparent text-white/60 hover:text-white transition-colors text-[13px] font-semibold tracking-wide uppercase cursor-pointer p-0">
              {t.nav.howItWorks}
            </button>
            <button onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })} className="bg-transparent text-white/60 hover:text-white transition-colors text-[13px] font-semibold tracking-wide uppercase cursor-pointer p-0">
              {t.nav.forOrgs}
            </button>
            <button onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })} className="bg-transparent text-white/60 hover:text-white transition-colors text-[13px] font-semibold tracking-wide uppercase cursor-pointer p-0">
              {t.nav.joinWaitlist}
            </button>
          </div>
          <button
            onClick={toggleLang}
            className="px-4 py-1.5 rounded-full text-[12px] font-bold tracking-wider uppercase transition-all border border-white/20 text-white/80 hover:border-orange hover:text-orange"
          >
            {lang === "en" ? "EN" : "ES"} <span className="text-white/30 mx-0.5">|</span> {lang === "en" ? "ES" : "EN"}
          </button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-16 relative">
        <div className="hero-animate">
          <h1
            className="font-pacifico text-white text-7xl sm:text-8xl md:text-[120px] lg:text-[150px] leading-none wordmark select-none"
            data-text="Nuevlo"
          >
            Nuevlo
          </h1>
        </div>

        <h2 className="hero-delay-1 font-fredoka text-orange text-xl sm:text-2xl md:text-3xl mt-6 tracking-tight">
          {t.hero.tagline}
        </h2>

        <p className="hero-delay-2 font-nunito text-white/50 text-base sm:text-lg max-w-lg mt-4 leading-relaxed font-light">
          {t.hero.subtext}
        </p>

        <div className="hero-delay-3 mt-10 w-full max-w-md">
          {heroSubmitted ? (
            <p className="text-green-400 font-nunito font-semibold animate-response text-sm">
              {lang === "en" ? "You're in! We'll be in touch." : "¡Estás dentro! Te contactaremos."}
            </p>
          ) : (
            <form onSubmit={handleHeroEmail} className="flex gap-2">
              <input
                type="email"
                required
                placeholder={t.hero.emailPlaceholder}
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                className="input-field flex-1 px-5 py-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white placeholder:text-white/30 font-nunito text-sm focus:outline-none"
              />
              <button type="submit" className="btn-primary px-7 py-3 rounded-full bg-orange text-black font-semibold text-sm whitespace-nowrap">
                {t.hero.cta}
              </button>
            </form>
          )}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hero-delay-3">
          <div className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Divider */}
      {/* spacer */}

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-orange text-[12px] font-bold tracking-[0.2em] uppercase mb-3">
                {lang === "en" ? "Simple Process" : "Proceso Simple"}
              </p>
              <h2 className="font-fredoka text-white text-3xl sm:text-4xl">
                {t.howItWorks.title}
              </h2>
            </div>
          </Reveal>

          <Reveal stagger>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { num: "1", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
                { num: "2", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
                { num: "3", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
              ].map((step) => (
                <div key={step.num} className="glass glass-hover rounded-2xl p-7">
                  <div className="step-number mb-5">{step.num}</div>
                  <h3 className="font-fredoka text-white text-lg mb-2">{step.title}</h3>
                  <p className="font-nunito text-white/50 text-sm leading-relaxed font-light">{step.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* spacer */}

      {/* ═══ AI LEGAL INTAKE ═══ */}
      <section id="intake" className="py-28 px-6">
        <div className="max-w-2xl mx-auto">
          <Reveal>
            <div className="text-center mb-10">
              <p className="text-purple text-[12px] font-bold tracking-[0.2em] uppercase mb-3">
                {lang === "en" ? "AI-Powered" : "Impulsado por IA"}
              </p>
              <h2 className="font-fredoka text-white text-3xl sm:text-4xl mb-2">
                {intakeT.title}
              </h2>
              <p className="font-nunito text-white/40 text-sm">{intakeT.subtitle}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="glass rounded-3xl p-8">
              {/* Intake language toggle */}
              <div className="flex justify-end mb-5">
                <button
                  onClick={toggleIntakeLang}
                  className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all border border-white/15 text-white/50 hover:border-orange hover:text-orange"
                >
                  {intakeLang === "en" ? "EN" : "ES"} <span className="text-white/20 mx-0.5">|</span> {intakeLang === "en" ? "ES" : "EN"}
                </button>
              </div>

              <form onSubmit={handleIntake}>
                <textarea
                  value={intakeMessage}
                  onChange={(e) => setIntakeMessage(e.target.value)}
                  placeholder={intakeT.placeholder}
                  rows={4}
                  className="input-field w-full px-5 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-white/25 font-nunito text-sm focus:outline-none resize-none leading-relaxed"
                />
                <button
                  type="submit"
                  disabled={intakeLoading}
                  className="btn-primary w-full mt-4 py-3.5 rounded-full bg-orange text-black font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {intakeLoading ? (
                    <span className="animate-soft-pulse">{intakeT.loading}</span>
                  ) : (
                    intakeT.button
                  )}
                </button>
              </form>

              {intakeResponse && (
                <div className="mt-6 animate-response rounded-2xl p-5 bg-white/[0.03] border-l-2 border-l-purple border border-white/[0.06]">
                  <p className="font-nunito text-white/80 text-sm leading-relaxed whitespace-pre-wrap">
                    {intakeResponse}
                  </p>
                </div>
              )}

              <p className="mt-4 text-white/25 text-[11px] text-center font-nunito">
                {intakeT.disclaimer}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* spacer */}

      {/* ═══ WAITLIST ═══ */}
      <section id="waitlist" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-14">
              <p className="text-orange text-[12px] font-bold tracking-[0.2em] uppercase mb-3">
                {lang === "en" ? "Get Early Access" : "Acceso Anticipado"}
              </p>
              <h2 className="font-fredoka text-white text-3xl sm:text-4xl">
                {t.waitlist.title}
              </h2>
            </div>
          </Reveal>

          <Reveal stagger>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Individual card */}
              <div className="glass glass-hover rounded-3xl p-8">
                <h3 className="font-fredoka text-white text-xl mb-6">{t.waitlist.individual.title}</h3>
                {indSuccess ? (
                  <div className="animate-response flex items-center gap-3 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <span className="text-green-400 text-lg">&#10003;</span>
                    <p className="text-green-400 font-nunito text-sm font-semibold">{t.waitlist.individual.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleIndividual} className="space-y-4">
                    <div>
                      <label className="block text-white/40 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.individual.name}</label>
                      <input required value={indName} onChange={(e) => setIndName(e.target.value)}
                        className="input-field w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-nunito text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-white/40 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.individual.email}</label>
                      <input type="email" required value={indEmail} onChange={(e) => setIndEmail(e.target.value)}
                        className="input-field w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-nunito text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-white/40 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.individual.zip}</label>
                      <input value={indZip} onChange={(e) => setIndZip(e.target.value)}
                        className="input-field w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-nunito text-sm focus:outline-none" />
                    </div>
                    <div>
                      <label className="block text-white/40 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.individual.topic}</label>
                      <select value={indTopic} onChange={(e) => setIndTopic(e.target.value)}
                        className="input-field w-full px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-nunito text-sm focus:outline-none appearance-none">
                        {t.waitlist.individual.topicOptions.map((opt, i) => (
                          <option key={i} value={i === 0 ? "" : opt} className="bg-surface text-white">{opt}</option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" className="btn-primary w-full py-3 rounded-full bg-orange text-black font-semibold text-sm mt-2">
                      {t.waitlist.individual.submit}
                    </button>
                  </form>
                )}
              </div>

              {/* Organization card */}
              <div className="relative rounded-3xl p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #FD5A1E, #e84539)" }}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <h3 className="font-fredoka text-black text-xl mb-6 relative">{t.waitlist.org.title}</h3>
                {orgSuccess ? (
                  <div className="animate-response flex items-center gap-3 p-4 rounded-xl bg-black/10 relative">
                    <span className="text-black text-lg">&#10003;</span>
                    <p className="text-black font-nunito text-sm font-semibold">{t.waitlist.org.success}</p>
                  </div>
                ) : (
                  <form onSubmit={handleOrg} className="space-y-4 relative">
                    <div>
                      <label className="block text-black/50 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.org.name}</label>
                      <input required value={orgName} onChange={(e) => setOrgName(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border-0 text-black font-nunito text-sm focus:outline-none focus:ring-2 focus:ring-black/20" />
                    </div>
                    <div>
                      <label className="block text-black/50 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.org.organization}</label>
                      <input required value={orgOrg} onChange={(e) => setOrgOrg(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border-0 text-black font-nunito text-sm focus:outline-none focus:ring-2 focus:ring-black/20" />
                    </div>
                    <div>
                      <label className="block text-black/50 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.org.email}</label>
                      <input type="email" required value={orgEmail} onChange={(e) => setOrgEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border-0 text-black font-nunito text-sm focus:outline-none focus:ring-2 focus:ring-black/20" />
                    </div>
                    <div>
                      <label className="block text-black/50 font-nunito text-[11px] uppercase tracking-wider mb-1.5">{t.waitlist.org.role}</label>
                      <input required value={orgRole} onChange={(e) => setOrgRole(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-white/90 border-0 text-black font-nunito text-sm focus:outline-none focus:ring-2 focus:ring-black/20" />
                    </div>
                    <button type="submit" className="w-full py-3 rounded-full bg-black text-white font-semibold text-sm mt-2 transition-all hover:bg-white hover:text-black active:scale-[0.98]">
                      {t.waitlist.org.submit}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* spacer */}

      {/* ═══ PARTNERS ═══ */}
      <section id="partners" className="py-28 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Reveal>
            <div className="mb-14">
              <p className="text-purple text-[12px] font-bold tracking-[0.2em] uppercase mb-3">
                {lang === "en" ? "Our Network" : "Nuestra Red"}
              </p>
              <h2 className="font-fredoka text-white text-3xl sm:text-4xl mb-2">{t.partners.title}</h2>
              <p className="font-nunito text-white/40 text-sm">{t.partners.subtitle}</p>
            </div>
          </Reveal>

          <Reveal stagger>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {partners.map((name) => (
                <div key={name} className="glass glass-hover rounded-2xl p-6 flex flex-col items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-orange/20 to-purple/20 flex items-center justify-center">
                    <span className="gradient-text font-fredoka text-lg">{name[0]}</span>
                  </div>
                  <span className="font-nunito text-white/70 text-[13px] font-semibold text-center">{name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <a href="#" className="font-pacifico text-xl text-white wordmark-sm" data-text="Nuevlo">Nuevlo</a>
          <p className="font-nunito text-white/30 mt-3 mb-8 text-sm font-light">{t.footer.tagline}</p>
          <div className="flex justify-center gap-8 mb-8">
            <a href="#" className="font-nunito text-white/30 hover:text-white/60 text-[12px] uppercase tracking-wider transition-colors">{t.footer.privacy}</a>
            <a href="#" className="font-nunito text-white/30 hover:text-white/60 text-[12px] uppercase tracking-wider transition-colors">{t.footer.terms}</a>
            <a href="#" className="font-nunito text-white/30 hover:text-white/60 text-[12px] uppercase tracking-wider transition-colors">{t.footer.contact}</a>
          </div>
          <p className="font-nunito text-white/15 text-[11px]">{t.footer.builtWith} ❤️ {t.footer.inSF}</p>
        </div>
      </footer>
    </main>
  );
}
