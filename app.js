const copy = {
  zh: {
    navVideos: "讲课视频",
    navArticles: "文章",
    navInsights: "AI资讯",
    navContact: "合作咨询",
    heroEyebrow: "AI专业导师 / 企业增长顾问",
    heroTitle: "周威俊",
    heroKicker: "把 AI 从热点，变成企业增长系统。",
    heroBody:
      "面向企业负责人、经销商与内容团队，提供 AI 实战培训、数字人短视频体系、门店获客矩阵与企业智能体工作流设计。",
    heroCta: "预约AI咨询",
    heroSecondary: "观看讲课片段",
    authorityEyebrow: "Authority",
    authorityTitle: "企业AI落地，不讲概念。",
    authorityBody:
      "下面展示的是你服务与合作过的企业类型。真正的专业性来自业务场景、培训交付、内容系统和可复盘的增长结果。",
    galleryEyebrow: "Visual Identity",
    galleryTitle: "用影像建立第一信任。",
    videosEyebrow: "Teaching Videos",
    videosTitle: "讲课、演示、短视频样片。",
    articlesEyebrow: "Articles",
    articlesTitle: "文章观点与方法论。",
    insightsEyebrow: "Daily AI Radar",
    insightsTitle: "每天更新全球AI资讯。",
    newsSourceLink: "查看数据源",
    contactEyebrow: "Collaboration",
    contactTitle: "让客户在3分钟内理解你能解决什么问题。",
    contactBody:
      "可用于企业内训、经销商AI获客培训、短视频矩阵搭建、数字人内容工厂和AI工作流咨询。替换这里的联系方式后，即可作为对外宣传主页。",
    footerLine: "AI strategy, content systems, and practical training.",
    updated: "更新时间",
    readMore: "了解更多"
  },
  en: {
    navVideos: "Videos",
    navArticles: "Articles",
    navInsights: "AI Radar",
    navContact: "Contact",
    heroEyebrow: "AI Professional Mentor / Enterprise Growth Advisor",
    heroTitle: "Zhou Weijun",
    heroKicker: "Turning AI from headline into business growth systems.",
    heroBody:
      "Practical AI training, avatar video systems, retail lead-generation matrices, and enterprise agent workflows for leaders, dealers, and content teams.",
    heroCta: "Book AI Advisory",
    heroSecondary: "Watch Lessons",
    authorityEyebrow: "Authority",
    authorityTitle: "Enterprise AI implementation, not theory.",
    authorityBody:
      "The logos below show the business contexts you serve. Authority comes from real scenarios, training delivery, content systems, and measurable growth outcomes.",
    galleryEyebrow: "Visual Identity",
    galleryTitle: "Trust starts with a strong visual signal.",
    videosEyebrow: "Teaching Videos",
    videosTitle: "Lessons, demos, and short-form clips.",
    articlesEyebrow: "Articles",
    articlesTitle: "Point of view and methodology.",
    insightsEyebrow: "Daily AI Radar",
    insightsTitle: "Daily global AI updates.",
    newsSourceLink: "View data",
    contactEyebrow: "Collaboration",
    contactTitle: "Help clients understand your value in three minutes.",
    contactBody:
      "Designed for corporate training, AI lead-generation programs, short-video matrices, avatar content factories, and AI workflow consulting. Replace the contact details to use it as a public homepage.",
    footerLine: "AI strategy, content systems, and practical training.",
    updated: "Updated",
    readMore: "Read more"
  }
};

const state = {
  lang: localStorage.getItem("site-language") || "zh",
  data: null,
  news: null
};

const $ = (selector) => document.querySelector(selector);

async function getJson(path) {
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) throw new Error(`Cannot load ${path}`);
  return response.json();
}

function textFor(item, key) {
  if (state.lang === "en" && item[`${key}En`]) return item[`${key}En`];
  return item[key] || "";
}

function setCopy() {
  document.documentElement.lang = state.lang === "en" ? "en" : "zh-CN";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = copy[state.lang][node.dataset.i18n] || node.textContent;
  });
  $("[data-language-toggle]").textContent = state.lang === "en" ? "中文" : "EN";
}

function renderProof() {
  const host = $("[data-proof-strip]");
  host.replaceChildren();
  state.data.proof.forEach((item) => {
    const wrapper = document.createElement("div");
    const value = document.createElement("dt");
    const label = document.createElement("dd");
    value.textContent = item.value;
    label.textContent = textFor(item, "label");
    wrapper.append(value, label);
    host.append(wrapper);
  });
}

