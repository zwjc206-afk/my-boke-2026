/* ============================================================
   insights.js — AI洞察页面：栏目卡 + 新闻筛选流
   ============================================================ */

"use strict";

const COLUMNS = [
  { title: "AI洞察", en: "AI Insights", desc: "解释全球AI重大变化，帮企业管理者看懂哪些值得关注。" },
  { title: "AI实战", en: "AI Practice", desc: "分享真正能够使用的AI工作流程，拿来就能跑。" },
  { title: "Agent实验室", en: "Agent Lab", desc: "Agent、Skills、自动化案例的第一手实验记录。" },
  { title: "企业AI", en: "Enterprise AI", desc: "分享AI进入真实企业经营的实践与复盘。" }
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

let newsFilter = "all";

function renderColumns() {
  const grid = $("#columnsGrid");
  if (!grid) return;
  COLUMNS.forEach((c, i) => {
    const card = el("article", "column-card reveal");
    card.style.transitionDelay = `${i * 0.07}s`;
    card.append(el("span", "col-index mono", `COLUMN ${String(i + 1).padStart(2, "0")}`));
    card.append(el("h3", null, c.title));
    card.append(el("div", "col-en mono", c.en));
    card.append(el("p", null, c.desc));
    grid.append(card);
  });
}

function renderNews(data, fallback) {
  const grid = $("#newsGrid");
  const filtersHost = $("#newsFilters");
  const updated = $("#newsUpdated");
  if (!grid) return;

  const news = data && data.items && data.items.length ? data : fallback;
  const items = (news.items || []).slice(0, 12);

  if (updated) {
    const d = new Date(news.generatedAt);
    updated.textContent = Number.isNaN(d.getTime())
      ? `更新时间 ${news.generatedAt}`
      : `更新时间 ${d.toLocaleString("zh-CN", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" })}`;
  }

  const sources = ["all", ...new Set(items.map((it) => it.source))];
  filtersHost.replaceChildren();
  sources.forEach((src) => {
    const btn = el("button", "news-filter", src === "all" ? "全部" : src);
    btn.type = "button";
    if (src === newsFilter) btn.classList.add("is-active");
    btn.addEventListener("click", () => {
      newsFilter = src;
      $$(".news-filter", filtersHost).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      paintNews(items);
    });
    filtersHost.append(btn);
  });

  function paintNews(list) {
    grid.replaceChildren();
    const filtered = newsFilter === "all"
      ? list
      : list.filter((it) => it.source === newsFilter);
    filtered.forEach((it) => {
      const card = el("article", "news-card");
      const line = el("div", "meta-line");
      line.append(el("span", "src", it.source), el("span", null, it.date));
      card.append(line);
      card.append(el("h3", null, it.title));
      if (it.summary) card.append(el("p", null, it.summary));
      const link = document.createElement("a");
      link.className = "news-link";
      link.href = it.url;
      link.target = "_blank";
      link.rel = "noreferrer";
      link.textContent = "阅读原文 →";
      card.append(link);
      grid.append(card);
    });
  }

  paintNews(items);
}

function observeReveals() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  $$(".reveal").forEach((node) => io.observe(node));
}

async function boot() {
  const res = await fetch("content/site-data.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Cannot load site-data.json");
  const siteData = await res.json();

  let news = null;
  try {
    const nres = await fetch("content/news.generated.json", { cache: "no-store" });
    if (nres.ok) news = await nres.json();
  } catch {
    news = null;
  }

  renderColumns();
  renderNews(news, siteData.fallbackNews);
  observeReveals();
}

boot().catch((err) => console.error(err));
