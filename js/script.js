
  // Custom cursor (desktop only)
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx=0, my=0, rx=0, ry=0;
  document.addEventListener('mousemove', e => {mx = e.clientX; my=e.clientY; cursor.style.left=mx+'px'; cursor.style.top=my+'px'; });
    function animRing(){rx += (mx - rx) * 0.12; ry+=(my-ry)*0.12; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animRing);}
    animRing();
  document.querySelectorAll('a,button,.gallery-item,.service-card').forEach(el => {
        el.addEventListener('mouseenter', () => { cursor.style.transform = 'translate(-50%,-50%) scale(2)'; ring.style.width = '60px'; ring.style.height = '60px'; });
    el.addEventListener('mouseleave', () => {cursor.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.width='36px'; ring.style.height='36px'; });
  });

    // Nav scroll
    const nav = document.getElementById('navbar');
  window.addEventListener('scroll', () => {nav.classList.toggle('scrolled', window.scrollY > 60); });

    // ── Mobile Menu ──────────────────────────────────────────
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    let menuOpen = false;

    function openMenu() {
        menuOpen = true;
    hamburger.classList.add('active');
    mobileMenu.style.display = 'flex';
    // Force reflow for transition
    requestAnimationFrame(() => {
        requestAnimationFrame(() => { mobileMenu.classList.add('open'); });
    });
    document.body.style.overflow = 'hidden';
  }

    function closeMenu() {
        menuOpen = false;
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    // Hide after transition ends
    setTimeout(() => {
      if (!menuOpen) mobileMenu.style.display = 'none';
    }, 360);
  }

  hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
    menuOpen ? closeMenu() : openMenu();
  });

  // Close when any nav link is tapped
  mobileMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => closeMenu());
  });

  // Close on outside tap (tapping the dark overlay area)
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuOpen) closeMenu();
  });
  // ─────────────────────────────────────────────────────────

  // Scroll animations
  const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, {threshold: 0.12 });
  document.querySelectorAll('.fade-in-up').forEach(el => obs.observe(el));

    // Gallery filter
    function filterGallery(cat, btn) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.gallery-item').forEach(item => {
      const show = cat === 'all' || item.dataset.cat === cat;
    item.style.opacity = show ? '1' : '0.15';
    item.style.transform = show ? 'scale(1)' : 'scale(0.95)';
    item.style.transition = 'all 0.4s ease';
    item.style.pointerEvents = show ? 'all' : 'none';
    });
  }

    // Form submit
    const form = document.querySelector(".contact-form");
const successBox = document.getElementById("formSuccess");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    form.reset();
    successBox.style.display = "block";
  } else {
    alert("Something went wrong. Try again.");
  }
});