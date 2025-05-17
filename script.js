// --- Enhanced Tame Impala "Currents" Animation with Three Balls ---

const canvas = document.getElementById('currents-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Three balls setup - center, left and right
let t = 0;
const ballRadius = 50;

// Replace your current "balls" array with this:

const balls = [
  // Left ball with increased oscillation
  {
    r: ballRadius,
    get x() {
      return canvas.width / 5 + Math.cos(t * 0.4 + 2) * (canvas.width / 10 * 0.85);
    },
    get y() {
      return canvas.height / 2 + Math.sin(t * 0.35 + 1) * (canvas.height / 10);
    }
  },
  // Right ball with increased oscillation
  {
    r: ballRadius,
    get x() {
      return canvas.width * 4/5 + Math.cos(t * 0.45 + 4) * (canvas.width / 10 * 0.85);
    },
    get y() {
      return canvas.height / 2 + Math.sin(t * 0.25 + 2) * (canvas.height / 10);
    }
  }
];


// Colors
const colors = {
  purple: '#1abc9c',
  deepBlue: '#1d1a50',
  hotPink: '#ff4088',
  teal: '#08c8a4',
  gold: '#ffcc41',
  black: '#0d0920'
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background gradient
  const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
  grad.addColorStop(0, colors.black);
  grad.addColorStop(0.5, colors.deepBlue);
  grad.addColorStop(1, colors.purple);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw wave lines
  const lineCount = 64;
  const spacing = canvas.height / lineCount;
  const step = 3;

  // Draw all lines
  ctx.globalAlpha = 1.0;
  for (let i = 0; i < lineCount; i++) {
    ctx.beginPath();
    
    // Set line color based on position
    if (i % 10 === 0) {
      ctx.strokeStyle = colors.gold;
    } else if (i % 5 === 0) {
      ctx.strokeStyle = colors.teal;
    } else if (i % 2 === 0) {
      ctx.strokeStyle = colors.purple;
    } else {
      ctx.strokeStyle = colors.deepBlue;
    }
    
    ctx.lineWidth = 1.8;

    for (let x = 0; x <= canvas.width; x += step) {
      // Base y position for the line
      let y = spacing * (i + 0.5);
      
      // For each ball, apply vortex effect if close enough
      for (const ball of balls) {
        let dx = x - ball.x;
        let dy = y - ball.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        
        // Clear area immediately around ball
        if (dist < ball.r * 1.2) {
          ctx.globalAlpha = dist / (ball.r * 1.2) * 0.3;
        } else {
          ctx.globalAlpha = 1.0;
        }
        
        // Apply vortex shedding effect
        if (dist < ball.r * 2.5) {
          let angle = Math.atan2(dy, dx);
          let factor = 1 - (dist / (ball.r * 2.5));
          factor = Math.pow(factor, 1.5);
          
          const vortexStrength = 20 * factor;
          const flowDirection = Math.PI / 2;
          
          if (dx > 0) { // Wake behind the ball
            y += Math.sin(angle + flowDirection + t * 0.8) * vortexStrength;
            y += Math.cos(x / 15 - t * 2 + i * 0.2) * factor * 10;
          } else {
            // Front of the ball - smoother displacement
            y -= Math.sin(angle - flowDirection) * vortexStrength * 0.5;
          }
        }
      }
      
      // Base wave effect
      y += Math.sin(x / 90 + t * 0.6 + i * 0.3) * 3;
      y += Math.cos(x / 45 + t * 0.8 + i * 0.5) * 2;
      
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  // Draw the three metallic balls
  for (const ball of balls) {
    ctx.globalAlpha = 1.0;
    
    // Ball shadow
    ctx.beginPath();
    ctx.arc(ball.x + 8, ball.y + 12, ball.r * 0.9, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.filter = 'blur(8px)';
    ctx.fill();
    ctx.filter = 'none';

    // Ball metallic gradient
    const ballGrad = ctx.createRadialGradient(
      ball.x - ball.r * 0.3, ball.y - ball.r * 0.3, ball.r * 0.1,
      ball.x, ball.y, ball.r
    );
    
    // Silver metallic coloring
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.2, '#f8f8f8');
    ballGrad.addColorStop(0.5, '#e0e0e0');
    ballGrad.addColorStop(0.8, '#a8a8a8');
    ballGrad.addColorStop(1, '#888888');
    
    // Ball body
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = ballGrad;
    ctx.fill();
    
    // Highlight
    ctx.beginPath();
    ctx.arc(ball.x - ball.r * 0.3, ball.y - ball.r * 0.3, ball.r * 0.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.fill();
    
    // Subtle glow
    ctx.beginPath();
    const glowGrad = ctx.createRadialGradient(
      ball.x, ball.y, ball.r,
      ball.x, ball.y, ball.r * 1.5
    );
    glowGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glowGrad;
    ctx.arc(ball.x, ball.y, ball.r * 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  t += 0.015;
  requestAnimationFrame(draw);
}

draw();

// // --- Snap scrolling with mouse wheel and arrow keys ---
// const sections = document.querySelectorAll('section');
// let currentSection = 0;
// let isScrolling = false;

// function scrollToSection(index) {
//   if (index >= 0 && index < sections.length && !isScrolling) {
//     isScrolling = true;
//     sections[index].scrollIntoView({ behavior: 'smooth' });
//     currentSection = index;
//     setTimeout(() => { isScrolling = false; }, 700);
//   }
// }

// window.addEventListener('wheel', (event) => {
//   if (isScrolling) return;
//   if (event.deltaY > 0) {
//     scrollToSection(currentSection + 1);
//   } else if (event.deltaY < 0) {
//     scrollToSection(currentSection - 1);
//   }
// });

// window.addEventListener('keydown', (event) => {
//   if (isScrolling) return;
//   if (event.key === 'ArrowDown') {
//     scrollToSection(currentSection + 1);
//   } else if (event.key === 'ArrowUp') {
//     scrollToSection(currentSection - 1);
//   }
// });

// window.addEventListener('scroll', () => {
//   let closest = 0;
//   let minDist = Infinity;
//   sections.forEach((section, i) => {
//     let rect = section.getBoundingClientRect();
//     let dist = Math.abs(rect.top);
//     if (dist < minDist) {
//       minDist = dist;
//       closest = i;
//     }
//   });
//   currentSection = closest;
// });
// --- Your existing Tame Impala Animation code ---
// (All the code you already had for the animation)

// --- NEW ADDITION: Skills to Projects Connection ---
document.addEventListener('DOMContentLoaded', function() {
  // Make skills clickable
  const skills = document.querySelectorAll('.skills-list li');
  const projects = document.querySelectorAll('.project');
  
  skills.forEach(skill => {
    skill.addEventListener('click', function() {
      // Toggle active state of clicked skill
      const wasActive = this.classList.contains('active');
      
      skills.forEach(s => s.classList.remove('active'));
      
      if (!wasActive) {
        this.classList.add('active');
        
        // Get related projects
        const relatedProjects = this.getAttribute('data-projects').split(',');
        
        // Highlight related projects
        projects.forEach(project => {
          if (relatedProjects.includes(project.id)) {
            project.classList.add('highlighted');
            project.classList.remove('dimmed');
            
            // Scroll to the first highlighted project
            if (project.id === relatedProjects[0]) {
              setTimeout(() => {
                document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
              }, 300);
            }
          } else {
            project.classList.remove('highlighted');
            project.classList.add('dimmed');
          }
        });
      } else {
        // If clicking an already active skill, reset all projects
        projects.forEach(project => {
          project.classList.remove('highlighted', 'dimmed');
        });
      }
    });
  });
});
// --- Your existing Tame Impala Animation code ---
// (Keep all your existing animation code)

// --- Skills to Projects Connection ---
document.addEventListener('DOMContentLoaded', function() {
  // Make skills clickable
  const skills = document.querySelectorAll('.skills-list li');
  const projects = document.querySelectorAll('.project');
  
  skills.forEach(skill => {
    skill.addEventListener('click', function() {
      // Toggle active state of clicked skill
      const wasActive = this.classList.contains('active');
      
      skills.forEach(s => s.classList.remove('active'));
      
      if (!wasActive) {
        this.classList.add('active');
        
        // Get related projects
        const relatedProjects = this.getAttribute('data-projects').split(',');
        
        // Highlight related projects
        projects.forEach(project => {
          if (relatedProjects.includes(project.id)) {
            project.classList.add('highlighted');
            project.classList.remove('dimmed');
            
            // Scroll to the first highlighted project
            if (project.id === relatedProjects[0]) {
              setTimeout(() => {
                document.getElementById('projects').scrollIntoView({behavior: 'smooth'});
              }, 300);
            }
          } else {
            project.classList.remove('highlighted');
            project.classList.add('dimmed');
          }
        });
      } else {
        // If clicking an already active skill, reset all projects
        projects.forEach(project => {
          project.classList.remove('highlighted', 'dimmed');
        });
      }
    });
  });
});
