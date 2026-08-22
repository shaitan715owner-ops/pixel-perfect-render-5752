import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ArrowDown, ArrowRight, Check, Instagram, Linkedin, Menu, MessageCircle, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logo from "@/assets/sklinder-mark.png";
import alphaOrbit from "@/assets/alpha-orbit.png.asset.json";
import chaudharyLabs from "@/assets/chaudhary-labs.png.asset.json";
import alphaSend from "@/assets/alpha-send.png.asset.json";


export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Sklinder — Where Skills Link Up" },
    { name: "description", content: "A global builder community for skill exchange, startup collaboration, and honest feedback." },
    { property: "og:title", content: "Sklinder — Where Skills Link Up" },
    { property: "og:description", content: "Bring a skill. Leave with a collaborator." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}),
  component: Index,
});

const whatsapp = "https://chat.whatsapp.com/HjaKxj8cAJZ41Z6cvrCq06?s=cl&p=a&mlu=0";
const instagram = "https://instagram.com/sklinder_official";
const features = [
  { number: "01", title: "Skill exchange", description: "Post what you're good at and what you need. Design for dev, copy for code, strategy for a shoutout — trade directly, without invoices.", visual: "exchange" },
  { number: "02", title: "Startup collaboration", description: "Bring a half-built idea and find the co-founder, technical partner, designer, or first collaborator who can help you ship.", visual: "launch" },
  { number: "03", title: "Real feedback", description: "Share your pitch, product, portfolio, or idea with people who will give you an honest read — not empty encouragement.", visual: "feedback" },
] as const;
const skills = ["Design", "Development", "Marketing", "AI", "Growth", "Product", "Strategy", "Founders", "Content"];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<"idle" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.12 });
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      setError("Add your name, a valid email, and a message of at least 10 characters.");
      return;
    }
    setError(""); setFormState("success"); event.currentTarget.reset();
  };

  return (
    <div id="top" className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar scrolled={scrolled} open={menuOpen} setOpen={setMenuOpen} />
      <main>
        <section className="hero-field relative flex min-h-[760px] items-center border-b border-border pt-16 lg:min-h-[840px] lg:pt-20">
          <div className="grain pointer-events-none absolute inset-0" />
          <HeroNetwork />
          <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
            <div className="max-w-5xl">
              <div className="hero-eyebrow"><Eyebrow>Where builders connect</Eyebrow></div>
              <h1 className="hero-title mt-7 max-w-[1080px] font-display text-[clamp(2.8rem,12vw,4rem)] font-medium leading-[.94] tracking-normal sm:text-7xl lg:text-[clamp(3.4rem,8.2vw,7.6rem)] lg:leading-[.88]">
                Where skills<br />link up and<br /><span className="text-primary">startups get built.</span>
              </h1>
              <p className="hero-copy mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg">Sklinder connects freelancers and founders who&apos;d rather trade skills and build together than work alone.</p>
              <div className="hero-actions mt-8 grid gap-3 sm:mt-9 sm:flex">
                <Button asChild variant="brand" size="xl"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Join the WhatsApp community</a></Button>
                <Button asChild variant="brandOutline" size="xl"><a href="#how">Explore how it works<ArrowDown /></a></Button>
              </div>
              <p className="hero-trust mt-5 flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 shrink-0 rounded-full bg-primary" />No pitching. No spam. Just people who build.</p>
              <MobileHeroNetwork />
            </div>
          </div>
        </section>

        <Marquee />


        <section id="about" className="section-shell scroll-mt-20" data-reveal>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:gap-24">
            <div><Eyebrow>Why Sklinder</Eyebrow><h2 className="mt-6 max-w-4xl font-display text-[clamp(2.15rem,9vw,3rem)] font-medium leading-[1.02] sm:text-6xl lg:text-7xl">Every founder needs<br className="sm:hidden" /> skills they don&apos;t have.<br /><span className="mt-5 block text-muted-foreground sm:mt-0">Every freelancer has<br className="sm:hidden" /> skills sitting idle.</span></h2></div>
            <div className="self-end border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0"><p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Sklinder started from a simple observation: every founder needs skills they don&apos;t have, and every freelancer has skills sitting idle between projects.</p><p className="mt-5 leading-7 text-muted-foreground">Instead of another job board or agency, Sklinder creates a direct line between people who can build and people who need to build.</p><p className="mt-8 font-display text-lg font-medium text-primary">Trade skills. Find collaborators. Build something real.</p></div>
          </div>
          <Slider
            className="mt-16 sm:mt-20"
            desktop="sm:grid sm:grid-cols-3 sm:gap-0 sm:border-y sm:border-border"
            items={[{ n: "01", a: "Bring value", b: "Take value." }, { n: "00", a: "No spam", b: "No cold pitching." }, { n: "∞", a: "Skills", b: "Trade what you know." }].map((item) => (
              <div key={item.a} className="flex h-full flex-col justify-between border border-border bg-surface/30 p-6 sm:block sm:border-0 sm:border-r sm:bg-transparent sm:px-8 sm:py-9 sm:first:pl-0 sm:last:border-r-0">
                <strong className="font-display text-6xl font-light leading-none text-primary sm:text-8xl">{item.n}</strong>
                <div className="mt-8 sm:mt-0">
                  <p className="font-display text-sm font-medium uppercase tracking-[.14em] sm:mt-5 sm:normal-case sm:tracking-normal">{item.a}</p>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.b}</p>
                </div>
              </div>
            ))}
          />

        </section>

        <section id="how" className="border-t border-border" data-reveal>
          <div className="section-shell pb-0 sm:pb-24"><SectionHeading eyebrow="How it works" title="Three ways people use Sklinder." /></div>
          <div className="px-5 pb-20 pt-10 sm:hidden">
            <Slider
              desktop=""
              items={features.map((feature) => (
                <div key={feature.number} className="flex h-full flex-col border border-border bg-surface/30 p-6">
                  <span className="font-display text-xs text-primary">{feature.number}</span>
                  <h3 className="mt-4 font-display text-3xl font-medium leading-tight">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            />
          </div>
          <div className="hidden sm:block">
            {features.map((feature, index) => <FeatureStory key={feature.number} {...feature} reverse={index === 1} />)}
          </div>
        </section>


        <section id="community" className="section-shell scroll-mt-20" data-reveal>
          <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-24">
            <div><SectionHeading eyebrow="Community" title={<>One community.<br />Real people.<br /><span className="text-muted-foreground">Useful conversations.</span></>} /><Button asChild variant="brand" size="xl" className="mt-9 w-full sm:w-auto"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Join the WhatsApp community</a></Button><p className="mt-4 text-xs text-muted-foreground">Builders worldwide.</p></div>
            <CommunityCanvas />
          </div>
        </section>

        <section className="border-y border-border py-24 lg:py-32" data-reveal>
          <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10"><SectionHeading eyebrow="Skill network" title="Your next collaborator is probably one connection away." /><NetworkMap /></div>
        </section>

        <section id="partners" className="section-shell scroll-mt-20" data-reveal>
          <SectionHeading eyebrow="Partners" title="Built alongside people who build at scale." />
          <Slider
            className="mt-12 sm:mt-14"
            desktop="sm:grid sm:grid-cols-3 sm:border-y sm:border-border"
            items={[
              <PartnerLink key="a" name="Alpha Orbit" href="https://alphaorbit.site" image={alphaOrbit.url} width={774} height={900} scale="" />,
              <PartnerLink key="b" name="Chaudhary Labs" href="https://chaudharylabs.com" image={chaudharyLabs.url} width={900} height={284} scale="logo-xs" />,
              <PartnerLink key="c" name="Alpha Send" href="https://alphasend.alphaorbit.site" image={alphaSend.url} width={900} height={660} scale="logo-sm" />,
            ]}

          />
        </section>


        <section id="team" className="scroll-mt-20 border-y border-border" data-reveal><div className="section-shell"><SectionHeading eyebrow="Who runs Sklinder" title="Three people keeping it useful." /><Slider className="mt-12 sm:mt-14" desktop="sm:grid sm:gap-px sm:overflow-hidden sm:border sm:border-border sm:bg-border md:grid-cols-3" items={[<LeaderCard key="ca" initials="CA" name="Chaudhary Asim" email="asim@sklinder.com" linkedin="https://www.linkedin.com/in/chaudhary-asim-gondal" />, <LeaderCard key="mt" initials="MT" name="M. Taha Sattar" email="taha@sklinder.com" linkedin="https://www.linkedin.com/in/taha-arain" />, <LeaderCard key="mh" initials="MH" name="M. Hunain Hussain" email="hunain@sklinder.com" linkedin="https://www.linkedin.com/in/muhammad-hunain-hussain-305a90382" />]} /></div></section>

        <section className="section-shell" data-reveal><SectionHeading eyebrow="Community principles" title="Keep it useful." /><div className="mt-14 border-y border-border">{[{ n: "01", t: "Introduce what you bring", d: "One line on your skill or startup when you join. That's how people find you." }, { n: "02", t: "No unsolicited selling", d: "Sklinder is for exchange and collaboration, not blasting services at strangers." }, { n: "03", t: "Close the loop", d: "If a trade or collaboration worked out, say so. It's how the community learns who delivers." }].map((rule) => <article key={rule.n} className="grid gap-5 border-b border-border py-8 last:border-b-0 md:grid-cols-[100px_1fr_1fr] md:items-center"><span className="font-display text-sm text-primary">{rule.n}</span><h3 className="font-display text-2xl font-medium">{rule.t}.</h3><p className="max-w-md text-sm leading-6 text-muted-foreground">{rule.d}</p></article>)}</div></section>

        <section id="contact" className="contact-glow scroll-mt-20 border-y border-border" data-reveal><div className="section-shell grid gap-14 lg:grid-cols-2 lg:gap-24"><SectionHeading eyebrow="Contact" title="Have something worth building?" copy="Got a question, partnership idea, or just want to say hi? We read every message." /><form onSubmit={submit} noValidate className="space-y-6" aria-label="Contact Sklinder"><Field label="Name"><Input name="name" autoComplete="name" /></Field><Field label="Email"><Input name="email" type="email" autoComplete="email" /></Field><Field label="Message"><Textarea name="message" className="min-h-36 resize-none" /></Field>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}{formState === "success" && <p role="status" className="flex items-center gap-2 text-sm text-primary"><Check className="size-4" />Thanks — your message is ready for the Sklinder team.</p>}<Button type="submit" variant="brand" size="xl" className="w-full sm:w-auto"><Send />Send message</Button></form></div></section>

        <section className="final-field relative px-5 py-28 text-center sm:px-8 lg:py-44" data-reveal><div className="relative z-10"><Eyebrow>Start a connection</Eyebrow><h2 className="mx-auto mt-7 max-w-6xl font-display text-[clamp(3.3rem,7.8vw,7.5rem)] font-medium leading-[.9]">Bring a skill.<br /><span className="text-primary">Leave with a collaborator.</span></h2><p className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground">Join Sklinder and find people who can help turn your next idea into something real.</p><div className="mx-auto mt-10 grid max-w-md gap-3 sm:flex sm:max-w-none sm:justify-center"><Button asChild variant="brand" size="xl"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Join the WhatsApp community</a></Button><Button asChild variant="brandOutline" size="xl"><a href={instagram} target="_blank" rel="noreferrer"><Instagram />Follow @sklinder_official</a></Button></div></div></section>
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ scrolled, open, setOpen }: { scrolled: boolean; open: boolean; setOpen: (value: boolean) => void }) {
  const links = [["About", "#about"], ["How it works", "#how"], ["Community", "#community"], ["Partners", "#partners"], ["Contact", "#contact"]];
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-border bg-background/80 backdrop-blur-xl" : "border-transparent bg-transparent"}`}><nav className="relative z-20 mx-auto grid h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-5 sm:px-8 lg:px-10" aria-label="Main navigation"><a href="#top" onClick={() => setOpen(false)} className="logo-enter flex min-w-0 items-center gap-2.5"><img src={logo} alt="Sklinder" width={239} height={286} className="h-8 w-auto shrink-0 object-contain sm:h-9" /><span className="truncate font-display text-base font-semibold uppercase tracking-[.14em] sm:text-lg">Sklinder</span></a><div className="hidden items-center gap-7 lg:flex">{links.map(([label, href]) => <a key={href} href={href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}<Button asChild variant="brand" size="sm"><a href={whatsapp} target="_blank" rel="noreferrer">Join the community</a></Button></div><Button variant="ghost" size="icon" className="size-11 lg:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle navigation">{open ? <X /> : <Menu />}</Button></nav><div aria-hidden={!open} className={`mobile-menu fixed inset-0 z-10 bg-background px-5 pb-8 pt-24 transition-all duration-500 lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0 pointer-events-none"}`}><div className="flex h-full flex-col"><div className="flex-1">{links.map(([label, href], index) => <a key={href} href={href} onClick={() => setOpen(false)} className="group grid min-h-16 grid-cols-[auto_1fr_auto] items-center border-b border-border font-display text-2xl"><span className="mr-5 text-[10px] text-primary">0{index + 1}</span><span>{label}</span><ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" /></a>)}</div><div className="pt-8"><p className="mb-5 max-w-xs text-sm leading-6 text-muted-foreground">Skills in. Collaboration out.</p><Button asChild variant="brand" size="xl" className="w-full uppercase"><a href={whatsapp} target="_blank" rel="noreferrer">Join the community</a></Button></div></div></div></header>;
}

