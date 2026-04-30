const canvas = document.getElementById("portfolio-canvas");
const context = canvas.getContext("2d");
const tiltCards = document.querySelectorAll(".tilt-card");
const panels = document.querySelectorAll(".floating-panel");
const sectionLinks = document.querySelectorAll(".scroll-panel-link");
const revealCards = document.querySelectorAll(".reveal-card");
const trackedSections = [
  document.getElementById("top"),
  document.getElementById("clients"),
  document.getElementById("showcase"),
  document.getElementById("connect")
];

const panelBaseTransforms = [
  "translate3d(-78%, -88%, 0) rotateX(18deg) rotateY(-20deg)",
  "translate3d(-14%, -6%, 70px) rotateX(10deg) rotateY(16deg)",
  "translate3d(-82%, 46%, -30px) rotateX(-10deg) rotateY(-14deg)"
];

const scene = {
  width: 0,
  height: 0,
  pointerX: 0.5,
  pointerY: 0.5,
  orbs: []
};

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  const hero = canvas.parentElement;

  scene.width = hero.clientWidth;
  scene.height = hero.clientHeight;

  canvas.width = scene.width * ratio;
  canvas.height = scene.height * ratio;
  canvas.style.width = `${scene.width}px`;
  canvas.style.height = `${scene.height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);

  const orbCount = Math.max(10, Math.round(scene.width / 140));
  scene.orbs = Array.from({ length: orbCount }, (_, index) => ({
    x: Math.random() * scene.width,
    y: Math.random() * scene.height,
    radius: 90 + Math.random() * 170,
    speed: 0.15 + Math.random() * 0.45,
    drift: 24 + Math.random() * 28,
    offset: index
  }));
}

function draw(timestamp) {
  context.clearRect(0, 0, scene.width, scene.height);

  const wash = context.createLinearGradient(0, 0, scene.width, scene.height);
  wash.addColorStop(0, "rgba(255, 83, 61, 0.24)");
  wash.addColorStop(0.5, "rgba(22, 22, 28, 0.18)");
  wash.addColorStop(1, "rgba(132, 86, 255, 0.18)");
  context.fillStyle = wash;
  context.fillRect(0, 0, scene.width, scene.height);

  scene.orbs.forEach((orb) => {
    const wave = timestamp * 0.0003 * orb.speed + orb.offset;
    const x = orb.x + Math.sin(wave + scene.pointerX * 2) * orb.drift;
    const y = orb.y + Math.cos(wave + scene.pointerY * 2) * orb.drift;
    const glow = context.createRadialGradient(x, y, 0, x, y, orb.radius);

    glow.addColorStop(0, "rgba(255,255,255,0.11)");
    glow.addColorStop(0.3, "rgba(132,86,255,0.18)");
    glow.addColorStop(0.58, "rgba(255,83,61,0.16)");
    glow.addColorStop(1, "rgba(0,0,0,0)");

    context.fillStyle = glow;
    context.beginPath();
    context.arc(x, y, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  panels.forEach((panel, index) => {
    const xShift = (scene.pointerX - 0.5) * (18 + index * 8);
    const yShift = (scene.pointerY - 0.5) * (14 + index * 6);
    panel.style.transform = `${panelBaseTransforms[index]} translate3d(${xShift}px, ${yShift}px, 0)`;
  });

  requestAnimationFrame(draw);
}

function updateScrollPanel() {
  let currentId = "top";

  trackedSections.forEach((section) => {
    if (!section) {
      return;
    }

    const rect = section.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.38) {
      currentId = section.id;
    }
  });

  sectionLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.sectionLink === currentId);
  });
}

function smoothScrollToSection(event) {
  const href = event.currentTarget.getAttribute("href");
  if (!href || !href.startsWith("#")) {
    return;
  }

  const target = document.querySelector(href);
  if (!target) {
    return;
  }

  event.preventDefault();

  target.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

  window.history.replaceState(null, "", href);
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px"
  }
);

window.addEventListener("pointermove", (event) => {
  scene.pointerX = event.clientX / window.innerWidth;
  scene.pointerY = event.clientY / window.innerHeight;
});

window.addEventListener("scroll", updateScrollPanel, { passive: true });

sectionLinks.forEach((link) => {
  link.addEventListener("click", smoothScrollToSection);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", smoothScrollToSection);
});

revealCards.forEach((card, index) => {
  card.style.transitionDelay = `${Math.min(index * 40, 240)}ms`;
  revealObserver.observe(card);
});

tiltCards.forEach((card) => {
  card.addEventListener("pointermove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    const rotateY = (x - 0.5) * 10;
    const rotateX = (0.5 - y) * 10;

    card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("pointerleave", () => {
    card.style.transform = "";
  });
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
updateScrollPanel();
requestAnimationFrame(draw);
