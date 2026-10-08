"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import type { Bi, FaqItem, Project, Service, SiteContent } from "@/lib/content";
import ProjectPoster from "@/components/ui/ProjectPoster";
import { Btn, Field, Panel, inputCls } from "./ui";

type Tab = "projects" | "services" | "faq" | "settings";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60) || "projekt";

const emptyBi = (): Bi => ({ de: "", en: "" });
const clean = (lines: string[]) => lines.map((l) => l.trim()).filter(Boolean);

function newProject(n: number): Project {
  return {
    slug: `neues-projekt-${n}`,
    num: String(n).padStart(2, "0"),
    client: "Neues Projekt",
    title: emptyBi(),
    category: "Website",
    sector: emptyBi(),
    location: "Winterthur",
    year: String(new Date().getFullYear()),
    summary: emptyBi(),
    challenge: emptyBi(),
    solution: emptyBi(),
    outcomes: { de: [], en: [] },
    metrics: [],
    tech: [],
    hue: "#E30613",
    motif: "grid",
    hidden: true,
  };
}

function move<T>(list: T[], i: number, d: -1 | 1): T[] {
  const j = i + d;
  if (j < 0 || j >= list.length) return list;
  const next = list.slice();
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

/** German + English input pair. */
function BiInput({ label, value, onChange, area = false, rows = 3 }: { label: string; value: Bi; onChange: (v: Bi) => void; area?: boolean; rows?: number }) {
  const C = area ? "textarea" : "input";
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(["de", "en"] as const).map((lang) => (
        <Field key={lang} label={`${label} · ${lang.toUpperCase()}`}>
          <C
            className={`${inputCls} ${area ? "resize-y" : ""}`}
            rows={area ? rows : undefined}
            value={value[lang]}
            onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange({ ...value, [lang]: e.target.value })}
          />
        </Field>
      ))}
    </div>
  );
}

/** One item per line, German + English. */
function LinesInput({ label, value, onChange }: { label: string; value: { de: string[]; en: string[] }; onChange: (v: { de: string[]; en: string[] }) => void }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {(["de", "en"] as const).map((lang) => (
        <Field key={lang} label={`${label} · ${lang.toUpperCase()}`} hint="Ein Punkt pro Zeile">
          <textarea
            className={`${inputCls} resize-y`}
            rows={4}
            value={value[lang].join("\n")}
            onChange={(e) => onChange({ ...value, [lang]: e.target.value.split("\n").filter((l, i, a) => l.trim() || i < a.length - 1) })}
          />
        </Field>
      ))}
    </div>
  );
}

