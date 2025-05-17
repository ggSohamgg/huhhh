document.addEventListener('DOMContentLoaded', () => {
  const particleContainer = document.getElementById('particle-bg');
  if (!particleContainer) {
    console.error('Particle container with id "particle-bg" not found!');
    return;
  }

  function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.animationDuration = Math.random() * 10 + 5 + 's';
    particle.style.animationDelay = Math.random() * 5 + 's';
    particleContainer.appendChild(particle);

    particle.addEventListener('animationend', () => {
      particle.remove();
      createParticle();
    });
  }

  for (let i = 0; i < 50; i++) {
    createParticle();
  }

  const typeTarget = document.getElementById('typed');
  if (typeTarget) {
    const text = 'Hands-on experience in building and deploying deep learning models. Proficient in PyTorch and TensorFlow, with a focus on NLP, transformers, and model optimization. Developed a GPT-style conversational agent and a high-accuracy food classifier.';
    let idx = 0;
    (function type() {
      if (idx <= text.length) {
        typeTarget.textContent = text.slice(0, idx++);
        setTimeout(type, 20);
      }
    })();
  }

  const bars = document.querySelectorAll('.bar div');
  const snapContainer = document.querySelector('.snap-container');
  snapContainer.addEventListener('scroll', () => {
    bars.forEach(bar => {
      if (bar.getBoundingClientRect().top < window.innerHeight * 0.85) {
        bar.style.width = bar.dataset.level;
      }
    });
  });

  document.getElementById('theme-toggle').addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
  });

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const x = e.offsetX, y = e.offsetY;
      const span = document.createElement('span');
      span.className = 'ripple';
      span.style.left = x + 'px';
      span.style.top = y + 'px';
      btn.appendChild(span);
      setTimeout(() => span.remove(), 600);
    });
  });

  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const email = document.getElementById('email-input').value;
      navigator.clipboard.writeText(email).then(() => {
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = 'Copy Email', 1500);
      });
    });
  }

  const sections = document.querySelectorAll('.snap-section');
  const navLinks = document.querySelectorAll('.navbar a');
  function highlightNav() {
    let idx = 0, min = Infinity;
    sections.forEach((sec, i) => {
      const d = Math.abs(sec.getBoundingClientRect().top);
      if (d < min) { min = d; idx = i; }
    });
    navLinks.forEach(a => a.classList.remove('active'));
    navLinks[idx].classList.add('active');
  }
  snapContainer.addEventListener('scroll', highlightNav);
  highlightNav();
});
