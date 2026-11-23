// Kevin — the mascot: a red creature that wanders the page, occasionally reacts, and speaks.
// Same behavior as the mt_demo homepage: wanders on its own, eyes follow the pointer, reacts to pokes.
document.addEventListener('DOMContentLoaded', function () {
  const K = document.getElementById('kevin');
  if (!K) return;
  const guy = document.getElementById('kevin-guy');
  const face = document.getElementById('kevin-face');
  const pupils = [document.getElementById('kevin-pupil-l'), document.getElementById('kevin-pupil-r')];
  const legL = document.getElementById('kevin-leg-l');
  const legR = document.getElementById('kevin-leg-r');
  const chute = document.getElementById('kevin-chute');
  const z1 = document.getElementById('kevin-z');
  const z2 = document.getElementById('kevin-z2');
  const sayEl = document.getElementById('kevin-say');
  const hit = K.querySelector('.kevin__hit');

  let x = window.innerWidth * 0.25, y = window.innerHeight * 0.5;
  let targetX = x, mx = x, my = window.innerHeight / 2;
  let state = 'air', faceState = null, dragging = false, offX = 0, offY = 0, phase = 0, facing = 1, vy = 0, lastT = 0;
  let perchEl = null, perchAx = 0.5, perchAy = 0;
  let blinkT, sayT, sleepT, walkT, danceT;

  const MSG = {
    rightclick: ['do not right-click me', 'there is no menu. i am not a picture', '"save image as". absolutely not', 'inspect element on somebody else'],
    inspect: ['inspect element on somebody else', 'he wrote this at four in the morning. i was there', 'close it close it close it', 'this bit is wrong. i can feel it'],
    drag: ["hey — don't touch me", "don't mind me", 'personal space. look it up', 'ow', 'i live here now', 'this is my hallway'],
    drop: ['okay that was actually great', 'i stuck the landing', 'again. do that again', 'i have never felt more alive'],
    splat: ['ouchhh', "i'm fine. everything's fine", 'physics. my one enemy', 'that was my whole body'],
    poke: ["okay that's enough", 'seriously?', 'do you do this to everyone or am i special'],
    wave: ['hello', 'i earned this', 'address me properly', 'hi again'],
    lonely: ["i'm the only thing on this page", 'nobody comes here', "it's quiet. i like it"],
    sleep: ["i'm up. i'm up", 'i was resting my eyes', 'do not tell matt i was asleep'],
  };

  function say(k) {
    const a = MSG[k] || MSG.poke;
    sayEl.textContent = a[(Math.random() * a.length) | 0];
    sayEl.classList.add('show');
    clearTimeout(sayT);
    sayT = setTimeout(function () { sayEl.classList.remove('show'); }, 2600);
  }
  function sayText(txt, ms) {
    sayEl.textContent = txt;
    sayEl.classList.add('show');
    clearTimeout(sayT);
    sayT = setTimeout(function () { sayEl.classList.remove('show'); }, ms || 2600);
  }
  function setFace(f) { faceState = f; face.className = 'kevin__face' + (f ? ' kevin__face--' + f : ''); }

  function scheduleBlink() {
    clearTimeout(blinkT);
    blinkT = setTimeout(function () {
      if (state === 'sleep') { scheduleBlink(); return; }
      setFace('blink');
      setTimeout(function () { setFace(null); scheduleBlink(); }, 140);
    }, 2200 + Math.random() * 4200);
  }
  function scheduleWalk() {
    clearTimeout(walkT);
    walkT = setTimeout(function () {
      if (state === 'idle') { targetX = 40 + Math.random() * (window.innerWidth - 80); state = 'walk'; }
      scheduleWalk();
    }, 6000 + Math.random() * 9000);
  }
  function scheduleDance() {
    clearTimeout(danceT);
    danceT = setTimeout(function () {
      if (state === 'idle') {
        state = 'dance'; say('wave'); guy.classList.add('kevin__guy--wave');
        setTimeout(function () { guy.classList.remove('kevin__guy--wave'); state = 'idle'; }, 5200);
      }
      scheduleDance();
    }, 16000 + Math.random() * 20000);
  }
  function scheduleSleep() {
    clearTimeout(sleepT);
    sleepT = setTimeout(function () {
      if (state === 'idle') {
        state = 'sleep'; guy.classList.add('kevin__guy--asleep'); setFace('asleep');
        z1.style.display = z2.style.display = '';
      }
    }, 60000);
  }
  function wake() {
    clearTimeout(sleepT);
    if (state === 'sleep') {
      state = 'idle'; guy.classList.remove('kevin__guy--asleep'); setFace(null);
      z1.style.display = z2.style.display = 'none';
      say('sleep');
    }
    scheduleSleep();
  }

  function step(now) {
    const dt = Math.min((now - lastT) / 1000 || 0.016, 0.05);
    lastT = now;
    if (state === 'walk') {
      const d = targetX - x;
      if (Math.abs(d) > 1) {
        x += Math.sign(d) * 0.6;
        facing = d < 0 ? -1 : 1;
        guy.style.transform = 'scaleX(' + facing + ')';
        phase += 0.15;
        legL.style.transform = 'translateY(' + Math.max(0, Math.sin(phase) * 3) + 'px)';
        legR.style.transform = 'translateY(' + Math.max(0, -Math.sin(phase) * 3) + 'px)';
      } else {
        state = 'idle'; guy.style.transform = ''; legL.style.transform = ''; legR.style.transform = '';
      }
    } else if (state === 'dance') {
      phase += 0.22;
      guy.style.transform = 'translateY(' + (Math.abs(Math.sin(phase)) * -2) + 'px) rotate(' + (Math.sin(phase) * 8) + 'deg)';
    } else if (state === 'sleep') {
      guy.style.transform = 'scale(1, 0.72)';
    } else if (state === 'drag') {
      guy.style.transform = 'scale(1.12) rotate(-5deg)';
    } else if (state === 'air') {
      phase += 0.15;
      vy = Math.min(vy + 270 * dt, 74);   // gravity + terminal velocity (copied from source)
      y += vy * dt;
      guy.style.transform = 'rotate(' + (Math.sin(phase * 0.6) * 7) + 'deg)';
      if (y >= window.innerHeight - 6) {
        y = window.innerHeight - 6;
        vy = 0;
        state = 'idle';
        chute.style.display = 'none';
        say('drop');
      }
    } else if (state === 'perch') {
      // ride the element: re-read its viewport rect every frame so Kevin stays on it.
      if (perchEl) {
        const r = perchEl.getBoundingClientRect();
        x = r.left + r.width * perchAx;
        y = r.top + r.height * perchAy + 4;
      }
      guy.style.transform = '';
    } else {
      guy.style.transform = '';
    }
    K.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
    // eye tracking: eye centre ~18px above the feet; x flips with the walk facing.
    const ang = Math.atan2(my - (y - 18), mx - x);
    const ox = Math.cos(ang) * 1.3 * facing, oy = Math.sin(ang) * 1.3;
    pupils.forEach(function (p) { p.style.transform = 'translate(' + ox + 'px,' + oy + 'px)'; });
    requestAnimationFrame(step);
  }

  hit.addEventListener('pointerdown', function (e) {
    if (state === 'sleep') { wake(); return; }
    dragging = true; state = 'drag';
    offX = e.clientX - x; offY = e.clientY - y;
    guy.classList.add('kevin__guy--stretch'); say('drag');
    hit.setPointerCapture(e.pointerId);
  });
  hit.addEventListener('pointermove', function (e) { if (dragging) { x = e.clientX - offX; y = e.clientY - offY; } });
  hit.addEventListener('pointerup', function (e) {
    if (!dragging) return;
    dragging = false; guy.classList.remove('kevin__guy--stretch');
    hit.releasePointerCapture(e.pointerId);
    if (y < window.innerHeight - 90) {
      state = 'air'; chute.style.display = ''; vy = 0;
      say('drop');
    } else { state = 'idle'; say('drop'); }
  });

  window.addEventListener('resize', function () { x = Math.min(x, window.innerWidth - 20); });
  window.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; wake(); }, { passive: true });

  // Expose a small API so the page can move/narrate Kevin.
  window.kevin = {
    walkToX: function (tx) {
      targetX = Math.min(Math.max(tx, 40), window.innerWidth - 40);
      if (state === 'idle' || state === 'walk') state = 'walk';
    },
    standAt: function (tx, ty) {
      state = 'idle';
      targetX = tx;
      guy.classList.remove('kevin__guy--asleep');
      setFace(null);
      z1.style.display = z2.style.display = 'none';
      guy.style.transform = ''; legL.style.transform = ''; legR.style.transform = '';
      const sx = x, sy = y, t0 = performance.now(), dur = 550;
      (function tween() {
        const t = Math.min((performance.now() - t0) / dur, 1);
        const e = 1 - Math.pow(1 - t, 3);
        x = sx + (tx - sx) * e;
        y = sy + (ty - sy) * e;
        if (t < 1) requestAnimationFrame(tween);
      })();
    },
    landOn: function (el, ax, ay) {
      if (!el) return;
      perchEl = el;
      perchAx = ax == null ? 0.5 : ax;
      perchAy = ay == null ? 0 : ay;
      state = 'perch';
      pause();
      guy.classList.remove('kevin__guy--asleep');
      setFace(null);
      z1.style.display = z2.style.display = 'none';
      guy.style.transform = ''; legL.style.transform = ''; legR.style.transform = '';
      chute.style.display = 'none';
    },
    landOff: function () {
      perchEl = null;
      state = 'idle';
      x = Math.min(Math.max(x, 40), window.innerWidth - 40);
      y = window.innerHeight - 6;
      resume();
    },
    pause: function () { clearTimeout(walkT); clearTimeout(danceT); clearTimeout(sleepT); },
    resume: function () { scheduleWalk(); scheduleDance(); scheduleSleep(); }
  };

  // Spawn airborne (~25% left / 50% height) and parachute down while the message shows.
  chute.style.display = '';
  K.classList.add('kevin--in');
  scheduleBlink(); scheduleWalk(); scheduleDance(); scheduleSleep();
  requestAnimationFrame(step);

  // Refresh message — show it longer and re-launch it a couple of times so it isn't missed.
  const GREET = "Hey visitor. the 3D assets are a bit chunky, plz give 'em a sec to load.";
  sayText(GREET, 6500);
  setTimeout(function () { sayText(GREET, 5200); }, 7600);
  setTimeout(function () { sayText(GREET, 4800); }, 14200);
});
