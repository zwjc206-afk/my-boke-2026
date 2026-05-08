import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const [, , sourceVideo, title, summary = "", posterSource = ""] = process.argv;

if (!sourceVideo || !title) {
  console.log('Usage: node scripts/add-video.mjs "/path/to/video.mp4" "视频标题" "一句话介绍" "/path/to/poster.jpg"');
  process.exit(1);
}

const siteDataPath = path.resolve("content/site-data.json");
const videoDir = path.resolve("public/assets/videos");
const imageDir = path.resolve("public/assets/images");
const sourceExt = path.extname(sourceVideo).toLowerCase() || ".mp4";
const slug = slugify(title);
const stamp = new Date().toISOString().slice(0, 10);
const videoName = `${stamp}-${slug}${sourceExt}`;
const videoOut = path.join(videoDir, videoName);

await mkdir(videoDir, { recursive: true });
await mkdir(imageDir, { recursive: true });
await copyFile(sourceVideo, videoOut);

let poster = "public/assets/images/short-01.jpg";
if (posterSource) {
  const posterExt = path.extname(posterSource).toLowerCase() || ".png";
  const posterName = `${stamp}-${slug}-poster${posterExt}`;
  const posterOut = path.join(imageDir, posterName);
  await copyFile(posterSource, posterOut);
  poster = `public/assets/images/${posterName}`;
}

const data = JSON.parse(await readFile(siteDataPath, "utf8"));
data.videos.unshift({
  title,
  titleEn: title,
  category: "新上传",
  categoryEn: "New Upload",
  date: stamp,
  duration: "Video",
  src: `public/assets/videos/${videoName}`,
  poster,
  summary,
  summaryEn: summary
});

await writeFile(siteDataPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
console.log(`Added video: public/assets/videos/${videoName}`);

function slugify(value) {
  const ascii = value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();
  return ascii || `video-${Date.now()}`;
}
