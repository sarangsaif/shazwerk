import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";
import { isAdminAuthenticated } from "@/lib/auth";
import { CONTENT_TAG, readContent, saveContent } from "@/lib/cms";

export const dynamic = "force-dynamic";

const bi = z.object({ de: z.string().max(4000), en: z.string().max(4000) });
const slug = z.string().min(1).max(80).regex(/^[a-z0-9-]+$/, "Slug: nur Kleinbuchstaben, Zahlen und Bindestriche");

const schema = z.object({
  settings: z.object({
    ownerName: z.string().max(120),
    email: z.string().email(),
    phone: z.string().max(40),
    street: z.string().max(120),
    zip: z.string().max(10),
    city: z.string().max(60),
    canton: z.string().max(4),
    geo: z.object({ lat: z.number(), lng: z.number() }),
    heroCity: z.string().min(1).max(24),
    heroLead: bi,
    manifesto: bi,
    availability: bi,
    soundEnabled: z.boolean(),
    social: z.object({ linkedin: z.string().max(200), instagram: z.string().max(200), github: z.string().max(200) }),
  }),
  projects: z
    .array(
      z.object({
        slug,
        num: z.string().max(4),
        client: z.string().min(1).max(80),
        title: bi,
        category: z.string().max(40),
        sector: bi,
        location: z.string().max(60),
        year: z.string().max(12),
        summary: bi,
        challenge: bi,
        solution: bi,
        outcomes: z.object({ de: z.array(z.string().max(300)).max(8), en: z.array(z.string().max(300)).max(8) }),
        metrics: z.array(z.object({ value: z.string().max(16), label: bi })).max(4),
        tech: z.array(z.string().max(40)).max(12),
        image: z.string().max(500).optional(),
        link: z.string().max(300).optional(),
        hidden: z.boolean().optional(),
        hue: z.string().regex(/^#[0-9a-fA-F]{6}$/),
        motif: z.enum(["grid", "rings", "bars", "cross", "wave"]),
      })
    )
    .max(60)
    .refine((list) => new Set(list.map((p) => p.slug)).size === list.length, "Jeder Projekt-Slug muss eindeutig sein"),
  services: z
    .array(
      z.object({
        slug: z.string().max(40),
        num: z.string().max(4),
        title: bi,
        lead: bi,
        items: z.object({ de: z.array(z.string().max(120)).max(10), en: z.array(z.string().max(120)).max(10) }),
        tech: z.array(z.string().max(40)).max(10),
        href: z.string().max(120).optional(),
      })
    )
    .max(20),
  faq: z.array(z.object({ q: bi, a: bi })).max(30),
});

export async function GET() {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ content: await readContent() });
}

export async function PUT(req: NextRequest) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    return NextResponse.json({ error: `${issue.path.join(" › ")}: ${issue.message}` }, { status: 400 });
  }
  const saved = await saveContent(parsed.data);
  revalidateTag(CONTENT_TAG);
  revalidatePath("/", "layout");
  return NextResponse.json({ content: saved });
}
