// HOME ATMOSPHERE: Route-local star-particle canvas retained from the original Home extraction.
function initArchscryAtmosphere() {
  const canvas = document.querySelector('.vm-bg__stars');
  if (!canvas) return;
  if (canvas.parentElement !== document.body) {
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let stars = [];
  let orbs = [];
  let tick = 0;
  let isHidden = document.hidden;

  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

  function resetStars() {
    const count = Math.min(165, Math.max(72, Math.floor(window.innerWidth / 8)));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.25 + 0.35,
      baseAlpha: Math.random() * 0.34 + 0.12,
      pulse: Math.random() * 0.28 + 0.10,
      speed: Math.random() * 0.015 + 0.005,
      phase: Math.random() * Math.PI * 2,
      burstChance: Math.random() * 0.004 + 0.001
    }));
  }

  function resetOrbs() {
    const count = Math.min(32, Math.max(14, Math.floor(window.innerWidth / 44)));
    orbs = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.2 + 1.25,
      v: Math.random() * 0.12 + 0.028,
      alpha: Math.random() * 0.08 + 0.02,
      drift: Math.random() * 0.24 + 0.05,
      phase: Math.random() * Math.PI * 2
    }));
  }

  function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    resetStars();
    resetOrbs();
    drawStaticAtmosphere();
  }

  function drawStars() {
    for (const star of stars) {
      const twinkle = star.baseAlpha + Math.sin(tick * star.speed + star.phase) * star.pulse;
      const alpha = Math.max(0.08, Math.min(0.95, twinkle));
      const isBursting = alpha > 0.56 && star.r > 0.8 && Math.random() < star.burstChance;

      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(247, 215, 132, ${alpha})`;
      ctx.fill();

      if (star.r > 0.95 && alpha > 0.62) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(247, 215, 132, ${alpha * 0.12})`;
        ctx.fill();
      }

      if (isBursting) {
        ctx.save();
        ctx.globalAlpha = Math.min(0.45, alpha + 0.12);
        ctx.strokeStyle = "rgba(247, 215, 132, 0.72)";
        ctx.lineWidth = 0.45;
        ctx.beginPath();
        ctx.moveTo(star.x - star.r * 3.2, star.y);
        ctx.lineTo(star.x + star.r * 3.2, star.y);
        ctx.moveTo(star.x, star.y - star.r * 3.2);
        ctx.lineTo(star.x, star.y + star.r * 3.2);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function drawOrbs(animate = true) {
    for (const orb of orbs) {
      if (animate) {
        orb.y -= orb.v;
        orb.x += Math.sin(tick * 0.006 + orb.phase) * orb.drift * 0.035;

        if (orb.y < -14) {
          orb.y = window.innerHeight + 14;
          orb.x = Math.random() * window.innerWidth;
        }
      }

      const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r * 5);
      glow.addColorStop(0, `rgba(247, 215, 132, ${orb.alpha})`);
      glow.addColorStop(0.42, `rgba(216, 162, 60, ${orb.alpha * 0.38})`);
      glow.addColorStop(1, "rgba(216, 162, 60, 0)");

      ctx.beginPath();
      ctx.fillStyle = glow;
      ctx.arc(orb.x, orb.y, orb.r * 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawStaticAtmosphere() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawOrbs(false);
  }

  function drawAtmosphere() {
    if (document.body.classList.contains('still') || prefersReducedMotion || isHidden) {
      drawStaticAtmosphere();
      requestAnimationFrame(drawAtmosphere);
      return;
    }

    tick += 1;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    drawStars();
    drawOrbs(true);
    requestAnimationFrame(drawAtmosphere);
  }

  window.addEventListener('resize', resizeCanvas, { passive: true });
  document.addEventListener('visibilitychange', () => {
    isHidden = document.hidden;
  });

  document.addEventListener('pointermove', event => {
    document.body.style.setProperty('--mx', `${event.clientX}px`);
    document.body.style.setProperty('--my', `${event.clientY}px`);
  }, { passive: true });

  resizeCanvas();
  drawAtmosphere();
}

document.addEventListener("DOMContentLoaded", () => {
  initArchscryAtmosphere();

  const backTop = document.getElementById("backTop");
  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("show", window.scrollY > 500);
    });
  }
});
