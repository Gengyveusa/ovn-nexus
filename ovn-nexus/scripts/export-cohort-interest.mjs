// Run in a trusted environment with the existing server-side Supabase credentials.
// Usage: node --env-file=.env.local scripts/export-cohort-interest.mjs --output tmp/hygienists-first.csv
import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const outputIndex = process.argv.indexOf("--output");
const output = outputIndex >= 0 ? process.argv[outputIndex + 1] : undefined;
if (!output || !process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Provide --output and the server-side Supabase environment variables. Never commit exported contact data.");
}
const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const { data: bucket, error } = await client.storage.getBucket("cohort-interest");
if (error || !bucket || bucket.public !== false) throw new Error("Private interest storage unavailable.");
const storage = client.storage.from("cohort-interest");
const records = [];
for (let offset = 0; ; offset += 100) {
  const { data: files, error } = await storage.list("hygienists-first", { limit: 100, offset, sortBy: { column: "name", order: "asc" } });
  if (error || !files) throw new Error("Could not list interest records.");
  for (const file of files) {
    if (!/^[a-f0-9]{64}\.json$/.test(file.name)) continue;
    const { data, error } = await storage.download(`hygienists-first/${file.name}`);
    if (error || !data) throw new Error("Could not read an interest record.");
    const record = JSON.parse(await data.text());
    // QA uses reserved domains; those entries never belong in a contact export.
    if (/@(?:example\.(?:com|org|net)|[^@]+\.(?:example|test))$/i.test(record.email)) continue;
    records.push(record);
  }
  if (files.length < 100) break;
}
const columns = ["name", "email", "profession", "question", "consented_at", "consent_text", "consent_version", "source", "utm_source", "utm_medium", "utm_campaign", "utm_content"];
const escape = value => {
  const text = String(value ?? "");
  const safe = /^[=+@\-\t\r]/.test(text) ? `'${text}` : text;
  return `"${safe.replaceAll('"', '""')}"`;
};
await mkdir(dirname(output), { recursive: true });
await writeFile(output, [columns.join(","), ...records.map(record => columns.map(column => escape(record[column])).join(","))].join("\r\n") + "\r\n", { mode: 0o600 });
console.log(`Exported ${records.length} course-interest records to the requested file. No email sent.`);
