import { enquiries } from "../../../db/schema";
import { getDb } from "../../../db";
import { enquirySchema } from "../../../lib/enquiry-validation";

const json = (body: object, status = 200) => Response.json(body, {status, headers: {"Cache-Control": "no-store"}});

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return json({error: "Please send your enquiry from this website."}, 403);
  if (!request.headers.get("content-type")?.includes("application/json")) return json({error: "Unsupported submission format."}, 415);
  const raw = await request.text();
  if (raw.length > 12000) return json({error: "Your message is too long."}, 413);
  let data;
  try { data = JSON.parse(raw); } catch { return json({error: "Please check your enquiry and try again."}, 400); }
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) return json({error: parsed.error.issues[0]?.message || "Please check your enquiry."}, 400);
  const { website: _honeypot, ...lead } = parsed.data;
  try {
    // A stable client-generated ID makes retries safe if the response was interrupted.
    await getDb().insert(enquiries).values({...lead, createdAt: new Date().toISOString()}).onConflictDoNothing({target: enquiries.id});
    return json({ok: true, reference: `MYR-${lead.id.toUpperCase()}`}, 201);
  } catch {
    return json({error: "We couldn’t save your enquiry. Your details are still here; please try again shortly."}, 503);
  }
}
