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
})();
