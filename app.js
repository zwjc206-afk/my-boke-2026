/* ============================================================
   周威俊个人官网 2026 — 交互逻辑
   内容数据 + 动态渲染 + 交互动效
   ============================================================ */

"use strict";

/* ---------------- 内容数据 ---------------- */

const PROBLEMS = [
  {
    title: "企业 AI 化",
    en: "Enterprise AI Adoption",
    desc: "让AI进入企业真实工作流程。从文案、设计、视频、数据分析，到知识库、Agent和自动化任务。目标不是让员工多使用几个AI软件。",
    goal: "减少重复工作，提高人效，降低企业运营成本。"
  },
  {
    title: "门店数字化",
    en: "Retail Digitalization",
    desc: "重新连接品牌总部、经销商和消费者。通过AI门店助手、AI配灯师、AI销冠助手、产品数字化、实时报价、内容下发、导购终端、客户线索管理。",
    goal: "让传统门店逐步升级成为：数字化门店 + 内容门店 + AI销售终端。"
  },
  {
    title: "AI内容增长",
    en: "AI Content Growth",
    desc: "把传统内容生产升级成AI内容生产系统。过去：一个人拍一个视频、剪一个视频、运营一个账号。现在：一个内容中台 × AI批量生产 × 多门店 × 多账号 × 多城市分发。",
    goal: "让企业建立真正属于自己的 AI内容工厂：内容生产 → 矩阵分发 → 流量获取 → 客户线索 → 销售转化，完整闭环。"
  },
  {
    title: "企业增长",
    en: "Business Growth",
    desc: "AI最终不是为了“先进”，而是为了增长。我关注的核心不是“这个AI功能酷不酷”，而是它能不能真正产生经营结果。",
    goal: "能不能降低成本？能不能提高效率？能不能产生内容？能不能产生客户？能不能产生订单？——这是我判断所有AI项目是否值得做的核心标准。"
  }
];

const SERVICES = [
  {
    index: "01",
    title: "企业 AI 战略与落地",
    en: "AI Strategy & Roadmap",
    desc: "帮助企业判断：哪些业务适合AI改造？哪些工作可以自动化？哪些岗位可以提效？哪些AI项目值得投入？最终形成企业自己的 AI应用地图 + AI落地路线图。",
    fit: ["企业老板", "管理层", "品牌公司", "连锁企业", "传统制造企业"]
  },
  {
    index: "02",
    title: "AI Agent 与自动化工作流",
    en: "AI Agents & Automation",
    desc: "把企业重复发生的工作变成AI工作流：AI Agent、Skills、企业知识库、文案/营销/运营/数据分析/内容生产 Agent、自动任务流程。核心目标：让AI开始真正干活，而不是每一次都需要人工重新输入Prompt。",
    fit: ["重复流程多的团队", "内容与运营", "知识密集型企业"]
  },
  {
    index: "03",
    title: "AI短视频内容工厂",
    en: "AI Video Content Factory",
    desc: "帮助企业建立AI驱动的内容生产体系，覆盖选题、文案、图片、数字人、声音克隆、AI视频、自动剪辑、封面、批量生成、多平台发布。从人工做视频，升级成企业AI内容生产线。",
    fit: ["品牌市场部", "连锁门店", "个人IP"]
  },
  {
    index: "04",
    title: "短视频矩阵获客",
    en: "Video Matrix Acquisition",
    desc: "帮助品牌和连锁门店建立总部内容中心、区域账号、门店账号、经销商账号、老板IP账号，形成总部生产 × 门店分发 × 本地流量 × 私域转化的内容矩阵。",
    fit: ["连锁品牌", "经销商体系", "加盟体系", "本地生活", "制造业品牌"]
  },
  {
    index: "05",
    title: "门店数字化增长",
    en: "Smart Store Growth",
    desc: "传统门店未来最大的变化，不只是线上商城，而是AI开始进入门店经营：AI导购、AI销售助手、AI产品推荐、AI报价、AI配灯、数字商城、门店内容营销、客户线索管理。",
    fit: ["建材家居门店", "连锁零售", "经销商终端"]
  },
  {
    index: "06",
    title: "企业 AI 培训与陪跑",
    en: "AI Training & Coaching",
    desc: "AI培训不能只教ChatGPT怎么用，企业真正需要的是：自己的业务到底怎么用AI。围绕老板AI认知、管理层应用、员工提效、Agent、自动化、内容生产、营销与知识库展开，最终让企业拥有一批真正能够使用AI的人。",
    fit: ["企业内训", "管理层工作坊", "长期陪跑"]
  }
];

