/* ─── STARS ─── */
const starsContainer = document.getElementById('stars');
for (let i = 0; i < 80; i++) {
  const s = document.createElement('div');
  s.className = 'star';
  s.style.left = Math.random() * 100 + '%';
  s.style.top = Math.random() * 100 + '%';
  s.style.setProperty('--d', (2 + Math.random() * 4) + 's');
  s.style.setProperty('--delay', (Math.random() * 5) + 's');
  s.style.setProperty('--op', (0.3 + Math.random() * 0.7).toFixed(2));
  starsContainer.appendChild(s);
}

/* ─── BALLOONS ─── */
const colors = ['#ff4d94','#ff85b3','#ff69b4','#e0437a','#ffb3d1','#d147a0','#ff1a75','#f06090'];
const balloonContainer = document.getElementById('balloons-container');
for (let i = 0; i < 18; i++) {
  const b = document.createElement('div');
  b.className = 'balloon';
  b.style.background = colors[Math.floor(Math.random() * colors.length)];
  b.style.left = (5 + Math.random() * 90) + '%';
  b.style.setProperty('--dur', (4 + Math.random() * 4) + 's');
  b.style.setProperty('--delay', (Math.random() * 3) + 's');
  balloonContainer.appendChild(b);
}

/* ─── CONFETTI ─── */
const confettiContainer = document.getElementById('confetti-container');
const confettiColors = ['#ff4d94','#ff85b3','#ffb3d1','#e0437a','#d147a0','#ffffff','#fff0f6','#ff1a75'];
setTimeout(() => {
  for (let i = 0; i < 120; i++) {
    const c = document.createElement('div');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    c.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    c.style.width = (6 + Math.random() * 8) + 'px';
    c.style.height = (8 + Math.random() * 10) + 'px';
    c.style.setProperty('--dur', (3 + Math.random() * 3) + 's');
    c.style.setProperty('--delay', (Math.random() * 3) + 's');
    confettiContainer.appendChild(c);
  }
}, 800);

/* ─── HERO REVEAL ─── */
setTimeout(() => {
  document.getElementById('hero-content').classList.add('visible');
}, 400);

/* ─── FLOATING HEARTS ─── */
const heartsBg = document.getElementById('hearts-bg');
const heartChars = ['♥', '❤', '♡'];
for (let i = 0; i < 12; i++) {
  const h = document.createElement('div');
  h.className = 'heart-float';
  h.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  h.style.left = (Math.random() * 100) + '%';
  h.style.setProperty('--size', (12 + Math.random() * 20) + 'px');
  h.style.setProperty('--dur', (7 + Math.random() * 8) + 's');
  h.style.setProperty('--delay', (Math.random() * 8) + 's');
  h.style.color = 'var(--rose)';
  heartsBg.appendChild(h);
}

/* ─── SLIDESHOW ─── */
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const counter = document.getElementById('slide-counter');
let currentAudio = null;

function changeSlide(dir) {
  slides[currentSlide].classList.remove('active');
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentSlide = (currentSlide + dir + totalSlides) % totalSlides;
  slides[currentSlide].classList.add('active');
  counter.textContent = (currentSlide + 1) + ' / ' + totalSlides;

  const audio = document.getElementById('audio-' + (currentSlide + 1));
  if (audio && audio.src && audio.src !== window.location.href) {
    currentAudio = audio;
    audio.play().catch(() => {});
  }
}

/* Auto-advance every 15s */
setInterval(() => changeSlide(1), 15000);

/* ─── SCROLL REVEAL ─── */
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

/* ─── NAV DOTS ─── */
const sections = ['intro', 'memories', 'travel', 'plans', 'us-section'];
const dots = document.querySelectorAll('.dot');

function scrollToSection(i) {
  document.getElementById(sections[i]).scrollIntoView({ behavior: 'smooth' });
}

const secObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const i = sections.indexOf(e.target.id);
      if (i >= 0) {
        dots.forEach(d => d.classList.remove('active'));
        dots[i].classList.add('active');
      }
    }
  });
}, { threshold: 0.4 });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) secObserver.observe(el);
});