function ListRail<T>({
  items,
  selected,
  onSelect,
  onChange,
  label,
  isHidden,
  onToggleHidden,
  onAdd,
  addLabel,
}: {
  items: T[];
  selected: number;
  onSelect: (i: number) => void;
  onChange: (items: T[], nextSelected?: number) => void;
  label: (t: T) => string;
  isHidden?: (t: T) => boolean;
  onToggleHidden?: (i: number) => void;
  onAdd: () => void;
  addLabel: string;
}) {
  return (
    <div className="space-y-3">
      <ul className="divide-y divide-ink/5 border border-ink/10 bg-white">
        {items.map((it, i) => (
          <li key={i} className={`flex items-center gap-1 pr-1 ${selected === i ? "bg-paper" : ""}`}>
            <button type="button" onClick={() => onSelect(i)} className={`min-w-0 flex-1 truncate px-3 py-2.5 text-left text-sm ${isHidden?.(it) ? "text-stone-muted line-through" : ""}`}>
              <span className="mr-2 font-mono text-xs text-stone-muted">{String(i + 1).padStart(2, "0")}</span>
              {label(it) || "(ohne Titel)"}
            </button>
            {onToggleHidden && (
              <button type="button" title={isHidden?.(it) ? "Einblenden" : "Ausblenden"} onClick={() => onToggleHidden(i)} className="p-1.5 hover:text-swiss-red">
                {isHidden?.(it) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            )}
            <button type="button" title="Nach oben" onClick={() => onChange(move(items, i, -1), i === selected ? i - 1 : selected)} className="p-1.5 hover:text-swiss-red" disabled={i === 0}>
              <ArrowUp className="h-4 w-4" />
            </button>
            <button type="button" title="Nach unten" onClick={() => onChange(move(items, i, 1), i === selected ? i + 1 : selected)} className="p-1.5 hover:text-swiss-red" disabled={i === items.length - 1}>
              <ArrowDown className="h-4 w-4" />
            </button>
          </li>
        ))}
      </ul>
      <Btn variant="ghost" onClick={onAdd}>
        <Plus className="h-4 w-4" /> {addLabel}
      </Btn>
    </div>
  );
}

function ProjectForm({ p, onChange, onDelete }: { p: Project; onChange: (p: Project) => void; onDelete: () => void }) {
  const set = <K extends keyof Project>(k: K, v: Project[K]) => onChange({ ...p, [k]: v });
  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Kunde / Projektname">
            <input className={inputCls} value={p.client} onChange={(e) => set("client", e.target.value)} />
          </Field>
          <Field label="URL-Kürzel (Slug)" hint={`shazwerk.ch/work/${p.slug}`}>
            <div className="flex gap-2">
              <input className={inputCls} value={p.slug} onChange={(e) => set("slug", slugify(e.target.value))} />
              <Btn variant="ghost" onClick={() => set("slug", slugify(p.client))} title="Aus Namen erzeugen">↻</Btn>
            </div>
          </Field>
          <Field label="Jahr"><input className={inputCls} value={p.year} onChange={(e) => set("year", e.target.value)} /></Field>
          <Field label="Ort"><input className={inputCls} value={p.location} onChange={(e) => set("location", e.target.value)} /></Field>
          <Field label="Kategorie"><input className={inputCls} value={p.category} onChange={(e) => set("category", e.target.value)} /></Field>
          <Field label="Live-Link (optional)"><input className={inputCls} placeholder="https://…" value={p.link || ""} onChange={(e) => set("link", e.target.value || undefined)} /></Field>
          <Field label="Titelbild-URL (optional)" hint="Leer lassen für ein generiertes Plakat" className="sm:col-span-2">
            <input className={inputCls} placeholder="https://…/bild.jpg" value={p.image || ""} onChange={(e) => set("image", e.target.value || undefined)} />
          </Field>
          <Field label="Plakatfarbe">
            <input type="color" className="h-9 w-full border border-ink/15" value={p.hue} onChange={(e) => set("hue", e.target.value)} />
          </Field>
          <Field label="Plakatmotiv">
            <select className={inputCls} value={p.motif} onChange={(e) => set("motif", e.target.value as Project["motif"])}>
              <option value="grid">Punkte</option>
              <option value="rings">Ringe</option>
              <option value="bars">Balken</option>
              <option value="cross">Kreuz</option>
              <option value="wave">Wellen</option>
            </select>
          </Field>
        </div>
        <div>
          <p className="eyebrow mb-1.5 text-stone-muted">Vorschau</p>
          <ProjectPoster project={p} className="aspect-[4/5] h-auto w-full" />
          <label className="mt-3 flex items-center gap-2 text-sm">
            <input type="checkbox" checked={!p.hidden} onChange={(e) => set("hidden", !e.target.checked)} />
            Auf der Website anzeigen
          </label>
        </div>
      </div>
      <BiInput label="Titel" value={p.title} onChange={(v) => set("title", v)} />
      <BiInput label="Branche" value={p.sector} onChange={(v) => set("sector", v)} />
      <BiInput label="Kurzbeschreibung" value={p.summary} onChange={(v) => set("summary", v)} area />
      <BiInput label="Ausgangslage" value={p.challenge} onChange={(v) => set("challenge", v)} area />
      <BiInput label="Lösung" value={p.solution} onChange={(v) => set("solution", v)} area />
      <LinesInput label="Ergebnisse" value={p.outcomes} onChange={(v) => set("outcomes", v)} />
      <div>
        <p className="eyebrow mb-2 text-stone-muted">Kennzahlen (max. 3)</p>
        <div className="space-y-2">
          {p.metrics.map((m, i) => (
            <div key={i} className="grid grid-cols-[90px_1fr_1fr_auto] gap-2">
              <input className={inputCls} placeholder="99%" value={m.value} onChange={(e) => set("metrics", p.metrics.map((x, j) => (j === i ? { ...x, value: e.target.value } : x)))} aria-label="Wert" />
              <input className={inputCls} placeholder="Bezeichnung DE" value={m.label.de} onChange={(e) => set("metrics", p.metrics.map((x, j) => (j === i ? { ...x, label: { ...x.label, de: e.target.value } } : x)))} aria-label="Bezeichnung Deutsch" />
              <input className={inputCls} placeholder="Label EN" value={m.label.en} onChange={(e) => set("metrics", p.metrics.map((x, j) => (j === i ? { ...x, label: { ...x.label, en: e.target.value } } : x)))} aria-label="Bezeichnung Englisch" />
              <button type="button" onClick={() => set("metrics", p.metrics.filter((_, j) => j !== i))} className="px-2 hover:text-swiss-red" aria-label="Kennzahl entfernen"><Trash2 className="h-4 w-4" /></button>
            </div>
          ))}
          {p.metrics.length < 3 && (
            <Btn variant="ghost" onClick={() => set("metrics", [...p.metrics, { value: "", label: emptyBi() }])}><Plus className="h-4 w-4" /> Kennzahl</Btn>
          )}
        </div>
      </div>
      <Field label="Technologien" hint="Mit Komma trennen">
        <input className={inputCls} value={p.tech.join(", ")} onChange={(e) => set("tech", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
      </Field>
      <div className="border-t border-ink/10 pt-4">
        <Btn variant="danger" onClick={onDelete}><Trash2 className="h-4 w-4" /> Projekt löschen</Btn>
      </div>
    </div>
  );
}

function ServiceForm({ s, onChange, onDelete }: { s: Service; onChange: (s: Service) => void; onDelete: () => void }) {
  const set = <K extends keyof Service>(k: K, v: Service[K]) => onChange({ ...s, [k]: v });
  return (
    <div className="space-y-5">
      <BiInput label="Titel" value={s.title} onChange={(v) => set("title", v)} />
      <BiInput label="Beschreibung" value={s.lead} onChange={(v) => set("lead", v)} area />
      <LinesInput label="Leistungen" value={s.items} onChange={(v) => set("items", v)} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Technologien" hint="Mit Komma trennen">
          <input className={inputCls} value={s.tech.join(", ")} onChange={(e) => set("tech", e.target.value.split(",").map((t) => t.trim()).filter(Boolean))} />
        </Field>
        <Field label="«Mehr erfahren»-Link (optional)" hint="z. B. /webagentur-winterthur">
          <input className={inputCls} value={s.href || ""} onChange={(e) => set("href", e.target.value || undefined)} />
        </Field>
      </div>
      <Btn variant="danger" onClick={onDelete}><Trash2 className="h-4 w-4" /> Leistung löschen</Btn>
    </div>
  );
}

function SettingsForm({ c, onChange }: { c: SiteContent["settings"]; onChange: (s: SiteContent["settings"]) => void }) {
  const set = <K extends keyof SiteContent["settings"]>(k: K, v: SiteContent["settings"][K]) => onChange({ ...c, [k]: v });
  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow mb-3 text-stone-muted">Kontakt & Adresse</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Inhaber/in (für Impressum)" hint="Leer lassen, um keinen Namen anzuzeigen">
            <input className={inputCls} value={c.ownerName} onChange={(e) => set("ownerName", e.target.value)} />
          </Field>
          <Field label="E-Mail"><input className={inputCls} value={c.email} onChange={(e) => set("email", e.target.value)} /></Field>
          <Field label="Telefon"><input className={inputCls} value={c.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="Strasse"><input className={inputCls} value={c.street} onChange={(e) => set("street", e.target.value)} /></Field>
          <Field label="PLZ"><input className={inputCls} value={c.zip} onChange={(e) => set("zip", e.target.value)} /></Field>
          <Field label="Ort"><input className={inputCls} value={c.city} onChange={(e) => set("city", e.target.value)} /></Field>
          <Field label="Kanton"><input className={inputCls} value={c.canton} onChange={(e) => set("canton", e.target.value)} /></Field>
          <Field label="Breitengrad" hint="Für Google Maps / Local SEO">
            <input type="number" step="0.0001" className={inputCls} value={c.geo.lat} onChange={(e) => set("geo", { ...c.geo, lat: Number(e.target.value) })} />
          </Field>
          <Field label="Längengrad">
            <input type="number" step="0.0001" className={inputCls} value={c.geo.lng} onChange={(e) => set("geo", { ...c.geo, lng: Number(e.target.value) })} />
          </Field>
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3 text-stone-muted">Texte auf der Startseite</p>
        <div className="space-y-4">
          <Field label="Ort in der grossen Überschrift" hint="«Digitale Präzision aus …»">
            <input className={inputCls} maxLength={24} value={c.heroCity} onChange={(e) => set("heroCity", e.target.value)} />
          </Field>
          <BiInput label="Einleitung" value={c.heroLead} onChange={(v) => set("heroLead", v)} area />
          <BiInput label="Studio-Text (Manifest)" value={c.manifesto} onChange={(v) => set("manifesto", v)} area rows={4} />
          <BiInput label="Verfügbarkeit" value={c.availability} onChange={(v) => set("availability", v)} />
        </div>
      </div>
      <div>
        <p className="eyebrow mb-3 text-stone-muted">Social Media</p>
        <div className="grid gap-4 sm:grid-cols-3">
          {(["linkedin", "instagram", "github"] as const).map((k) => (
            <Field key={k} label={k}>
              <input className={inputCls} placeholder="https://…" value={c.social[k]} onChange={(e) => set("social", { ...c.social, [k]: e.target.value })} />
            </Field>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={c.soundEnabled} onChange={(e) => set("soundEnabled", e.target.checked)} />
        Sound-Schalter (Hintergrundklang) auf der Website anzeigen
      </label>
    </div>
  );
}

export default function ContentEditor() {
  const [tab, setTab] = useState<Tab>("projects");
  const [content, setContent] = useState<SiteContent | null>(null);
  const [saved, setSaved] = useState<string>("");
  const [sel, setSel] = useState(0);
  const [status, setStatus] = useState<{ kind: "ok" | "err" | "busy"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        setContent(d.content);
        setSaved(JSON.stringify(d.content));
      });
  }, []);

  const dirty = useMemo(() => content && JSON.stringify(content) !== saved, [content, saved]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  if (!content) return <p className="text-sm text-stone-muted">Lade Inhalte …</p>;

  const update = (patch: Partial<SiteContent>) => setContent({ ...content, ...patch });

  const save = async () => {
    setStatus({ kind: "busy", text: "Speichere und veröffentliche …" });
    const body: SiteContent = {
      ...content,
      projects: content.projects.map((p, i) => ({
        ...p,
        num: String(i + 1).padStart(2, "0"),
        outcomes: { de: clean(p.outcomes.de), en: clean(p.outcomes.en) },
      })),
      services: content.services.map((s, i) => ({
        ...s,
        num: String(i + 1).padStart(2, "0"),
        slug: s.slug || slugify(s.title.de),
        items: { de: clean(s.items.de), en: clean(s.items.en) },
      })),
    };
    const res = await fetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await res.json();
    if (!res.ok) {
      setStatus({ kind: "err", text: d.error || "Speichern fehlgeschlagen." });
      return;
    }
    setContent(d.content);
    setSaved(JSON.stringify(d.content));
    setStatus({ kind: "ok", text: "Gespeichert – die Website ist aktualisiert." });
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "projects", label: `Projekte (${content.projects.length})` },
    { key: "services", label: `Leistungen (${content.services.length})` },
    { key: "faq", label: `FAQ (${content.faq.length})` },
    { key: "settings", label: "Firma & Texte" },
  ];

  return (
    <div className="space-y-6">
      <div className="sticky top-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-3 border-b border-ink/10 bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => {
                setTab(t.key);
                setSel(0);
              }}
              className={`px-3 py-1.5 text-sm ${tab === t.key ? "bg-ink text-paper" : "border border-ink/15 bg-white"}`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          {status && (
            <span className={`text-sm ${status.kind === "err" ? "text-swiss-red" : status.kind === "ok" ? "text-emerald-700" : "text-stone-muted"}`}>{status.text}</span>
          )}
          {dirty && !status?.text.startsWith("Speichere") && <span className="text-sm text-stone-muted">Ungespeicherte Änderungen</span>}
          <Btn variant="red" onClick={save} disabled={!dirty || status?.kind === "busy"}>
            Speichern & veröffentlichen
          </Btn>
        </div>
      </div>

      {tab === "projects" && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <ListRail
            items={content.projects}
            selected={sel}
            onSelect={setSel}
            onChange={(projects, next) => {
              update({ projects });
              if (next !== undefined) setSel(next);
            }}
            label={(p) => p.client}
            isHidden={(p) => !!p.hidden}
            onToggleHidden={(i) => update({ projects: content.projects.map((p, j) => (j === i ? { ...p, hidden: !p.hidden } : p)) })}
            onAdd={() => {
              update({ projects: [...content.projects, newProject(content.projects.length + 1)] });
              setSel(content.projects.length);
            }}
            addLabel="Projekt hinzufügen"
          />
          {content.projects[sel] ? (
            <Panel title={content.projects[sel].client}>
              <ProjectForm
                p={content.projects[sel]}
                onChange={(p) => update({ projects: content.projects.map((x, j) => (j === sel ? p : x)) })}
                onDelete={() => {
                  update({ projects: content.projects.filter((_, j) => j !== sel) });
                  setSel(Math.max(0, sel - 1));
                }}
              />
            </Panel>
          ) : (
            <p className="text-sm text-stone-muted">Noch keine Projekte. Fügen Sie Ihr erstes Projekt hinzu.</p>
          )}
        </div>
      )}

      {tab === "services" && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <ListRail
            items={content.services}
            selected={sel}
            onSelect={setSel}
            onChange={(services, next) => {
              update({ services });
              if (next !== undefined) setSel(next);
            }}
            label={(s) => s.title.de}
            onAdd={() => {
              update({
                services: [
                  ...content.services,
                  { slug: "", num: "", title: { de: "Neue Leistung", en: "New service" }, lead: emptyBi(), items: { de: [], en: [] }, tech: [] },
                ],
              });
              setSel(content.services.length);
            }}
            addLabel="Leistung hinzufügen"
          />
          {content.services[sel] && (
            <Panel title={content.services[sel].title.de}>
              <ServiceForm
                s={content.services[sel]}
                onChange={(s) => update({ services: content.services.map((x, j) => (j === sel ? s : x)) })}
                onDelete={() => {
                  update({ services: content.services.filter((_, j) => j !== sel) });
                  setSel(Math.max(0, sel - 1));
                }}
              />
            </Panel>
          )}
        </div>
      )}

      {tab === "faq" && (
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          <ListRail
            items={content.faq}
            selected={sel}
            onSelect={setSel}
            onChange={(faq, next) => {
              update({ faq });
              if (next !== undefined) setSel(next);
            }}
            label={(f: FaqItem) => f.q.de}
            onAdd={() => {
              update({ faq: [...content.faq, { q: { de: "Neue Frage?", en: "New question?" }, a: emptyBi() }] });
              setSel(content.faq.length);
            }}
            addLabel="Frage hinzufügen"
          />
          {content.faq[sel] && (
            <Panel title="Frage bearbeiten">
              <div className="space-y-5">
                <BiInput label="Frage" value={content.faq[sel].q} onChange={(q) => update({ faq: content.faq.map((x, j) => (j === sel ? { ...x, q } : x)) })} />
                <BiInput label="Antwort" value={content.faq[sel].a} area rows={5} onChange={(a) => update({ faq: content.faq.map((x, j) => (j === sel ? { ...x, a } : x)) })} />
                <Btn
                  variant="danger"
                  onClick={() => {
                    update({ faq: content.faq.filter((_, j) => j !== sel) });
                    setSel(Math.max(0, sel - 1));
                  }}
                >
                  <Trash2 className="h-4 w-4" /> Frage löschen
                </Btn>
              </div>
            </Panel>
          )}
        </div>
      )}

      {tab === "settings" && (
        <Panel title="Firma & Texte">
          <SettingsForm c={content.settings} onChange={(settings) => update({ settings })} />
        </Panel>
      )}
    </div>
  );
}
