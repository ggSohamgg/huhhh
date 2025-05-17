// --- Starfield Background ---
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
function resize() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

const stars = Array.from({ length: 100 }, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  r: Math.random()*1.2+0.3
}));
function drawStars() {
  const bg = getComputedStyle(document.documentElement).getPropertyValue('--bg');
  const ac = getComputedStyle(document.documentElement).getPropertyValue('--accent');
  ctx.fillStyle = bg.trim();
  ctx.fillRect(0,0,canvas.width,canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r,0,Math.PI*2);
    ctx.fillStyle = ac.trim();
    ctx.fill();
    s.y += 0.3;
    if (s.y > canvas.height) s.y = 0;
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// --- Typing Effect (About page) ---
const typeTarget = document.getElementById('typed');
if (typeTarget) {
  const text = 'Hands-on experience in building and deploying deep learning models. Proficient in PyTorch and TensorFlow, with a focus on NLP, transformers, and model optimization. Developed a GPT-style conversational agent and a high-accuracy food classifier.';
  let idx = 0;
  function type() {
    if (idx <= text.length) {
      typeTarget.textContent = text.slice(0, idx++);
      setTimeout(type, 40);
    }
  }
  type();
}

// --- Skill Bars (Skills page) ---
const bars = document.querySelectorAll('.bar div');
window.addEventListener('scroll', () => {
  bars.forEach(bar => {
    const top = bar.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85) {
      bar.style.width = bar.dataset.level;
    }
  });
});

// --- Theme Toggle ---
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// --- Ripple Effect on Buttons ---
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const x = e.offsetX, y = e.offsetY;
    const span = document.createElement('span');
    span.classList.add('ripple');
    span.style.left = x+'px'; span.style.top = y+'px';
    btn.appendChild(span);
    setTimeout(()=> span.remove(), 600);
  });
});

// --- Highlight Active Nav Link ---
const navLinks = document.querySelectorAll('.navbar a');
const path = window.location.pathname.split('/').pop();
navLinks.forEach(a => {
  if (a.getAttribute('href') === path) a.classList.add('active');
});
