const tabs = Array.from(document.querySelectorAll("[data-tab]"));
const tracks = Array.from(document.querySelectorAll("[data-track]"));
const tabList = document.querySelector(".tab-list");
const siteHeader = document.querySelector(".site-header");
const progressFill = document.querySelector("[data-progress-fill]");

let activeTrackName = "resume";

function getVisibleTabs() {
  return tabs.filter((tab) => !tab.hidden);
}

function getActiveTrack() {
  return document.querySelector(`[data-track="${activeTrackName}"]`);
}

function syncTabs() {
  tabs.forEach((tab) => {
    const track = tracks.find((item) => item.dataset.track === tab.dataset.tab);
    tab.hidden = !track || track.querySelectorAll(".slide").length === 0;
  });

  const visibleTabs = getVisibleTabs();
  tabList?.style.setProperty("--tab-count", Math.max(visibleTabs.length, 1));
  tabs.forEach((tab) => tab.classList.remove("is-last-visible"));
  visibleTabs[visibleTabs.length - 1]?.classList.add("is-last-visible");

  if (!visibleTabs.some((tab) => tab.dataset.tab === activeTrackName) && visibleTabs.length > 0) {
    activeTrackName = visibleTabs[0].dataset.tab;
  }
}

function updateHeaderState() {
  const activeTrack = getActiveTrack();
  siteHeader?.classList.toggle("is-scrolled", Boolean(activeTrack && activeTrack.scrollTop > 24));
}

function updateProgress() {
  const activeTrack = getActiveTrack();
  if (!activeTrack) {
    return;
  }

  const slides = Array.from(activeTrack.querySelectorAll(".slide"));
  if (slides.length === 0) {
    progressFill.style.height = "0%";
    return;
  }

  const currentIndex = slides.reduce((closestIndex, slide, index) => {
    const current = Math.abs(slide.getBoundingClientRect().top);
    const closest = Math.abs(slides[closestIndex].getBoundingClientRect().top);
    return current < closest ? index : closestIndex;
  }, 0);

  const progress = ((currentIndex + 1) / slides.length) * 100;
  progressFill.style.height = `${progress}%`;
}

function setActiveTrack(trackName) {
  if (tabs.find((tab) => tab.dataset.tab === trackName)?.hidden) {
    return;
  }

  activeTrackName = trackName;

  tabs.forEach((tab) => {
    tab.setAttribute("aria-selected", String(tab.dataset.tab === trackName));
  });

  tracks.forEach((track) => {
    const isActive = track.dataset.track === trackName;
    track.classList.toggle("is-active", isActive);
    if (isActive) {
      track.scrollTo({ top: 0, behavior: "auto" });
    }
  });

  requestAnimationFrame(() => {
    updateProgress();
    updateHeaderState();
  });
}

function scrollToSlide(direction) {
  const activeTrack = getActiveTrack();
  if (!activeTrack) {
    return;
  }

  const slides = Array.from(activeTrack.querySelectorAll(".slide"));
  if (slides.length === 0) {
    return;
  }

  const currentIndex = slides.reduce((closestIndex, slide, index) => {
    const current = Math.abs(slide.offsetTop - activeTrack.scrollTop);
    const closest = Math.abs(slides[closestIndex].offsetTop - activeTrack.scrollTop);
    return current < closest ? index : closestIndex;
  }, 0);

  const nextIndex = Math.min(Math.max(currentIndex + direction, 0), slides.length - 1);
  slides[nextIndex].scrollIntoView({ behavior: "smooth", block: "start" });
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => setActiveTrack(tab.dataset.tab));
});

document.querySelectorAll("[data-jump-tab]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    setActiveTrack(link.dataset.jumpTab);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const activeTrack = getActiveTrack();
        const targetSlide = link.dataset.jumpTarget
          ? activeTrack?.querySelector(`#${link.dataset.jumpTarget}`)
          : null;
        targetSlide?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  });
});

tracks.forEach((track) => {
  track.addEventListener("scroll", () => {
    if (track.classList.contains("is-active")) {
      window.requestAnimationFrame(() => {
        updateProgress();
        updateHeaderState();
      });
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    return;
  }

  if (event.key === "ArrowDown" || event.key === "ArrowRight") {
    event.preventDefault();
    scrollToSlide(1);
  }

  if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
    event.preventDefault();
    scrollToSlide(-1);
  }

  if (event.key === "Home") {
    event.preventDefault();
    getActiveTrack()?.querySelector(".slide")?.scrollIntoView({ behavior: "smooth" });
  }

  if (event.key === "End") {
    event.preventDefault();
    const slides = getActiveTrack()?.querySelectorAll(".slide");
    slides?.[slides.length - 1]?.scrollIntoView({ behavior: "smooth" });
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  },
  {
    root: null,
    threshold: 0.45
  }
);

document.querySelectorAll(".slide").forEach((slide) => observer.observe(slide));
document.querySelectorAll(".skill-pillar").forEach((pillar) => {
  pillar.addEventListener("mousemove", (e) => {
    const rect = pillar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pillar.style.setProperty("--mouse-x", `${x}px`);
    pillar.style.setProperty("--mouse-y", `${y}px`);
  });
});

syncTabs();
setActiveTrack(activeTrackName);
