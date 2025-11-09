document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('currents-bg');
    const ctx = canvas.getContext('2d');
    let t = 0;
    const ballRadius = 50;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const balls = [
        { r: ballRadius, get x() { return canvas.width / 5 + Math.cos(t * 0.4 + 2) * (canvas.width / 10 * 0.85); }, get y() { return canvas.height / 2 + Math.sin(t * 0.35 + 1) * (canvas.height / 10); } },
        { r: ballRadius, get x() { return canvas.width * 4 / 5 + Math.cos(t * 0.45 + 4) * (canvas.width / 10 * 0.85); }, get y() { return canvas.height / 2 + Math.sin(t * 0.25 + 2) * (canvas.height / 10); } }
    ];

    const colors = { purple: '#1abc9c', deepBlue: '#1d1a50', hotPink: '#ff4088', teal: '#08c8a4', gold: '#ffcc41', black: '#0d0920' };

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        grad.addColorStop(0, colors.black);
        grad.addColorStop(0.5, colors.deepBlue);
        grad.addColorStop(1, colors.purple);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const lineCount = 64;
        const spacing = canvas.height / lineCount;
        const step = 3;

        ctx.globalAlpha = 1.0;
        for (let i = 0; i < lineCount; i++) {
            ctx.beginPath();
            if (i % 10 === 0) ctx.strokeStyle = colors.gold;
            else if (i % 5 === 0) ctx.strokeStyle = colors.teal;
            else if (i % 2 === 0) ctx.strokeStyle = colors.purple;
            else ctx.strokeStyle = colors.deepBlue;
            ctx.lineWidth = 1.8;

            for (let x = 0; x <= canvas.width; x += step) {
                let y = spacing * (i + 0.5);
                for (const ball of balls) {
                    let dx = x - ball.x;
                    let dy = y - ball.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < ball.r * 1.2) ctx.globalAlpha = dist / (ball.r * 1.2) * 0.3;
                    else ctx.globalAlpha = 1.0;
                    if (dist < ball.r * 2.5) {
                        let angle = Math.atan2(dy, dx);
                        let factor = 1 - (dist / (ball.r * 2.5));
                        factor = Math.pow(factor, 1.5);
                        const vortexStrength = 20 * factor;
                        const flowDirection = Math.PI / 2;
                        if (dx > 0) {
                            y += Math.sin(angle + flowDirection + t * 0.8) * vortexStrength;
                            y += Math.cos(x / 15 - t * 2 + i * 0.2) * factor * 10;
                        } else {
                            y -= Math.sin(angle - flowDirection) * vortexStrength * 0.5;
                        }
                    }
                }
                y += Math.sin(x / 90 + t * 0.6 + i * 0.3) * 3;
                y += Math.cos(x / 45 + t * 0.8 + i * 0.5) * 2;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        }

        for (const ball of balls) {
            ctx.globalAlpha = 1.0;
            ctx.beginPath();
            ctx.arc(ball.x + 8, ball.y + 12, ball.r * 0.9, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
            ctx.filter = 'blur(8px)';
            ctx.fill();
            ctx.filter = 'none';
            const ballGrad = ctx.createRadialGradient(ball.x - ball.r * 0.3, ball.y - ball.r * 0.3, ball.r * 0.1, ball.x, ball.y, ball.r);
            ballGrad.addColorStop(0, '#ffffff');
            ballGrad.addColorStop(0.2, '#f8f8f8');
            ballGrad.addColorStop(0.5, '#e0e0e0');
            ballGrad.addColorStop(0.8, '#a8a8a8');
            ballGrad.addColorStop(1, '#888888');
            ctx.beginPath();
            ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
            ctx.fillStyle = ballGrad;
            ctx.fill();
        }

        t += 0.015;
        requestAnimationFrame(draw);
    }

    draw();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => observer.observe(el));

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const target = document.getElementById(targetId);
            navigator.clipboard.writeText(target.textContent).then(() => {
                button.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => { button.innerHTML = '<i class="fas fa-copy"></i>'; }, 2000);
            });
        });
    });
});
