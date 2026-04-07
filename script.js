const steps = Array.from(document.querySelectorAll(".scroll-step"));
const pills = Array.from(document.querySelectorAll(".service-pill"));
const titleNode = document.getElementById("service-title");
const numberNode = document.getElementById("service-number");
const taglineNode = document.getElementById("service-tagline");
const descriptionNode = document.getElementById("service-description");
const kickerNode = document.getElementById("service-kicker");
const counterNode = document.getElementById("service-counter");
const copyContainer = document.querySelector(".service-copy");
const footerContainer = document.querySelector(".stage-footer");
const floatingLogo = document.querySelector(".floating-logo-wrap");
const header = document.querySelector(".site-header");
const canvas = document.getElementById("journey-canvas");
const context = canvas.getContext("2d");

const state = {
  activeService: "",
  currentTheme: "#f04a3c",
  targetTheme: "#f04a3c",
  pointerX: 0.5,
  pointerY: 0.5,
  viewportWidth: 0,
  viewportHeight: 0,
  orbs: [],
  lastScrollY: window.scrollY
};

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const bigint = Number.parseInt(normalized, 16);

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  };
}

function rgbToHex({ r, g, b }) {
  return `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

function mixColor(fromHex, toHex, amount) {
  const from = hexToRgb(fromHex);
  const to = hexToRgb(toHex);

  return rgbToHex({
    r: Math.round(from.r + (to.r - from.r) * amount),
    g: Math.round(from.g + (to.g - from.g) * amount),
    b: Math.round(from.b + (to.b - from.b) * amount)
  });
}

function setCanvasSize() {
  const ratio = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();

  state.viewportWidth = rect.width;
  state.viewportHeight = rect.height;

  canvas.width = rect.width * ratio;
  canvas.height = rect.height * ratio;
  canvas.style.width = `${rect.width}px`;
  canvas.style.height = `${rect.height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const orbCount = Math.max(8, Math.round(rect.width / 180));
  state.orbs = Array.from({ length: orbCount }, (_, index) => ({
    size: 120 + Math.random() * 220,
    baseX: rect.width * (0.12 + (index / orbCount) * 0.8),
    baseY: rect.height * (0.2 + Math.random() * 0.6),
    driftX: (Math.random() - 0.5) * 40,
    driftY: (Math.random() - 0.5) * 40,
    speed: 0.2 + Math.random() * 0.5
  }));
}

function updateStage(step) {
  if (!step || step.dataset.service === state.activeService) {
    return;
  }

  state.activeService = step.dataset.service || "";
  state.targetTheme = step.dataset.theme || state.targetTheme;

  pills.forEach((pill) => {
    pill.classList.toggle("active", pill.dataset.stepTarget === state.activeService);
  });

  copyContainer.classList.add("is-changing");
  footerContainer.classList.add("is-changing");

  window.setTimeout(() => {
    numberNode.textContent = step.dataset.index || "01";
    titleNode.textContent = step.dataset.title || "";
    taglineNode.textContent = step.dataset.tagline || "";
    descriptionNode.textContent = step.dataset.description || "";
    kickerNode.textContent = step.dataset.kicker || "";
    counterNode.textContent = `${step.dataset.index || "01"} / ${String(steps.length).padStart(2, "0")}`;

    copyContainer.classList.remove("is-changing");
    footerContainer.classList.remove("is-changing");
  }, 170);
}

const stepObserver = new IntersectionObserver(
  (entries) => {
    const current = entries
      .filter((entry) => entry.isIntersecting)
      .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0];

    if (current) {
      updateStage(current.target);
    }
  },
  {
    threshold: [0.35, 0.5, 0.7]
  }
);

steps.forEach((step) => {
  stepObserver.observe(step);
});

pills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const target = document.getElementById(`step-${pill.dataset.stepTarget}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

function updateHeaderVisibility() {
  const currentScrollY = window.scrollY;
  const delta = currentScrollY - state.lastScrollY;
  const scrollingDown = delta > 6;
  const scrollingUp = delta < -6;
  const nearTop = currentScrollY < 80;

  header.classList.toggle("is-compact", currentScrollY > 24);

  if (nearTop) {
    header.classList.remove("is-hidden");
  } else if (scrollingDown && currentScrollY > 140) {
    header.classList.add("is-hidden");
  } else if (scrollingUp) {
    header.classList.remove("is-hidden");
  }

  state.lastScrollY = currentScrollY;
}

window.addEventListener("pointermove", (event) => {
  state.pointerX = event.clientX / window.innerWidth;
  state.pointerY = event.clientY / window.innerHeight;
});

window.addEventListener("scroll", updateHeaderVisibility, { passive: true });

function animate(timestamp) {
  state.currentTheme = mixColor(state.currentTheme, state.targetTheme, 0.06);
  const theme = hexToRgb(state.currentTheme);

  context.clearRect(0, 0, state.viewportWidth, state.viewportHeight);

  const base = context.createLinearGradient(0, 0, state.viewportWidth, state.viewportHeight);
  base.addColorStop(0, `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.34)`);
  base.addColorStop(0.45, "rgba(26, 26, 26, 0.28)");
  base.addColorStop(1, "rgba(4, 4, 4, 0.92)");
  context.fillStyle = base;
  context.fillRect(0, 0, state.viewportWidth, state.viewportHeight);

  state.orbs.forEach((orb, index) => {
    const wave = timestamp * 0.00025 * orb.speed + index;
    const x = orb.baseX + Math.sin(wave + state.pointerX * 2.1) * orb.driftX;
    const y = orb.baseY + Math.cos(wave + state.pointerY * 2.1) * orb.driftY;
    const glow = context.createRadialGradient(x, y, 0, x, y, orb.size);

    glow.addColorStop(0, `rgba(${theme.r}, ${theme.g}, ${theme.b}, 0.34)`);
    glow.addColorStop(0.45, "rgba(255,255,255,0.08)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, orb.size, 0, Math.PI * 2);
    context.fill();
  });

  const focus = context.createRadialGradient(
    state.viewportWidth * state.pointerX,
    state.viewportHeight * state.pointerY,
    0,
    state.viewportWidth * state.pointerX,
    state.viewportHeight * state.pointerY,
    state.viewportWidth * 0.34
  );
  focus.addColorStop(0, "rgba(255,255,255,0.12)");
  focus.addColorStop(1, "rgba(255,255,255,0)");
  context.fillStyle = focus;
  context.fillRect(0, 0, state.viewportWidth, state.viewportHeight);

  const scrollRatio = Math.min(1, window.scrollY / Math.max(window.innerHeight, 1));
  const offsetX = (state.pointerX - 0.5) * 26;
  const offsetY = (state.pointerY - 0.5) * 18 + Math.sin(timestamp * 0.0014) * 10;
  const rotation = (state.pointerX - 0.5) * 8 + Math.sin(timestamp * 0.0012) * 2;
  const scale = 1 + scrollRatio * 0.05;

  floatingLogo.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotation}deg) scale(${scale})`;

  window.requestAnimationFrame(animate);
}

window.addEventListener("resize", setCanvasSize);

setCanvasSize();
updateStage(steps[0]);
updateHeaderVisibility();
window.requestAnimationFrame(animate);
