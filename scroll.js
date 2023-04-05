document.lastScrollPosition = 0;
document.lastCentered = 0;
document.onWayTo = null;

document.addEventListener('scroll', () => {
  const direction = window.scrollY - document.lastScrollPosition > 0 ? 'down' : 'up';
  const sections = [...document.querySelectorAll('section')];

  if (document.onWayTo === null) {
    const destIndex = direction === 'up' ? document.lastCentered - 1 : document.lastCentered + 1;
    if (destIndex >= 0 && destIndex < sections.length) {
      document.onWayTo = destIndex;
      window.scrollTo({ top: sections[destIndex].offsetTop, behavior: 'smooth' });
    }
  }

  sections.forEach((section, index) => {
    if (window.scrollY >= section.offsetTop && window.scrollY < section.offsetTop + section.offsetHeight) {
      document.lastCentered = index;
      section.classList.add('active');
      if (document.onWayTo === index) {
        document.onWayTo = null;
      }
    } else {
      section.classList.remove('active');
    }
  });

  document.lastScrollPosition = window.scrollY;
});