const METHOD_STEPS = [
  { zh: "业务", en: "Business", desc: "先理解企业靠什么赚钱、增长卡在哪里——AI的起点永远不是技术，而是业务问题。" },
  { zh: "流程", en: "Process", desc: "把业务拆到每天真实发生的工作流程，找到重复、低效和高价值的环节。" },
  { zh: "数据", en: "Data", desc: "盘点流程里沉淀的数据与知识——产品资料、话术、案例、客户记录，它们是AI的燃料。" },
  { zh: "AI", en: "AI", desc: "在最有价值的环节引入AI能力，让模型读懂你的业务，而不是泛泛地聊天。" },
  { zh: "自动化", en: "Automation", desc: "把AI变成自动运行的工作流与Agent，让系统自己跑，而不是每次都靠人工输入Prompt。" },
  { zh: "增长", en: "Growth", desc: "用降本、提效、内容、客户和订单来验证结果——增长是唯一的答案。" }
];

const FRAMEWORK = [
  { title: "发现问题", en: "Discover", desc: "人工重复、成本过高、效率低、内容不足、门店不会运营——先诚实地看见问题。" },
  { title: "AI诊断", en: "Diagnose", desc: "找到最值得AI改造的环节，不是全面铺开，而是选准切入点。" },
  { title: "工作流设计", en: "Design", desc: "重新设计人与AI的协作方式：哪些留给人的判断，哪些交给AI执行。" },
  { title: "Agent建设", en: "Build", desc: "让AI承担具体岗位任务，成为真正的数字员工，而不是一个对话框。" },
  { title: "系统连接", en: "Connect", desc: "连接内容、产品、门店和数据，打通孤岛，让信息自己流动。" },
  { title: "自动执行", en: "Automate", desc: "减少人工重复操作，让流程7×24小时稳定运转。" },
  { title: "数据反馈", en: "Feedback", desc: "用数据持续优化，每一次执行都让系统变得更聪明。" },
  { title: "规模复制", en: "Scale", desc: "复制到更多员工、门店和业务——从单点成功到系统能力。" }
];

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

const COLUMNS = [
  { title: "AI洞察", en: "AI Insights", desc: "解释全球AI重大变化，帮企业管理者看懂哪些值得关注。" },
  { title: "AI实战", en: "AI Practice", desc: "分享真正能够使用的AI工作流程，拿来就能跑。" },
  { title: "Agent实验室", en: "Agent Lab", desc: "Agent、Skills、自动化案例的第一手实验记录。" },
  { title: "企业AI", en: "Enterprise AI", desc: "分享AI进入真实企业经营的实践与复盘。" }
];

const AUDIENCE = [
  { title: "传统制造企业", desc: "希望通过AI降低运营和内容成本" },
  { title: "品牌企业", desc: "希望建立AI营销和内容体系" },
  { title: "连锁与加盟企业", desc: "需要总部赋能大量门店" },
  { title: "经销商体系", desc: "希望帮助终端门店获得流量" },
  { title: "创始人IP", desc: "希望建立AI驱动的个人内容体系" },
  { title: "正在数字化转型的企业", desc: "正在建设商城、CRM、AI系统或Agent" }
];

