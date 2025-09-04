import fs from "fs";
import path from "path";

const root = process.cwd();
const SRC  = path.join(root, "src");
const APP  = path.join(root, "app");

function exists(p){ try{ fs.accessSync(p); return true; } catch { return false; } }
function walk(dir, exts=[".ts",".tsx"]) {
  const out=[]; (function rec(d){
    for (const de of fs.readdirSync(d, { withFileTypes:true })) {
      const p = path.join(d, de.name);
      if (de.isDirectory()) rec(p);
      else if (exts.includes(path.extname(de.name))) out.push(p);
    }
  })(dir); return out;
}

console.log("=== Audit started ===", new Date().toISOString());

/* 1) Endpoints: usage vs definition (nested aware, per-group body scan) */
const used = new Map(); // group -> Set(sub)
for (const f of [...walk(SRC), ...walk(APP)]) {
  const txt = fs.readFileSync(f, "utf8");
  const re = /endpoints\.([a-zA-Z0-9_]+)\.([a-zA-Z0-9_]+)/g;
  let m; while ((m = re.exec(txt))) {
    const [, g, s] = m;
    if (!used.has(g)) used.set(g, new Set());
    used.get(g).add(s);
  }
}
console.log("\n--- Endpoints usage vs definition ---");
const endpointsPath = path.join(SRC, "api", "endpoints.ts");
if (exists(endpointsPath)) {
  const text = fs.readFileSync(endpointsPath, "utf8");
  const groupHasSub = (g, s) => {
    const gm = new RegExp(`${g}\\s*:\\s*{[\\s\\S]*?}`, "m").exec(text);
    if (!gm) return false;
    const body = gm[0];
    return new RegExp(`\\b${s}\\s*:\\\\b|\\b${s}\\s*\\(`).test(body);
  };
  for (const [g, subs] of used.entries()) {
    const missing = [...subs].filter(s => !groupHasSub(g, s));
    if (missing.length) console.log(`Group '${g}' missing keys in endpoints.ts: ${missing.join(", ")}`);
  }
} else {
  console.log("[WARN] endpoints.ts not found");
}

/* 2) Folder mismatches: vendor vs vendors */
const hasVendor  = exists(path.join(SRC, "components", "vendor"));
const hasVendors = exists(path.join(SRC, "components", "vendors"));
if (hasVendor && hasVendors) console.log("[ERROR] Both 'vendor' and 'vendors' component folders exist — pick ONE.");
if (!hasVendor && !hasVendors) console.log("[WARN] No vendor components folder found under src/components.");

/* 3) Duplicate dynamic routes + case-only dupes */
if (exists(APP)) {
  const files = []; (function list(d){ for(const de of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,de.name); de.isDirectory()?list(p):files.push(p);} })(APP);
  const dyn = files.filter(f => /\[.+\]\.tsx?$/.test(f)).map(f => path.relative(root,f).replace(/\\/g,"/"));
  console.log("\n--- Dynamic routes ---"); console.log(dyn.join(" "));
  const lc = new Map();
  for (const rel of files.map(f=>path.relative(root,f))) {
    const key = rel.toLowerCase();
    const arr = lc.get(key) || [];
    arr.push(rel);
    lc.set(key, arr);
  }
  const caseDupes = [...lc.values()].filter(a=>a.length>1);
  if (caseDupes.length) {
    console.log("\n[ERROR] Case-only duplicates (break on iOS/Android):");
    for (const a of caseDupes) console.log(" ", a.join(" | "));
  }
}

/* 4) Broken alias imports @/ (quick existence check) */
console.log("\n--- Quick missing module check (alias @/) ---");
const aliasHits = [];
for (const f of [...walk(SRC), ...walk(APP)]) {
  const txt = fs.readFileSync(f, "utf8");
  for (const m of txt.matchAll(/from\s+['"]@\/([^'"]+)['"]/g)) {
    const target = m[1];
    const candidates = [
      path.join(SRC, target + ".ts"),
      path.join(SRC, target + ".tsx"),
      path.join(SRC, target, "index.ts"),
      path.join(SRC, target, "index.tsx"),
    ];
    if (!candidates.some(exists)) aliasHits.push(`${path.relative(root,f)} -> @/${target}`);
  }
}
if (aliasHits.length) {
  console.log("[ERROR] Broken @/ imports (target not found):");
  for (const h of aliasHits.slice(0,80)) console.log(" ", h);
  if (aliasHits.length>80) console.log(" … plus", aliasHits.length-80, "more");
}
console.log("=== Done. See tsc.log, eslint.log (if any), and audit-report.txt ===");
