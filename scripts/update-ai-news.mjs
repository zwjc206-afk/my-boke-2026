import { writeFile } from "node:fs/promises";
import path from "node:path";

const outputPath = path.resolve("content/news.generated.json");

const feeds = [
  {
    source: "OpenAI",
    url: "https://openai.com/news/rss.xml",
    keywords: ["model", "api", "chatgpt", "agent", "safety", "research", "openai"]
  },
  {
    source: "Google AI",
    url: "https://blog.google/technology/ai/rss/",
    keywords: ["ai", "gemini", "deepmind", "agent", "model"]
  },
  {
    source: "NVIDIA Blog",
    url: "https://blogs.nvidia.com/feed/",
    keywords: ["ai", "agent", "gpu", "robotics", "model", "enterprise"]
  },
  {
    source: "Microsoft AI",
    url: "https://www.microsoft.com/en-us/ai/blog/rss",
    keywords: ["ai", "copilot", "agent", "model", "cloud"]
  }
];

const maxItems = 12;
const sourceImages = {
  OpenAI: "public/assets/images/news-openai.jpg",
  "Google AI": "public/assets/images/news-google.jpg",
  "NVIDIA Blog": "public/assets/images/news-nvidia.jpg",
  "Microsoft AI": "public/assets/images/news-microsoft.jpg"
};

function decodeEntities(value = "") {
  return value
    .replaceAll("<![CDATA[", "")
    .replaceAll("]]>", "")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .trim();
}

function stripHtml(value = "") {
  return decodeEntities(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function takeTag(xml, tag) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function takeAttr(xml, tagPattern, attr) {
  const match = xml.match(new RegExp(`<${tagPattern}[^>]*\\s${attr}=["']([^"']+)["'][^>]*>`, "i"));
  return match ? decodeEntities(match[1]) : "";
}

function extractImage(chunk, description, source) {
  return (
    takeAttr(chunk, "media:content", "url") ||
    takeAttr(chunk, "media:thumbnail", "url") ||
    takeAttr(chunk, "enclosure", "url") ||
    takeAttr(description, "img", "src") ||
    sourceImages[source] ||
    "public/assets/images/news-ai-default.jpg"
  );
}

function matchesKeyword(text, keyword) {
  const normalized = keyword.toLowerCase();
  if (normalized === "ai") return /\bai\b|artificial intelligence/.test(text);
  return text.includes(normalized);
}

function topicFrom(text) {
  const value = text.toLowerCase();
  if (/cyber|security|trusted access|vulnerability/.test(value)) return "网络安全与可信访问";
  if (/voice|audio|speech/.test(value)) return "语音智能与多模态交互";
  if (/agent|agents|orchestr|copilot/.test(value)) return "智能体与企业工作流";
  if (/api|model|gpt|gemini|llama/.test(value)) return "模型能力与API应用";
  if (/robot|automation|industrial/.test(value)) return "机器人与自动化";
  if (/cloud|gpu|data center|infrastructure/.test(value)) return "算力基础设施";
  if (/ads|advertising|monetization/.test(value)) return "AI产品商业化";
  return "AI产业动态";
}

function localizedTitle(source, title, description) {
  const text = `${title} ${description}`;
  const topic = topicFrom(text);
  if (/Scaling Trusted Access for Cyber/i.test(title)) return "OpenAI 扩展 GPT-5.5 网络安全可信访问能力";
  if (/voice intelligence/i.test(title)) return "OpenAI API 推出新一代语音智能模型";
  if (/service agents/i.test(title)) return "OpenAI 发布服务智能体客户案例";
  if (/Trusted Contact/i.test(title)) return "ChatGPT 引入可信联系人功能";
  if (/ads in ChatGPT/i.test(title)) return "OpenAI 开始测试 ChatGPT 广告形态";
  if (/Genesis Mission/i.test(title)) return "NVIDIA 参与美国能源部 Genesis Mission AI 项目";
  if (/garden|gardening/i.test(title)) return "Google 用 AI 帮助用户规划家庭花园";
  if (source === "OpenAI") return `OpenAI 最新动态：${topic}`;
  if (source === "Google AI") return `Google AI 最新动态：${topic}`;
  if (source === "NVIDIA Blog") return `NVIDIA AI 最新动态：${topic}`;
  if (source === "Microsoft AI") return `Microsoft AI 最新动态：${topic}`;
  return `全球AI动态：${topic}`;
}

function localizedSummary(source, title, description) {
  const topic = topicFrom(`${title} ${description}`);
  const sourceName = source.replace(" Blog", "");
  return `${sourceName} 发布与「${topic}」相关的新进展。对企业客户的价值在于：判断AI能力如何进入产品、流程、内容生产和经营决策，而不是停留在工具尝鲜。`;
}

function parseFeed(xml, source, keywords) {
  const chunks = xml.match(/<item[\s\S]*?<\/item>|<entry[\s\S]*?<\/entry>/gi) || [];
  return chunks
    .map((chunk) => {
      const title = stripHtml(takeTag(chunk, "title"));
      const description = stripHtml(takeTag(chunk, "description") || takeTag(chunk, "summary") || takeTag(chunk, "content"));
      const link =
        takeTag(chunk, "link") ||
        (chunk.match(/<link[^>]+href=["']([^"']+)["']/i)?.[1] ? decodeEntities(chunk.match(/<link[^>]+href=["']([^"']+)["']/i)[1]) : "");
      const dateText = takeTag(chunk, "pubDate") || takeTag(chunk, "updated") || takeTag(chunk, "published");
      const date = dateText ? new Date(dateText) : new Date();
      const haystack = `${title} ${description}`.toLowerCase();
      const isRelevant = keywords.some((keyword) => matchesKeyword(haystack, keyword));
      const image = extractImage(chunk, description, source);
      return {
        source,
        title: localizedTitle(source, title, description),
        titleEn: title,
        date: Number.isNaN(date.getTime()) ? "" : date.toISOString().slice(0, 10),
        sortDate: Number.isNaN(date.getTime()) ? 0 : date.getTime(),
        summary: localizedSummary(source, title, description),
        summaryEn: description.slice(0, 140),
        url: link,
        image,
        isRelevant
      };
    })
    .filter((item) => item.title && item.url && item.isRelevant);
}

async function fetchFeed(feed) {
  const response = await fetch(feed.url, {
    headers: { "user-agent": "AI mentor website updater" }
  });
  if (!response.ok) throw new Error(`${feed.source} returned ${response.status}`);
  const xml = await response.text();
  return parseFeed(xml, feed.source, feed.keywords);
}

const results = await Promise.allSettled(feeds.map(fetchFeed));
const items = results
  .flatMap((result) => (result.status === "fulfilled" ? result.value : []))
  .sort((a, b) => b.sortDate - a.sortDate)
  .slice(0, maxItems)
  .map(({ sortDate, isRelevant, ...item }) => item);

const payload = {
  generatedAt: new Date().toISOString(),
  sources: feeds.map(({ source, url }) => ({ source, url })),
  items
};

await writeFile(outputPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
console.log(`Updated ${outputPath} with ${items.length} AI news items.`);