const COOPERATION = [
  { step: "01", title: "AI诊断", en: "Diagnose", desc: "分析企业当前业务、流程、团队、内容、营销、数字化系统，找到最值得AI改造的环节。" },
  { step: "02", title: "AI方案设计", en: "Design", desc: "形成AI项目地图、实施优先级、工作流、Agent方案与技术路线。" },
  { step: "03", title: "MVP验证", en: "Validate", desc: "先解决一个真实业务问题，而不是一开始建设巨大AI平台。" },
  { step: "04", title: "规模复制", en: "Scale", desc: "验证有效以后，复制到更多岗位、部门、门店和业务。" }
];

/* ---------------- AI就绪度自测 ---------------- */

const QUIZ = [
  {
    q: "你的企业里，有多少工作正在被重复的人工操作消耗？",
    options: [
      { text: "很多：文案、报价、整理、回复都靠人工", score: 3 },
      { text: "一些：部分环节重复，但还能接受", score: 2 },
      { text: "不多：流程已经比较精简", score: 1 }
    ]
  },
  {
    q: "你的内容生产现状是怎样的？",
    options: [
      { text: "基本没有稳定的内容产出", score: 3 },
      { text: "有人在做，但产量低、不稳定", score: 2 },
      { text: "已有稳定的内容团队和产出", score: 1 }
    ]
  },
  {
    q: "你的团队现在使用AI的程度？",
    options: [
      { text: "几乎没用过，或只是偶尔聊聊", score: 3 },
      { text: "个别人在用ChatGPT类工具", score: 2 },
      { text: "部分岗位已经常态化使用", score: 1 }
    ]
  },
  {
    q: "你的企业数据与知识沉淀在哪里？",
    options: [
      { text: "散落在个人电脑、微信群和员工脑子里", score: 3 },
      { text: "有文件/表格，但没有统一管理", score: 2 },
      { text: "有系统沉淀（CRM、知识库、ERP等）", score: 1 }
    ]
  },
  {
    q: "你希望AI首先帮你解决什么？",
    options: [
      { text: "降低成本、减少重复工作", score: 1 },
      { text: "批量生产内容、获取客户线索", score: 2 },
      { text: "让门店/一线员工用上AI获得客户", score: 3 }
    ]
  }
];

const QUIZ_RESULTS = [
  {
    min: 5, max: 7,
    level: "LEVEL A",
    title: "AI就绪度：高 — 适合直接启动MVP",
    desc: "你的企业痛点清晰、改造空间大。不需要大平台，先选一个真实业务问题跑通MVP，30天内就能看到变化。",
    rec: "推荐切入点：AI工作流自动化 + 企业知识库。把最重复的岗位任务交给Agent，让AI先开始干活。"
  },
  {
    min: 8, max: 11,
    level: "LEVEL B",
    title: "AI就绪度：中 — 适合内容+获客先行",
    desc: "你已经有部分基础，但内容生产和获客链路还没有被AI重构。这是大多数企业回报率最高的切入点。",
    rec: "推荐切入点：AI短视频内容工厂 + 短视频矩阵获客。先建立内容中台，再向多账号、多门店分发。"
  },
  {
    min: 12, max: 15,
    level: "LEVEL C",
    title: "AI就绪度：需规划 — 建议先做AI诊断",
    desc: "你的企业正处在数字化转型关键期，直接上工具容易浪费投入。建议先做一次系统的AI诊断，画出AI应用地图再动手。",
    rec: "推荐切入点：企业AI战略诊断 + AI落地路线图。先判断哪些环节值得改造，再排优先级逐步实施。"
  }
];

/* ---------------- 工具函数 ---------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- 状态 ---------------- */

const state = {
  data: null,
  news: null,
  newsFilter: "all",
  problemIndex: 0,
  methodIndex: 0,
  quizIndex: 0,
  quizAnswers: []
};

async function getJson(path) {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) throw new Error(`Cannot load ${path}`);
  return res.json();
}

/* ---------------- 首屏：粒子节点动画 ---------------- */

