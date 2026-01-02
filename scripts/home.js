function fadeInOnScroll(selector, offset = '0px 0px -100px 0px') {
  const targets = document.querySelectorAll(selector);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.classList.remove('fading-out');
    } 
    });
  }, {
    root: null,
    rootMargin: offset,
    threshold: 0
  });

  targets.forEach(target => observer.observe(target));
}

fadeInOnScroll('.fade-in-target', '0px 0px -100px 0px');

// Trigger card stack animation without view-timeline (works in Firefox)
(() => {
  const target = document.querySelector('.practice-right');
  if (!target) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        target.classList.add('cards-animate');
        observer.disconnect();
      }
    });
  }, {
    root: null,
    threshold: 0.3
  });

  observer.observe(target);
})();

// Animate progress rings forward/backward based on scroll visibility (Firefox-safe)
(() => {
  const section = document.querySelector('.rank');
  if (!section) return;
  const rings = section.querySelectorAll('.progress-ring circle');
  const circumference = 2 * Math.PI * 55; // r = 55

  rings.forEach((ring) => {
    ring.style.strokeDasharray = `${circumference}`;
    ring.style.strokeDashoffset = `${circumference}`;
  });

  // Start animating when ~20% of the section is visible, update more frequently both entering/leaving
  const thresholds = Array.from({ length: 51 }, (_, i) => i / 50); // 0, 0.02 ... 1

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const ratio = Math.max(0, Math.min(1, entry.intersectionRatio));
      const svgs = section.querySelectorAll('.progress-ring');
      const wrapper = section.querySelector('.progress');

      svgs.forEach((svg) => {
        const progress = parseFloat(svg.getAttribute('data-progress') || '0');
        const circle = svg.querySelector('circle');
        if (!circle) return;
        const effective = Math.max(0, Math.min(1, progress * ratio));
        const offset = circumference * (1 - effective);
        circle.style.strokeDashoffset = `${offset}`;
      });

      if (wrapper) {
        if (ratio > 0.2) wrapper.classList.add('animate');
        else wrapper.classList.remove('animate');
      }
    });
  }, { threshold: thresholds, rootMargin: "0px 0px -20% 0px" });

  observer.observe(section);
})();
