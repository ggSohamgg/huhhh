// script.js

// Background starfield animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const stars = Array.from({ length: 100 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.2 + 0.3
}));
function draw() {
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    ctx.fill();
    s.y += 0.3;
    if (s.y > canvas.height) s.y = 0;
  });
  requestAnimationFrame(draw);
}
draw();

// Typing animation for summary
const text = 'Hands-on experience in building and deploying deep learning models. Proficient in PyTorch and TensorFlow, with a focus on NLP, transformers, and model optimization. Developed a GPT-style conversational agent and a high-accuracy food classifier.';
let idx = 0;
function type() {
  if (idx <= text.length) {
    document.getElementById('typed').textContent = text.slice(0, idx++);
    setTimeout(type, 40);
  }
}
type();

// Skill bar animation on scroll
const bars = document.querySelectorAll('.bar div');
window.addEventListener('scroll', () => {
  bars.forEach(bar => {
    const top = bar.getBoundingClientRect().top;
    if (top < window.innerHeight * 0.85) {
      bar.style.width = bar.dataset.level;
    }
  });
});

// Theme toggle button
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
});

// Button ripple effect
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', e => {
    const x = e.offsetX, y = e.offsetY;
    const span = document.createElement('span');
    span.classList.add('ripple');
    span.style.left = x + 'px';
    span.style.top = y + 'px';
    btn.appendChild(span);
    setTimeout(() => span.remove(), 600);
  });
});
