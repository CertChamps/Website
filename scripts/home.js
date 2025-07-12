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
