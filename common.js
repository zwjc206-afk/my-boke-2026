/* ============================================================
   common.js — 全站共享：鼠标点击动画 + 导航交互 + 滚动显现
   在 index.html 与所有二级页面加载
   ============================================================ */

"use strict";

/* ---------------- 全局鼠标点击动画 ----------------
   每次点击：扩散涟漪环 + 中心辉光 + 8 颗荧光粒子迸发。
   尊重 prefers-reduced-motion（系统要求降低动效时跳过）。
---------------------------------------------------- */

(function initClickFx() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  document.addEventListener("click", (e) => {
    // 表单控件原生交互不打扰
    const tag = e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

    const x = e.clientX;
    const y = e.clientY;
    const spawned = [];

    const make = (className) => {
      const n = document.createElement("span");
      n.className = className;
      n.style.left = `${x}px`;
      n.style.top = `${y}px`;
      document.body.appendChild(n);
      spawned.push(n);
      return n;
    };

    make("click-ripple");      // 扩散涟漪环
    make("click-ripple-inner"); // 中心辉光

    // 粒子迸发
    const count = 8;
    for (let i = 0; i < count; i++) {
      const p = make("click-particle");
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      const dist = 34 + Math.random() * 30;
      p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
      p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
    }

    // 动画结束后清理
    setTimeout(() => spawned.forEach((n) => n.remove()), 700);
  });
})();

/* ---------------- 导航交互（首页 + 二级页通用） ---------------- */

(function initCommonNav() {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("navBurger");
  const menu = document.getElementById("mobileMenu");

  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 20);
    }, { passive: true });
  }

  if (burger && menu) {
    burger.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      menu.setAttribute("aria-hidden", String(!open));
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
      })
    );
  }
})();

/* ---------------- 滚动显现（二级页通用） ---------------- */

(function initCommonReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;
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
  reveals.forEach((node) => io.observe(node));
})();