function renderExpertise() {
  const host = $("[data-expertise-list]");
  host.replaceChildren();
  state.data.expertise.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "expertise-item";
    const number = document.createElement("span");
    number.className = "expertise-index";
    number.textContent = String(index + 1).padStart(2, "0");
    const body = document.createElement("div");
    const title = document.createElement("strong");
    const text = document.createElement("span");
    title.textContent = textFor(item, "title");
    text.textContent = textFor(item, "body");
    body.append(title, text);
    row.append(number, body);
    host.append(row);
  });
}

function renderPartners() {
  const host = $("[data-partner-wall]");
  host.replaceChildren();
  state.data.partners.forEach((item) => {
    const card = document.createElement("div");
    card.className = "partner-logo";
    if (item.logo) {
      const img = document.createElement("img");
      img.src = item.logo;
      img.alt = textFor(item, "name");
      card.append(img);
    } else {
      const text = document.createElement("span");
      text.textContent = textFor(item, "name");
      card.append(text);
    }
    host.append(card);
  });
}

function renderGallery() {
  const host = $("[data-image-gallery]");
  host.replaceChildren();
  state.data.gallery.forEach((item) => {
    const figure = document.createElement("figure");
    figure.className = "gallery-item";
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = textFor(item, "caption");
    const caption = document.createElement("figcaption");
    caption.className = "gallery-caption";
    caption.textContent = textFor(item, "caption");
    figure.append(img, caption);
    host.append(figure);
  });
}

function renderVideos() {
  const host = $("[data-video-grid]");
  host.replaceChildren();
  state.data.videos.forEach((item) => {
    const card = document.createElement("article");
    card.className = "video-card";
    const frame = document.createElement("div");
    frame.className = "video-frame";
    const video = document.createElement("video");
    video.src = item.src;
    video.poster = item.poster;
    video.controls = true;
    video.playsInline = true;
    video.preload = "metadata";
    const content = document.createElement("div");
    content.className = "video-content";
    content.append(metaLine([textFor(item, "category"), item.date]));
    const title = document.createElement("h3");
    const summary = document.createElement("p");
    title.textContent = textFor(item, "title");
    summary.textContent = textFor(item, "summary");
    content.append(title, summary);
    frame.append(video);
    card.append(frame, content);
    host.append(card);
  });
}

function renderArticles() {
  const host = $("[data-article-grid]");
  host.replaceChildren();
  state.data.articles.forEach((item) => {
    const card = document.createElement("article");
    card.className = "article-card";
    const top = document.createElement("div");
    top.append(metaLine([textFor(item, "tag"), item.date]));
    const title = document.createElement("h3");
    const summary = document.createElement("p");
    title.textContent = textFor(item, "title");
    summary.textContent = textFor(item, "summary");
    top.append(title, summary);
    const link = document.createElement("a");
    link.href = item.link;
    link.textContent = copy[state.lang].readMore;
    card.append(top, link);
    host.append(card);
  });
}

function renderNews() {
  const host = $("[data-news-grid]");
  const news = state.news?.items?.length ? state.news : state.data.fallbackNews;
  host.replaceChildren();
  $("[data-news-updated]").textContent = `${copy[state.lang].updated}: ${formatDate(news.generatedAt)}`;
  news.items.slice(0, 8).forEach((item) => {
    const card = document.createElement("article");
    card.className = "news-card";
    if (item.image) {
      const imageWrap = document.createElement("div");
      imageWrap.className = "news-image";
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = textFor(item, "title");
      imageWrap.append(img);
      card.append(imageWrap);
    }
    const top = document.createElement("div");
    top.className = "news-content";
    top.append(metaLine([item.source, item.date]));
    const title = document.createElement("h3");
    const summary = document.createElement("p");
    title.textContent = textFor(item, "title");
    summary.textContent = textFor(item, "summary");
    top.append(title, summary);
    const link = document.createElement("a");
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = copy[state.lang].readMore;
    card.append(top, link);
    host.append(card);
  });
}

function metaLine(items) {
  const line = document.createElement("div");
  line.className = "meta-line";
  items.filter(Boolean).forEach((item) => {
    const span = document.createElement("span");
    span.textContent = item;
    line.append(span);
  });
  return line;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString(state.lang === "en" ? "en-US" : "zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function renderAll() {
  setCopy();
  renderProof();
  renderExpertise();
  renderPartners();
  renderGallery();
  renderVideos();
  renderArticles();
  renderNews();
}

async function boot() {
  state.data = await getJson("content/site-data.json");
  try {
    state.news = await getJson("content/news.generated.json");
  } catch {
    state.news = state.data.fallbackNews;
  }
  $("[data-language-toggle]").addEventListener("click", () => {
    state.lang = state.lang === "zh" ? "en" : "zh";
    localStorage.setItem("site-language", state.lang);
    renderAll();
  });
  renderAll();
}

boot().catch((error) => {
  document.body.innerHTML = `<main class="content-section"><h1>Content failed to load</h1><p>${error.message}</p></main>`;
});
