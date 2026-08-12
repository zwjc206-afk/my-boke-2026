/* ============================================================
   cases.js — AI落地实验室页面：项目卡 + 视频 + 画廊 + 灯箱
   ============================================================ */

"use strict";

const LAB_PROJECTS = [
  {
    title: "AI门店智能助手",
    en: "AI Store Assistant",
    desc: "探索AI如何进入照明门店真实销售场景。",
    tags: ["AI配灯", "AI产品推荐", "AI销售", "AI运营", "智能商城"]
  },
  {
    title: "AI短视频生产系统",
    en: "AI Video System",
    desc: "探索AI如何降低企业短视频生产成本，从选题到剪辑逐步实现自动化。",
    tags: ["选题", "文案", "图片", "视频", "数字人", "剪辑"]
  },
  {
    title: "品牌短视频矩阵",
    en: "Brand Video Matrix",
    desc: "探索一个总部如何同时为几十个门店持续提供内容。",
    tags: ["一套内容系统", "服务几十个门店", "运营几十个账号"]
  },
  {
    title: "经销商个人IP系统",
    en: "Dealer IP System",
    desc: "帮助传统经销商通过AI快速建立自己的本地IP，让门店老板逐渐成为本地内容节点。",
    tags: ["本地IP", "AI内容", "门店老板"]
  },
  {
    title: "企业Agent",
    en: "Enterprise Agents",
    desc: "围绕真实企业岗位设计AI Agent，让AI承担具体岗位任务。",
    tags: ["信息整理", "内容生成", "数据分析", "任务执行", "知识检索", "运营辅助"]
  },
  {
    title: "AI一天实验室",
    en: "AI-One-Day Lab",
    desc: "持续测试最新AI能力，把它们转化成普通企业能够真正落地的方法。",
    tags: ["GPT", "Agent", "AI自动化", "AI视频", "AI编程", "AI内容生产"]
  }
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* ---------------- 实验室项目 ---------------- */

function renderLab() {
  const grid = $("#labGrid");
  if (!grid) return;
  LAB_PROJECTS.forEach((p, i) => {
    const card = el("article", "lab-card reveal");
    card.style.transitionDelay = `${(i % 3) * 0.08}s`;
    card.append(el("span", "lab-status", "IN PROGRESS · 实践中"));
    card.append(el("h3", null, p.title));
    card.append(el("div", "lab-en mono", p.en));
    card.append(el("p", "lab-desc", p.desc));
    const tags = el("ul", "lab-tags");
    p.tags.forEach((t) => tags.append(el("li", null, t)));
    card.append(tags);
    grid.append(card);
  });
}

/* ---------------- 视频 + 画廊 ---------------- */

function renderVideos(data) {
  const grid = $("#videoGrid");
  if (!grid || !data.videos) return;

  data.videos.forEach((v, i) => {
    const card = el("article", "video-card reveal");
    card.style.transitionDelay = `${(i % 3) * 0.08}s`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `播放视频：${v.title}`);

    const thumb = el("div", "video-thumb");
    const img = document.createElement("img");
    img.src = v.poster;
    img.alt = v.title;
    img.loading = "lazy";
    const play = el("div", "video-play");
    play.append(el("span", null, "▶"));
    thumb.append(img, play);

    const meta = el("div", "video-meta");
    const line = el("div", "meta-line");
    line.append(el("span", null, v.category), el("span", null, v.duration));
    meta.append(line, el("h4", null, v.title));

    card.append(thumb, meta);

    const open = () => openLightbox(v);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });
    grid.append(card);
  });
}

function renderGallery(data) {
  const strip = $("#galleryStrip");
  if (!strip || !data.gallery) return;
  data.gallery.forEach((g) => {
    const fig = el("figure", "gallery-item reveal");
    const img = document.createElement("img");
    img.src = g.image;
    img.alt = g.caption;
    img.loading = "lazy";
    fig.append(img, el("figcaption", null, g.caption));
    strip.append(fig);
  });
}

/* ---------------- 灯箱 ---------------- */

function openLightbox(video) {
  const box = $("#videoLightbox");
  const frame = $("#lightboxFrame");
  const player = document.createElement("video");
  player.src = video.src;
  player.poster = video.poster;
  player.controls = true;
  player.playsInline = true;
  player.autoplay = true;
  frame.replaceChildren(player);
  box.classList.add("is-open");
  box.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const box = $("#videoLightbox");
  const frame = $("#lightboxFrame");
  const player = $("video", frame);
  if (player) player.pause();
  frame.replaceChildren();
  box.classList.remove("is-open");
  box.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function initLightbox() {
  $("#lightboxClose").addEventListener("click", closeLightbox);
  $("#videoLightbox").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

/* ---------------- reveal 观察 ---------------- */

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

/* ---------------- 启动 ---------------- */

async function boot() {
  const res = await fetch("content/site-data.json", { cache: "no-store" });
  if (!res.ok) throw new Error("Cannot load site-data.json");
  const data = await res.json();

  renderLab();
  renderVideos(data);
  renderGallery(data);
  initLightbox();
  observeReveals();
}

boot().catch((err) => {
  console.error(err);
});
