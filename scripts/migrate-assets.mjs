// Downloads the original media from the live Wix site into
// public/media/original/ and writes the asset manifest to
// data/original-assets.json.
//
// Wix serves transformed images at .../media/<id>/v1/fill/.... Stripping the
// "/v1/..." transform yields the original full-resolution file at
// https://static.wixstatic.com/media/<id>. We download those originals.
//
// Originals are treated as a permanent backup and are never deleted by the app.
// Re-running this script is safe; existing files are skipped unless --force.

import { mkdir, writeFile, access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { imageSize } from "image-size";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUT_DIR = path.join(ROOT, "public", "media", "original");
const MANIFEST = path.join(ROOT, "data", "original-assets.json");
const WIX_BASE = "https://static.wixstatic.com/media/";
const FORCE = process.argv.includes("--force");

// One entry per original asset discovered in the live-site audit.
// `id` is the Wix media path segment; `sourceUrl` is derived from it.
const ASSETS = [
  // ---- Home ----
  { id: "bc709d_9695a86d9dd24117a2f7b61f392a3276~mv2.jpg", file: "band-banner.jpg", page: "home", alt: "The Kings of Strings banner", type: "image" },
  { id: "bc709d_14b8a5b7d3924944b04783ee0ddea324~mv2.jpg", file: "fb-banner.jpg", page: "home", alt: "The Kings of Strings Facebook banner", type: "image" },
  { id: "bc709d_cb920bc8ea5e4a96977eb0e102110f3b~mv2.jpg", file: "kos-live.jpg", page: "home", alt: "The Kings of Strings performing live", type: "image" },
  { id: "bc709d_eea984c5ee9540efb023e4f048ee92a4~mv2.png", file: "dead-man-walking-cover.png", page: "home", alt: "Dead Man Walking cover art", type: "image" },
  { id: "11062b_6312092713584a49aa892884608cd414~mv2.jpeg", file: "cloudy-blue-sky.jpeg", page: "home", alt: "Cloudy blue sky", type: "image", note: "Likely a Wix decorative/stock placeholder." },
  { id: "bc709d_0121754e6bbf4476a28de8e30655c3a4~mv2.jpg", file: "memento-cover.jpg", page: "home", alt: "Memento album cover art", type: "image" },

  // ---- About (band photos) ----
  { id: "bc709d_728108bb88f64ce186ca39059ded7215~mv2_d_2048_1363_s_2.jpg", file: "about-01.jpg", page: "about", alt: "The Kings of Strings band photo", type: "image" },
  { id: "bc709d_6331b83a04d54219824e830e1127c154~mv2.jpg", file: "about-02.jpg", page: "about", alt: "The Kings of Strings band photo", type: "image" },
  { id: "bc709d_5fbf5b0061564911915abadb2437a76e~mv2_d_1282_1926_s_2.jpg", file: "about-03.jpg", page: "about", alt: "The Kings of Strings band photo", type: "image" },
  { id: "bc709d_08de3f2aa778407c99345ecff79af557~mv2_d_1363_2048_s_2.jpg", file: "about-04.jpg", page: "about", alt: "The Kings of Strings band photo", type: "image" },
  { id: "bc709d_a8fbe45246a8466191c9b9d83927df61~mv2_d_2048_1363_s_2.jpg", file: "about-05.jpg", page: "about", alt: "The Kings of Strings band photo", type: "image" },

  // ---- Gallery ----
  { id: "bc709d_87b6e2c839e3406c9ca92a2c0c1ea6bb~mv2.jpg", file: "gallery-01.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 1", type: "image" },
  { id: "bc709d_e6a8e5399ee34cf6921056184cb966bb~mv2.jpg", file: "gallery-02.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 2", type: "image" },
  { id: "bc709d_2a6d27e605e9407890e8e1a38d7a7ca7~mv2.jpg", file: "gallery-03.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 3", type: "image" },
  { id: "bc709d_9eabe5dd02b84f4f8d6d47f9f024357d~mv2.jpg", file: "gallery-04.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 4", type: "image" },
  { id: "bc709d_402366f8d101445e965f63dccc6f4834~mv2.jpg", file: "gallery-05.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 5", type: "image" },
  { id: "bc709d_5258301ee904400c8415e5ad17188d3e~mv2.jpg", file: "gallery-06.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 6", type: "image" },
  { id: "bc709d_944e2bef451140cfa449b0cacd8c6711~mv2_d_2048_1363_s_2.jpg", file: "gallery-07.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 7", type: "image" },
  { id: "bc709d_264db06ca62c48c0ba9d8e972590451d~mv2.jpg", file: "gallery-08.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 8", type: "image" },
  { id: "bc709d_24a3bd0b508145b09bead8b5edbcde6e~mv2.jpg", file: "gallery-09.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 9", type: "image" },
  { id: "bc709d_7e8081b47293450391bf5b213feeed2b~mv2.jpg", file: "gallery-10.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 10", type: "image" },
  { id: "bc709d_86f0466ce4bd465aa92f9125e6c2d64b~mv2.jpg", file: "gallery-11.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 11", type: "image" },
  { id: "bc709d_a7ed91c8dcac4be7a9f034ff987aa9bb~mv2.jpg", file: "gallery-12.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 12", type: "image" },
  { id: "bc709d_781a5f7fcec54ee7a9ecffcb534838b0~mv2.jpg", file: "gallery-13.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 13", type: "image" },
  { id: "bc709d_d8bf0a9fe39d4a75bf296b088d8fd38b~mv2_d_2048_1363_s_2.jpg", file: "gallery-14.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 14", type: "image" },
  { id: "bc709d_11f7ef21ea5444ed9d0ccd4d148de885~mv2_d_1363_2048_s_2.jpg", file: "gallery-15.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 15", type: "image" },
  { id: "bc709d_7b516da0fd0c496b938408ccb2e29acc~mv2_d_1816_1208_s_2.jpg", file: "gallery-16.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 16", type: "image" },
  { id: "bc709d_0b579ca32e33489a8f16e7ac3068d26e~mv2.jpg", file: "gallery-17.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 17", type: "image" },
  { id: "bc709d_75356d6d72a04528bf7fbe079210972c~mv2_d_1363_2048_s_2.jpg", file: "gallery-18.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 18", type: "image" },
  { id: "bc709d_485ff9607ca84b72a23d04c219941933~mv2_d_1363_2048_s_2.jpg", file: "gallery-19.jpg", page: "gallery", alt: "The Kings of Strings gallery photo 19", type: "image" },
];

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function download(url, dest) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (asset-migration)" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return buf.length;
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(path.dirname(MANIFEST), { recursive: true });

  const manifest = [];
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const a of ASSETS) {
    const sourceUrl = WIX_BASE + a.id;
    const dest = path.join(OUT_DIR, a.file);
    const localPath = `/media/original/${a.file}`;

    let bytes = null;
    let width = null;
    let height = null;
    try {
      if (FORCE || !(await exists(dest))) {
        await download(sourceUrl, dest);
        downloaded++;
        console.log(`saved  ${a.file}`);
      } else {
        skipped++;
        console.log(`skip   ${a.file}`);
      }
      // Read the file back to record size and intrinsic dimensions, which the
      // gallery uses for masonry layout and to prevent layout shift.
      const buf = await readFile(dest);
      bytes = buf.length;
      const dim = imageSize(buf);
      width = dim.width ?? null;
      height = dim.height ?? null;
    } catch (err) {
      failed++;
      console.error(`FAILED ${a.file}: ${err.message}`);
    }

    manifest.push({
      title: a.file.replace(/\.[^.]+$/, "").replace(/-/g, " "),
      type: a.type,
      sourceUrl,
      localPath,
      localFilename: a.file,
      page: a.page,
      altText: a.alt,
      width,
      height,
      bytes,
      ...(a.note ? { note: a.note } : {}),
    });
  }

  await writeFile(MANIFEST, JSON.stringify(manifest, null, 2) + "\n", "utf8");

  console.log(
    `\nDone. downloaded=${downloaded} skipped=${skipped} failed=${failed} total=${ASSETS.length}`
  );
  console.log(`Manifest: ${path.relative(ROOT, MANIFEST)}`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