function initParticles() {
  const canvas = $("#heroParticles");
  if (!canvas) return;
  if (prefersReducedMotion) return;
  const ctx = canvas.getContext("2d");
  let w, h, dpr, particles, raf;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.offsetWidth;
    h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function build() {
    const count = Math.min(70, Math.floor((w * h) / 22000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.22,
      vy: (Math.random() - 0.5) * 0.22,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < -20) p.x = w + 20;
      if (p.x > w + 20) p.x = -20;
      if (p.y < -20) p.y = h + 20;
      if (p.y > h + 20) p.y = -20;
    }
    // 连线
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          ctx.strokeStyle = `rgba(53, 230, 192, ${0.09 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    // 节点
    for (const p of particles) {
      ctx.fillStyle = "rgba(53, 230, 192, 0.5)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  }

  // 只在首屏可见时运行
  const hero = $(".hero");
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      if (!raf) raf = requestAnimationFrame(tick);
    } else if (raf) {
      cancelAnimationFrame(raf);
      raf = null;
    }
  });
  io.observe(hero);

  resize();
  build();
  window.addEventListener("resize", () => { resize(); build(); }, { passive: true });
}

/* ---------------- 首屏：打字解码效果 ---------------- */

function initDecode() {
  const node = $("[data-decode]");
  if (!node) return;
  const finalText = node.textContent;
  if (prefersReducedMotion) return;
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&";
  let frame = 0;
  const total = finalText.length;
  node.textContent = "";
  const timer = setInterval(() => {
    frame++;
    const revealed = Math.floor(frame / 2);
    let out = "";
    for (let i = 0; i < total; i++) {
      if (i < revealed) out += finalText[i];
      else if (finalText[i] === " " || finalText[i] === "—") out += finalText[i];
      else out += chars[Math.floor(Math.random() * chars.length)];
    }
    node.textContent = out;
    if (revealed >= total) {
      clearInterval(timer);
      node.textContent = finalText;
    }
  }, 34);
}

/* ---------------- 滚动显现 ---------------- */

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  $$(".reveal").forEach((node) => io.observe(node));
}

/* ---------------- 导航（滚动状态 + scrollspy；汉堡菜单由 common.js 处理） ---------------- */

function initNav() {
  // scrollspy：高亮当前所在区块对应的首页锚点导航
  const sections = ["top", "services", "cases", "insights", "about"];
  const linkMap = {};
  $$(".nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const id = href.slice(1);
    if (sections.includes(id)) linkMap[id] = link;
  });
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          $$(".nav-link").forEach((l) => l.classList.remove("is-active"));
          const link = linkMap[entry.target.id];
          if (link) link.classList.add("is-active");
        }
      });
    },
    { rootMargin: "-38% 0px -55% 0px" }
  );
  sections.forEach((id) => {
    const node = document.getElementById(id);
    if (node) spy.observe(node);
  });
}

/* ---------------- 信任带 logo 跑马灯 ---------------- */

function renderTrustBand() {
  const track = $("#logoTrack");
  if (!track || !state.data.partners) return;
  const makeSet = () => {
    state.data.partners.forEach((p) => {
      const item = el("div", "logo-item");
      const img = document.createElement("img");
      img.src = p.logo;
      img.alt = p.name;
      img.loading = "lazy";
      img.onerror = () => { img.remove(); };
      item.append(img, el("span", null, p.name));
      track.append(item);
    });
  };
  makeSet();
  makeSet(); // 双份实现无缝循环
}

/* ---------------- 02 四个问题 ---------------- */

function renderProblemPanel(index, animate = true) {
  const panel = $("#problemPanel");
  if (!panel) return;
  const p = PROBLEMS[index];

  const fill = () => {
    panel.replaceChildren();
    const body = el("div", "panel-body");
    const left = el("div");
    left.append(el("h3", null, p.title));
    const en = el("span", "panel-en mono", p.en);
    const desc = el("p", "panel-desc", p.desc);
    left.append(en, desc);
    const goal = el("div", "panel-goal");
    goal.append(el("span", "goal-tag", "TARGET · 目标"));
    goal.append(document.createTextNode(p.goal));
    body.append(left, goal);
    panel.append(body);
  };

  if (animate && !prefersReducedMotion) {
    panel.classList.add("is-switching");
    setTimeout(() => {
      fill();
      panel.classList.remove("is-switching");
    }, 220);
  } else {
    fill();
  }
}

function initProblems() {
  const tabs = $$(".problem-tab");
  if (!tabs.length) return;

  const setActive = (index) => {
    state.problemIndex = index;
    tabs.forEach((t, i) => {
      t.classList.toggle("is-active", i === index);
      t.setAttribute("aria-selected", String(i === index));
    });
    renderProblemPanel(index);
  };

  tabs.forEach((tab) =>
    tab.addEventListener("click", () => setActive(Number(tab.dataset.index)))
  );

  renderProblemPanel(0, false);

  // 自动轮播（交互后停止）
  if (!prefersReducedMotion) {
    let auto = setInterval(() => {
      setActive((state.problemIndex + 1) % PROBLEMS.length);
    }, 6000);
    $("#problemTabs").addEventListener("pointerdown", () => {
      clearInterval(auto);
      auto = null;
    }, { once: true });
  }
}

/* ---------------- 03 六大服务 ---------------- */

function renderServices() {
  const grid = $("#servicesGrid");
  if (!grid) return;
  SERVICES.forEach((s, i) => {
    const card = el("article", "service-card reveal");
    card.style.transitionDelay = `${(i % 3) * 0.08}s`;
    card.append(el("div", "service-index mono", s.index));
    card.append(el("h3", null, s.title));
    card.append(el("div", "service-en mono", s.en));
    card.append(el("p", "service-desc", s.desc));
    const fit = el("ul", "service-fit");
    s.fit.forEach((f) => fit.append(el("li", null, f)));
    card.append(fit);
    grid.append(card);
  });
  observeLateReveals(grid);
}

/* ---------------- AI内容增长 ---------------- */

function initGrowth() {
  const matrix = $("#matrixGrid");
  const pipeline = $$("#growthPipeline span");
  if (!matrix) return;

  const cells = [];
  for (let i = 0; i < 48; i++) {
    const cell = el("div", "matrix-cell");
    matrix.append(cell);
    cells.push(cell);
  }

  if (!prefersReducedMotion) {
    // 矩阵呼吸：随机点亮格子
    setInterval(() => {
      const idx = Math.floor(Math.random() * cells.length);
      cells[idx].classList.add("is-live");
      setTimeout(() => cells[idx].classList.remove("is-live"), 2400);
    }, 260);

    // pipeline 流转
    let hot = 0;
    setInterval(() => {
      pipeline.forEach((s) => s.classList.remove("is-hot"));
      if (pipeline[hot]) pipeline[hot].classList.add("is-hot");
      hot = (hot + 1) % pipeline.length;
    }, 1400);
  }
}

/* ---------------- 04 方法论链条 ---------------- */

function initMethodology() {
  const chain = $("#methodChain");
  const detail = $("#methodDetail");
  if (!chain || !detail) return;

  METHOD_STEPS.forEach((step, i) => {
    const node = el("button", "method-node");
    node.type = "button";
    node.dataset.index = i;
    node.append(el("span", "node-zh", step.zh));
    node.append(el("span", "node-en mono", step.en));
    node.addEventListener("click", () => setMethod(i, true));
    chain.append(node);
  });

  const nodes = $$(".method-node", chain);

  function setMethod(i, manual) {
    state.methodIndex = i;
    nodes.forEach((n, j) => n.classList.toggle("is-active", j === i));
    if (manual && autoTimer) { clearInterval(autoTimer); autoTimer = null; }
    detail.classList.add("is-switching");
    setTimeout(() => {
      detail.textContent = METHOD_STEPS[i].desc;
      detail.classList.remove("is-switching");
    }, prefersReducedMotion ? 0 : 200);
  }

  setMethod(0);
  detail.textContent = METHOD_STEPS[0].desc;

  let autoTimer = null;
  if (!prefersReducedMotion) {
    autoTimer = setInterval(() => {
      setMethod((state.methodIndex + 1) % METHOD_STEPS.length);
    }, 3600);
  }
}

/* ---------------- 05 落地框架 ---------------- */

function initFramework() {
  const track = $("#frameworkTrack");
  const detail = $("#frameworkDetail");
  if (!track || !detail) return;

  FRAMEWORK.forEach((step, i) => {
    const li = el("li", "fw-step reveal");
    li.style.transitionDelay = `${(i % 4) * 0.06}s`;
    li.append(el("span", "fw-index mono", String(i + 1).padStart(2, "0")));
    li.append(el("h4", null, step.title));
    li.append(el("span", "fw-en mono", step.en));
    li.addEventListener("click", () => setStep(i));
    li.addEventListener("mouseenter", () => setStep(i));
    track.append(li);
  });
  observeLateReveals(track);

  const steps = $$(".fw-step", track);

  function setStep(i) {
    steps.forEach((s, j) => s.classList.toggle("is-active", j === i));
    detail.classList.add("is-switching");
    setTimeout(() => {
      detail.replaceChildren();
      const label = el("strong", null, `STEP ${String(i + 1).padStart(2, "0")} — ${FRAMEWORK[i].en}`);
      detail.append(label, document.createTextNode(FRAMEWORK[i].desc));
      detail.classList.remove("is-switching");
    }, prefersReducedMotion ? 0 : 160);
  }

  setStep(0);
  detail.replaceChildren();
  detail.append(
    el("strong", null, `STEP 01 — ${FRAMEWORK[0].en}`),
    document.createTextNode(FRAMEWORK[0].desc)
  );

  // 滚动经过时依次点亮
  if (!prefersReducedMotion) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = steps.indexOf(entry.target);
            if (idx >= 0) setStep(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px" }
    );
    steps.forEach((s) => io.observe(s));
  }
}

/* ---------------- 案例：AI落地实验室 ---------------- */

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
  observeLateReveals(grid);
}

/* ---------------- 视频 + 灯箱 ---------------- */

function renderVideos() {
  const grid = $("#videoGrid");
  if (!grid || !state.data.videos) return;

  state.data.videos.forEach((v, i) => {
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
  observeLateReveals(grid);
}

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

/* ---------------- 画廊 ---------------- */

function renderGallery() {
  const strip = $("#galleryStrip");
  if (!strip || !state.data.gallery) return;
  state.data.gallery.forEach((g) => {
    const fig = el("figure", "gallery-item reveal");
    const img = document.createElement("img");
    img.src = g.image;
    img.alt = g.caption;
    img.loading = "lazy";
    fig.append(img, el("figcaption", null, g.caption));
    strip.append(fig);
  });
  observeLateReveals(strip);
}

/* ---------------- 内容栏目 ---------------- */

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
  observeLateReveals(grid);
}

/* ---------------- AI洞察（新闻） ---------------- */

function renderNews() {
  const grid = $("#newsGrid");
  const filtersHost = $("#newsFilters");
  const updated = $("#newsUpdated");
  if (!grid) return;

  const news = state.news && state.news.items && state.news.items.length
    ? state.news
    : state.data.fallbackNews;
  const items = news.items.slice(0, 8);

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
    if (src === state.newsFilter) btn.classList.add("is-active");
    btn.addEventListener("click", () => {
      state.newsFilter = src;
      $$(".news-filter", filtersHost).forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      paintNews(items);
    });
    filtersHost.append(btn);
  });

  function paintNews(list) {
    grid.replaceChildren();
    const filtered = state.newsFilter === "all"
      ? list
      : list.filter((it) => it.source === state.newsFilter);
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

/* ---------------- AI就绪度自测 ---------------- */

function initQuiz() {
  const quiz = $("#quiz");
  if (!quiz) return;
  const intro = $("#quizIntro");
  const body = $("#quizBody");
  const result = $("#quizResult");

  const show = (which) => {
    intro.hidden = which !== "intro";
    body.hidden = which !== "body";
    result.hidden = which !== "result";
    quiz.dataset.state = which;
  };

  function paintQuestion() {
    const i = state.quizIndex;
    $("#quizProgressBar").style.width = `${((i) / QUIZ.length) * 100}%`;
    $("#quizStep").textContent = `QUESTION ${i + 1} / ${QUIZ.length}`;
    $("#quizQuestion").textContent = QUIZ[i].q;
    const opts = $("#quizOptions");
    opts.replaceChildren();
    QUIZ[i].options.forEach((opt, j) => {
      const btn = el("button", "quiz-option");
      btn.type = "button";
      btn.append(el("span", "opt-key mono", String.fromCharCode(65 + j)));
      btn.append(el("span", null, opt.text));
      btn.addEventListener("click", () => {
        state.quizAnswers[i] = opt.score;
        if (i + 1 < QUIZ.length) {
          state.quizIndex++;
          paintQuestion();
        } else {
          showResult();
        }
      });
      opts.append(btn);
    });
    $("#quizBack").disabled = i === 0;
  }

  function showResult() {
    const total = state.quizAnswers.reduce((a, b) => a + b, 0);
    const res = QUIZ_RESULTS.find((r) => total >= r.min && total <= r.max) || QUIZ_RESULTS[1];
    $("#quizProgressBar").style.width = "100%";
    $("#resultLevel").textContent = res.level;
    $("#resultTitle").textContent = res.title;
    $("#resultDesc").textContent = res.desc;
    const rec = $("#resultRec");
    rec.replaceChildren();
    rec.append(el("span", "rec-tag", "RECOMMENDED · 建议起点"));
    rec.append(el("p", null, res.rec));
    show("result");
  }

  $("#quizStart").addEventListener("click", () => {
    state.quizIndex = 0;
    state.quizAnswers = [];
    show("body");
    paintQuestion();
  });
  $("#quizRestart").addEventListener("click", () => {
    state.quizIndex = 0;
    state.quizAnswers = [];
    show("body");
    paintQuestion();
  });
  $("#quizBack").addEventListener("click", () => {
    if (state.quizIndex > 0) {
      state.quizIndex--;
      paintQuestion();
    }
  });
}

/* ---------------- 适合的企业 + 合作方式 ---------------- */

function renderAudience() {
  const list = $("#audienceList");
  if (!list) return;
  AUDIENCE.forEach((a) => {
    const li = el("li");
    li.append(el("span", "aud-title", a.title));
    li.append(el("span", "aud-desc", a.desc));
    list.append(li);
  });
}

function renderCooperation() {
  const track = $("#coopTrack");
  if (!track) return;
  COOPERATION.forEach((c) => {
    const li = el("li", "reveal");
    li.append(el("span", "coop-dot mono", c.step));
    const content = el("div");
    const head = el("h4");
    head.append(document.createTextNode(c.title), el("span", "coop-en mono", c.en));
    content.append(head, el("p", null, c.desc));
    li.append(content);
    track.append(li);
  });
  observeLateReveals(track);
}

/* ---------------- 动态加入的 reveal 观察 ---------------- */

function observeLateReveals(scope) {
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
  $$(".reveal", scope).forEach((node) => io.observe(node));
}

/* ---------------- 启动 ---------------- */

async function boot() {
  state.data = await getJson("content/site-data.json");
  try {
    state.news = await getJson("content/news.generated.json");
  } catch {
    state.news = state.data.fallbackNews;
  }

  renderTrustBand();
  renderServices();
  renderLab();
  renderVideos();
  renderGallery();
  renderColumns();
  renderNews();
  renderAudience();
  renderCooperation();

  initNav();
  initParticles();
  initDecode();
  initReveal();
  initProblems();
  initGrowth();
  initMethodology();
  initFramework();
  initLightbox();
  initQuiz();
}

boot().catch((err) => {
  document.body.innerHTML = `<main style="min-height:100vh;display:flex;align-items:center;justify-content:center;color:#c9d1cf;font-family:sans-serif;text-align:center;padding:24px"><div><h1 style="color:#f5f7f6">内容加载失败</h1><p>${err.message}</p><p>请通过本地服务器访问（双击 start-preview.command），而不是直接打开 HTML 文件。</p></div></main>`;
});
