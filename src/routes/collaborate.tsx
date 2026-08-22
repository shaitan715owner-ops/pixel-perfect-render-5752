import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent, type ReactNode } from "react";
import { ArrowLeft, Check, Loader2, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import logoAsset from "@/assets/sklinder-logo.png.asset.json";

export const Route = createFileRoute("/collaborate")({
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  head: () => ({
    meta: [
      { title: "Find a Collaborator — Sklinder" },
      { name: "description", content: "Post what you're building and the help you need. Browse open collaborator requests from builders around the world." },
      { property: "og:title", content: "Find a Collaborator — Sklinder" },
      { property: "og:description", content: "Post what you're building and the help you need — find the collaborator who can help you ship." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Collaborate,
});

const whatsapp = "https://chat.whatsapp.com/HjaKxj8cAJZ41Z6cvrCq06?s=cl&p=a&mlu=0";
const logo = logoAsset.url;
const skillOptions = ["Design", "Development", "Marketing", "AI", "Growth", "Product", "Strategy", "Content", "Fundraising"];

type RequestRow = {
  id: string;
  name: string;
  role: string;
  building: string;
  help_needed: string;
  skills: string[];
  created_at: string;
};

function Collaborate() {
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [filter, setFilter] = useState<string | null>(null);

  const list = useQuery({
    queryKey: ["collaborator-requests"],
    queryFn: async (): Promise<RequestRow[]> => {
      const { data, error: queryError } = await supabase
        .from("collaborator_requests")
        .select("id, name, role, building, help_needed, skills, created_at")
        .order("created_at", { ascending: false })
        .limit(60);
      if (queryError) throw queryError;
      return (data ?? []) as RequestRow[];
    },
  });

  const post = useMutation({
    mutationFn: async (payload: { name: string; role: string; contact: string; building: string; help_needed: string; skills: string[] }) => {
      const { error: insertError } = await supabase.from("collaborator_requests").insert(payload);
      if (insertError) throw insertError;
    },
    onSuccess: () => {
      setDone(true);
      setSelected([]);
      void queryClient.invalidateQueries({ queryKey: ["collaborator-requests"] });
    },
    onError: () => setError("Something went wrong posting your request. Please try again."),
  });

  const toggleSkill = (skill: string) =>
    setSelected((current) => (current.includes(skill) ? current.filter((s) => s !== skill) : current.length >= 6 ? current : [...current, skill]));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      role: String(data.get("role") ?? "").trim(),
      contact: String(data.get("contact") ?? "").trim(),
      building: String(data.get("building") ?? "").trim(),
      help_needed: String(data.get("help_needed") ?? "").trim(),
      skills: selected,
    };
    if (payload.name.length < 2 || payload.role.length < 2 || payload.contact.length < 3 || payload.building.length < 10 || payload.help_needed.length < 10) {
      setError("Fill in every field — your project and the help you need each need at least 10 characters.");
      return;
    }
    setError("");
    setDone(false);
    post.mutate(payload, { onSuccess: () => form.reset() });
  };

  const rows = (list.data ?? []).filter((row) => !filter || row.skills.includes(filter));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" aria-label="Collaborate navigation">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="Sklinder" width={1536} height={1024} className="h-12 w-auto object-contain" />
          </Link>
          <Link to="/" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="size-3.5" />Back home
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-14 sm:px-8 sm:pt-20 lg:px-10">
        <Eyebrow>Find a collaborator</Eyebrow>
        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.4rem,10vw,3.2rem)] font-medium leading-[1.02] sm:text-6xl">
          Post what you&apos;re building.<br />
          <span className="text-muted-foreground">Say what help you need.</span>
        </h1>
        <p className="mt-6 max-w-xl leading-7 text-muted-foreground">
          Requests are public so other builders can find you. Your contact detail stays private — the Sklinder team uses it to introduce you.
        </p>

        <div className="mt-14 grid gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <form onSubmit={submit} noValidate className="space-y-6 border border-border bg-surface/30 p-6 sm:p-8" aria-label="Post a collaborator request">
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Your name"><Input name="name" autoComplete="name" placeholder="Asim" /></Field>
              <Field label="What you do"><Input name="role" placeholder="Founder, designer, dev…" /></Field>
            </div>
            <Field label="Contact (private)"><Input name="contact" placeholder="you@email.com or @handle" /></Field>
            <Field label="What you're building"><Textarea name="building" className="min-h-28 resize-none" placeholder="A marketplace for local makers, currently at prototype stage…" /></Field>
            <Field label="Help you need"><Textarea name="help_needed" className="min-h-28 resize-none" placeholder="A frontend developer to help ship the MVP in exchange for brand design…" /></Field>
            <div>
              <p className="font-display text-[10px] font-medium uppercase tracking-[.16em] text-muted-foreground">Skills needed (up to 6)</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {skillOptions.map((skill) => {
                  const on = selected.includes(skill);
                  return (
                    <button key={skill} type="button" onClick={() => toggleSkill(skill)} aria-pressed={on}
                      className={`border px-3 py-2 font-display text-[10px] uppercase tracking-[.12em] transition-colors ${on ? "border-primary/60 bg-primary/10 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            {done && <p role="status" className="flex items-center gap-2 text-sm text-primary"><Check className="size-4" />Posted — your request is live on the board below.</p>}
            <Button type="submit" variant="brand" size="xl" className="w-full sm:w-auto" disabled={post.isPending}>
              {post.isPending ? <Loader2 className="animate-spin" /> : <Send />}Post request
            </Button>
          </form>

          <section aria-label="Open collaborator requests">
            <div className="flex flex-wrap items-center gap-2 border-b border-border pb-5">
              <span className="mr-2 font-display text-[10px] uppercase tracking-[.16em] text-primary">Open requests</span>
              <button type="button" onClick={() => setFilter(null)} className={`border px-2.5 py-1.5 font-display text-[10px] uppercase tracking-[.12em] transition-colors ${!filter ? "border-primary/60 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>All</button>
              {skillOptions.map((skill) => (
                <button key={skill} type="button" onClick={() => setFilter(skill === filter ? null : skill)}
                  className={`border px-2.5 py-1.5 font-display text-[10px] uppercase tracking-[.12em] transition-colors ${filter === skill ? "border-primary/60 text-primary" : "border-border text-muted-foreground hover:text-foreground"}`}>
                  {skill}
                </button>
              ))}
            </div>

            {list.isLoading && <p className="py-10 text-sm text-muted-foreground">Loading requests…</p>}
            {list.isError && <p className="py-10 text-sm text-destructive">Couldn&apos;t load requests right now.</p>}
            {!list.isLoading && !list.isError && rows.length === 0 && (
              <div className="border border-dashed border-border p-10 text-center">
                <p className="font-display text-lg">No open requests yet.</p>
                <p className="mt-2 text-sm text-muted-foreground">Be the first to post what you&apos;re building.</p>
              </div>
            )}
            <div className="divide-y divide-border">
              {rows.map((row) => (
                <article key={row.id} className="py-7">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h2 className="font-display text-xl font-medium">{row.name}</h2>
                    <span className="text-xs uppercase tracking-[.14em] text-primary">{row.role}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{new Date(row.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground"><span className="text-foreground">Building — </span>{row.building}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground"><span className="text-foreground">Needs — </span>{row.help_needed}</p>
                  {row.skills.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {row.skills.map((skill) => <span key={skill} className="border border-border px-2.5 py-1 font-display text-[9px] uppercase tracking-[.12em] text-muted-foreground">{skill}</span>)}
                    </div>
                  )}
                  <Button asChild variant="brandOutline" size="sm" className="mt-5">
                    <a href={whatsapp} target="_blank" rel="noreferrer"><MessageCircle />Reach out in the community</a>
                  </Button>
                </article>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="flex items-center gap-3 font-display text-[10px] font-medium uppercase tracking-[.2em] text-primary"><span className="size-1.5 rounded-full bg-primary" />{children}</p>;
}
function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block font-display text-[10px] font-medium uppercase tracking-[.16em] text-muted-foreground">{label}<div className="mt-2">{children}</div></label>;
}
