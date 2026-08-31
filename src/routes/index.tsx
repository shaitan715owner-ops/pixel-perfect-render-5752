import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  FolderKanban,
  Instagram,
  Linkedin,
  MessageCircle,
  MessagesSquare,
  Search,
  Send,
  Sparkles,
  UserRound,
  UsersRound,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import logoAsset from "@/assets/sklinder-logo.png.asset.json";
import alphaOrbit from "@/assets/alpha-orbit.png.asset.json";
import chaudharyLabs from "@/assets/chaudhary-labs.png.asset.json";
import alphaSend from "@/assets/alpha-send.png.asset.json";
import lightningAsset from "@/assets/lightning-icon.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sklinder — Professional Networking & Matching App" },
      { name: "description", content: "Discover the right people, projects, opportunities and services with Sklinder, the professional networking and compatibility app." },
      { property: "og:title", content: "Sklinder — Find Your Professional Fit" },
      { property: "og:description", content: "Discover people. Find opportunities. Build together." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const whatsapp = "https://chat.whatsapp.com/HjaKxj8cAJZ41Z6cvrCq06?s=cl&p=a&mlu=0";
const instagram = "https://instagram.com/sklinder_official";
const logo = logoAsset.url;
const appTarget = "#app";

const productFeatures = [
  { icon: Search, title: "Discover people", copy: "Find people based on skills, goals, interests and professional intent." },
  { icon: Sparkles, title: "Match with purpose", copy: "Surface relevant professional compatibility instead of random connections." },
  { icon: UsersRound, title: "Build connections", copy: "Connect with people you actually want to work with." },
  { icon: MessagesSquare, title: "Chat", copy: "Continue conversations directly inside Sklinder." },
  { icon: FolderKanban, title: "Find projects & opportunities", copy: "Discover collaborations, hiring opportunities and people looking to build." },
  { icon: Wrench, title: "Offer your skills", copy: "Turn your expertise into a service people can discover." },
  { icon: CirclePlus, title: "Share & create", copy: "Create posts, projects, opportunities, services and groups." },
  { icon: UserRound, title: "Build your profile", copy: "Show your skills, experience, work and what you are looking for." },
] as const;

const createTypes = [
  ["POST", "Share an update, idea, question, win or launch."],
  ["PROJECT", "Build something and find people to work with."],
  ["OPPORTUNITY", "Find collaborators, co-founders, hires or freelance opportunities."],
  ["SERVICE", "Offer professional skills with clear deliverables."],
  ["GROUP", "Build a focused community around an interest."],
] as const;

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formState, setFormState] = useState<"idle" | "success">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible"));
    }, { threshold: 0.1 });
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
              <div className="hero-eyebrow"><Eyebrow>Professional networking & matching app</Eyebrow></div>
              <h1 className="hero-title mt-7 max-w-[1080px] font-display text-[clamp(2.8rem,12vw,4rem)] font-medium leading-[.94] tracking-normal sm:text-7xl lg:text-[clamp(3.4rem,8.2vw,7.3rem)] lg:leading-[.88]">
                Meet the right people.<br /><span className="text-primary">Build what matters.</span>
              </h1>
              <p className="hero-copy mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-8 sm:text-lg">Sklinder is a professional networking and compatibility platform that helps you discover the right people, projects, opportunities and services — and turn connections into real collaboration.</p>
              <div className="hero-actions mt-8 grid gap-3 sm:mt-9 sm:flex">
                <Button asChild variant="brand" size="xl"><a href={appTarget}>Explore Sklinder<ArrowDown /></a></Button>
                <Button asChild variant="brandOutline" size="xl"><a href="#download">Get the App<ArrowRight /></a></Button>
              </div>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="hero-trust mt-5 inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"><MessageCircle className="size-3.5" />Join the WhatsApp Community</a>
              <MobileHeroNetwork />
            </div>
          </div>
        </section>

        <Marquee />

        <section id="about" className="section-shell scroll-mt-20" data-reveal>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-24">
            <SectionHeading eyebrow="What is Sklinder?" title={<>Your network should help you <span className="text-primary">move forward.</span></>} />
            <div className="self-end border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">Sklinder brings people, professional intent and real opportunities into one focused app.</p>
              <p className="mt-5 leading-7 text-muted-foreground">Discover compatibility before you connect, then chat, share, create and collaborate without losing momentum.</p>
            </div>
          </div>
          <Slider className="mt-16 sm:mt-20" desktop="sm:grid sm:grid-cols-3 sm:gap-0 sm:border-y sm:border-border" items={([
            ["01", "Build your profile", "Show who you are and what you want to build."],
            ["02", "Discover your fit", "Explore relevant people, projects and opportunities."],
            ["03", "Connect & collaborate", "Match, chat and start building together."],
          ] as const).map(([n, a, b]) => <StepCard key={n} number={n} title={a} copy={b} />)} />

        </section>

        <section id="app" className="scroll-mt-20 border-y border-border bg-surface/20" data-reveal>
          <div className="section-shell">
            <div className="grid gap-10 lg:grid-cols-[.78fr_1.22fr] lg:items-end lg:gap-20">
              <SectionHeading eyebrow="The Sklinder app" title={<>A real product for <span className="text-primary">real professional momentum.</span></>} copy="Feed, discover, match, search, chat and create — one mobile-first place for the people and work that matter." />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {["Discover", "Match", "Create", "Chat"].map((label) => <div key={label} className="border-t border-primary/50 pt-3 font-display text-xs uppercase text-muted-foreground">{label}</div>)}
              </div>
            </div>
            <AppShowcase />
          </div>
        </section>

        <section id="features" className="section-shell scroll-mt-20" data-reveal>
          <SectionHeading eyebrow="What can you do on Sklinder?" title="Everything you need to find your fit and move." />
          <Slider className="mt-12 sm:mt-14" desktop="sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-hidden sm:border sm:border-border sm:bg-border lg:grid-cols-4" items={productFeatures.map((feature) => <FeatureCard key={feature.title} {...feature} />)} />
        </section>

        <section id="discover" className="border-y border-border" data-reveal>
          <div className="section-shell grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-24">
            <div><SectionHeading eyebrow="Discover & match" title={<>Don&apos;t just network.<br /><span className="text-primary">Find your fit.</span></>} copy="Sklinder helps you discover people based on compatibility, intent, skills and what you are actually trying to achieve." /></div>
            <DiscoverMockup />
          </div>
        </section>

        <section id="profile" className="section-shell scroll-mt-20" data-reveal>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-center lg:gap-24">
            <ProfileMockup />
            <div className="lg:order-2"><SectionHeading eyebrow="Professional profiles" title={<>Your professional identity, <span className="text-primary">in one place.</span></>} copy="More than a social feed. Show your experience, skills, projects, services, availability, goals and the kinds of collaboration you want." /><div className="mt-8 flex flex-wrap gap-2">{["About", "Skills", "Experience", "Projects", "Services", "Availability", "Goals"].map((item) => <span key={item} className="border border-border px-3 py-2 text-xs text-muted-foreground">{item}</span>)}</div></div>
          </div>
        </section>

        <section id="create" className="border-y border-border bg-surface/20" data-reveal>
          <div className="section-shell">
            <SectionHeading eyebrow="Create on Sklinder" title={<>Create something worth <span className="text-primary">connecting around.</span></>} copy="Put an idea, need or offer into the network — in the format that fits it." />
            <div className="mt-12 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">{createTypes.map(([title, copy], index) => <article key={title} className="card-lift min-h-56 bg-background p-6"><span className="font-display text-xs text-primary">0{index + 1}</span><h3 className="mt-12 font-display text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div>
          </div>
        </section>

        <section className="section-shell" data-reveal>
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
            <SectionHeading eyebrow="Why Sklinder" title="Compatibility before connection." copy="Professional networking works better when context comes first." />
            <div className="border-y border-border">{[
              ["01", "Intent, not noise", "See what people are building, offering and looking for before you connect."],
              ["02", "People and opportunities", "Move between profiles, projects, services and opportunities without leaving the network."],
              ["03", "Connection with momentum", "Match, chat and create around a clear reason to work together."],
            ].map(([n, title, copy]) => <article key={n} className="grid gap-4 border-b border-border py-7 last:border-b-0 sm:grid-cols-[56px_1fr]"><span className="font-display text-xs text-primary">{n}</span><div><h3 className="font-display text-xl font-medium">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div></article>)}</div>
          </div>
        </section>

        <section id="download" className="final-field relative scroll-mt-20 border-y border-border px-5 py-28 text-center sm:px-8 lg:py-40" data-reveal>
          <div className="relative z-10"><EyebrowCentered>Get Sklinder</EyebrowCentered><h2 className="mx-auto mt-7 max-w-6xl font-display text-[clamp(3.2rem,7.8vw,7.2rem)] font-medium leading-[.9]">Ready to find<br /><span className="text-primary">your people?</span></h2><p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground">Join Sklinder and discover people, projects, opportunities and connections built around what you are trying to achieve.</p><div className="mx-auto mt-10 grid max-w-md gap-3 sm:flex sm:max-w-none sm:justify-center"><Button asChild variant="brand" size="xl"><a href={appTarget}>Get Sklinder<ArrowRight /></a></Button><Button asChild variant="brandOutline" size="xl"><a href={appTarget}>Explore the App</a></Button></div><p className="mt-4 text-xs text-muted-foreground">App download links coming soon.</p></div>
        </section>

        <section id="community" className="section-shell scroll-mt-20" data-reveal>
          <div className="grid gap-10 border border-border bg-surface/30 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-14">
            <div><Eyebrow>Community extension</Eyebrow><h2 className="mt-5 font-display text-3xl font-medium sm:text-4xl">Stay connected with the Sklinder community.</h2><p className="mt-4 max-w-2xl leading-7 text-muted-foreground">Join the Sklinder WhatsApp community for updates, announcements, discussions and community conversations.</p></div>
            <Button asChild variant="brandOutline" size="xl" className="w-full lg:w-auto"><a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Join WhatsApp Community</a></Button>
          </div>
        </section>

        <section id="partners" className="section-shell scroll-mt-20 border-t border-border" data-reveal>
          <SectionHeading eyebrow="Partners" title="Built alongside people who build at scale." />
          <Slider className="mt-12 sm:mt-14" desktop="sm:grid sm:grid-cols-3 sm:border-y sm:border-border" items={[
            <PartnerLink key="a" name="Alpha Orbit" href="https://alphaorbit.site" image={alphaOrbit.url} width={774} height={900} scale="" />,
            <PartnerLink key="b" name="Chaudhary Labs" href="https://chaudharylabs.com" image={chaudharyLabs.url} width={900} height={284} scale="logo-xs" />,
            <PartnerLink key="c" name="Alpha Send" href="https://alphasend.alphaorbit.site" image={alphaSend.url} width={900} height={660} scale="logo-sm" />,
          ]} />
        </section>

        <section id="team" className="scroll-mt-20 border-y border-border" data-reveal><div className="section-shell"><SectionHeading eyebrow="Who runs Sklinder" title="Three people building the network." /><Slider className="mt-12 sm:mt-14" desktop="sm:grid sm:gap-px sm:overflow-hidden sm:border sm:border-border sm:bg-border md:grid-cols-3" items={[<LeaderCard key="ca" initials="CA" name="Chaudhary Asim" email="asim@sklinder.com" linkedin="https://www.linkedin.com/in/chaudhary-asim-gondal" />, <LeaderCard key="mt" initials="MT" name="M. Taha Sattar" email="taha@sklinder.com" linkedin="https://www.linkedin.com/in/taha-arain" />, <LeaderCard key="mh" initials="MH" name="M. Hunain Hussain" email="hunain@sklinder.com" linkedin="https://www.linkedin.com/in/muhammad-hunain-hussain-305a90382" />]} /></div></section>

        <section id="contact" className="contact-glow scroll-mt-20 border-b border-border" data-reveal><div className="section-shell grid gap-14 lg:grid-cols-2 lg:gap-24"><SectionHeading eyebrow="Contact" title="Have something worth building?" copy="Got a question, partnership idea, or just want to say hi? We read every message." /><form onSubmit={submit} noValidate className="space-y-6" aria-label="Contact Sklinder"><Field label="Name"><Input name="name" autoComplete="name" /></Field><Field label="Email"><Input name="email" type="email" autoComplete="email" /></Field><Field label="Message"><Textarea name="message" className="min-h-36 resize-none" /></Field>{error && <p role="alert" className="text-sm text-destructive">{error}</p>}{formState === "success" && <p role="status" className="flex items-center gap-2 text-sm text-primary"><Check className="size-4" />Thanks — your message is ready for the Sklinder team.</p>}<Button type="submit" variant="brand" size="xl" className="w-full sm:w-auto"><Send />Send message</Button></form></div></section>
      </main>
      <Footer />
    </div>
  );
}

