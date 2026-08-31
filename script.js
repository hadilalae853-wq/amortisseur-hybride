(function () {
  const slider = document.getElementById('mode-slider');
  const readout = document.getElementById('slider-readout');
  const piston = document.getElementById('piston');
  const rod = document.getElementById('rod');
  const flowLines = document.getElementById('flow-lines');
  const emGlow = document.getElementById('em-glow');
  const fluid = document.getElementById('fluid');

  if (!slider) return;

  function messageFor(value) {
    if (value < 25) {
      return `Réponse électromagnétique : ${value} % — amorti souple, absorption maximale des micro-aspérités.`;
    }
    if (value < 60) {
      return `Réponse électromagnétique : ${value} % — équilibre entre confort et maintien en virage.`;
    }
    if (value < 85) {
      return `Réponse électromagnétique : ${value} % — amorti ferme, roulis réduit en conduite dynamique.`;
    }
    return `Réponse électromagnétique : ${value} % — rigidité maximale, réponse au dixième de milliseconde.`;
  }

  function render(value) {
    const t = value / 100; // 0 (confort) -> 1 (sport)

    // piston travels less as the setting stiffens (shorter effective stroke)
    const pistonY = 150 + t * 18;
    piston.setAttribute('y', pistonY.toFixed(1));
    rod.setAttribute('height', (pistonY - 20).toFixed(1));

    // fluid opacity increases slightly with firmness (denser resistance)
    fluid.setAttribute('fill-opacity', (0.10 + t * 0.18).toFixed(2));

    // flow line animation speed: softer setting = slower, gentler flow
    const duration = (2.6 - t * 1.8).toFixed(2);
    flowLines.style.setProperty('--flow-duration', `${duration}s`);
    flowLines.style.animation = `flowShift ${duration}s ease-in-out infinite`;

    // electromagnetic glow grows with firmness
    const glowRadius = 4 + t * 34;
    emGlow.setAttribute('r', glowRadius.toFixed(1));
    emGlow.setAttribute('opacity', (0.12 + t * 0.28).toFixed(2));

    readout.textContent = messageFor(value);
  }

  slider.addEventListener('input', (e) => render(Number(e.target.value)));
  render(Number(slider.value));
})();
