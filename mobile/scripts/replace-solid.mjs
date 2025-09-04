import fs from "fs";
import path from "path";

const root = process.cwd();
function walk(d, out=[]){ for (const e of fs.readdirSync(d, { withFileTypes:true })) {
  const p = path.join(d, e.name);
  e.isDirectory() ? walk(p, out) : out.push(p);
} return out; }

const files = walk(path.join(root, "src")).filter(f => f.endsWith(".tsx"));
const re = /variant\s*=\s*\{?\s*["']solid["']\s*\}?/g;

let changed = 0;
for (const f of files) {
  const txt = fs.readFileSync(f, "utf8");
  const next = txt.replace(re, 'variant="primary"');
  if (next !== txt) { fs.writeFileSync(f, next); changed++; }
}
console.log("Updated files:", changed);