function Navbar({ scrolled, open, setOpen }: { scrolled: boolean; open: boolean; setOpen: (value: boolean) => void }) {
  const links = [["The App", "#app"], ["Features", "#features"], ["Discover", "#discover"], ["Create", "#create"], ["Community", "#community"]];
  return <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled || open ? "border-border bg-background/85 shadow-[0_1px_0_0_color-mix(in_oklab,var(--border)_60%,transparent)] backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
    <nav className="relative z-20 mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-10 lg:hidden" aria-label="Main navigation"><button type="button" onClick={() => setOpen(!open)} aria-expanded={open} className="justify-self-start font-display text-[10px] font-medium uppercase tracking-[.28em] text-foreground/80 transition-colors hover:text-foreground">{open ? "Close" : "Menu"}</button><a href="#top" onClick={() => setOpen(false)} className="justify-self-center"><img src={logo} alt="Sklinder" width={1536} height={1024} className="h-9 w-auto object-contain" /></a><a href={appTarget} aria-label="Explore Sklinder app" className="justify-self-end"><img src={lightningAsset.url} alt="" className="h-7 w-auto object-contain" /></a></nav>
    <nav className="relative z-20 mx-auto hidden h-16 max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center px-10 lg:grid" aria-label="Main navigation"><a href="#top" className="logo-enter flex min-w-0 items-center"><img src={logo} alt="Sklinder" width={1536} height={1024} className="h-14 w-auto shrink-0 object-contain" /></a><div className="flex items-center gap-7">{links.map(([label, href]) => <a key={href} href={href} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}<Button asChild variant="brand" size="sm"><a href="#download">Get Sklinder</a></Button></div></nav>
    <div aria-hidden={!open} className={`fixed inset-0 z-10 bg-background px-5 pb-8 pt-24 transition-all duration-500 sm:px-10 lg:hidden ${open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible -translate-y-4 opacity-0"}`}><div className="mx-auto flex h-full max-w-7xl flex-col"><div className="flex-1">{links.map(([label, href], index) => <a key={href} href={href} onClick={() => setOpen(false)} className="group grid min-h-16 grid-cols-[auto_1fr_auto] items-center border-b border-border font-display text-2xl"><span className="mr-5 text-[10px] text-primary">0{index + 1}</span><span>{label}</span><ArrowRight className="size-4 text-muted-foreground" /></a>)}</div><Button asChild variant="brand" size="xl" className="mt-8 w-full"><a href="#download" onClick={() => setOpen(false)}>Get Sklinder</a></Button></div></div>
  </header>;
}

function Eyebrow({ children }: { children: ReactNode }) { return <p className="flex items-center gap-3 font-display text-[10px] font-medium uppercase tracking-[.2em] text-primary"><span className="size-1.5 rounded-full bg-primary" />{children}</p>; }
function EyebrowCentered({ children }: { children: ReactNode }) { return <div className="flex justify-center"><Eyebrow>{children}</Eyebrow></div>; }
function SectionHeading({ eyebrow, title, copy }: { eyebrow: string; title: ReactNode; copy?: string }) { return <div><Eyebrow>{eyebrow}</Eyebrow><h2 className="mt-6 max-w-4xl font-display text-4xl font-medium leading-[1.02] sm:text-5xl lg:text-6xl">{title}</h2>{copy && <p className="mt-6 max-w-xl leading-7 text-muted-foreground">{copy}</p>}</div>; }

const heroTags = [["People", "left-[7%] top-[30%]"], ["Projects", "left-[77%] top-[26%]"], ["96% Match", "left-[60%] top-[64%]"], ["Services", "left-[29%] top-[73%]"], ["Opportunities", "left-[47%] top-[14%]"], ["Chat", "left-[82%] top-[76%]"]];
function HeroNetwork() { return <div className="pointer-events-none absolute inset-0 opacity-70"><svg className="absolute right-[-8%] top-[10%] hidden h-[74%] w-[66%] lg:block" viewBox="0 0 900 600" fill="none" aria-hidden="true"><g stroke="currentColor" className="text-border"><path d="M90 270L330 90L660 130L820 360L560 520L240 470Z"/><path d="M90 270L560 520M330 90L560 520M660 130L240 470M820 360L330 90"/><path className="network-pulse text-primary" d="M90 270L330 90L660 130L820 360" /></g></svg>{heroTags.map(([tag, position], index) => <span key={tag} className={`float-slow absolute hidden rounded border border-border bg-surface/70 px-2.5 py-1.5 font-display text-[9px] uppercase text-muted-foreground backdrop-blur-md lg:block ${position} float-delay-${index}`}>{tag}</span>)}</div>; }
function MobileHeroNetwork() { const nodes = [["People", "left-[6%] top-[18%]"], ["Projects", "right-[5%] top-[16%]"], ["Services", "right-[2%] bottom-[18%]"], ["Chat", "left-[9%] bottom-[17%]"], ["Match", "left-1/2 top-[6%] -translate-x-1/2"]]; return <div className="mobile-network hero-visual relative mt-12 h-64 overflow-hidden border-y border-border sm:h-72 lg:hidden"><svg className="absolute inset-0 size-full" viewBox="0 0 350 250" fill="none" aria-hidden="true"><g stroke="currentColor" className="text-border"><path d="M175 125L45 48M175 125L305 45M175 125L300 205M175 125L50 205M175 125L175 28"/><path className="network-pulse text-primary" d="M45 48L175 125L305 45" /></g></svg><span className="absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center border border-primary/50 bg-background font-display text-[10px] text-primary shadow-signal">SKLINDER</span>{nodes.map(([label, position], index) => <span key={label} className={`float-slow absolute border border-border bg-background/90 px-2.5 py-2 font-display text-[9px] uppercase text-muted-foreground ${position} float-delay-${index}`}>{label}</span>)}</div>; }

function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) { return <div className={`mx-auto w-full max-w-[310px] rounded-[2rem] border border-border bg-background p-2 shadow-lift ${className}`}><div className="overflow-hidden rounded-[1.55rem] border border-border bg-card"><div className="flex items-center justify-between border-b border-border px-4 py-3"><img src={logo} alt="" className="h-5 w-auto" /><div className="flex gap-2 text-muted-foreground"><Search className="size-3.5" /><Bell className="size-3.5" /></div></div>{children}<div className="grid grid-cols-5 border-t border-border px-3 py-3 text-muted-foreground"><span className="mx-auto size-1.5 rounded-full bg-primary" />{[0,1,2,3].map((i) => <span key={i} className="mx-auto size-1.5 rounded-full bg-muted-foreground/30" />)}</div></div></div>; }
function AppShowcase() { return <div className="mt-14 grid items-end gap-5 md:grid-cols-3 lg:gap-8"><PhoneFrame className="md:translate-y-8"><div className="p-4"><p className="text-xs text-muted-foreground">Good morning, Maya</p><h3 className="mt-1 font-display text-xl font-medium">Your network</h3><div className="mt-4 border border-border bg-surface p-4"><p className="text-[10px] uppercase text-primary">Featured project</p><p className="mt-2 font-display text-base">Climate data workspace</p><p className="mt-2 text-xs leading-5 text-muted-foreground">Looking for a product designer and frontend builder.</p></div><div className="mt-3 grid grid-cols-2 gap-2"><MiniStat n="12" label="Connections" /><MiniStat n="5" label="New matches" /></div></div></PhoneFrame><PhoneFrame className="relative z-10 md:max-w-[340px]"><div className="p-4"><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase text-primary">Discover</p><h3 className="mt-1 font-display text-xl">Your next fit</h3></div><span className="rounded-full border border-primary/40 px-2 py-1 text-[10px] text-primary">96% match</span></div><div className="mt-4 rounded-xl border border-border bg-surface p-4"><div className="grid size-12 place-items-center rounded-full bg-primary font-display text-primary-foreground">AK</div><h4 className="mt-4 font-display text-lg">Ayaan Khan</h4><p className="text-xs text-muted-foreground">Product strategist · Fintech</p><div className="mt-4 flex flex-wrap gap-1.5">{["Strategy", "Growth", "AI"].map((x) => <span key={x} className="rounded-full border border-border px-2 py-1 text-[9px]">{x}</span>)}</div></div><div className="mt-4 grid grid-cols-2 gap-2"><Button variant="brandOutline" size="sm">Pass</Button><Button variant="brand" size="sm">Connect</Button></div></div></PhoneFrame><PhoneFrame className="md:translate-y-8"><div className="p-4"><p className="text-[10px] uppercase text-primary">Create</p><h3 className="mt-1 font-display text-xl">Start something</h3><div className="mt-4 space-y-2">{createTypes.slice(0,4).map(([title], index) => <div key={title} className="flex items-center gap-3 border border-border bg-surface px-3 py-3"><span className="grid size-7 place-items-center rounded-full bg-primary/10 text-[10px] text-primary">0{index + 1}</span><span className="font-display text-xs">{title}</span><ChevronRight className="ml-auto size-3.5 text-muted-foreground" /></div>)}</div></div></PhoneFrame></div>; }
function MiniStat({ n, label }: { n: string; label: string }) { return <div className="border border-border p-3"><strong className="font-display text-xl text-primary">{n}</strong><p className="mt-1 text-[9px] uppercase text-muted-foreground">{label}</p></div>; }
function StepCard({ number, title, copy }: { number: string; title: string; copy: string }) { return <article className="card-lift flex h-full min-h-56 flex-col justify-between border border-border bg-surface/30 p-6 sm:border-0 sm:border-r sm:bg-transparent sm:p-8 sm:last:border-r-0"><strong className="font-display text-5xl font-light text-primary">{number}</strong><div className="mt-10"><h3 className="font-display text-lg font-medium uppercase">{title}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{copy}</p></div></article>; }
function FeatureCard({ icon: Icon, title, copy }: { icon: typeof Search; title: string; copy: string }) { return <article className="card-lift flex h-full min-h-60 flex-col border border-border bg-background p-6 sm:border-0"><Icon className="size-5 text-primary" /><h3 className="mt-auto pt-12 font-display text-xl font-medium">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>; }
function DiscoverMockup() { return <div className="visual-grid relative min-h-[560px] overflow-hidden border border-border bg-surface/30 p-5 sm:p-10"><div className="absolute inset-x-5 top-8 mx-auto max-w-sm -rotate-3 rounded-2xl border border-border bg-background/40 p-5 opacity-40 sm:inset-x-10" aria-hidden="true"><div className="h-72" /></div><div className="relative mx-auto max-w-sm rounded-2xl border border-primary/40 bg-background p-5 shadow-glow sm:p-7"><div className="flex items-start justify-between"><div className="grid size-16 place-items-center rounded-full bg-primary font-display text-xl text-primary-foreground">ZA</div><span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 font-display text-xs text-primary">96% MATCH</span></div><h3 className="mt-7 font-display text-3xl font-medium">Zara Ahmed</h3><p className="mt-1 text-sm text-muted-foreground">Product designer · Community builder</p><p className="mt-5 text-sm leading-6 text-muted-foreground">Building tools that help independent teams find focus and ship better work.</p><div className="mt-6 flex flex-wrap gap-2">{["Product", "Design", "Startups", "Community"].map((tag) => <span key={tag} className="rounded-full border border-border px-3 py-1.5 text-[10px]">{tag}</span>)}</div><Button variant="brandOutline" size="sm" className="mt-7 w-full">View profile</Button><div className="mt-3 grid grid-cols-2 gap-3"><Button variant="brandOutline"><ChevronLeft />Pass</Button><Button variant="brand">Connect<ChevronRight /></Button></div></div></div>; }
function ProfileMockup() { return <div className="visual-grid border border-border bg-surface/30 p-5 sm:p-10"><div className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-border bg-background"><div className="h-24 bg-primary/10" /><div className="px-5 pb-6 sm:px-7"><div className="-mt-10 grid size-20 place-items-center rounded-full border-4 border-background bg-primary font-display text-xl text-primary-foreground">MA</div><div className="mt-4 flex items-start justify-between gap-4"><div><h3 className="font-display text-2xl font-medium">Maya Ali</h3><p className="mt-1 text-sm text-muted-foreground">Founder · Product & Growth</p></div><span className="rounded-full border border-primary/40 px-3 py-1 text-[10px] text-primary">Available</span></div><p className="mt-5 text-sm leading-6 text-muted-foreground">Building products at the intersection of community, talent and meaningful work.</p><div className="mt-6 grid grid-cols-3 gap-2"><MiniStat n="28" label="Connections" /><MiniStat n="4" label="Projects" /><MiniStat n="3" label="Services" /></div><div className="mt-6 border-t border-border pt-5"><p className="text-[10px] uppercase text-primary">Skills</p><div className="mt-3 flex flex-wrap gap-2">{["Product", "Strategy", "Growth", "Research"].map((tag) => <span key={tag} className="rounded-full bg-surface px-3 py-1.5 text-[10px]">{tag}</span>)}</div></div><div className="mt-6 border-t border-border pt-5"><p className="text-[10px] uppercase text-primary">Looking for</p><p className="mt-2 text-sm">Technical collaborators for an early-stage product.</p></div></div></div></div>; }

function PartnerLink({ name, href, image, width, height, scale }: { name: string; href: string; image: string; width: number; height: number; scale: string }) { return <a href={href} target="_blank" rel="noreferrer" className="partner-card group flex h-full min-h-40 flex-col items-center justify-center gap-5 border border-border bg-surface/30 p-7 hover:bg-surface sm:min-h-36 sm:border-0 sm:border-r sm:bg-transparent sm:last:border-r-0"><span className="logo-slot"><img src={image} alt={`${name} logo`} width={width} height={height} loading="lazy" decoding="async" className={scale} /></span><span className="font-display text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">{name}</span></a>; }
function LeaderCard({ initials, name, email, linkedin }: { initials: string; name: string; email: string; linkedin: string }) { return <article className="card-lift group h-full border border-border bg-background p-6 sm:border-0 sm:p-8"><div className="mb-10 grid size-12 place-items-center border border-border bg-surface font-display text-sm font-medium text-primary">{initials}</div><p className="text-[10px] uppercase tracking-[.16em] text-primary">Leader</p><h3 className="mt-3 font-display text-xl font-medium">{name}</h3><a className="mt-2 block text-sm text-muted-foreground transition-colors hover:text-primary" href={`mailto:${email}`}>{email}</a><Button asChild variant="brandOutline" size="sm" className="mt-6"><a href={linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn</a></Button></article>; }
function Field({ label, children }: { label: string; children: ReactNode }) { return <label className="block font-display text-[10px] font-medium uppercase tracking-[.16em] text-muted-foreground">{label}<div className="mt-2">{children}</div></label>; }
function FooterColumn({ title, children }: { title: string; children: ReactNode }) { return <div className="footer-reveal border-t border-border pt-7 lg:border-t-0 lg:pt-0"><h3 className="font-display text-[10px] font-medium uppercase tracking-[.18em] text-primary">{title}</h3><div className="mt-5 flex flex-col items-start gap-3 text-sm text-muted-foreground">{children}</div></div>; }
function Footer() { const explore = [["The App", "#app"], ["Features", "#features"], ["Discover", "#discover"], ["Create", "#create"], ["Community", "#community"]]; return <footer className="border-t border-border bg-surface/30 px-5 sm:px-8 lg:px-10" data-reveal><div className="mx-auto max-w-7xl py-16 lg:py-20"><div className="grid gap-10 lg:grid-cols-[1.2fr_.7fr_.7fr_.8fr] lg:gap-14"><div className="footer-reveal"><img src={logo} alt="Sklinder" width={1536} height={1024} className="h-16 w-auto object-contain" /><p className="mt-4 font-display text-sm">Discover people. Find opportunities. Build together.</p><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">The professional networking and matching app built around compatibility, intent and real collaboration.</p></div><FooterColumn title="Explore">{explore.map(([label, href]) => <a key={href} href={href} className="transition-colors hover:text-foreground">{label}</a>)}</FooterColumn><FooterColumn title="Community"><a href={whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Join WhatsApp</a><a href={instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-foreground">Follow Instagram</a><a href="mailto:hello@sklinder.com?subject=Become%20a%20Sklinder%20Partner" className="transition-colors hover:text-foreground">Become a Partner</a></FooterColumn><FooterColumn title="Get in touch"><a href="mailto:hello@sklinder.com" className="transition-colors hover:text-foreground">hello@sklinder.com</a><div className="mt-3 flex gap-3"><a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-11 place-items-center border border-border hover:text-primary"><Instagram className="size-4" /></a><a href="#team" aria-label="LinkedIn" className="grid size-11 place-items-center border border-border hover:text-primary"><Linkedin className="size-4" /></a><a href={whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid size-11 place-items-center border border-border hover:text-primary"><MessageCircle className="size-4" /></a></div></FooterColumn></div><div className="mt-12 grid gap-5 border-t border-border pt-7 text-xs text-muted-foreground sm:grid-cols-[1fr_auto]"><div><p>© 2026 Sklinder</p><p className="mt-1">Compatibility before connection.</p></div><div className="flex gap-6"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div></div></footer>; }

const marqueeItems = ["People", "Projects", "Opportunities", "Services", "Connections", "Ideas", "Communities"];
function Marquee() { return <section aria-label="Discover people, projects and opportunities" className="border-y border-border bg-surface/40 py-10 sm:py-12"><p className="mb-7 flex items-center justify-center gap-3 px-5 text-center font-display text-[11px] font-medium uppercase tracking-[.22em] text-muted-foreground"><span className="text-primary">✦</span>Built for professional momentum<span className="text-primary">✦</span></p><div className="marquee-mask relative w-full overflow-hidden"><div className="marquee-ltr flex w-max">{[0,1].map((copy) => <div key={copy} aria-hidden={copy === 1} className="flex shrink-0 items-center">{marqueeItems.map((item) => <span key={`${copy}-${item}`} className="flex items-center whitespace-nowrap font-display text-base text-foreground/70 sm:text-lg">{item}<span className="mx-6 text-sm text-primary/70 sm:mx-9">✦</span></span>)}</div>)}</div></div></section>; }
function Slider({ items, desktop, className = "" }: { items: ReactNode[]; desktop: string; className?: string }) { const ref = useRef<HTMLDivElement>(null); const [active, setActive] = useState(0); const onScroll = () => { const el = ref.current; if (!el) return; setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / (el.scrollWidth / items.length))))); }; const goTo = (index: number) => { const el = ref.current; if (!el) return; el.scrollTo({ left: (el.scrollWidth / items.length) * index, behavior: "smooth" }); }; return <div className={className}><div ref={ref} onScroll={onScroll} className={`no-bar -mr-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-1 pr-5 sm:mr-0 sm:snap-none sm:gap-0 sm:overflow-visible sm:pb-0 sm:pr-0 ${desktop}`}>{items.map((item, index) => <div key={index} className="w-[84vw] max-w-[420px] shrink-0 snap-start sm:contents">{item}</div>)}</div><div className="mt-5 flex justify-center gap-2 sm:hidden">{items.map((_, index) => <button key={index} type="button" aria-label={`Go to card ${index + 1}`} onClick={() => goTo(index)} className="grid h-6 w-6 place-items-center"><span className={`block h-1.5 rounded-full transition-all duration-300 ${index === active ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/35"}`} /></button>)}</div></div>; }
