/* CVdresser demo — full real-scale resume-studio UI, uniformly scaled down.
   [ template gallery · NL generate ] [ import + form editor ] [ live A4 render ].
   Assets drag onto any evidence slot (experience or project) to attach a thumbnail. */
(function () {
  'use strict';

  var S = {
    name: 'Thea Zhang',
    headline: 'Representation Learning · AIGC Commercial Applications',
    loc: 'Paris, France',
    email: 'thea.zhang@example.com',
    phone: '+33 6 12 34 56 78',
    github: 'github.com/theazhang',
    linkedin: 'linkedin.com/in/thea-zhang',
    education: [
      { school: 'Sanrio Academy, Paris', degree: 'B.Sc. Information & Computing Science', dates: 'Expected 2027', gpa: 'GPA 3.90/4.00 · Rank 5/200 · Academic Scholarship 2024–2026 · GRE 332 · IELTS 8.0' },
      { school: 'Little Twin Stars High School, Paris', degree: 'High School Diploma', dates: 'Sep 2016 – Jun 2022', gpa: '' }
    ],
    experience: [
      { co: 'My Melody', role: 'Algorithm & AI Systems Engineer — AI Beauty Mirror', dates: 'Jul 2026 – Sep 2026', ev: 'assets/GMR/gmr-m1-poster.jpg', bullets: [
        'Co-developed a multi-head U-Net for component-level makeup decomposition using separately annotated cosmetic layers (brows, eyeshadow, aegyo-sal, eyeliner).',
        'Re-architected the AI application stack, defining interfaces across model inference, backend, frontend, and CI/CD.',
        'Owned end-to-end integration across servers, app software, and smart-mirror hardware, resolving cross-stack failures.',
        'Ran rapid AI prototyping, technology-probe interviews, and market research to surface latent user needs.'
      ] },
      { co: 'Hello Kitty', role: 'Full Stack + Growth Engineer', dates: 'Jun 2026 – Jul 2026', ev: '', bullets: [
        'Built a semantic job-matching pipeline that indexed structured job descriptions in Qdrant.',
        'Designed an AI Resume Studio with content suggestions and natural-language-controlled formatting.'
      ] },
      { co: 'Kuromi', role: 'Agent Harness Engineer', dates: 'Dec 2025 – Present', ev: 'assets/hzkj.png', bullets: [
        'Implemented a per-conversation subprocess agent runtime integrating Claude Code with a platform serving 400+ creators.',
        'Modeled multi-stage content workflows as agent-callable tools connecting canvas operations, private knowledge, and Skills.',
        'Built AI-agent workflows for e-commerce and animated-comic production.'
      ] },
      { co: 'Cinnamoroll', role: 'AIGC Workflow Design + Product Growth', dates: 'Oct 2025 – Dec 2025', ev: 'assets/AIGC/gallery/g1-1.png', bullets: [
        'Built reusable image- and video-generation workflows for jewelry, fragrance, and short-form video.',
        'Designed natural-language agent interfaces for configuring generation and editing without manual node assembly.'
      ] },
      { co: 'Independent Research', role: 'Makeup Replayer: Interpretable Makeup Reconstruction', dates: 'Jan 2026 – Present', ev: '', bullets: [
        'Designed a training-free inverse-graphics solution using GMM palette decomposition, signed inverse alpha compositing, and ordered layer reconstruction.',
        'Achieved region-level reconstruction RMSE of 2–4/255 while preserving independently editable cosmetic layers.',
        'Built 3D digital-twin and virtual try-on prototypes; cultivated a seed-user group for iterative validation.'
      ] },
      { co: 'Pompompurin', role: 'Research Assistant — Structure-Aware Protein Representation Learning', dates: 'Spring 2025', ev: '', bullets: [
        'Processed 87 ProteinGym datasets with ProSST-2048 and executed the VenusFSFP zero-shot mutation-prediction pipeline.',
        'Evaluated with Spearman correlation; reproduced the PDB → GVP-GNN → quantized tokens → Transformer representation path.'
      ] },
      { co: 'Keroppi', role: 'Research Intern — Variational Generative Modeling for Geospatial Data', dates: 'Jan 2025 – Mar 2025', ev: '', bullets: [
        'Re-engineered the fully-connected EcoVAE baseline into a convolutional encoder / transposed-convolutional decoder over lat-lon grids, reducing held-out MSE by 12%.',
        'Implemented the PyTorch training/evaluation pipeline; visualized distributions, spatial error maps, and latent trajectories.'
      ] },
      { co: 'Sanrio iGEM Team', role: 'Modeling Team Member — Computational Protein Modeling', dates: 'Sep 2023 – Jan 2025', ev: '', bullets: [
        'Mapped the DHA-PC biosynthesis pathway and constructed LACS1 protein models for enzyme-target selection.',
        'Screened LACS1 variants; the H277M mutation was selected through FoldX stability, docking, and molecular-dynamics validation.',
        'Documented the workflow on the team Wiki; LC-MS validation showed ~5× wild-type DHA-CoA rate within two minutes.'
      ] }
    ],
    projects: [
      { title: 'Makeup Replayer', tech: 'CV · GMM decomposition', blurb: 'Interpretable makeup reconstruction — region RMSE 2–4/255.', ev: 'assets/GMR/gmr-m1-poster.jpg' },
      { title: 'AI Product Visuals', tech: 'AIGC · multi-category', blurb: 'Generative jewelry & fragrance visuals across platforms.', ev: 'assets/AIGC/gallery/g1-1.png' },
      { title: 'Agent Canvas', tech: 'Claude Code · tool-API', blurb: 'Agent runtime driving a creative canvas for 400+ creators.', ev: 'assets/hzkj.png' }
    ],
    skills: [
      ['Languages', 'Python · C/C++ · Git · Linux'],
      ['Machine Learning', 'PyTorch · scikit-learn · VAE · LoRA/PEFT · representation learning'],
      ['Vision & Graphics', 'OpenCV · MediaPipe · compositing · color decomposition · facial geometry'],
      ['Agents & Retrieval', 'Claude Code · model-callable APIs · Qdrant · vector search · custom Skills']
    ],
    honors: [
      'First Prize, Sanrio Hackathon (2026)',
      'Semifinalist, Sanrio Innovation Cup (2026)',
      'First Prize, Sanrio Innovation & Entrepreneurship Competition (2025)',
      'Academic Excellence Scholarship (2024–2026)',
      'First Prize, High-school Biology Olympiad, Jiangsu (2021)'
    ]
  };

  var TPL = [
    { id: 'classic', name: 'Classic Professional', cap: 'Single column, ATS-friendly · classic serif', premium: false, a: '#2463EB', ink: '#172554', paper: '#ffffff' },
    { id: 'elegant', name: 'Elegant', cap: 'Colored headings · name left, contact top-right', premium: true, a: '#0F766E', ink: '#16302B', paper: '#FFFEFB' },
    { id: 'two', name: 'Classic Two-Column', cap: 'Dense two-column, LaTeX-inspired', premium: false, a: '#334155', ink: '#0F172A', paper: '#ffffff' },
    { id: 'modern', name: 'Modern Two-Column', cap: 'Colored sidebar for skills and contacts', premium: true, a: '#5B4FDB', ink: '#211D4E', paper: '#ffffff' },
    { id: 'premium', name: 'Premium Sidebar', cap: 'Sidebar-forward with bold dividers', premium: true, a: '#BE185D', ink: '#500724', paper: '#FFFDFE' },
    { id: 'academic', name: 'Academic', cap: 'Strict 1-column, dense formatting', premium: false, a: '#8A5A20', ink: '#3B2A17', paper: '#FFFEF9' }
  ];

  var ASSETS = [
    { src: 'assets/GMR/gmr-m1-poster.jpg', target: 'Makeup Replayer' },
    { src: 'assets/GMR/gmr-m2-poster.jpg', target: 'Makeup Replayer' },
    { src: 'assets/GMR/gmr-m3-poster.jpg', target: 'Makeup Replayer' },
    { src: 'assets/hzkj.png', target: 'Agent Canvas' },
    { src: 'assets/AIGC/gallery/g1-1.png', target: 'AI Product Visuals' },
    { src: 'assets/iGEM/figure7.png', target: 'iGEM' },
    { src: 'assets/iGEM/figure11.png', target: 'iGEM' },
    { src: 'assets/iGEM/rmsd.png', target: 'iGEM' },
    { src: 'assets/iGEM/lacs1.gif', target: 'iGEM' },
    { src: 'assets/iGEM/microscopic-mechanism-figure.jpg', target: 'iGEM' }
  ];

  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function E(s) { return esc(s); }

  // --- renderer helpers ---
  var contact = function (sep) { return [S.email, S.phone, S.github, S.linkedin].map(E).join(' ' + sep + ' '); };
  var eduList = function () {
    return S.education.map(function (ed) {
      return '<div class="erow"><span class="el"><b>' + E(ed.school) + '</b><i>' + E(ed.degree) + (ed.gpa ? ' <span class="g">(' + E(ed.gpa) + ')</span>' : '') + '</i></span><span class="er">' + E(ed.dates) + '</span></div>';
    }).join('');
  };
  var expList = function () {
    return S.experience.map(function (x) {
      return '<div class="entry"><div class="erow"><span class="el"><b>' + E(x.co) + '</b><i>' + E(x.role) + '</i>' + (x.ev ? evImg(x.ev, x.co) : '') + '</span><span class="er">' + E(x.dates) + '</span></div>' +
        '<ul>' + x.bullets.map(function (b) { return '<li>' + E(b) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
  };
  var projList = function () {
    return S.projects.map(function (p) {
      return '<div class="entry"><div class="erow"><span class="el"><b>' + E(p.title) + '</b>' + (p.ev ? evImg(p.ev, p.title) : '') + '<span class="g">' + E(p.tech) + '</span></span></div><div class="pd">' + E(p.blurb) + '</div></div>';
    }).join('');
  };
  var skillKvs = function () {
    return S.skills.map(function (s) { return '<div class="kv"><span class="k">' + s[0] + '</span><span class="v">' + s[1] + '</span></div>'; }).join('');
  };
  var honorList = function () { return '<ul>' + S.honors.map(function (h) { return '<li>' + E(h) + '</li>'; }).join('') + '</ul>'; };
  var evImg = function (src, name) {
    return '<span class="ev" data-src="' + src + '" data-name="' + E(name) + '"><span class="ev-thumb"><img src="' + src + '" alt=""></span></span>';
  };
  var sec = function (t, body) { return '<div class="sec"><div class="h">' + t + '</div>' + body + '</div>'; };
  var wrap = function (cls, a, ink, paper, inner) {
    return '<div class="cvd-res ' + cls + '" style="--a:' + a + ';--ink:' + ink + ';--paper:' + paper + '">' + inner + '</div>';
  };

  var renderers = {
    classic: function () {
      return wrap('t1', '#2463EB', '#172554', '#ffffff',
        '<div class="head hc"><div class="nm">' + E(S.name.toUpperCase()) + '</div><div class="ct">' + contact('·') + '</div></div>' +
        sec('Education', eduList()) + sec('Experience', expList()) + sec('Projects', projList()) +
        sec('Skills', '<div class="kvs">' + skillKvs() + '</div>') + sec('Honors', honorList()));
    },
    elegant: function () {
      return wrap('t2', '#0F766E', '#16302B', '#FFFEFB',
        '<div class="head hs"><div class="hleft"><div class="nm">' + E(S.name) + '</div><div class="sub">' + E(S.headline) + ' · ' + E(S.loc) + '</div></div>' +
        '<div class="hright">' + E(S.email) + '<br>' + E(S.phone) + '<div class="links">LinkedIn · GitHub</div></div></div>' +
        sec('Professional Experience', expList()) + sec('Projects', projList()) + sec('Education & Credentials', eduList()) +
        sec('Skills', '<div class="kvs">' + skillKvs() + '</div>') + sec('Honors', honorList()));
    },
    two: function () {
      return wrap('t3', '#334155', '#0F172A', '#ffffff',
        '<div class="head hc"><div class="nm">' + E(S.name.toUpperCase()) + '</div><div class="ct">' + contact('|') + '</div></div>' +
        '<div class="cols"><div class="col main">' + sec('Experience', expList()) + sec('Projects', projList()) + sec('Honors', honorList()) + '</div>' +
        '<div class="col side">' + sec('Education', eduList()) + sec('Skills', '<div class="kvs">' + skillKvs() + '</div>') + '</div></div>');
    },
    modern: function () {
      var crows = [S.email, S.phone, S.github, S.linkedin].map(function (c) { return '<div class="c">' + E(c) + '</div>'; }).join('');
      return wrap('t4', '#5B4FDB', '#211D4E', '#ffffff',
        '<div class="cols"><div class="side"><div class="nm">' + E(S.name) + '</div><div class="role">' + E(S.headline) + '</div>' +
        '<div class="ch">Contact</div><div class="crows">' + crows + '</div>' +
        '<div class="ch">Skills</div><div class="kvs">' + skillKvs() + '</div></div>' +
        '<div class="main">' + sec('Work History', expList()) + sec('Education', eduList()) + sec('Projects', projList()) + sec('Honors', honorList()) + '</div></div>');
    },
    premium: function () {
      return wrap('t5', '#BE185D', '#500724', '#FFFDFE',
        '<div class="headcard"><div class="hleft"><div class="nm">' + E(S.name) + '</div><div class="sub">' + E(S.headline) + ' · ' + E(S.loc) + '</div></div>' +
        '<div class="hright">' + E(S.email) + '<br>' + E(S.phone) + '</div></div>' +
        '<div class="cols"><div class="col main">' + sec('Work History', expList()) + sec('Projects', projList()) + sec('Honors', honorList()) + '</div>' +
        '<div class="col side">' + sec('Education', eduList()) + sec('Skills', '<div class="kvs">' + skillKvs() + '</div>') + '</div></div>');
    },
    academic: function () {
      var rows = S.education.map(function (ed) {
        return '<tr><td><i>' + E(ed.degree) + '</i></td><td>' + E(ed.school) + '</td><td>' + E(ed.dates) + '</td><td><b>' + E(ed.gpa ? ed.gpa.split('·')[0].replace('GPA ', '').trim() : '—') + '</b></td></tr>';
      }).join('');
      return wrap('t6', '#8A5A20', '#3B2A17', '#FFFEF9',
        '<div class="head hc"><div class="nm">' + E(S.name.toUpperCase()) + '</div><div class="ct">' + contact('•') + '</div></div>' +
        '<div class="sec"><div class="h">Academic Qualifications</div>' +
        '<table class="tbl"><tr><th>Degree</th><th>Institute</th><th>Duration</th><th>GPA</th></tr>' + rows + '</table></div>' +
        sec('Professional Experience', expList()) + sec('Projects', projList()) + sec('Skills', '<div class="kvs">' + skillKvs() + '</div>') + sec('Honors', honorList()));
    }
  };

  var activeId = 'classic';
  var toastTimer;
  var evtip;

  function assetName(src) {
    for (var i = 0; i < ASSETS.length; i++) if (ASSETS[i].src === src) return ASSETS[i].target;
    return src.split('/').pop();
  }
  function toast(msg) {
    var el = document.getElementById('cvd-toast');
    if (!el) { el = document.createElement('div'); el.id = 'cvd-toast'; el.className = 'cvd-toast'; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { el.classList.remove('show'); }, 2600);
  }
  var NOT_WIRED = 'Not wired up with the API on this page.';

  function fld(label, key) {
    return '<div class="cvd-field"><span class="cvd-lbl">' + label + '</span><input class="cvd-in" data-key="' + key + '" value="' + esc(S[key]) + '"></div>';
  }
  function ro(label, val) {
    return '<div class="cvd-field"><span class="cvd-lbl">' + label + '</span><input class="cvd-in cvd-in--ro" readonly value="' + esc(val) + '"></div>';
  }
  function roArea(val) { return '<textarea class="cvd-in cvd-in--area cvd-in--ro" readonly>' + esc(val) + '</textarea>'; }
  function secLabel(t) { return '<div class="cvd-seclbl">' + t + '</div>'; }
  function dropChip(type, index, ev) {
    var inner = ev
      ? '<img src="' + ev + '" alt=""><span class="cvd-ev-txt">' + E(assetName(ev)) + '</span>'
      : '<span class="cvd-ev-txt">drop asset here</span>';
    return '<span class="cvd-ev-chip' + (ev ? '' : ' cvd-ev-chip--empty') + '" data-type="' + type + '" data-index="' + index + '" title="Drag an asset here">' + inner + '</span>';
  }

  function buildEditor() {
    var el = document.getElementById('cvd-editor-body');
    var exp = S.experience.map(function (x, i) {
      return '<div class="cvd-entry">' +
        '<div class="cvd-row3">' + ro('Company', x.co) + ro('Role', x.role) + ro('Dates', x.dates) + '</div>' +
        roArea(x.bullets.join('\n')) +
        '<div class="cvd-field"><span class="cvd-lbl">Evidence</span>' + dropChip('exp', i, x.ev) + '</div></div>';
    }).join('');
    var edu = S.education.map(function (ed) {
      return '<div class="cvd-entry">' +
        '<div class="cvd-row3">' + ro('School', ed.school) + ro('Degree', ed.degree) + ro('Dates', ed.dates) + '</div>' +
        '</div>';
    }).join('');
    var proj = S.projects.map(function (p, i) {
      return '<div class="cvd-entry">' + ro('Title', p.title) +
        '<div class="cvd-field"><span class="cvd-lbl">Evidence</span>' + dropChip('proj', i, p.ev) + '</div></div>';
    }).join('');

    el.innerHTML =
      '<div class="cvd-ed-head">Resume form</div>' +
      '<div class="cvd-fields">' +
      secLabel('Personal info') +
      '<div class="cvd-row3">' + fld('Full name', 'name') + fld('Headline', 'headline') + fld('Location', 'loc') + '</div>' +
      '<div class="cvd-row2">' + ro('Email', S.email) + ro('Phone', S.phone) + ro('GitHub', S.github) + ro('LinkedIn', S.linkedin) + '</div>' +
      secLabel('Education') + edu +
      secLabel('Experience') + exp +
      secLabel('Projects') + proj +
      secLabel('Skills') + '<div class="cvd-row2">' + S.skills.map(function (s) { return ro(s[0], s[1]); }).join('') + '</div>' +
      secLabel('Honors') + S.honors.map(function (h) { return ro('Honor', h); }).join('') +
      '</div>';

    var inputs = el.querySelectorAll('[data-key]');
    for (var i = 0; i < inputs.length; i++) {
      (function (inp) {
        inp.addEventListener('input', function () { S[inp.getAttribute('data-key')] = inp.value; render(); });
      })(inputs[i]);
    }
    var chips = el.querySelectorAll('.cvd-ev-chip[data-type]');
    for (var j = 0; j < chips.length; j++) {
      (function (c) {
        c.addEventListener('dragover', function (e) { e.preventDefault(); c.classList.add('cvd-ev-chip--over'); });
        c.addEventListener('dragleave', function () { c.classList.remove('cvd-ev-chip--over'); });
        c.addEventListener('drop', function (e) {
          e.preventDefault(); c.classList.remove('cvd-ev-chip--over');
          var src = e.dataTransfer.getData('text/plain');
          if (!src) return;
          var idx = parseInt(c.getAttribute('data-index'), 10);
          if (c.getAttribute('data-type') === 'exp') S.experience[idx].ev = src;
          else S.projects[idx].ev = src;
          buildEditor(); render();
        });
      })(chips[j]);
    }
  }

  function thumb(t) {
    var g = '#e6e9ec', d = '#c7ccd2';
    var s = '<svg viewBox="0 0 72 90" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="72" height="90" fill="' + t.paper + '"/>';
    function R(x, y, w, h, f) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + f + '"/>'; }
    if (t.id === 'classic') {
      s += R(20, 9, 32, 4, t.ink) + R(6, 16, 60, 1, t.ink);
      s += R(6, 21, 60, 3, d) + R(6, 27, 60, 2, g) + R(6, 31, 60, 2, g) + R(6, 35, 60, 2, g);
      s += R(6, 41, 60, 3, d) + R(6, 47, 60, 2, g) + R(6, 51, 60, 2, g);
    } else if (t.id === 'elegant') {
      s += R(0, 0, 72, 5, t.a) + R(8, 13, 28, 4, t.a);
      s += R(8, 21, 64, 3, t.a) + R(8, 27, 64, 2, g) + R(8, 31, 64, 2, g);
      s += R(8, 37, 64, 3, t.a) + R(8, 43, 64, 2, g) + R(8, 47, 64, 2, g);
    } else if (t.id === 'two') {
      s += R(22, 9, 28, 4, t.ink) + R(6, 16, 60, 1, d);
      s += R(6, 21, 44, 3, d) + R(6, 27, 44, 2, g) + R(6, 31, 44, 2, g) + R(6, 35, 44, 2, g);
      s += R(53, 21, 13, 3, d) + R(53, 27, 13, 2, g) + R(53, 31, 13, 2, g);
    } else if (t.id === 'modern') {
      s += R(0, 0, 22, 90, '#0f172a') + R(6, 11, 11, 4, '#fff') + R(6, 20, 11, 2, t.a);
      s += R(6, 26, 11, 2, '#334155') + R(6, 30, 11, 2, '#334155') + R(6, 34, 11, 2, '#334155');
      s += R(28, 11, 38, 3, d) + R(28, 17, 38, 2, g) + R(28, 21, 38, 2, g) + R(28, 25, 38, 2, g);
      s += R(28, 32, 38, 3, d) + R(28, 38, 38, 2, g) + R(28, 42, 38, 2, g);
    } else if (t.id === 'premium') {
      s += R(4, 8, 64, 13, '#0f172a') + R(10, 13, 30, 4, '#fff');
      s += R(6, 26, 42, 3, d) + R(6, 32, 42, 2, g) + R(6, 36, 42, 2, g) + R(6, 40, 42, 2, g);
      s += R(51, 26, 15, 3, d) + R(51, 32, 15, 2, g) + R(51, 36, 15, 2, g);
    } else {
      s += R(20, 9, 32, 4, t.ink) + R(6, 16, 60, 1, t.ink) + R(6, 21, 60, 3, d);
      s += '<rect x="6" y="27" width="60" height="10" fill="none" stroke="#c9c0b0"/>';
      s += '<line x1="21" y1="27" x2="21" y2="37" stroke="#c9c0b0"/><line x1="41" y1="27" x2="41" y2="37" stroke="#c9c0b0"/>';
      s += R(6, 42, 60, 3, d) + R(6, 48, 60, 2, g) + R(6, 52, 60, 2, g);
    }
    return s + '</svg>';
  }

  function buildTemplates() {
    var list = document.getElementById('cvd-tpl-list');
    list.innerHTML = TPL.map(function (t) {
      var pill = t.premium ? '<span class="cvd-tpl-pill">Special</span>' : '';
      return '<button type="button" class="cvd-tpl" data-id="' + t.id + '">' +
        '<span class="cvd-tpl-thumb">' + thumb(t) + '</span>' +
        '<span class="cvd-tpl-body"><span class="cvd-tpl-name">' + t.name + pill + '</span>' +
        '<span class="cvd-tpl-cap">' + t.cap + '</span></span></button>';
    }).join('');
    var btns = list.querySelectorAll('.cvd-tpl');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () { select(this.getAttribute('data-id')); });
    }
  }

  function buildAssets() {
    var el = document.getElementById('cvd-assets');
    var thumbs = ASSETS.map(function (a) {
      return '<div class="cvd-asset" draggable="true" data-src="' + a.src + '" title="Drag onto an evidence slot">' +
        '<img src="' + a.src + '" alt=""><span class="cvd-asset-tag">' + E(a.target) + '</span></div>';
    }).join('');
    el.innerHTML =
      '<div class="cvd-assets-head"><span class="cvd-assets-title">Assets — drag one onto a slot in the editor</span>' +
      '<button type="button" class="cvd-upload" id="cvd-upload">Upload</button></div>' +
      '<div class="cvd-assets-row">' + thumbs + '</div>';
    document.getElementById('cvd-upload').addEventListener('click', function () { toast(NOT_WIRED); });
    var as = el.querySelectorAll('.cvd-asset');
    for (var i = 0; i < as.length; i++) {
      (function (b) {
        b.addEventListener('dragstart', function (e) {
          e.dataTransfer.setData('text/plain', b.getAttribute('data-src'));
          e.dataTransfer.effectAllowed = 'copy';
        });
      })(as[i]);
    }
  }

  function buildImport() {
    var el = document.getElementById('cvd-import');
    el.innerHTML = '<div class="cvd-import-box" id="cvd-import-box">' +
      '<div class="cvd-import-title">Import resume</div><div class="cvd-import-hint">.docx · .pdf</div></div>';
    document.getElementById('cvd-import-box').addEventListener('click', function () { toast(NOT_WIRED); });
  }

  function select(id) {
    activeId = id;
    var btns = document.querySelectorAll('.cvd-tpl');
    for (var i = 0; i < btns.length; i++) btns[i].classList.toggle('active', btns[i].getAttribute('data-id') === id);
    render();
  }
  function render() {
    var sheet = document.getElementById('cvd-sheet');
    if (sheet) { sheet.innerHTML = renderers[activeId](); wireEvidence(sheet); }
  }
  function wireEvidence(sheet) {
    var evs = sheet.querySelectorAll('.ev');
    for (var i = 0; i < evs.length; i++) {
      (function (el) {
        el.addEventListener('mouseenter', function () {
          if (!evtip) return;
          evtip.querySelector('img').src = el.getAttribute('data-src');
          evtip.classList.add('show');
        });
        el.addEventListener('mousemove', function (e) {
          if (!evtip) return;
          var w = 200, h = evtip.offsetHeight || 120;
          var x = e.clientX + 16, y = e.clientY + 16;
          if (x + w > window.innerWidth) x = e.clientX - w - 16;
          if (y + h > window.innerHeight) y = e.clientY - h - 16;
          evtip.style.left = x + 'px';
          evtip.style.top = y + 'px';
        });
        el.addEventListener('mouseleave', function () { if (evtip) evtip.classList.remove('show'); });
      })(evs[i]);
    }
  }

  function mount() {
    var root = document.getElementById('cvd-demo');
    if (!root) return;
    if (!evtip) {
      evtip = document.createElement('div');
      evtip.className = 'cvd-evtip';
      evtip.innerHTML = '<img alt="">';
      document.body.appendChild(evtip);
    }
    root.innerHTML =
      '<div class="cvd-frame"><div class="cvd-app">' +
      '<header class="cvd-top"><span class="cvd-brand">CVdresser <em>Resume Studio</em></span>' +
      '<button type="button" class="cvd-share" id="cvd-share">Share CV</button></header>' +
      '<div class="cvd-cols">' +
      '<aside class="cvd-tpls">' +
      '<div class="cvd-group">Recommended formatter templates</div>' +
      '<div class="cvd-tpl-list" id="cvd-tpl-list"></div>' +
      '<div class="cvd-ai"><div class="cvd-group cvd-group--ai">Generate / edit formatting style<br>by natural language</div>' +
      '<textarea class="cvd-ai-in" placeholder="Describe the role, mood, and layout…"></textarea>' +
      '<button type="button" class="cvd-ai-btn" id="cvd-ai-btn">Generate template</button></div>' +
      '</aside>' +
      '<section class="cvd-editor">' +
      '<div class="cvd-import" id="cvd-import"></div>' +
      '<div class="cvd-editor-body" id="cvd-editor-body"></div>' +
      '</section>' +
      '<section class="cvd-preview"><div class="cvd-prev-bar"><span class="cvd-prev-title">Live preview</span><span class="cvd-prev-pill">Download PDF</span></div>' +
      '<div class="cvd-sheet" id="cvd-sheet"></div></section>' +
      '</div>' +
      '<div class="cvd-assets" id="cvd-assets"></div>' +
      '</div></div>';

    buildTemplates();
    buildEditor();
    buildImport();
    buildAssets();
    select('classic');
    document.getElementById('cvd-ai-btn').addEventListener('click', function () { toast(NOT_WIRED); });
    document.getElementById('cvd-share').addEventListener('click', function () { toast(NOT_WIRED); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
