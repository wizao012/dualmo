(() => {
  const simToggle = document.querySelector("[data-scroll-sim-toggle]");
  const solutionFigure = simToggle?.closest(".solution-figure");

  if (simToggle && solutionFigure) {
    let simTicking = false;
    const updateSimToggle = () => {
      const figureTop = solutionFigure.getBoundingClientRect().top;
      simToggle.checked = figureTop <= window.innerHeight * .32;
      simTicking = false;
    };
    const requestSimToggle = () => {
      if (simTicking) return;
      simTicking = true;
      window.requestAnimationFrame(updateSimToggle);
    };
    updateSimToggle();
    window.addEventListener("scroll", requestSimToggle, { passive: true });
    window.addEventListener("resize", requestSimToggle, { passive: true });
  }

  const applicationForm = document.querySelector("#application-form");
  const mobileCta = document.querySelector(".mobile-cta");
  const hero = document.querySelector(".hero");
  const footer = document.querySelector("footer");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.open = false;
      });
    });
  }

  if (applicationForm && mobileCta && "IntersectionObserver" in window) {
    const formObserver = new IntersectionObserver(([entry]) => {
      mobileCta.classList.toggle("is-hidden-for-form", entry.isIntersecting);
    }, {
      rootMargin: "-64px 0px -12% 0px",
      threshold: .04,
    });

    formObserver.observe(applicationForm);
  }

  if (hero && mobileCta && "IntersectionObserver" in window) {
    const setHeroCtaState = (isVisible) => {
      mobileCta.classList.toggle("is-hidden-for-hero", isVisible);
    };
    const heroRect = hero.getBoundingClientRect();
    setHeroCtaState(heroRect.bottom > 64 && heroRect.top < window.innerHeight);

    const heroObserver = new IntersectionObserver(([entry]) => {
      setHeroCtaState(entry.isIntersecting);
    }, {
      rootMargin: "-64px 0px 0px 0px",
      threshold: .04,
    });

    heroObserver.observe(hero);
  }

  if (footer && mobileCta && "IntersectionObserver" in window) {
    const footerObserver = new IntersectionObserver(([entry]) => {
      mobileCta.classList.toggle("is-hidden-for-footer", entry.isIntersecting);
    }, {
      threshold: .08,
    });

    footerObserver.observe(footer);
  }

  const correctInitialAnchor = () => {
    const targetId = decodeURIComponent(window.location.hash.slice(1));
    const target = targetId ? document.getElementById(targetId) : null;
    if (!target) return;

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const previousBehavior = root.style.scrollBehavior;
        root.style.scrollBehavior = "auto";
        target.scrollIntoView({ block: "start" });
        root.style.scrollBehavior = previousBehavior;
      });
    });
  };

  if (document.readyState === "complete") correctInitialAnchor();
  else window.addEventListener("load", correctInitialAnchor, { once: true });

  const stage = document.querySelector("[data-horizontal-stage]");
  const track = document.querySelector("[data-horizontal-track]");
  const progressBar = document.querySelector("[data-horizontal-progress]");
  const sticky = stage?.querySelector(".highlights-sticky");
  const intro = stage?.closest(".highlights")?.querySelector(".highlights-intro");

  if (!stage || !track || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let distance = 0;
  let scrollRange = 1;
  let stickyOffset = 0;
  let mobileInteraction = false;
  let ticking = false;

  const paintProgress = () => {
    const progress = distance > 0 ? track.scrollLeft / distance : 1;
    if (progressBar) progressBar.style.transform = `scaleX(${Math.max(.035, progress)})`;
  };

  const measure = () => {
    stage.classList.remove("is-horizontal-ready");
    stage.style.height = "auto";
    track.scrollLeft = 0;
    distance = Math.max(0, track.scrollWidth - track.clientWidth);
    stage.style.setProperty("--highlights-intro-height", `${intro?.offsetHeight || 0}px`);
    stage.classList.add("is-horizontal-ready");
    stickyOffset = sticky ? Number.parseFloat(window.getComputedStyle(sticky).top) || 0 : 0;
    mobileInteraction = window.matchMedia("(max-width: 700px)").matches;

    if (mobileInteraction && sticky) {
      const stickyHeight = sticky.offsetHeight;
      // Mobile input is converted directly to horizontal movement, so the
      // section needs no invisible vertical spacer below the progress line.
      scrollRange = 1;
      stage.style.height = `${stickyHeight}px`;
      paintProgress();
      return;
    }

    const rangeFactor = window.innerWidth >= 1024 ? .7 : .8;
    scrollRange = Math.max(1, distance * rangeFactor);
    stage.style.height = `${(sticky?.offsetHeight || window.innerHeight) + scrollRange}px`;
  };

  const render = () => {
    if (mobileInteraction) {
      paintProgress();
      ticking = false;
      return;
    }
    const rect = stage.getBoundingClientRect();
    // Start horizontal movement exactly when the sticky panel locks below the header.
    const progress = Math.min(1, Math.max(0, (stickyOffset - rect.top) / scrollRange));
    track.scrollLeft = distance * progress;
    if (progressBar) progressBar.style.transform = `scaleX(${Math.max(.035, progress)})`;
    ticking = false;
  };

  const requestRender = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(render);
  };

  measure();
  render();
  window.addEventListener("scroll", requestRender, { passive: true });
  window.addEventListener("resize", () => {
    measure();
    requestRender();
  }, { passive: true });

  const snapStageIntoPlace = () => {
    const delta = stage.getBoundingClientRect().top - stickyOffset;
    if (Math.abs(delta) < 1) return;
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, window.scrollY + delta);
    window.requestAnimationFrame(() => { root.style.scrollBehavior = previousBehavior; });
  };

  const consumeMobileVerticalInput = (deltaY, event) => {
    if (!mobileInteraction || Math.abs(deltaY) < 1 || distance <= 0) return;

    const rect = stage.getBoundingClientRect();
    const approach = Math.max(120, window.innerHeight * .28);
    const movingForward = deltaY > 0;
    const hasHorizontalRoom = movingForward
      ? track.scrollLeft < distance - 1
      : track.scrollLeft > 1;
    const isNearStage = movingForward
      ? rect.top <= stickyOffset + approach && rect.bottom > stickyOffset
      : rect.bottom >= stickyOffset && rect.top < stickyOffset + approach;

    if (!hasHorizontalRoom || !isNearStage) return;

    event.preventDefault();
    snapStageIntoPlace();
    track.scrollLeft = Math.min(distance, Math.max(0, track.scrollLeft + deltaY * 2.35));
    paintProgress();
  };

  window.addEventListener("wheel", (event) => {
    consumeMobileVerticalInput(event.deltaY, event);
  }, { passive: false });

  let lastTouchY = null;
  window.addEventListener("touchstart", (event) => {
    lastTouchY = event.touches[0]?.clientY ?? null;
  }, { passive: true });
  window.addEventListener("touchmove", (event) => {
    const currentY = event.touches[0]?.clientY;
    if (currentY == null || lastTouchY == null) return;
    const deltaY = lastTouchY - currentY;
    lastTouchY = currentY;
    consumeMobileVerticalInput(deltaY, event);
  }, { passive: false });
  window.addEventListener("touchend", () => { lastTouchY = null; }, { passive: true });
})();