function Eyebrow({ children }: { children: ReactNode }) { return <p className="flex items-center gap-3 font-display text-[10px] font-medium uppercase tracking-[.2em] text-primary"><span className="size-1.5 rounded-full bg-primary" />{children}</p>; }
function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) { return <div><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl">{title}</h2>{copy && <p className="mt-6 max-w-lg leading-7 text-muted-foreground">{copy}</p>}</div>; }

const heroTags = [
  ["Design", "left-[7%] top-[30%]"], ["Code", "left-[77%] top-[26%]"], ["Growth", "left-[60%] top-[64%]"],
  ["AI", "left-[29%] top-[73%]"], ["Strategy", "left-[47%] top-[14%]"], ["Product", "left-[82%] top-[76%]"],
];
function HeroNetwork() { return <div className="pointer-events-none absolute inset-0 opacity-70"><svg className="absolute right-[-8%] top-[10%] hidden h-[74%] w-[66%] lg:block" viewBox="0 0 900 600" fill="none" aria-hidden="true"><g stroke="currentColor" className="text-border"><path d="M90 270L330 90L660 130L820 360L560 520L240 470Z"/><path d="M90 270L560 520M330 90L560 520M660 130L240 470M820 360L330 90"/><path className="network-pulse text-primary" d="M90 270L330 90L660 130L820 360" /></g></svg>{heroTags.map(([tag, position], index) => <span key={tag} className={`float-slow absolute hidden rounded border border-border bg-surface/70 px-2.5 py-1.5 font-display text-[9px] uppercase text-muted-foreground backdrop-blur-md lg:block ${position} float-delay-${index}`}>{tag}</span>)}</div>; }
function MobileHeroNetwork() { const nodes = [["Design", "left-[6%] top-[18%]"], ["Code", "right-[5%] top-[16%]"], ["Growth", "right-[2%] bottom-[18%]"], ["AI", "left-[9%] bottom-[17%]"], ["Startup", "left-1/2 top-[6%] -translate-x-1/2"]]; return <div className="mobile-network hero-visual relative mt-12 h-64 overflow-hidden border-y border-border sm:h-72 lg:hidden"><svg className="absolute inset-0 size-full" viewBox="0 0 350 250" fill="none" aria-hidden="true"><g stroke="currentColor" className="text-border"><path d="M175 125L45 48M175 125L305 45M175 125L300 205M175 125L50 205M175 125L175 28"/><path className="network-pulse text-primary" d="M45 48L175 125L305 45" /></g></svg><span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center border border-primary/50 bg-background font-display text-[10px] text-primary shadow-signal">SKLINDER</span>{nodes.map(([label, position], index) => <span key={label} className={`float-slow absolute border border-border bg-background/90 px-2.5 py-2 font-display text-[9px] uppercase text-muted-foreground ${position} float-delay-${index}`}>{label}</span>)}</div>; }

function FeatureStory({ number, title, description, visual, reverse = false }: { number: string; title: string; description: string; visual: "exchange" | "launch" | "feedback"; reverse?: boolean }) { return <article className="border-t border-border" data-reveal><div className={`mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-24 lg:px-10 lg:py-28 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}><div><span className="font-display text-xs text-primary">{number}</span><h3 className="mt-5 font-display text-[clamp(2rem,9vw,3rem)] font-medium sm:mt-6 sm:text-5xl">{title}</h3><p className="mt-5 max-w-lg text-base leading-7 text-muted-foreground sm:mt-6">{description}</p></div><ProcessVisual type={visual} /></div></article>; }
function ProcessVisual({ type }: { type: "exchange" | "launch" | "feedback" }) {
  if (type === "exchange") return <VisualFrame label="Direct skill exchange"><Node>Designer</Node><Flow vertical label="Landing page" /><Node accent>Developer</Node></VisualFrame>;
  if (type === "launch") return <VisualFrame label="From idea to shipped"><Node>Idea</Node><Flow vertical /><div className="grid grid-cols-3 gap-2"><Node small>Founder</Node><Node small accent>Developer</Node><Node small>Designer</Node></div><Flow vertical /><Node accent>MVP</Node></VisualFrame>;
  return <VisualFrame label="A useful feedback loop"><Node>Pitch</Node><Flow vertical /><Node accent>Feedback</Node><Flow vertical /><Node>Iteration</Node></VisualFrame>;
}
function VisualFrame({ children, label }: { children: ReactNode; label: string }) { return <div className="visual-grid relative flex min-h-[300px] w-full flex-col items-center justify-center overflow-hidden border border-border bg-surface/35 p-5 sm:min-h-[360px] sm:p-8"><span className="absolute left-4 top-4 font-display text-[9px] uppercase tracking-[.16em] text-muted-foreground">{label}</span>{children}</div>; }
function Node({ children, accent = false, small = false }: { children: ReactNode; accent?: boolean; small?: boolean }) { return <span className={`relative z-10 grid min-h-11 place-items-center border bg-background/90 px-5 font-display text-[10px] uppercase ${accent ? "border-primary/50 text-primary" : "border-border text-muted-foreground"} ${small ? "px-2" : "min-w-36"}`}>{children}</span>; }
function Flow({ vertical = false, label }: { vertical?: boolean; label?: string }) { return <div className={`${vertical ? "h-14 w-px" : "h-px w-14"} relative bg-border`}>{label && <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-3 font-display text-[9px] uppercase text-muted-foreground">{label}</span>}<span className="flow-dot absolute left-1/2 top-0 size-1.5 -translate-x-1/2 rounded-full bg-primary" /></div>; }

function CommunityCanvas() { return <div className="community-lines relative min-h-[470px] overflow-hidden border border-border bg-surface/30 p-4 sm:min-h-[520px] sm:p-10"><div className="absolute left-[18%] top-[20%] size-2 rounded-full bg-primary" /><div className="absolute bottom-[21%] right-[18%] size-2 rounded-full bg-primary" /><Chat text="Need a React developer for a startup MVP." tag="Development" className="chat-reveal relative z-10 max-w-[92%] sm:max-w-sm" /><Chat text="I can help with frontend." tag="React" className="chat-reveal relative z-10 ml-auto mt-9 max-w-[85%] sm:mt-14 sm:max-w-xs" accent /><div className="my-8 flex items-center gap-3 sm:hidden"><span className="h-px flex-1 bg-border" /><span className="font-display text-[9px] uppercase tracking-[.14em] text-primary">Skill match · React · Frontend · MVP</span><span className="h-px flex-1 bg-border" /></div><Chat text="Looking for someone strong in branding." tag="Design" className="chat-reveal relative z-10 mt-9 max-w-[92%] sm:mt-14 sm:max-w-sm" /><Chat text="Let's collaborate." tag="Startup" className="chat-reveal relative z-10 ml-auto mt-9 max-w-[78%] sm:mt-12 sm:max-w-xs" accent /></div>; }
function Chat({ text, tag, className, accent = false }: { text: string; tag: string; className?: string; accent?: boolean }) { return <div className={`border p-4 backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 ${accent ? "border-primary/30 bg-primary/5" : "border-border bg-background/80"} ${className ?? ""}`}><p className="text-sm">{text}</p><span className="mt-3 inline-flex items-center gap-2 font-display text-[9px] uppercase tracking-[.12em] text-primary"><span className="size-1 rounded-full bg-primary" />{tag}</span></div>; }

const networkPositions = [
  "left-[17%] top-[10%] sm:left-[10%] sm:top-[54%]",
  "left-[68%] top-[16%] sm:left-[25%] sm:top-[22%]",
  "left-[15%] top-[38%] sm:left-[40%] sm:top-[44%]",
  "left-[84%] top-[45%] sm:left-[51%] sm:top-[16%]",
  "left-[22%] top-[68%] sm:left-[64%] sm:top-[43%]",
  "left-[70%] top-[82%] sm:left-[82%] sm:top-[23%]",
  "left-[90%] top-[56%] sm:left-[90%] sm:top-[56%]",
  "left-[72%] top-[79%] sm:left-[72%] sm:top-[79%]",
  "left-[31%] top-[80%] sm:left-[31%] sm:top-[80%]",
];
function NetworkMap() {
  const [active, setActive] = useState<string | null>(null);
  return <div className="visual-grid relative mt-14 min-h-[500px] overflow-hidden border border-border bg-surface/20 sm:min-h-[560px]" onMouseLeave={() => setActive(null)}><svg className="absolute inset-0 size-full" viewBox="0 0 1000 560" preserveAspectRatio="none" fill="none" aria-hidden="true"><g stroke="currentColor" className="text-border"><path d="M100 300L250 120L400 245L510 90L640 240L820 130L900 310L720 445L310 450Z"/><path d="M100 300L400 245L640 240L900 310M250 120L510 280L720 445M310 450L510 90L820 130"/><path d="M250 120L400 245L510 90L640 240L820 130" className="network-pulse text-primary" /></g></svg><button type="button" aria-label="Sklinder network center" onMouseEnter={() => setActive("SKLINDER")} className="absolute left-1/2 top-1/2 z-10 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center border border-primary/50 bg-background font-display text-[10px] font-medium text-primary shadow-signal sm:size-28 sm:text-xs">SKLINDER</button>{skills.map((skill, index) => <button type="button" key={skill} onMouseEnter={() => setActive(skill)} className={`network-node absolute z-10 -translate-x-1/2 -translate-y-1/2 border bg-background px-2.5 py-2 font-display text-[9px] uppercase transition-all sm:px-3 sm:text-[10px] ${networkPositions[index]} ${active && active !== skill && active !== "SKLINDER" ? "border-border text-muted-foreground/30" : active === skill || active === "SKLINDER" ? "border-primary/60 text-primary" : "border-border text-muted-foreground"}`}>{skill}</button>)}</div>;
}

function PartnerLink({ name, href, image }: { name: string; href: string; image: string }) { return <a href={href} target="_blank" rel="noreferrer" className="group flex h-full min-h-40 items-center justify-center gap-4 border border-border bg-surface/30 p-6 transition-colors hover:bg-surface sm:min-h-36 sm:border-0 sm:border-r sm:bg-transparent sm:last:border-r-0"><img src={image} alt={`${name} logo`} loading="lazy" className="size-14 object-contain opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" /><span className="font-display text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">{name}</span></a>; }
function LeaderCard({ initials, name, email, linkedin }: { initials: string; name: string; email: string; linkedin: string }) { return <article className="group h-full border border-border bg-background p-6 transition-transform duration-300 hover:-translate-y-0.5 sm:border-0 sm:p-8"><div className="mb-10 grid size-12 place-items-center border border-border bg-surface font-display text-sm font-medium text-primary transition-colors group-hover:border-primary/40">{initials}</div><p className="text-[10px] uppercase tracking-[.16em] text-primary">Leader</p><h3 className="mt-3 font-display text-xl font-medium">{name}</h3><a className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-primary" href={`mailto:${email}`}>{email}</a><Button asChild variant="brandOutline" size="sm" className="mt-6"><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn</a></Button></article>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block font-display text-[10px] font-medium uppercase tracking-[.16em] text-muted-foreground">{label}<div className="mt-2">{children}</div></label>; }
function FooterColumn({ title, children }: { title: string; children: ReactNode }) { return <div className="footer-reveal border-t border-border pt-7 lg:border-t-0 lg:pt-0"><h3 className="font-display text-[10px] font-medium uppercase tracking-[.18em] text-primary">{title}</h3><div className="mt-5 flex flex-col items-start gap-3 text-sm text-muted-foreground">{children}</div></div>; }
function Footer() { const explore = [["About", "#about"], ["How it works", "#how"], ["Community", "#community"], ["Partners", "#partners"], ["Contact", "#contact"]]; return <footer className="border-t border-border bg-surface/30 px-5 sm:px-8 lg:px-10" data-reveal><div className="mx-auto max-w-7xl py-16 lg:py-20"><div className="grid gap-10 lg:grid-cols-[1.1fr_.6fr_.7fr_.75fr_.8fr_.7fr] lg:gap-14"><div className="footer-reveal"><div className="flex items-center gap-2.5"><img src={logo} alt="" width={239} height={286} className="h-9 w-auto object-contain" /><span className="font-display text-base font-semibold uppercase">Sklinder</span></div><p className="mt-4 font-display text-sm">Skills in. Collaboration out.</p><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Sklinder connects builders, freelancers and founders who want to exchange skills, collaborate and build what&apos;s next.</p><div className="mt-8 border-y border-border py-7 lg:hidden"><p className="font-display text-3xl font-medium leading-[1.05]">Bring a skill.<br /><span className="text-primary">Leave with a collaborator.</span></p><Button asChild variant="brand" size="xl" className="mt-6 w-full"><a href={whatsapp} target="_blank" rel="noreferrer">Join the community</a></Button></div></div><FooterColumn title="Explore">{explore.map(([label, href]) => <a key={href} href={href} className="min-h-6 transition-colors hover:text-foreground">{label}</a>)}</FooterColumn><FooterColumn title="Community"><a href={whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Join WhatsApp</a><a href={instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Follow Instagram</a><a href="mailto:hello@sklinder.com?subject=Become%20a%20Sklinder%20Partner" className="transition-colors hover:text-foreground">Become a Partner</a></FooterColumn><FooterColumn title="Get in touch"><a href="mailto:hello@sklinder.com" className="transition-colors hover:text-foreground">hello@sklinder.com</a></FooterColumn><FooterColumn title="WhatsApp"><span className="text-xs uppercase tracking-[.16em] text-muted-foreground/70">Saudi Arabia</span><a href="https://wa.me/966511041390" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">+966 51 104 1390</a><span className="mt-2 text-xs uppercase tracking-[.16em] text-muted-foreground/70">Pakistan</span><a href="https://wa.me/923092122883" target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">+92 309 2122 883</a></FooterColumn><FooterColumn title="Social"><div className="mt-4 flex gap-5"><a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center border border-border transition-colors hover:border-primary/50 hover:text-primary"><Instagram className="size-4" /></a><a href="#team" aria-label="LinkedIn" className="grid size-11 place-items-center border border-border transition-colors hover:border-primary/50 hover:text-primary"><Linkedin className="size-4" /></a><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center border border-border transition-colors hover:border-primary/50 hover:text-primary"><MessageCircle className="size-4" /></a></div></FooterColumn></div><div className="footer-reveal mt-14 hidden border-y border-border py-9 lg:grid lg:grid-cols-[1fr_auto] lg:items-center"><p className="font-display text-4xl font-medium leading-none">Bring a skill. <span className="text-primary">Leave with a collaborator.</span></p><Button asChild variant="brand" size="xl"><a href={whatsapp} target="_blank" rel="noreferrer">Join the community</a></Button></div><div className="mt-10 grid gap-5 border-t border-border pt-7 text-xs text-muted-foreground sm:grid-cols-[1fr_auto] sm:items-center"><div><p>© 2026 Sklinder</p><p className="mt-1">Skills in. Collaboration out.</p></div><div className="flex gap-6"><a href="/privacy" className="transition-colors hover:text-foreground">Privacy</a><a href="/terms" className="transition-colors hover:text-foreground">Terms</a></div></div></div></footer>; }
const marqueeItems = ["Developers", "Designers", "Founders", "Marketers", "Creators", "Strategists", "Builders"];
function Marquee() {
  return (
    <section aria-label="Built for people who make things" className="border-y border-border bg-surface/40 py-10 sm:py-12">
      <p className="mb-7 flex items-center justify-center gap-3 px-5 text-center font-display text-[11px] font-medium uppercase tracking-[.22em] text-muted-foreground sm:text-xs">
        <span className="text-primary">&#10022;</span>Built for people who make things<span className="text-primary">&#10022;</span>
      </p>
      <div className="marquee-mask relative w-full overflow-hidden">
        <div className="marquee-ltr flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">
              {marqueeItems.map((item) => (
                <span key={`${copy}-${item}`} className="flex items-center whitespace-nowrap font-display text-base text-foreground/70 sm:text-lg">
                  {item}
                  <span className="mx-6 text-sm text-primary/70 sm:mx-9">&#10022;</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Slider({ items, desktop, className = "" }: { items: ReactNode[]; desktop: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const onScroll = () => {
    const el = ref.current;
    if (!el) return;
    const step = el.scrollWidth / items.length;
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / step))));
  };
  const goTo = (index: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollTo({ left: (el.scrollWidth / items.length) * index, behavior: "smooth" });
  };
  return (
    <div className={className}>
      <div ref={ref} onScroll={onScroll} className={`no-bar -mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 pr-5 sm:mr-0 sm:snap-none sm:gap-0 sm:overflow-visible sm:pb-0 sm:pr-0 ${desktop}`}>
        {items.map((item, index) => <div key={index} className="w-[83%] shrink-0 snap-start sm:contents">{item}</div>)}
      </div>
      <div className="mt-5 flex justify-center gap-2 sm:hidden">
        {items.map((_, index) => (
          <button key={index} type="button" aria-label={`Go to card ${index + 1}`} onClick={() => goTo(index)} className="grid h-6 w-6 place-items-center">
            <span className={`block h-1.5 rounded-full transition-all duration-300 ${index === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/35"}`} />
          </button>
        ))}
      </div>
    </div>
  );
}
