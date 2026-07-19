/**
 * Home 2.0 Cards
 *
 * A self-contained collection of Lovelace cards with a soft, rounded,
 * pastel design language. No dependencies — plain web components, one file.
 *
 * Cards: home2-layout, home2-chips, home2-clock, home2-weather, home2-status,
 *        home2-device, home2-energy, home2-batteries, home2-alerts, home2-room,
 *        home2-thermostat, home2-zone, home2-camera, home2-theme
 *
 * Colourways: lavender (default), eucalypt, ocean, sunset, slate — pick with
 * the home2-theme card or per-card `colourway:` option. Light + dark automatic
 * (follows Home Assistant's dark mode).
 *
 * Two rules the collection holds itself to:
 *
 *   1. Colour means state, not theme. The accent (lavender &c.) is decoration
 *      and belongs to controls; --h2-good / --h2-warn / --h2-crit mean
 *      something and belong to data. A value you have to *read* to understand
 *      has failed — it should be scannable from across the room.
 *
 *   2. Motion is earned by touch. Hover lifts, press compresses, a state
 *      change confirms itself — and then everything goes still. The only
 *      ambient animation in the collection is the weather hero, which is
 *      depicting live conditions, plus a single breathing dot for a battery
 *      that is genuinely about to die. Anything that pulses indefinitely
 *      stops being information and becomes wallpaper.
 */
(function () {
  "use strict";
  const VERSION = "0.2.0";

  /* ------------------------------------------------------------------ *
   * Colourways
   * ------------------------------------------------------------------ */
  /* Semantic colour is deliberately NOT the accent — it means state, not theme.
     Soft variants are backgrounds; the solid variants are ink and edges. */
  const SEMANTIC = {
    light: {
      good: "#2fa871", goodSoft: "#dcf1e7",
      warn: "#dd8f30", warnSoft: "#fae9d6",
      crit: "#d34b4b", critSoft: "#f9dcdc",
    },
    dark: {
      good: "#46ce8c", goodSoft: "#17392b",
      warn: "#f2a957", warnSoft: "#3d2a13",
      crit: "#f06a6a", critSoft: "#401c1c",
    },
  };
  const PALETTES = {
    lavender: {
      label: "Lavender",
      light: {
        bg: "#e4e8f6", bgGlow: "#eef0fb", card: "#fbfcff", cardSoft: "#eff1fb",
        ink: "#3f466f", inkStrong: "#333a63", muted: "#949bc2", faint: "#b9bfdd",
        accent: "#7a7ee3", accentSoft: "#e3e5fa", fillA: "#9195f2", fillB: "#6d71dd",
        heroA: "#4c4f92", heroB: "#35386b",
        shadow: "0 18px 40px -18px rgba(88,96,168,.35)", shadowLift: "0 24px 50px -20px rgba(88,96,168,.5)",
        toggleOff: "#d8dcf0", knobOff: "#ffffff",
      },
      dark: {
        bg: "#131530", bgGlow: "#191c3c", card: "#1e2147", cardSoft: "#272b56",
        ink: "#dde1f8", inkStrong: "#eef0ff", muted: "#7d84b4", faint: "#565d92",
        accent: "#8f93f0", accentSoft: "#2e3266", fillA: "#7f83ec", fillB: "#5a5ecf",
        heroA: "#3f4287", heroB: "#262955",
        shadow: "0 18px 40px -18px rgba(0,2,20,.6)", shadowLift: "0 24px 50px -20px rgba(0,2,20,.75)",
        toggleOff: "#343965", knobOff: "#8d93c4",
      },
    },
    eucalypt: {
      label: "Eucalypt",
      light: {
        bg: "#e2eee6", bgGlow: "#ecf6ef", card: "#fbfffc", cardSoft: "#ecf4ee",
        ink: "#3c5c4a", inkStrong: "#2e4b3a", muted: "#8fac9b", faint: "#b4cbbd",
        accent: "#58a380", accentSoft: "#ddefe5", fillA: "#7cc4a0", fillB: "#55a37d",
        heroA: "#3e6b53", heroB: "#284737",
        shadow: "0 18px 40px -18px rgba(72,124,97,.32)", shadowLift: "0 24px 50px -20px rgba(72,124,97,.48)",
        toggleOff: "#d3e4d9", knobOff: "#ffffff",
      },
      dark: {
        bg: "#0f231a", bgGlow: "#142b20", card: "#1a3527", cardSoft: "#224231",
        ink: "#d9ecdf", inkStrong: "#eefbf2", muted: "#7ba38c", faint: "#527663",
        accent: "#7fcaa5", accentSoft: "#28503b", fillA: "#6dbb95", fillB: "#4a9a73",
        heroA: "#2f5a44", heroB: "#1c3a2b",
        shadow: "0 18px 40px -18px rgba(0,12,6,.6)", shadowLift: "0 24px 50px -20px rgba(0,12,6,.75)",
        toggleOff: "#2b4f3c", knobOff: "#8fbfa4",
      },
    },
    ocean: {
      label: "Ocean",
      light: {
        bg: "#deeaf4", bgGlow: "#eaf3fa", card: "#fafdff", cardSoft: "#eaf2f8",
        ink: "#35526b", inkStrong: "#2a4358", muted: "#8aa8c0", faint: "#b0c7d9",
        accent: "#4d9bd6", accentSoft: "#ddecf9", fillA: "#6fb3e8", fillB: "#4a8fd0",
        heroA: "#2f5b7f", heroB: "#1e3d57",
        shadow: "0 18px 40px -18px rgba(64,110,152,.32)", shadowLift: "0 24px 50px -20px rgba(64,110,152,.5)",
        toggleOff: "#d2e2ee", knobOff: "#ffffff",
      },
      dark: {
        bg: "#0e1d2b", bgGlow: "#132535", card: "#1a2f43", cardSoft: "#213b53",
        ink: "#d9e7f4", inkStrong: "#eef6fd", muted: "#7897b2", faint: "#4f6d87",
        accent: "#6fb3e8", accentSoft: "#254764", fillA: "#5fa6dd", fillB: "#3f83c2",
        heroA: "#274d6d", heroB: "#173049",
        shadow: "0 18px 40px -18px rgba(0,6,14,.6)", shadowLift: "0 24px 50px -20px rgba(0,6,14,.75)",
        toggleOff: "#2a4a66", knobOff: "#87abc9",
      },
    },
    sunset: {
      label: "Sunset",
      light: {
        bg: "#f6e7dd", bgGlow: "#fbf0e9", card: "#fffcf9", cardSoft: "#f8ede5",
        ink: "#6b4a3c", inkStrong: "#573a2e", muted: "#bb9a89", faint: "#d8bfb1",
        accent: "#dd8355", accentSoft: "#f9e4d7", fillA: "#eb9d70", fillB: "#d67a49",
        heroA: "#7f4b57", heroB: "#54303c",
        shadow: "0 18px 40px -18px rgba(150,101,74,.32)", shadowLift: "0 24px 50px -20px rgba(150,101,74,.5)",
        toggleOff: "#eddccf", knobOff: "#ffffff",
      },
      dark: {
        bg: "#241318", bgGlow: "#2c181e", card: "#382028", cardSoft: "#452832",
        ink: "#f4dfd6", inkStrong: "#fdf0ea", muted: "#b78d7e", faint: "#82605a",
        accent: "#eb9d70", accentSoft: "#54303c", fillA: "#e08f60", fillB: "#c26c3e",
        heroA: "#63394a", heroB: "#40232f",
        shadow: "0 18px 40px -18px rgba(16,2,6,.6)", shadowLift: "0 24px 50px -20px rgba(16,2,6,.75)",
        toggleOff: "#553341", knobOff: "#c49484",
      },
    },
    slate: {
      label: "Slate",
      light: {
        bg: "#e6e8ee", bgGlow: "#eff0f5", card: "#fcfcfe", cardSoft: "#eef0f4",
        ink: "#454b5e", inkStrong: "#363c4e", muted: "#9aa1b4", faint: "#bfc5d4",
        accent: "#7c88a8", accentSoft: "#e5e9f2", fillA: "#96a2c0", fillB: "#707d9e",
        heroA: "#464e66", heroB: "#2e3447",
        shadow: "0 18px 40px -18px rgba(80,88,110,.32)", shadowLift: "0 24px 50px -20px rgba(80,88,110,.5)",
        toggleOff: "#d8dce6", knobOff: "#ffffff",
      },
      dark: {
        bg: "#14161d", bgGlow: "#191c25", card: "#20242f", cardSoft: "#2a2f3d",
        ink: "#dde1ea", inkStrong: "#eef1f7", muted: "#828aa0", faint: "#575e72",
        accent: "#98a5c4", accentSoft: "#323a4e", fillA: "#8996b6", fillB: "#67749a",
        heroA: "#3a4258", heroB: "#252b3b",
        shadow: "0 18px 40px -18px rgba(0,2,8,.6)", shadowLift: "0 24px 50px -20px rgba(0,2,8,.75)",
        toggleOff: "#333a4c", knobOff: "#8b93aa",
      },
    },
  };
  const CW_KEY = "home2-colourway";
  const CW_EVENT = "home2-colourway-changed";
  const getColourway = () => {
    try { const v = localStorage.getItem(CW_KEY); if (v && PALETTES[v]) return v; } catch (e) {}
    return "lavender";
  };
  const setColourway = (name) => {
    try { localStorage.setItem(CW_KEY, name); } catch (e) {}
    window.dispatchEvent(new CustomEvent(CW_EVENT, { detail: name }));
  };

  const varsBlock = (p, sem, isDark) => `
    --h2-bg:${p.bg}; --h2-bg-glow:${p.bgGlow}; --h2-card:${p.card}; --h2-card-soft:${p.cardSoft};
    --h2-ink:${p.ink}; --h2-ink-strong:${p.inkStrong}; --h2-muted:${p.muted}; --h2-faint:${p.faint};
    --h2-accent:${p.accent}; --h2-accent-soft:${p.accentSoft}; --h2-fill-a:${p.fillA}; --h2-fill-b:${p.fillB};
    --h2-hero-a:${p.heroA}; --h2-hero-b:${p.heroB};
    --h2-shadow:${p.shadow}; --h2-shadow-lift:${p.shadowLift};
    --h2-toggle-off:${p.toggleOff}; --h2-knob-off:${p.knobOff};
    --h2-good:${sem.good}; --h2-good-soft:${sem.goodSoft};
    --h2-warn:${sem.warn}; --h2-warn-soft:${sem.warnSoft};
    --h2-crit:${sem.crit}; --h2-crit-soft:${sem.critSoft};
    --h2-stripe:${isDark ? "rgba(255,255,255,.13)" : "rgba(255,255,255,.5)"};
    --h2-on-fill:#ffffff; --h2-on-fill-dim:rgba(255,255,255,.62); --h2-radius:26px;`;

  /* Theme CSS: light by default, dark when host has [dark] attribute. */
  const themeCSS = (cw) => {
    const pal = PALETTES[cw] || PALETTES.lavender;
    return `:host{${varsBlock(pal.light, SEMANTIC.light, false)}}
      :host([dark]){${varsBlock(pal.dark, SEMANTIC.dark, true)}}
      *{box-sizing:border-box;margin:0}
      button{border:0;font:inherit;cursor:pointer;background:none;color:inherit;padding:0}
      .h2-label{font-size:11.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--h2-muted)}
      svg.ic{display:block}
      svg.ic *{fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
      svg.ic .fill{fill:currentColor;stroke:none}
      .tnum{font-variant-numeric:tabular-nums}`;
  };
  const cardShell = `
    :host{display:block}
    .card{background:var(--h2-card);border-radius:var(--h2-radius);box-shadow:var(--h2-shadow);
      padding:24px;position:relative;height:100%;min-height:0}

    /* ---- shared interaction layer ----------------------------------- *
     * Motion is earned by touch, never ambient. Anything the user can act
     * on opts in with .h2-tap; hover lifts, press compresses. Hover is
     * gated on a real pointer so touch devices don't get a stuck :hover. */
    .h2-tap{transition:transform .2s cubic-bezier(.2,.8,.3,1),box-shadow .2s;cursor:pointer}
    @media(hover:hover){.h2-tap:hover{transform:translateY(-3px);box-shadow:var(--h2-shadow-lift)}}
    .h2-tap:active{transform:translateY(-1px) scale(.978);transition-duration:.09s}
    .h2-tap:focus-visible{outline:2px solid var(--h2-accent);outline-offset:3px}
    /* row-shaped targets shift instead of lifting — a list shouldn't pop */
    .h2-tap-row{transition:background .18s,transform .18s cubic-bezier(.2,.8,.3,1);cursor:pointer;
      border-radius:14px}
    @media(hover:hover){.h2-tap-row:hover{background:var(--h2-card-soft);transform:translateX(3px)}}
    .h2-tap-row:active{transform:translateX(3px) scale(.99)}
    .h2-tap-row:focus-visible{outline:2px solid var(--h2-accent);outline-offset:1px}
    @keyframes h2-breathe{0%,100%{opacity:1}50%{opacity:.45}}
    @media(prefers-reduced-motion:reduce){
      *,*::before,*::after{animation-duration:.01ms!important;animation-iteration-count:1!important;
        transition-duration:.01ms!important}
    }`;

  /* ------------------------------------------------------------------ *
   * Icons (thin-line set, 24x24 viewBox path data)
   * ------------------------------------------------------------------ */
  const ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6L17 7M7 17l-1.4 1.4"/>',
    moon: '<path d="M17 10a5.5 5.5 0 1 1-6.9-6.7A6.5 6.5 0 1 0 17.8 12 5.6 5.6 0 0 1 17 10z"/>',
    cloud: '<path d="M7 18a4 4 0 0 1 .5-8 5 5 0 0 1 9.7 1.2A3.4 3.4 0 0 1 17 18z"/>',
    cloudsun: '<circle cx="15" cy="8.5" r="3"/><path d="M15 3v1.4M20.5 8.5H19M18.9 4.6l-1 1M6.5 19a3.6 3.6 0 0 1 .4-7.2A4.5 4.5 0 0 1 15.6 13 3 3 0 0 1 15 19z"/>',
    cloudmoon: '<path d="M18.5 7.5a3 3 0 1 1-3.7-3.6 3.5 3.5 0 1 0 4.2 4.2z"/><path d="M6.5 19a3.6 3.6 0 0 1 .4-7.2A4.5 4.5 0 0 1 15.6 13 3 3 0 0 1 15 19z"/>',
    rain: '<path d="M7 15a4 4 0 0 1 .5-8 5 5 0 0 1 9.7 1.2A3.4 3.4 0 0 1 17 15z"/><path d="M8.5 17.5 7.5 20M12.5 17.5l-1 2.5M16.5 17.5l-1 2.5"/>',
    snow: '<path d="M7 15a4 4 0 0 1 .5-8 5 5 0 0 1 9.7 1.2A3.4 3.4 0 0 1 17 15z"/><path d="M8 18.2v.01M12 19.5v.01M16 18.2v.01M10 21v.01M14 21v.01"/>',
    fog: '<path d="M7 13a4 4 0 0 1 .5-8 5 5 0 0 1 9.7 1.2A3.4 3.4 0 0 1 17 13z"/><path d="M5 16.5h14M7 19.5h10"/>',
    storm: '<path d="M7 14a4 4 0 0 1 .5-8 5 5 0 0 1 9.7 1.2A3.4 3.4 0 0 1 17 14z"/><path d="m12.5 14.5-2 3h3l-2 3"/>',
    wind: '<path d="M3.5 9.5h10a2.4 2.4 0 1 0-2.3-3M3.5 13.5h14.2a2.6 2.6 0 1 1-2.4 3.5M3.5 17.2h6"/>',
    thermo: '<path d="M10.5 14V5.5a1.7 1.7 0 0 1 3.4 0V14a3.6 3.6 0 1 1-3.4 0z"/><circle class="fill" cx="12.2" cy="17.2" r="1.6"/>',
    drop: '<path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5z"/>',
    bolt: '<path d="M13 3 5.5 13.5H11L9.8 21l7.7-10.5H12z"/>',
    battery: '<rect x="3" y="8" width="15" height="9" rx="2.5"/><path d="M21 11v3"/><rect class="fill" x="5.5" y="10.5" width="7.3" height="4" rx="1.2"/>',
    batteryBolt: '<rect x="4" y="7.5" width="14" height="9" rx="2.5"/><path d="M20.5 10.5v3"/><path d="m11.5 9.5-2 2.8h3l-2 2.7"/>',
    grid: '<path d="M4 21 10 3h4l6 18M6.5 14h11M8.3 8.5h7.4"/>',
    home: '<path d="m4 11 8-7 8 7M6 9.5V19a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 19V9.5"/>',
    mail: '<rect x="4" y="6.5" width="16" height="12" rx="2.5"/><path d="m4.8 8 7.2 5.5L19.2 8"/>',
    garage: '<path d="m3.5 11 8.5-6.5L20.5 11M5.5 9.8V19h13V9.8M5.5 12.5h13M5.5 15.5h13"/>',
    lock: '<rect x="6" y="10.5" width="12" height="9" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/><circle class="fill" cx="12" cy="15" r="1.4"/>',
    bulb: '<path d="M9 14a5 5 0 1 1 6 0c-.9.7-1.2 1.5-1.2 2.5h-3.6c0-1-.3-1.8-1.2-2.5z"/><path d="M10.5 19h3M11 21.5h2"/>',
    tv: '<rect x="3.5" y="5.5" width="17" height="11" rx="2"/><path d="M9 20h6M12 16.5V20"/>',
    ac: '<rect x="4" y="6" width="16" height="8" rx="2.5"/><path d="M7 17c.8 1 .8 2 0 3M12 17c.8 1 .8 2 0 3M17 17c.8 1 .8 2 0 3M7 10h6"/>',
    fan: '<circle cx="12" cy="12" r="2"/><path d="M12 10c0-3.5 1.6-5 3.2-5 1.4 0 2.3 1 2.3 2.2 0 2-2.4 2.8-5.5 2.8zM12 14c0 3.5-1.6 5-3.2 5-1.4 0-2.3-1-2.3-2.2 0-2 2.4-2.8 5.5-2.8zM10 12c-3.5 0-5-1.6-5-3.2C5 7.4 6 6.5 7.2 6.5c2 0 2.8 2.4 2.8 5.5zM14 12c3.5 0 5 1.6 5 3.2 0 1.4-1 2.3-2.2 2.3-2 0-2.8-2.4-2.8-5.5z"/>',
    sofa: '<path d="M5 12V8.5A2.5 2.5 0 0 1 7.5 6h9A2.5 2.5 0 0 1 19 8.5V12"/><path d="M4 17.5V14a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3.5M4 15.5h16M6.5 17.5v1.5M17.5 17.5v1.5"/>',
    bed: '<path d="M4 18v-6.5A2.5 2.5 0 0 1 6.5 9h11a2.5 2.5 0 0 1 2.5 2.5V18M4 15h16M6 9V6h12v3"/><path d="M7.5 9V7.8h4V9"/>',
    pot: '<path d="M5 8h10M5 8a2.5 2.5 0 0 0 2.5 10h5A2.5 2.5 0 0 0 15 8M17 10.5 20 8M6.5 5.5C6.5 4 8 4 8 4M11 5.5C11 4 12.5 4 12.5 4"/>',
    vacuum: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3.2"/><circle class="fill" cx="12" cy="12" r=".9"/><path d="M12 3.5v2"/>',
    camera: '<path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h7A2.5 2.5 0 0 1 16 8.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 4 15.5zM16 10.5l4-2.5v8l-4-2.5"/>',
    person: '<circle cx="12" cy="8" r="3.5"/><path d="M5.5 20c.8-3.6 3.4-5.5 6.5-5.5s5.7 1.9 6.5 5.5"/>',
    up: '<path d="M7 17 17 7M9.5 7H17v7.5"/>',
    down: '<path d="m7 7 10 10M17 9.5V17H9.5"/>',
    plus: '<path d="M12 5.5v13M5.5 12h13"/>',
    minus: '<path d="M5.5 12h13"/>',
    palette: '<path d="M12 3.5a8.5 8.5 0 1 0 0 17c1.4 0 2-.8 2-1.8 0-.9-.6-1.4-.6-2.2 0-1 .8-1.8 2-1.8h1.8a3.3 3.3 0 0 0 3.3-3.4C20.5 6.8 16.7 3.5 12 3.5z"/><circle class="fill" cx="7.5" cy="10.5" r="1.2"/><circle class="fill" cx="10.5" cy="7" r="1.2"/><circle class="fill" cx="15" cy="7.5" r="1.2"/><circle class="fill" cx="17" cy="11" r="1.2"/>',
    speaker: '<rect x="6" y="3.5" width="12" height="17" rx="2.5"/><circle cx="12" cy="14.5" r="3.5"/><circle class="fill" cx="12" cy="8" r="1.2"/>',
    plug: '<path d="M9 3.5V8M15 3.5V8M7 8h10v3a5 5 0 0 1-10 0zM12 16v4.5"/>',
    cover: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h16M4 12.5h16M12 16v2"/>',
    generic: '<circle cx="12" cy="12" r="8"/><path d="M12 8v4l3 2"/>',
  };
  const icon = (name, size, cls) =>
    `<svg class="ic ${cls || ""}" width="${size}" height="${size}" viewBox="0 0 24 24">${ICONS[name] || ICONS.generic}</svg>`;

  const DOMAIN_ICONS = {
    light: "bulb", switch: "plug", media_player: "tv", climate: "ac", fan: "fan",
    cover: "cover", vacuum: "vacuum", lock: "lock", camera: "camera", person: "person",
  };

  /* ------------------------------------------------------------------ *
   * Helpers
   * ------------------------------------------------------------------ */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const num = (v, d) => { const n = parseFloat(v); return isNaN(n) ? null : (d == null ? n : +n.toFixed(d)); };
  const relDays = (iso) => {
    const t = Date.parse(iso); if (isNaN(t)) return null;
    const d = Math.floor((Date.now() - t) / 864e5);
    return d <= 0 ? "today" : d === 1 ? "yesterday" : `${d} days ago`;
  };
  const capitalize = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  const stateOn = (st) =>
    ["on", "open", "playing", "heat", "cool", "heat_cool", "auto", "dry", "fan_only",
     "cleaning", "returning", "unlocked", "home", "streaming", "recording"].includes(st);

  /* ------------------------------------------------------------------ *
   * Base card
   * ------------------------------------------------------------------ */
  class H2Base extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open" });
      this._cwListener = () => this._fullRender();
    }
    connectedCallback() {
      window.addEventListener(CW_EVENT, this._cwListener);
      if (this._config && this._hass && !this._rendered) this._fullRender();
    }
    disconnectedCallback() { window.removeEventListener(CW_EVENT, this._cwListener); }
    setConfig(config) { this._config = config || {}; this._rendered = false; if (this._hass) this._fullRender(); }
    set hass(hass) {
      this._hass = hass;
      const dark = !!(hass && hass.themes && hass.themes.darkMode);
      if (dark !== this._dark) { this._dark = dark; this.toggleAttribute("dark", dark); }
      if (!this._config) return;
      if (!this._rendered) this._fullRender();
      else this._update();
    }
    get hass() { return this._hass; }
    _cw() { return (this._config && this._config.colourway) || getColourway(); }
    _fullRender() {
      if (!this._config || !this._hass) return;
      this._rendered = true;
      this.toggleAttribute("dark", !!this._dark);
      this.shadowRoot.innerHTML = `<style>${themeCSS(this._cw())}${cardShell}${this._css()}</style>${this._html()}`;
      this._bind();
      this._update();
    }
    _st(id) { return (this._hass && this._hass.states[id]) || null; }
    _sv(id) { const s = this._st(id); return s ? s.state : null; }
    _name(id, fallback) {
      const s = this._st(id);
      return (s && s.attributes.friendly_name) || fallback || id;
    }
    $(sel) { return this.shadowRoot.querySelector(sel); }
    $$(sel) { return [...this.shadowRoot.querySelectorAll(sel)]; }
    _css() { return ""; }
    _html() { return ""; }
    _bind() {}
    _update() {}
    getCardSize() { return 3; }
  }

  /* ------------------------------------------------------------------ *
   * Trend tracking (shared): compare current numeric state with the value
   * ~45 minutes ago from the recorder history. Cached per entity, 5 min.
   * ------------------------------------------------------------------ */
  const _trendCache = new Map();
  async function trendFor(hass, entityId) {
    const now = Date.now();
    const hit = _trendCache.get(entityId);
    if (hit && now - hit.at < 3e5) return hit.dir;
    const cur = num(hass.states[entityId] && hass.states[entityId].state);
    if (cur == null) return 0;
    let dir = 0;
    try {
      const start = new Date(now - 45 * 6e4).toISOString();
      const res = await hass.callApi("GET",
        `history/period/${start}?filter_entity_id=${entityId}&minimal_response&no_attributes`);
      const arr = (res && res[0]) || [];
      const past = num(arr.length ? arr[0].state : null);
      if (past != null) {
        const diff = cur - past;
        const eps = Math.abs(past) > 200 ? 15 : 0.25; // CO2 ppm vs °C/%
        dir = diff > eps ? 1 : diff < -eps ? -1 : 0;
      }
    } catch (e) { /* recorder unavailable — no trend shown */ }
    _trendCache.set(entityId, { at: now, dir });
    return dir;
  }
  const trendIcon = (dir, size) =>
    dir ? `<svg class="ic trend" width="${size || 12}" height="${size || 12}" viewBox="0 0 24 24">${dir > 0 ? ICONS.up : ICONS.down}</svg>` : "";

  /* ------------------------------------------------------------------ *
   * home2-layout — panel-mode 12-column grid that hosts other cards.
   * config: { background: true, cards: [{ cols: 3, card: {...} }, ...] }
   * ------------------------------------------------------------------ */
  class H2Layout extends H2Base {
    setConfig(config) {
      if (!config || !Array.isArray(config.cards)) throw new Error("home2-layout: `cards` list required");
      this._children = null;
      super.setConfig(config);
    }
    _css() {
      return `
        :host{display:block;min-height:100%;}
        .frame{min-height:100vh;padding:clamp(14px,2.5vw,36px);
          background:radial-gradient(1200px 700px at 20% -10%, var(--h2-bg-glow), var(--h2-bg) 60%);}
        .grid{display:grid;grid-template-columns:repeat(12,1fr);gap:20px;max-width:1560px;margin:0 auto;
          grid-auto-rows:minmax(0,auto);grid-auto-flow:dense;}
        /* Third-party cards render a real <ha-card> and take their shape from
           HA's own custom properties. Hand ours down so anything dropped into
           the layout — air-quality, power-flow, vacuum map — matches the
           collection instead of sitting in the grid with square corners. */
        .cell{min-width:0;
          --ha-card-border-radius:var(--h2-radius);
          --ha-card-box-shadow:var(--h2-shadow);
          --ha-card-border-width:0;}
        /* Cards already set .card{height:100%}, but that percentage resolves
           against the custom-element host, which has no height of its own — so
           it collapsed to auto and every card in a row ended up a different
           height. Giving the host the stretched cell height makes it resolve. */
        .cell>*{height:100%}
        .cell.sect>*{height:auto}
        .cell.sect{align-self:end;padding:14px 4px 0;}
        .cell.sect h2{font-size:14px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:var(--h2-muted);}
        ${[1,2,3,4,5,6,7,8,9,10,11,12].map(n=>`.c${n}{grid-column:span ${n}}`).join("")}
        @media(max-width:1150px){.c3,.c4{grid-column:span 6}.c5,.c6,.c8,.c9{grid-column:span 12}}
        @media(max-width:660px){.cell{grid-column:span 12}.grid{gap:14px}}`;
    }
    _html() {
      const cells = this._config.cards.map((c, i) => {
        const span = Math.min(12, Math.max(1, c.cols || 4));
        if (c.section) return `<div class="cell sect c12"><h2>${esc(c.section)}</h2></div>`;
        return `<div class="cell c${span}" data-i="${i}"></div>`;
      }).join("");
      return `<div class="frame"><div class="grid">${cells}</div></div>`;
    }
    async _bind() {
      const helpers = window.loadCardHelpers ? await window.loadCardHelpers() : null;
      this._children = [];
      for (const cell of this.$$(".cell[data-i]")) {
        const conf = this._config.cards[+cell.dataset.i].card;
        let el;
        try {
          el = helpers ? helpers.createCardElement(conf) : document.createElement("div");
        } catch (e) {
          el = document.createElement("div");
          el.textContent = "Card error: " + e.message;
        }
        el.hass = this._hass;
        cell.appendChild(el);
        this._children.push(el);
      }
    }
    _update() { (this._children || []).forEach((el) => { try { el.hass = this._hass; } catch (e) {} }); }
    getCardSize() { return 12; }
  }
  customElements.define("home2-layout", H2Layout);

  /* ------------------------------------------------------------------ *
   * home2-chips — pill chips row.
   * config: { chips: [{ entity, name, show_state, color, visible_when:
   *   { entity?, state?, contains? } }] }
   * ------------------------------------------------------------------ */
  class H2Chips extends H2Base {
    _css() {
      return `
        .row{display:flex;gap:12px;flex-wrap:wrap;justify-content:flex-end}
        .chip{display:inline-flex;align-items:center;gap:7px;background:var(--h2-card);color:var(--h2-muted);
          border-radius:999px;padding:9px 16px;font-size:12.5px;font-weight:600;box-shadow:var(--h2-shadow);
          font-family:inherit;}
        .chip .dot{width:8px;height:8px;border-radius:50%;background:var(--h2-faint)}
        .chip.alert{color:var(--h2-ink)}
        .chip.alert .dot{background:var(--h2-crit)}
        .chip.good .dot{background:var(--h2-good)}
        .chip[hidden]{display:none}`;
    }
    _html() {
      const chips = (this._config.chips || []).map((c, i) =>
        `<span class="chip ${esc(c.color || "")}" data-i="${i}"><span class="dot"></span><span class="txt"></span></span>`).join("");
      return `<div class="row">${chips}</div>`;
    }
    _update() {
      (this._config.chips || []).forEach((c, i) => {
        const el = this.$(`.chip[data-i="${i}"]`);
        if (!el) return;
        let visible = true;
        const vw = c.visible_when;
        if (vw) {
          const st = this._sv(vw.entity || c.entity) || "";
          if (vw.state != null) visible = st === vw.state;
          else if (vw.contains != null) visible = st.toLowerCase().includes(String(vw.contains).toLowerCase());
        }
        el.hidden = !visible;
        if (!visible) return;
        let txt = c.name || this._name(c.entity);
        if (c.show_state && c.entity) {
          const st = this._sv(c.entity);
          txt += " " + (st === "unavailable" || st == null ? "offline" : st);
        }
        el.querySelector(".txt").textContent = txt;
      });
    }
    getCardSize() { return 1; }
  }
  customElements.define("home2-chips", H2Chips);

  /* ------------------------------------------------------------------ *
   * home2-clock — date, clock, family presence, greeting.
   * config: { persons: [{ entity, name }], greeting: true }
   * ------------------------------------------------------------------ */
  class H2Clock extends H2Base {
    _css() {
      return `
        .card{display:flex;flex-direction:column;gap:18px;justify-content:space-between}
        .clock{font-size:clamp(52px,4.8vw,80px);font-weight:300;color:var(--h2-accent);line-height:1;}
        .clock small{font-size:.5em;font-weight:300;color:var(--h2-faint)}
        .people{display:flex;flex-direction:column;gap:9px;margin-top:12px}
        .person{display:flex;align-items:center;gap:11px}
        .avatar{width:34px;height:34px;border-radius:50%;display:grid;place-items:center;font-weight:700;
          font-size:13px;color:#fff;flex:none;background:linear-gradient(135deg,var(--h2-fill-a),var(--h2-fill-b));
          background-size:cover;background-position:center;}
        .person:nth-child(2) .avatar{background-image:linear-gradient(135deg,#8ea4ef,#5f7bd8)}
        .person:nth-child(3) .avatar{background-image:linear-gradient(135deg,#a98fe8,#7f63cf)}
        .person:nth-child(4) .avatar{background-image:linear-gradient(135deg,#7fb7e3,#5a8ed0)}
        .avatar.pic{background-image:none}
        .pn{flex:1;font-weight:600;font-size:14px;color:var(--h2-ink)}
        .zone{font-size:11.5px;font-weight:700;border-radius:999px;padding:5px 12px;background:var(--h2-card-soft);color:var(--h2-muted)}
        .zone.home{background:color-mix(in srgb,var(--h2-good) 15%,var(--h2-card-soft));color:var(--h2-good)}
        .scene{display:flex;align-items:center;gap:10px;justify-content:center;background:var(--h2-card-soft);
          border-radius:999px;padding:13px 18px;font-weight:700;font-size:14px;color:var(--h2-ink)}
        .scene .ic{color:var(--h2-warn)}`;
    }
    _html() {
      const persons = (this._config.persons || []).map((p, i) => `
        <div class="person" data-i="${i}">
          <span class="avatar"></span><span class="pn"></span><span class="zone"></span>
        </div>`).join("");
      return `<div class="card">
        <div><div class="h2-label" id="date"></div><div class="clock tnum" id="clock"></div></div>
        <div><div class="h2-label">Family</div><div class="people">${persons}</div></div>
        ${this._config.greeting === false ? "" : `<div class="scene">${icon("sun", 20)}<span id="greet"></span></div>`}
      </div>`;
    }
    _bind() {
      clearInterval(this._timer);
      this._timer = setInterval(() => this._tick(), 5000);
      this._tick();
    }
    disconnectedCallback() { super.disconnectedCallback(); clearInterval(this._timer); }
    _tick() {
      const now = new Date();
      const el = this.$("#clock");
      if (!el) return;
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      el.innerHTML = `${hh}<small>:</small>${mm}`;
      this.$("#date").textContent = now.toLocaleDateString(undefined,
        { weekday: "long", day: "numeric", month: "long", year: "numeric" });
      const g = this.$("#greet");
      if (g) {
        const h = now.getHours();
        g.textContent = h < 5 ? "Good night" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
      }
    }
    _update() {
      this._tick();
      (this._config.persons || []).forEach((p, i) => {
        const row = this.$(`.person[data-i="${i}"]`);
        if (!row) return;
        const st = this._st(p.entity);
        const name = p.name || this._name(p.entity, "?").split(" ")[0];
        row.querySelector(".pn").textContent = name;
        const av = row.querySelector(".avatar");
        const pic = st && st.attributes.entity_picture;
        if (pic) { av.classList.add("pic"); av.style.backgroundImage = `url(${pic})`; av.textContent = ""; }
        else av.textContent = name.charAt(0).toUpperCase();
        const zoneEl = row.querySelector(".zone");
        const state = st ? st.state : "unknown";
        const label = state === "home" ? "Home" : state === "not_home" ? "Away" : capitalize(state.replace(/_/g, " "));
        zoneEl.textContent = label;
        zoneEl.classList.toggle("home", state === "home");
      });
    }
  }
  customElements.define("home2-clock", H2Clock);

  /* ------------------------------------------------------------------ *
   * home2-status — "Right now" list.
   * config: { title, items: [
   *   { entity, name, icon, state_map: {on: "...", off: "..."}, unit },
   *   { type: "battery", soc, in, out, name },
   *   { type: "pm25", entity, name } ] }
   * ------------------------------------------------------------------ */
  const PM25_BANDS = [[9, "Excellent"], [35, "Good"], [55, "Fair"], [125, "Poor"], [1e9, "Hazardous"]];
  class H2Status extends H2Base {
    _css() {
      return `
        .list{display:flex;flex-direction:column;gap:2px;margin-top:14px}
        .item{display:flex;align-items:center;gap:13px;padding:10px 11px}
        /* The icon tile carries state, so 49% and 94% stop looking identical. */
        .tile{width:34px;height:34px;border-radius:11px;flex:none;display:grid;place-items:center;
          background:var(--h2-accent-soft);color:var(--h2-accent);transition:background .35s,color .35s}
        .item[data-tone=good] .tile{background:var(--h2-good-soft);color:var(--h2-good)}
        .item[data-tone=warn] .tile{background:var(--h2-warn-soft);color:var(--h2-warn)}
        .item[data-tone=crit] .tile{background:var(--h2-crit-soft);color:var(--h2-crit)}
        .v{font-weight:700;font-size:15.5px;color:var(--h2-ink-strong);transition:color .35s}
        .item[data-tone=good] .v{color:var(--h2-good)}
        .item[data-tone=warn] .v{color:var(--h2-warn)}
        .item[data-tone=crit] .v{color:var(--h2-crit)}
        .k{font-size:12.5px;color:var(--h2-muted);font-weight:500}`;
    }
    _html() {
      const items = (this._config.items || []).map((it, i) => `
        <div class="item ${it.entity ? "h2-tap-row" : ""}" data-i="${i}" data-tone="neutral"
             ${it.entity ? 'tabindex="0" role="button"' : ""}>
          <span class="tile">${icon(it.icon || "generic", 19)}</span>
          <div><div class="v"></div><div class="k">${esc(it.name || "")}</div></div>
        </div>`).join("");
      return `<div class="card"><div class="h2-label">${esc(this._config.title || "Right now")}</div>
        <div class="list">${items}</div></div>`;
    }
    _bind() {
      this.$$(".item[data-i]").forEach((el) => {
        const it = this._config.items[+el.dataset.i];
        if (!it || !it.entity) return;
        const open = () => this.dispatchEvent(new CustomEvent("hass-more-info",
          { bubbles: true, composed: true, detail: { entityId: it.entity } }));
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
      });
    }
    _update() {
      (this._config.items || []).forEach((it, i) => {
        const row = this.$(`.item[data-i="${i}"]`);
        if (!row) return;
        row.querySelector(".v").textContent = this._value(it);
        row.dataset.tone = this._tone(it);
      });
    }
    /* Tone is explicit where the caller knows best, derived where we do. */
    _tone(it) {
      if (it.tone && it.tone !== "auto") return it.tone;
      if (it.type === "battery") {
        const soc = num(this._sv(it.soc), 0);
        return batLevel(soc, "pack", it);
      }
      if (it.type === "pm25") {
        const v = num(this._sv(it.entity), 1);
        if (v == null) return "neutral";
        return v <= 9 ? "good" : v <= 35 ? "neutral" : v <= 55 ? "warn" : "crit";
      }
      const st = this._sv(it.entity);
      if (st == null) return "neutral";
      if (it.good_when != null) return [].concat(it.good_when).includes(st) ? "good" : "warn";
      if (it.warn_when != null) return [].concat(it.warn_when).includes(st) ? "warn" : "good";
      return "neutral";
    }
    _value(it) {
      if (it.type === "battery") {
        const soc = num(this._sv(it.soc), 0);
        const inW = num(this._sv(it.in)) || 0, outW = num(this._sv(it.out)) || 0;
        const mode = outW > 0.05 ? "discharging" : inW > 0.05 ? "charging" : "idle";
        return `${soc == null ? "—" : soc + "%"} · ${mode}`;
      }
      if (it.type === "pm25") {
        const v = num(this._sv(it.entity), 1);
        if (v == null) return "—";
        const band = PM25_BANDS.find(([max]) => v <= max);
        return `PM2.5 ${v} · ${band[1]}`;
      }
      const st = this._sv(it.entity);
      if (st == null || st === "unavailable" || st === "unknown") return "—";
      if (it.state_map && it.state_map[st] != null) return it.state_map[st];
      const s = this._st(it.entity);
      const unit = it.unit != null ? it.unit : (s.attributes.unit_of_measurement || "");
      const n = num(st);
      const shown = n != null ? n + (unit ? " " + unit : "") : capitalize(st.replace(/_/g, " "));
      return shown;
    }
  }
  customElements.define("home2-status", H2Status);

  /* ------------------------------------------------------------------ *
   * home2-weather — hero card with ambient animated sky.
   * config: { entity, location, humidity_entity, temperature_entity }
   * Scenes: clear day (sun + flowers), clear night (moon + stars), partly
   * cloudy, cloudy, rain, pouring, storm, fog/hazy, snow, windy — plus a
   * frost overlay on cold clear mornings.
   * ------------------------------------------------------------------ */
  const COND_ICON = {
    "clear-night": "moon", sunny: "sun", partlycloudy: "cloudsun", cloudy: "cloud",
    rainy: "rain", pouring: "rain", lightning: "storm", "lightning-rainy": "storm",
    fog: "fog", hail: "snow", snowy: "snow", "snowy-rainy": "snow",
    windy: "wind", "windy-variant": "wind", exceptional: "fog",
  };
  const COND_LABEL = {
    "clear-night": "Clear night", sunny: "Sunny", partlycloudy: "Partly cloudy",
    cloudy: "Cloudy", rainy: "Rain", pouring: "Pouring", lightning: "Thunderstorm",
    "lightning-rainy": "Thunderstorm", fog: "Fog", hail: "Hail", snowy: "Snow",
    "snowy-rainy": "Sleet", windy: "Windy", "windy-variant": "Windy", exceptional: "Hazy",
  };
  class H2Weather extends H2Base {
    _css() {
      return `
        .card{background:linear-gradient(165deg,var(--h2-hero-a),var(--h2-hero-b));color:#fff;
          display:flex;flex-direction:column;justify-content:space-between;min-height:320px;
          box-shadow:var(--h2-shadow-lift);overflow:hidden;}
        .card>:not(.sky){position:relative;z-index:1}
        .sky{position:absolute;inset:0;z-index:0;pointer-events:none}
        .now{text-align:center;margin-top:8px}
        .temp{font-size:clamp(64px,6.5vw,104px);font-weight:250;line-height:1}
        .temp sup{font-size:.38em;font-weight:300;vertical-align:super}
        .cond{margin-top:10px;font-size:15px;color:rgba(255,255,255,.75);font-weight:500}
        .slots{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:26px}
        .slot{display:flex;flex-direction:column;align-items:center;gap:10px;padding:10px 4px 2px;color:rgba(255,255,255,.72)}
        .slot .t{font-size:12.5px;font-weight:600;letter-spacing:.04em}
        .slot .st{font-size:11px;color:rgba(255,255,255,.55);font-weight:600}
        .slot.now-slot{color:#fff}
        .slot.now-slot .t{color:#ffd479}
        /* --- sky pieces --- */
        .cloudf{position:absolute;animation:drift linear infinite;}
        @keyframes drift{from{left:-38%}to{left:112%}}
        .drop{position:absolute;top:-24px;width:1.5px;height:13px;border-radius:1px;
          background:linear-gradient(to bottom,rgba(255,255,255,0),rgba(255,255,255,.45));animation:fall linear infinite;}
        @keyframes fall{to{transform:translate(-26px,600px)}}
        .flake{position:absolute;top:-14px;width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,.75);animation:snowfall linear infinite;}
        @keyframes snowfall{to{transform:translate(18px,600px)}}
        .sunglow{position:absolute;top:-70px;right:-70px;width:280px;height:280px;border-radius:50%;
          background:radial-gradient(circle,rgba(255,212,121,.38),rgba(255,212,121,0) 68%);animation:glowpulse 7s ease-in-out infinite alternate;}
        .sunglow.hazy{background:radial-gradient(circle,rgba(255,225,170,.2),rgba(255,225,170,0) 68%);}
        @keyframes glowpulse{from{transform:scale(1);opacity:.75}to{transform:scale(1.1);opacity:1}}
        .sunspin{position:absolute;top:26px;right:30px;color:rgba(255,222,150,.9);animation:sunspin 70s linear infinite;}
        @keyframes sunspin{to{transform:rotate(360deg)}}
        .moonrise{position:absolute;top:28px;right:34px;color:rgba(235,240,255,.85)}
        .star{position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(255,255,255,.8);animation:twinkle ease-in-out infinite alternate;}
        @keyframes twinkle{from{opacity:.15}to{opacity:.9}}
        .flower{position:absolute;bottom:-4px;color:rgba(255,255,255,.38);transform-origin:50% 100%;animation:sway 5.5s ease-in-out infinite alternate;}
        @keyframes sway{from{transform:rotate(-4deg)}to{transform:rotate(4.5deg)}}
        .speck{position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(255,235,190,.5);animation:floatup ease-in-out infinite alternate;}
        @keyframes floatup{from{transform:translateY(0);opacity:.25}to{transform:translateY(-26px);opacity:.8}}
        .fogband{position:absolute;left:-30%;width:160%;height:34px;border-radius:50%;
          background:linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,.10),rgba(255,255,255,0));animation:fogdrift ease-in-out infinite alternate;}
        @keyframes fogdrift{from{transform:translateX(-6%)}to{transform:translateX(6%)}}
        .flash{position:absolute;inset:0;background:rgba(255,255,255,.9);opacity:0;animation:flash 6s infinite;}
        @keyframes flash{0%,93%,100%{opacity:0}94%{opacity:.35}95%{opacity:0}96.5%{opacity:.22}97.5%{opacity:0}}
        .frostline{position:absolute;bottom:0;left:0;right:0;height:46px;
          background:linear-gradient(to top,rgba(210,235,255,.16),rgba(210,235,255,0));}
        .sparkle{position:absolute;width:3px;height:3px;border-radius:50%;background:rgba(220,240,255,.9);animation:twinkle ease-in-out infinite alternate;}
        .leaf{position:absolute;color:rgba(255,255,255,.4);animation:leaffly linear infinite;}
        @keyframes leaffly{from{left:-10%;transform:translateY(0) rotate(0)}50%{transform:translateY(-18px) rotate(180deg)}to{left:110%;transform:translateY(6px) rotate(360deg)}}
        @media(prefers-reduced-motion:reduce){.sky *{animation:none!important}}`;
    }
    _html() {
      return `<div class="card">
        <div class="sky" id="sky"></div>
        <div class="now">
          <div class="temp tnum" id="temp">—</div>
          <div class="cond" id="cond"></div>
        </div>
        <div class="slots" id="slots"></div>
      </div>`;
    }
    _bind() {
      this._scene = null;
      this._forecastAt = 0;
      clearInterval(this._fcTimer);
      this._fcTimer = setInterval(() => this._loadForecast(), 15 * 6e4);
    }
    disconnectedCallback() { super.disconnectedCallback(); clearInterval(this._fcTimer); }
    _update() {
      const w = this._st(this._config.entity);
      if (!w) return;
      const a = w.attributes;
      const temp = this._config.temperature_entity ? num(this._sv(this._config.temperature_entity), 0) : num(a.temperature, 0);
      const hum = this._config.humidity_entity ? num(this._sv(this._config.humidity_entity), 0) : num(a.humidity, 0);
      this.$("#temp").innerHTML = `${temp == null ? "—" : temp}<sup>°</sup>`;
      const bits = [COND_LABEL[w.state] || capitalize(w.state)];
      if (hum != null) bits.push(`Humidity ${hum}%`);
      if (this._config.location) bits.push(this._config.location);
      this.$("#cond").textContent = bits.join(" · ");
      const frost = (temp != null && temp <= 2 && ["sunny", "clear-night", "partlycloudy"].includes(w.state));
      const key = w.state + (frost ? "+frost" : "");
      if (key !== this._scene) { this._scene = key; this._setSky(w.state, frost); }
      if (Date.now() - this._forecastAt > 15 * 6e4) this._loadForecast();
    }
    async _loadForecast() {
      if (!this._hass || !this._config) return;
      this._forecastAt = Date.now();
      let fc = [];
      try {
        const r = await this._hass.callWS({
          type: "call_service", domain: "weather", service: "get_forecasts",
          service_data: { type: "hourly" }, target: { entity_id: this._config.entity },
          return_response: true,
        });
        fc = ((r.response || r)[this._config.entity] || {}).forecast || [];
      } catch (e) { /* hourly may be unsupported */ }
      const slotsEl = this.$("#slots");
      if (!slotsEl) return;
      if (!fc.length) { slotsEl.innerHTML = ""; return; }
      // bucket the next 24 h into the four six-hour quarters of the day
      const quarters = [[0, "00 – 06"], [6, "06 – 12"], [12, "12 – 18"], [18, "18 – 00"]];
      const nowQ = Math.floor(new Date().getHours() / 6);
      const byQ = [[], [], [], []];
      for (const f of fc.slice(0, 30)) {
        const d = new Date(f.datetime);
        if (d - Date.now() > 24 * 36e5) break;
        byQ[Math.floor(d.getHours() / 6)].push(f);
      }
      slotsEl.innerHTML = quarters.map(([h, label], qi) => {
        const list = byQ[qi];
        let ic = "cloud", t = "";
        if (list.length) {
          const mid = list[Math.floor(list.length / 2)];
          ic = COND_ICON[mid.condition] || "cloud";
          if (qi === 0 && ic === "sun") ic = "moon";
          if (qi === 0 && ic === "cloudsun") ic = "cloudmoon";
          const temps = list.map((f) => f.temperature).filter((v) => v != null);
          if (temps.length) t = Math.round(temps.reduce((x, y) => x + y) / temps.length) + "°";
        }
        return `<div class="slot ${qi === nowQ ? "now-slot" : ""}">${icon(ic, 30)}
          <span class="t">${label}</span>${t ? `<span class="st tnum">${t}</span>` : ""}</div>`;
      }).join("");
    }
    /* ---- ambient sky ---- */
    _mk(html) { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; }
    _cloud(top, w, dur, delay, op) {
      return this._mk(`<svg class="cloudf" style="top:${top};width:${w}px;animation-duration:${dur}s;animation-delay:${delay}s" viewBox="0 0 24 15"><path fill="rgba(255,255,255,${op})" d="M7 14a4 4 0 0 1 .5-8 5 5 0 0 1 9.7 1.2A3.4 3.4 0 0 1 17 14z"/></svg>`);
    }
    _flower(left, h, delay) {
      return this._mk(`<svg class="flower" style="left:${left};height:${h}px;animation-delay:${delay}s" viewBox="0 0 40 80" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <path d="M20 78C20 62 18 50 20 33"/>
        <path d="M20 62c-7-2-11-7-11-13 7 2 10 6 11 12z"/>
        <path d="M20 68c7-2 11-7 11-13-7 2-10 6-11 12z"/>
        <circle cx="20" cy="12" r="6"/><circle cx="29" cy="19" r="6"/><circle cx="26" cy="30" r="6"/><circle cx="14" cy="30" r="6"/><circle cx="11" cy="19" r="6"/>
        <circle cx="20" cy="21" r="4" fill="rgba(255,222,150,.35)" stroke="rgba(255,222,150,.9)"/></svg>`);
    }
    _scatter(sky, cls, n, style) {
      for (let i = 0; i < n; i++) {
        const el = this._mk(`<span class="${cls}"></span>`);
        style(el, i);
        sky.appendChild(el);
      }
    }
    _setSky(cond, frost) {
      const sky = this.$("#sky");
      if (!sky) return;
      sky.innerHTML = "";
      const clouds = (specs) => specs.forEach((s) => sky.appendChild(this._cloud(...s)));
      const rain = (n, fast) => this._scatter(sky, "drop", n, (el) => {
        el.style.left = Math.random() * 100 + "%";
        el.style.animationDuration = ((fast ? 0.55 : 0.9) + Math.random() * 0.7).toFixed(2) + "s";
        el.style.animationDelay = (-Math.random() * 2).toFixed(2) + "s";
        el.style.opacity = (0.4 + Math.random() * 0.6).toFixed(2);
      });
      switch (cond) {
        case "sunny":
          sky.appendChild(this._mk('<div class="sunglow"></div>'));
          sky.appendChild(this._mk(`<svg class="sunspin ic" width="46" height="46" viewBox="0 0 24 24">${ICONS.sun}</svg>`));
          sky.appendChild(this._flower("4%", 68, 0));
          sky.appendChild(this._flower("12%", 46, -2.6));
          this._scatter(sky, "speck", 6, (el) => {
            el.style.left = (5 + Math.random() * 22) + "%";
            el.style.bottom = (30 + Math.random() * 70) + "px";
            el.style.animationDuration = (4 + Math.random() * 3).toFixed(2) + "s";
            el.style.animationDelay = (-Math.random() * 4).toFixed(2) + "s";
          });
          break;
        case "clear-night":
          sky.appendChild(this._mk(`<svg class="moonrise ic" width="42" height="42" viewBox="0 0 24 24">${ICONS.moon}</svg>`));
          this._scatter(sky, "star", 14, (el) => {
            el.style.left = Math.random() * 100 + "%";
            el.style.top = Math.random() * 55 + "%";
            el.style.animationDuration = (2.5 + Math.random() * 4).toFixed(2) + "s";
            el.style.animationDelay = (-Math.random() * 5).toFixed(2) + "s";
          });
          break;
        case "partlycloudy":
          sky.appendChild(this._mk('<div class="sunglow hazy"></div>'));
          clouds([["16%", 130, 105, -35, .09], ["40%", 95, 130, -80, .06], ["8%", 75, 85, -12, .07]]);
          break;
        case "cloudy":
          clouds([["14%", 150, 95, -30, .10], ["36%", 110, 120, -70, .07], ["7%", 85, 80, -10, .08], ["50%", 130, 140, -100, .06]]);
          break;
        case "rainy":
          clouds([["8%", 170, 110, -40, .10], ["20%", 120, 90, -15, .08]]);
          rain(26);
          break;
        case "pouring":
          clouds([["6%", 190, 100, -40, .12], ["16%", 140, 80, -15, .09], ["26%", 110, 120, -70, .07]]);
          rain(52, true);
          break;
        case "lightning": case "lightning-rainy":
          clouds([["6%", 190, 90, -40, .13], ["18%", 130, 75, -15, .09]]);
          rain(30);
          sky.appendChild(this._mk('<div class="flash"></div>'));
          break;
        case "fog": case "exceptional": {
          sky.appendChild(this._mk('<div class="sunglow hazy"></div>'));
          [26, 42, 58, 74].forEach((topPct, i) => {
            const b = this._mk('<div class="fogband"></div>');
            b.style.top = topPct + "%";
            b.style.animationDuration = (7 + i * 2.5) + "s";
            b.style.animationDelay = (-i * 3) + "s";
            sky.appendChild(b);
          });
          break;
        }
        case "snowy": case "snowy-rainy": case "hail":
          clouds([["8%", 160, 115, -40, .09], ["22%", 115, 95, -15, .07]]);
          this._scatter(sky, "flake", 30, (el) => {
            el.style.left = Math.random() * 100 + "%";
            const s = 3 + Math.random() * 4;
            el.style.width = el.style.height = s + "px";
            el.style.opacity = (0.35 + Math.random() * 0.55).toFixed(2);
            el.style.animationDuration = (3.5 + Math.random() * 4).toFixed(2) + "s";
            el.style.animationDelay = (-Math.random() * 7).toFixed(2) + "s";
          });
          if (cond === "snowy-rainy" || cond === "hail") rain(14);
          break;
        case "windy": case "windy-variant":
          clouds([["12%", 140, 34, -12, .10], ["30%", 100, 26, -5, .08], ["6%", 80, 22, -16, .07]]);
          this._scatter(sky, "leaf", 4, (el, i) => {
            el.innerHTML = `<svg class="ic" width="13" height="13" viewBox="0 0 24 24"><path d="M5 19C5 9 12 5 19 5c0 7-4 14-14 14zM5 19c3-4 7-7 10-8"/></svg>`;
            el.style.top = (25 + i * 16) + "%";
            el.style.animationDuration = (7 + Math.random() * 5).toFixed(2) + "s";
            el.style.animationDelay = (-Math.random() * 9).toFixed(2) + "s";
          });
          sky.appendChild(this._flower("5%", 58, 0));
          break;
      }
      if (frost) {
        sky.appendChild(this._mk('<div class="frostline"></div>'));
        this._scatter(sky, "sparkle", 10, (el) => {
          el.style.left = Math.random() * 100 + "%";
          el.style.bottom = (2 + Math.random() * 34) + "px";
          el.style.animationDuration = (1.8 + Math.random() * 2.5).toFixed(2) + "s";
          el.style.animationDelay = (-Math.random() * 3).toFixed(2) + "s";
        });
      }
    }
    getCardSize() { return 5; }
  }
  customElements.define("home2-weather", H2Weather);

  /* ------------------------------------------------------------------ *
   * home2-device — toggleable device tile. Active devices get the filled
   * gradient treatment.
   * config: { entity, name, room, icon, tap: "toggle"|"none"|"more-info" }
   * ------------------------------------------------------------------ */
  const DOMAIN_TOGGLE = {
    light: ["light", "toggle"], switch: ["switch", "toggle"], fan: ["fan", "toggle"],
    input_boolean: ["input_boolean", "toggle"], media_player: ["media_player", "toggle"],
    climate: null, cover: null, vacuum: null, lock: null,
  };
  class H2Device extends H2Base {
    _css() {
      return `
        .card{min-height:150px;display:flex;flex-direction:column;justify-content:space-between;
          overflow:hidden;transition:background .35s}
        /* Ripple fires from the point of contact on a state change only —
           the tile confirms it heard you, then goes quiet again. */
        .ripple{position:absolute;width:340px;height:340px;border-radius:50%;pointer-events:none;
          transform:translate(-50%,-50%) scale(0);opacity:.26;background:currentColor;
          color:var(--h2-accent)}
        :host([on]) .ripple{color:#fff}
        @keyframes h2-ripple{to{transform:translate(-50%,-50%) scale(1);opacity:0}}
        .ripple.go{animation:h2-ripple .58s cubic-bezier(.25,.7,.35,1) forwards}
        .top{display:flex;justify-content:space-between;align-items:flex-start}
        .top .ic{color:var(--h2-accent)}
        .room{font-size:12px;color:var(--h2-muted);font-weight:600;margin-bottom:2px}
        .bottom{display:flex;justify-content:space-between;align-items:baseline;gap:8px}
        .name{font-size:16.5px;font-weight:700;color:var(--h2-ink-strong)}
        .state{font-size:14px;font-weight:600;color:var(--h2-muted);white-space:nowrap}
        .toggle{width:46px;height:26px;border-radius:999px;background:var(--h2-toggle-off);position:relative;flex:none;transition:background .25s}
        .toggle::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;
          background:var(--h2-knob-off);box-shadow:0 2px 5px rgba(20,24,60,.25);transition:left .25s, background .25s}
        :host([on]) .card{background:linear-gradient(140deg,var(--h2-fill-a),var(--h2-fill-b));box-shadow:var(--h2-shadow-lift)}
        :host([on]) .top .ic{color:var(--h2-on-fill)}
        :host([on]) .room,:host([on]) .state{color:var(--h2-on-fill-dim)}
        :host([on]) .name{color:var(--h2-on-fill)}
        :host([on]) .toggle{background:rgba(255,255,255,.35)}
        :host([on]) .toggle::after{left:23px;background:#fff}
        :host([unavailable]) .card{opacity:.55;cursor:default}`;
    }
    _html() {
      const c = this._config;
      const domain = c.entity.split(".")[0];
      const ic = c.icon || DOMAIN_ICONS[domain] || "plug";
      return `<div class="card h2-tap" tabindex="0" role="button">
        <span class="ripple" id="rp"></span>
        <div class="top">${icon(ic, 34)}<div class="toggle" id="tg"></div></div>
        <div class="bottom">
          <div>${c.room ? `<div class="room">${esc(c.room)}</div>` : ""}<div class="name" id="nm"></div></div>
          <div class="state" id="st"></div>
        </div>
      </div>`;
    }
    _bind() {
      const act = (ev) => {
        const tap = this._config.tap || "toggle";
        if (tap === "toggle") { this._ripple(ev); this._toggle(); }
        else if (tap === "more-info") this._moreInfo();
      };
      this.$("#tg").addEventListener("click", (ev) => {
        ev.stopPropagation(); this._ripple(ev); this._toggle();
      });
      const card = this.$(".card");
      card.addEventListener("click", act);
      card.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); act(ev); }
      });
    }
    _ripple(ev) {
      const rp = this.$("#rp"), card = this.$(".card");
      if (!rp || !card) return;
      const box = card.getBoundingClientRect();
      const hasPoint = ev && ev.clientX != null && (ev.clientX || ev.clientY);
      rp.style.left = (hasPoint ? ev.clientX - box.left : box.width / 2) + "px";
      rp.style.top = (hasPoint ? ev.clientY - box.top : box.height / 2) + "px";
      rp.classList.remove("go");
      void rp.offsetWidth; // restart the animation
      rp.classList.add("go");
    }
    _moreInfo() {
      this.dispatchEvent(new CustomEvent("hass-more-info",
        { bubbles: true, composed: true, detail: { entityId: this._config.entity } }));
    }
    _toggle() {
      const id = this._config.entity;
      const domain = id.split(".")[0];
      const h = this._hass;
      const st = this._sv(id);
      if (st === "unavailable") return this._moreInfo();
      if (domain === "climate") return h.callService("climate", st === "off" ? "turn_on" : "turn_off", { entity_id: id });
      if (domain === "cover") return h.callService("cover", ["open", "opening"].includes(st) ? "close_cover" : "open_cover", { entity_id: id });
      if (domain === "vacuum") return h.callService("vacuum", ["cleaning", "returning"].includes(st) ? "return_to_base" : "start", { entity_id: id });
      if (domain === "lock") return h.callService("lock", st === "locked" ? "unlock" : "lock", { entity_id: id });
      const svc = DOMAIN_TOGGLE[domain];
      if (svc) return h.callService(svc[0], svc[1], { entity_id: id });
      return h.callService("homeassistant", "toggle", { entity_id: id });
    }
    _stateLabel(s) {
      const c = this._config;
      const st = s.state;
      if (c.state_map && c.state_map[st] != null) return c.state_map[st];
      const domain = c.entity.split(".")[0];
      if (domain === "climate") return st === "off" ? "Off" : capitalize(st.replace(/_/g, " "));
      if (domain === "cover" || c.device_class === "garage") return st === "open" ? "Open" : st === "closed" ? "Closed" : capitalize(st);
      if (domain === "binary_sensor") {
        const dc = s.attributes.device_class;
        if (["door", "garage_door", "opening", "window"].includes(dc)) return st === "on" ? "Open" : "Closed";
      }
      if (st === "unavailable") return "Offline";
      return capitalize(st.replace(/_/g, " "));
    }
    _update() {
      const s = this._st(this._config.entity);
      if (!s) return;
      this.$("#nm").textContent = this._config.name || this._name(this._config.entity);
      this.$("#st").textContent = this._stateLabel(s);
      this.toggleAttribute("on", stateOn(s.state));
      this.toggleAttribute("unavailable", s.state === "unavailable");
    }
    getCardSize() { return 2; }
  }
  customElements.define("home2-device", H2Device);

  /* ------------------------------------------------------------------ *
   * home2-energy — solar / battery / grid / home hub with animated flows.
   * config: { solar, battery_in, battery_out, soc, grid_in, grid_out, home,
   *           arrays: [{entity, name}] }   (all power entities in kW)
   * ------------------------------------------------------------------ */
  class H2Energy extends H2Base {
    _css() {
      return `
        .dia{width:100%;height:auto;display:block;margin:10px auto 4px;max-width:360px}
        .dia .ring{fill:var(--h2-card-soft)}
        .dia .nodeicon *{fill:none;stroke:var(--h2-accent);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}
        .dia .active .ring{fill:url(#h2gfill)}
        .dia .active .nodeicon *{stroke:#fff}
        .dia .track{stroke:var(--h2-faint);stroke-width:2;stroke-linecap:round;opacity:.45}
        .dia .track.live{stroke:var(--h2-accent);opacity:1}
        .dia .junction{fill:var(--h2-faint)}
        .dia .dot{fill:var(--h2-accent)}
        .dia .ev{font-size:13px;font-weight:700;fill:var(--h2-ink-strong)}
        .dia .ek{font-size:10.5px;font-weight:600;fill:var(--h2-muted)}
        .soc .bar{height:10px;border-radius:999px;background:var(--h2-card-soft);overflow:hidden;margin-top:6px}
        .soc .bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--h2-fill-a),var(--h2-fill-b));transition:width .6s}
        .soc .cap{display:flex;justify-content:space-between;font-size:12.5px;color:var(--h2-muted);font-weight:600;margin-top:7px}
        .arrays{display:flex;gap:8px;margin-top:14px;flex-wrap:wrap}
        .arrays span{background:var(--h2-card-soft);border-radius:999px;padding:6px 13px;font-size:12px;font-weight:600;color:var(--h2-muted)}
        @media(prefers-reduced-motion:reduce){.dia .dot{display:none}}`;
    }
    _html() {
      return `<div class="card">
        <div class="h2-label">Energy</div>
        <svg class="dia" viewBox="0 0 320 248" aria-label="Energy flow">
          <defs><linearGradient id="h2gfill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stop-color="var(--h2-fill-a)"/><stop offset="1" stop-color="var(--h2-fill-b)"/>
          </linearGradient></defs>
          <line id="t-solar" class="track" x1="160" y1="70" x2="160" y2="124"/>
          <line id="t-batt" class="track" x1="78" y1="130" x2="154" y2="130"/>
          <line id="t-home" class="track" x1="166" y1="130" x2="242" y2="130"/>
          <line id="t-grid" class="track" x1="160" y1="190" x2="160" y2="136"/>
          <circle class="junction" cx="160" cy="130" r="3.5"/>
          <g id="n-solar"><circle class="ring" cx="160" cy="44" r="25"/>
            <g class="nodeicon" transform="translate(148,32)">${ICONS.sun}</g>
            <text class="ev tnum" x="194" y="42" id="v-solar">—</text><text class="ek" x="194" y="56">Solar</text></g>
          <g id="n-batt"><circle class="ring" cx="52" cy="130" r="25"/>
            <g class="nodeicon" transform="translate(40,118)">${ICONS.batteryBolt}</g>
            <text class="ev tnum" x="52" y="174" text-anchor="middle" id="v-batt">—</text>
            <text class="ek" x="52" y="188" text-anchor="middle" id="k-batt">Battery</text></g>
          <g id="n-home"><circle class="ring" cx="268" cy="130" r="25"/>
            <g class="nodeicon" transform="translate(256,118)">${ICONS.home}</g>
            <text class="ev tnum" x="268" y="174" text-anchor="middle" id="v-home">—</text>
            <text class="ek" x="268" y="188" text-anchor="middle">Home</text></g>
          <g id="n-grid"><circle class="ring" cx="160" cy="215" r="25"/>
            <g class="nodeicon" transform="translate(148,203)">${ICONS.grid}</g>
            <text class="ev tnum" x="194" y="213" id="v-grid">—</text><text class="ek" x="194" y="227" id="k-grid">Grid</text></g>
          <g id="dots"></g>
        </svg>
        <div class="soc"><div class="bar"><i id="soc-bar"></i></div>
          <div class="cap"><span id="soc-label">House battery</span><span class="tnum" id="soc-pct">—</span></div></div>
        <div class="arrays" id="arrays"></div>
      </div>`;
    }
    _kw(id) { const v = num(this._sv(id)); return v == null ? 0 : v; }
    _fmt(v) { return (Math.abs(v) >= 10 ? v.toFixed(0) : Math.abs(v) >= 1 ? v.toFixed(1) : v.toFixed(2)) + " kW"; }
    _update() {
      const c = this._config;
      const solar = this._kw(c.solar);
      const battIn = this._kw(c.battery_in), battOut = this._kw(c.battery_out);
      const gridIn = this._kw(c.grid_in), gridOut = this._kw(c.grid_out);
      const home = this._kw(c.home);
      const soc = num(this._sv(c.soc), 0);
      const EPS = 0.05;
      const batt = battOut - battIn;   // + discharging
      const grid = gridIn - gridOut;   // + importing
      this.$("#v-solar").textContent = this._fmt(solar);
      this.$("#v-batt").textContent = this._fmt(Math.abs(batt));
      this.$("#v-home").textContent = this._fmt(home);
      this.$("#v-grid").textContent = this._fmt(Math.abs(grid));
      this.$("#k-batt").textContent = "Battery · " + (batt > EPS ? "out" : batt < -EPS ? "charging" : "idle");
      this.$("#k-grid").textContent = "Grid · " + (grid > EPS ? "importing" : grid < -EPS ? "exporting" : "idle");
      if (soc != null) { this.$("#soc-bar").style.width = soc + "%"; this.$("#soc-pct").textContent = soc + "%"; }
      this.$("#soc-label").textContent = "House battery · " + (batt > EPS ? "discharging" : batt < -EPS ? "charging" : "idle");
      // dominant source gets the filled ring
      const sources = [["n-solar", solar], ["n-batt", Math.max(0, batt)], ["n-grid", Math.max(0, grid)]];
      sources.sort((a, b) => b[1] - a[1]);
      const top = sources[0][1] > EPS ? sources[0][0] : null;
      ["n-solar", "n-batt", "n-home", "n-grid"].forEach((id) =>
        this.$("#" + id).classList.toggle("active", id === top));
      // tracks + flow dots (junction at 160,130)
      const J = "160,130";
      const flows = [];
      const track = (id, live) => this.$("#" + id).classList.toggle("live", live);
      track("t-solar", solar > EPS);
      if (solar > EPS) flows.push(`M160,70 L${J}`);
      track("t-batt", Math.abs(batt) > EPS);
      if (batt > EPS) flows.push(`M78,130 L${J}`);
      else if (batt < -EPS) flows.push(`M160,130 L78,130`);
      track("t-home", home > EPS);
      if (home > EPS) flows.push(`M160,130 L242,130`);
      track("t-grid", Math.abs(grid) > EPS);
      if (grid > EPS) flows.push(`M160,190 L${J}`);
      else if (grid < -EPS) flows.push(`M160,130 L160,190`);
      const sig = flows.join("|");
      if (sig !== this._flowSig) {
        this._flowSig = sig;
        const dots = this.$("#dots");
        dots.innerHTML = "";
        const NS = "http://www.w3.org/2000/svg";
        flows.forEach((path) => {
          const dot = document.createElementNS(NS, "circle");
          dot.setAttribute("r", "4"); dot.setAttribute("class", "dot");
          const m = document.createElementNS(NS, "animateMotion");
          m.setAttribute("dur", "2.4s"); m.setAttribute("repeatCount", "indefinite"); m.setAttribute("path", path);
          dot.appendChild(m); dots.appendChild(dot);
        });
      }
      const arr = this.$("#arrays");
      arr.innerHTML = (c.arrays || []).map((a) =>
        `<span class="tnum">${esc(a.name)} ${this._kw(a.entity).toFixed(1)} kW</span>`).join("");
    }
    getCardSize() { return 5; }
  }
  customElements.define("home2-energy", H2Energy);

  /* ------------------------------------------------------------------ *
   * home2-batteries — labelled battery bars.
   * config: { title, low: 35, items: [{entity, name}] }
   * ------------------------------------------------------------------ */
  /* Two kinds of battery, judged on different questions.
     A rechargeable pack answers "will it last the day" — it recovers tonight.
     A replaceable cell answers "do I need to buy one" — it never recovers, so
     its amber band starts far earlier and its low state is an errand. */
  const BAT_BANDS = { pack: { crit: 20, warn: 60 }, cell: { crit: 25, warn: 60 } };
  const batLevel = (pct, kind, cfg) => {
    const band = Object.assign({}, BAT_BANDS[kind] || BAT_BANDS.pack);
    if (cfg && cfg.crit != null) band.crit = cfg.crit;
    if (cfg && cfg.warn != null) band.warn = cfg.warn;
    if (pct == null) return "good";
    return pct <= band.crit ? "crit" : pct <= band.warn ? "warn" : "good";
  };

  /* Charging comes in two entity shapes: the companion app's text sensor
     (Charging / Not Charging / Full) and a battery_charging binary_sensor. */
  const chargeState = (st) => {
    if (!st) return "na";
    const v = String(st.state).toLowerCase();
    if (v === "unavailable" || v === "unknown") return "na";
    if (st.attributes.device_class === "battery_charging") return v === "on" ? "charging" : "no";
    if (v === "full" || v === "charging_completed") return "full";
    if (v.includes("not")) return "no";
    if (v.includes("charging")) return "charging";
    return "no";
  };

  class H2Batteries extends H2Base {
    _css() {
      return `
        .list{display:flex;flex-direction:column;gap:11px;margin-top:16px}
        .cell{position:relative;border-radius:15px;overflow:hidden;background:var(--h2-toggle-off);
          padding:13px 15px;display:flex;justify-content:space-between;align-items:center;
          isolation:isolate;gap:10px}
        /* The fill IS the percentage — the whole row is the gauge, so it reads
           from across the room instead of asking you to measure a 9px bar. */
        .fill{position:absolute;inset:0;width:0;z-index:-1;border-radius:15px 0 0 15px;
          transition:width .8s cubic-bezier(.3,.9,.3,1),background .4s}
        .edge{position:absolute;top:0;bottom:0;left:0;width:3px;z-index:-1;
          transition:left .8s cubic-bezier(.3,.9,.3,1),background .4s}
        .cell[data-lvl=good] .fill{background:var(--h2-good-soft)}
        .cell[data-lvl=warn] .fill{background:var(--h2-warn-soft)}
        .cell[data-lvl=crit] .fill{background:var(--h2-crit-soft)}
        .cell[data-lvl=good] .edge{background:var(--h2-good)}
        .cell[data-lvl=warn] .edge{background:var(--h2-warn)}
        .cell[data-lvl=crit] .edge{background:var(--h2-crit)}
        .n{font-size:14.5px;font-weight:600;color:var(--h2-ink-strong);display:flex;align-items:center;
          gap:9px;min-width:0}
        .nm{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .dot{width:8px;height:8px;border-radius:50%;flex:none}
        .cell[data-lvl=good] .dot{background:var(--h2-good)}
        .cell[data-lvl=warn] .dot{background:var(--h2-warn)}
        .cell[data-lvl=crit] .dot{background:var(--h2-crit);animation:h2-breathe 2.4s ease-in-out infinite}
        .v{font-size:15px;font-weight:700;white-space:nowrap;flex:none}
        .cell[data-lvl=good] .v{color:var(--h2-good)}
        .cell[data-lvl=warn] .v{color:var(--h2-warn)}
        .cell[data-lvl=crit] .v{color:var(--h2-crit)}
        .kind{font-size:10.5px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;
          color:var(--h2-faint);flex:none}
        .cell[data-kind=cell][data-lvl=warn] .kind,
        .cell[data-kind=cell][data-lvl=crit] .kind{color:var(--h2-crit)}
        /* Charging keeps the level colour — "being handled" and "where it is"
           are different facts and you want both — and adds directional motion. */
        .flow{position:absolute;inset:0;width:0;z-index:-1;opacity:0;border-radius:15px 0 0 15px;
          background-image:repeating-linear-gradient(115deg,transparent 0 13px,var(--h2-stripe) 13px 26px);
          background-size:58px 100%;
          transition:opacity .4s,width .8s cubic-bezier(.3,.9,.3,1)}
        @keyframes h2-flow{to{background-position:58px 0}}
        .cell[data-chg=charging] .flow{opacity:1;animation:h2-flow 1.1s linear infinite}
        .cell[data-chg=charging] .dot{display:none}
        .bolt{display:none;flex:none}
        .cell[data-chg=charging] .bolt{display:block}
        .cell[data-lvl=good] .bolt{color:var(--h2-good)}
        .cell[data-lvl=warn] .bolt{color:var(--h2-warn)}
        .cell[data-lvl=crit] .bolt{color:var(--h2-crit)}
        .full{font-size:11.5px;font-weight:600;color:var(--h2-faint)}
        .cell[data-unavail]{opacity:.5}`;
    }
    _html() {
      const rows = (this._config.items || []).map((it, i) => `
        <div class="cell h2-tap" data-i="${i}" tabindex="0" role="button">
          <span class="fill"></span><span class="flow"></span><span class="edge"></span>
          <span class="n"><span class="dot"></span>${icon("bolt", 13, "bolt")}<span
            class="nm">${esc(it.name || this._name(it.entity))}</span>${
            it.kind === "cell" ? `<span class="kind">${esc(it.cell_label || "coin cell")}</span>` : ""}</span>
          <span class="v tnum"></span>
        </div>`).join("");
      return `<div class="card"><div class="h2-label">${esc(this._config.title || "Batteries")}</div>
        <div class="list">${rows}</div></div>`;
    }
    _bind() {
      this.$$(".cell[data-i]").forEach((el) => {
        const open = () => {
          const it = this._config.items[+el.dataset.i];
          this.dispatchEvent(new CustomEvent("hass-more-info",
            { bubbles: true, composed: true, detail: { entityId: it.entity } }));
        };
        el.addEventListener("click", open);
        el.addEventListener("keydown", (e) => {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
        });
      });
    }
    _update() {
      (this._config.items || []).forEach((it, i) => {
        const el = this.$(`.cell[data-i="${i}"]`);
        if (!el) return;
        const v = num(this._sv(it.entity), 0);
        const kind = it.kind === "cell" ? "cell" : "pack";
        const chg = it.charging ? chargeState(this._st(it.charging)) : "na";
        const pct = v == null ? 0 : Math.max(0, Math.min(100, v));

        el.dataset.lvl = batLevel(v, kind, it);
        el.dataset.kind = kind;
        el.dataset.chg = chg;
        el.toggleAttribute("data-unavail", v == null);
        el.querySelector(".fill").style.width = pct + "%";
        el.querySelector(".flow").style.width = pct + "%";
        el.querySelector(".edge").style.left = pct + "%";
        el.querySelector(".v").innerHTML = v == null
          ? "—"
          : `${v}%${chg === "full" ? ' <span class="full">· full</span>' : ""}`;
      });
    }
    getCardSize() { return Math.max(2, Math.ceil(((this._config.items || []).length + 1) / 2)); }
  }
  customElements.define("home2-batteries", H2Batteries);

  /* ------------------------------------------------------------------ *
   * home2-alerts — "Needs attention".
   *
   * Two kinds of alert that must never look the same:
   *   event     — happened once, wants you now (mail arrived). Announces
   *               itself with a single arrival animation, then holds still.
   *   condition — true until someone fixes it (dead cell, garage left open,
   *               stale backup). Never animates: a thing that pulses for
   *               three days becomes wallpaper.
   *
   * config: { title, hide_when_clear: false, alerts: [
   *   { entity, kind: "event"|"condition", icon, on: "Mail waiting",
   *     off: "No mail", severity: "warn"|"crit"|"accent", invert: false },
   *   { type: "battery", entity, name, kind: "cell", crit: 25, warn: 60 } ] }
   * ------------------------------------------------------------------ */
  class H2Alerts extends H2Base {
    _css() {
      return `
        .bar{display:flex;flex-wrap:wrap;gap:10px;margin-top:15px}
        .a{display:inline-flex;align-items:center;gap:9px;padding:9px 15px 9px 12px;border-radius:999px;
          font-size:13.5px;font-weight:700;position:relative;overflow:hidden}
        .a .ic{flex:none}
        .a[data-sev=crit]{background:var(--h2-crit-soft);color:var(--h2-crit)}
        .a[data-sev=warn]{background:var(--h2-warn-soft);color:var(--h2-warn)}
        .a[data-sev=accent]{background:var(--h2-accent-soft);color:var(--h2-accent)}
        .a[data-sev=quiet]{background:var(--h2-card-soft);color:var(--h2-muted);font-weight:600}
        .clear{font-size:13.5px;font-weight:600;color:var(--h2-muted);margin-top:15px;
          display:flex;align-items:center;gap:9px}
        .clear .ic{color:var(--h2-good)}
        @keyframes h2-arrive{
          0%{transform:scale(.82);opacity:0}
          55%{transform:scale(1.06);opacity:1}
          100%{transform:scale(1);opacity:1}}
        @keyframes h2-sheen{to{left:135%}}
        .a.arriving{animation:h2-arrive .5s cubic-bezier(.3,1.4,.5,1)}
        .a.arriving::after{content:"";position:absolute;top:0;bottom:0;left:-45%;width:38%;
          background:linear-gradient(100deg,transparent,rgba(255,255,255,.6),transparent);
          animation:h2-sheen .85s ease-out .18s}`;
    }
    _html() {
      return `<div class="card"><div class="h2-label">${esc(this._config.title || "Needs attention")}</div>
        <div class="bar" id="bar"></div>
        <div class="clear" id="clear" hidden>${icon("home", 18)}<span>All clear</span></div></div>`;
    }
    /* Returns the alert to show for an item, or null to omit it entirely. */
    _resolve(it) {
      if (it.type === "battery") {
        const v = num(this._sv(it.entity), 0);
        if (v == null) return null;
        const kind = it.kind === "cell" ? "cell" : "pack";
        const lvl = batLevel(v, kind, it);
        if (lvl === "good") return null;
        const name = it.name || this._name(it.entity);
        const text = kind === "cell"
          ? (lvl === "crit" ? `${name} — replace cell` : `${name} ${v}%`)
          : `${name} ${v}%`;
        return { kind: "condition", sev: lvl, icon: it.icon || "battery", text };
      }
      const st = this._st(it.entity);
      if (!st) return null;
      let on = stateOn(st.state);
      if (it.invert) on = !on;
      if (!on) {
        if (it.off == null) return null;
        return { kind: it.kind || "condition", sev: "quiet", icon: it.icon || "generic", text: it.off, off: true };
      }
      return {
        kind: it.kind || "condition",
        sev: it.severity || (it.kind === "event" ? "accent" : "warn"),
        icon: it.icon || "generic",
        text: it.on || capitalize(String(st.state)),
      };
    }
    _update() {
      const bar = this.$("#bar");
      if (!bar) return;
      const items = this._config.alerts || [];
      const resolved = items.map((it) => this._resolve(it));
      const active = resolved.filter((r) => r && !r.off);

      // Rebuild only when the set actually changes, so a re-render never
      // replays an arrival animation that already fired.
      const sig = resolved.map((r) => (r ? `${r.sev}|${r.text}` : "")).join(" ");
      const prev = this._sig;
      if (sig === prev) return;
      this._sig = sig;
      const prevTexts = new Set((this._prevActive || []).map((r) => r.text));

      bar.innerHTML = resolved.map((r) => r ? `
        <span class="a h2-tap" data-sev="${r.sev}">${icon(r.icon, 15)}<span>${esc(r.text)}</span></span>` : "").join("");

      // An event that has just appeared announces itself, once.
      if (prev !== undefined) {
        const els = [...bar.querySelectorAll(".a")];
        resolved.filter(Boolean).forEach((r, i) => {
          if (r.kind !== "event" || r.off || prevTexts.has(r.text)) return;
          const el = els[i];
          if (!el) return;
          el.classList.add("arriving");
          el.addEventListener("animationend", function done(ev) {
            if (ev.animationName !== "h2-arrive") return;
            el.classList.remove("arriving");
            el.removeEventListener("animationend", done);
          });
        });
      }
      this._prevActive = active;

      const clear = this.$("#clear");
      const nothing = active.length === 0;
      clear.hidden = !(nothing && this._config.hide_when_clear !== true);
      bar.hidden = nothing && this._config.hide_when_clear === true;
    }
    getCardSize() { return 2; }
  }
  customElements.define("home2-alerts", H2Alerts);

  /* ------------------------------------------------------------------ *
   * home2-room — room summary: big temperature with trend, pills, toggle.
   * config: { name, icon, temperature, humidity, co2, co2_warn: 1000,
   *           pills: [{entity, label, on, off, unit, warn_above}],
   *           toggle: { entity } | { area } }
   * ------------------------------------------------------------------ */
  class H2Room extends H2Base {
    _css() {
      return `
        .card{display:flex;flex-direction:column;gap:14px}
        .head{display:flex;align-items:center;gap:11px}
        .head .ic{color:var(--h2-accent)}
        .head .n{font-weight:700;font-size:15.5px;color:var(--h2-ink-strong);flex:1}
        .temp{font-size:34px;font-weight:300;color:var(--h2-ink-strong);line-height:1;display:flex;align-items:baseline}
        .temp small{font-size:.5em;color:var(--h2-faint);font-weight:400}
        .temp .trend{margin-left:6px;color:var(--h2-faint);align-self:center}
        .pills{display:flex;gap:7px;flex-wrap:wrap}
        .pill{display:inline-flex;align-items:center;gap:5px;background:var(--h2-card-soft);color:var(--h2-muted);
          border-radius:999px;padding:6px 12px;font-size:12px;font-weight:700}
        .pill .trend{color:inherit;opacity:.8}
        .pill.warm{color:var(--h2-warn);background:color-mix(in srgb,var(--h2-warn) 14%,var(--h2-card-soft))}
        .pill.act{color:var(--h2-accent);background:var(--h2-accent-soft)}
        .toggle{width:46px;height:26px;border-radius:999px;background:var(--h2-toggle-off);position:relative;flex:none;
          cursor:pointer;transition:background .25s}
        .toggle::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;
          background:var(--h2-knob-off);box-shadow:0 2px 5px rgba(20,24,60,.25);transition:left .25s,background .25s}
        .toggle.on{background:var(--h2-accent)}
        .toggle.on::after{left:23px;background:#fff}`;
    }
    _html() {
      const c = this._config;
      const tappable = c.temperature ? " h2-tap" : "";
      return `<div class="card${tappable}"${c.temperature ? ' tabindex="0" role="button"' : ""}>
        <div class="head">${icon(c.icon || "bed", 24)}<span class="n">${esc(c.name || "")}</span>
          ${c.toggle ? '<div class="toggle" id="tg"></div>' : ""}</div>
        <div class="temp tnum"><span id="tv">—</span><small>°</small><span id="ttr"></span></div>
        <div class="pills" id="pills"></div>
      </div>`;
    }
    _bind() {
      const tg = this.$("#tg");
      if (tg) tg.addEventListener("click", (ev) => {
        ev.stopPropagation();
        const t = this._config.toggle;
        const target = t.area ? { area_id: t.area } : { entity_id: t.entity };
        this._hass.callService("light", "toggle", target);
      });
      // The lift has to lead somewhere, or it's a lie.
      if (!this._config.temperature) return;
      const open = () => this.dispatchEvent(new CustomEvent("hass-more-info",
        { bubbles: true, composed: true, detail: { entityId: this._config.temperature } }));
      const card = this.$(".card");
      card.addEventListener("click", open);
      card.addEventListener("keydown", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); open(); }
      });
    }
    async _update() {
      const c = this._config;
      const t = num(this._sv(c.temperature), 1);
      this.$("#tv").textContent = t == null ? "—" : t;
      if (c.toggle) {
        let on = false;
        if (c.toggle.entity) on = this._sv(c.toggle.entity) === "on";
        else if (c.toggle.area) {
          // any light in the area on? (uses entity naming as heuristic fallback)
          on = Object.keys(this._hass.states).some((id) =>
            id.startsWith("light.") && this._hass.states[id].state === "on" &&
            (this._hass.states[id].attributes.area_id === c.toggle.area || id.includes(c.toggle.area)));
        }
        this.$("#tg").classList.toggle("on", on);
      }
      const pills = [];
      if (c.humidity != null) {
        const h = num(this._sv(c.humidity), 0);
        if (h != null) pills.push({ cls: "", html: `${h}% <span class="ph" data-tr="${c.humidity}"></span>` });
      }
      if (c.co2) {
        const v = num(this._sv(c.co2), 0);
        if (v != null) pills.push({ cls: v >= (c.co2_warn || 1000) ? "warm" : "", html: `CO₂ ${v}` });
      }
      (c.pills || []).forEach((p) => {
        const s = this._st(p.entity);
        if (!s || s.state === "unavailable") return;
        let text;
        if (p.on != null || p.off != null) text = stateOn(s.state) ? (p.on || "On") : (p.off || "Off");
        else {
          const n2 = num(s.state, 1);
          text = (p.label ? p.label + " " : "") + (n2 != null ? n2 + (p.unit || "") : capitalize(s.state));
        }
        const warm = p.warn_above != null && num(s.state) != null && num(s.state) >= p.warn_above;
        const act = p.accent && stateOn(s.state) === false && p.off_accent !== false;
        pills.push({ cls: warm ? "warm" : (p.accent ? "act" : ""), html: esc(text), _act: act });
      });
      this.$("#pills").innerHTML = pills.map((p) => `<span class="pill tnum ${p.cls}">${p.html}</span>`).join("");
      // trends (async, applied after paint)
      if (c.temperature) {
        const dir = await trendFor(this._hass, c.temperature);
        const el = this.$("#ttr");
        if (el) el.innerHTML = trendIcon(dir, 13);
      }
      if (c.humidity) {
        const dir = await trendFor(this._hass, c.humidity);
        const el = this.$(`.ph[data-tr]`);
        if (el) el.innerHTML = trendIcon(dir, 11);
      }
    }
    getCardSize() { return 2; }
  }
  customElements.define("home2-room", H2Room);

  /* ------------------------------------------------------------------ *
   * home2-thermostat — climate control: big current temp, target ±, modes.
   * config: { entity, name }
   * ------------------------------------------------------------------ */
  const HVAC_LABEL = { off: "Off", heat: "Heat", cool: "Cool", auto: "Auto", dry: "Dry", fan_only: "Fan", heat_cool: "Heat/Cool" };
  class H2Thermostat extends H2Base {
    _css() {
      return `
        .card{display:flex;flex-direction:column;gap:18px}
        .head{display:flex;align-items:center;gap:11px}
        .head .ic{color:var(--h2-accent)}
        .head .n{font-weight:700;font-size:15.5px;color:var(--h2-ink-strong);flex:1}
        .cur{font-size:12.5px;color:var(--h2-muted);font-weight:600}
        .target{display:flex;align-items:center;justify-content:center;gap:22px}
        .tv{font-size:64px;font-weight:250;color:var(--h2-ink-strong);line-height:1}
        .tv small{font-size:.4em;color:var(--h2-faint);font-weight:300}
        .stepBtn{width:46px;height:46px;border-radius:50%;background:var(--h2-card-soft);color:var(--h2-accent);
          display:grid;place-items:center;transition:background .2s}
        .stepBtn:active{background:var(--h2-accent-soft)}
        .modes{display:flex;gap:6px;flex-wrap:wrap;justify-content:center}
        .mode{border-radius:999px;padding:8px 15px;font-size:12.5px;font-weight:700;background:var(--h2-card-soft);color:var(--h2-muted)}
        .mode.on{background:linear-gradient(135deg,var(--h2-fill-a),var(--h2-fill-b));color:#fff}`;
    }
    _html() {
      return `<div class="card">
        <div class="head">${icon("ac", 24)}<span class="n" id="nm"></span><span class="cur" id="cur"></span></div>
        <div class="target">
          <button class="stepBtn" id="dn">${icon("minus", 20)}</button>
          <div class="tv tnum" id="tv">—</div>
          <button class="stepBtn" id="up">${icon("plus", 20)}</button>
        </div>
        <div class="modes" id="modes"></div>
      </div>`;
    }
    _bind() {
      this.$("#up").addEventListener("click", () => this._step(0.5));
      this.$("#dn").addEventListener("click", () => this._step(-0.5));
      this.$("#modes").addEventListener("click", (ev) => {
        const b = ev.target.closest(".mode");
        if (b) this._hass.callService("climate", "set_hvac_mode",
          { entity_id: this._config.entity, hvac_mode: b.dataset.m });
      });
    }
    _step(d) {
      const s = this._st(this._config.entity);
      if (!s) return;
      const cur = num(s.attributes.temperature);
      if (cur == null) return;
      const t = Math.min(s.attributes.max_temp || 30, Math.max(s.attributes.min_temp || 16, cur + d));
      this._hass.callService("climate", "set_temperature", { entity_id: this._config.entity, temperature: t });
    }
    _update() {
      const s = this._st(this._config.entity);
      if (!s) return;
      this.$("#nm").textContent = this._config.name || this._name(this._config.entity);
      const curT = s.attributes.current_temperature;
      this.$("#cur").textContent = curT != null ? `Now ${curT}°` : "";
      const t = s.attributes.temperature;
      this.$("#tv").innerHTML = t != null ? `${t}<small>°</small>` : "—";
      const modes = s.attributes.hvac_modes || [];
      this.$("#modes").innerHTML = modes.map((m) =>
        `<button class="mode ${m === s.state ? "on" : ""}" data-m="${m}">${HVAC_LABEL[m] || m}</button>`).join("");
    }
    getCardSize() { return 4; }
  }
  customElements.define("home2-thermostat", H2Thermostat);

  /* ------------------------------------------------------------------ *
   * home2-zone — number-entity damper/percentage row with − / + and a bar.
   * config: { entity, name }
   * ------------------------------------------------------------------ */
  class H2Zone extends H2Base {
    _css() {
      return `
        .card{display:flex;flex-direction:column;gap:12px;padding:20px 24px}
        .row{display:flex;align-items:center;gap:12px}
        .n{font-weight:700;font-size:14.5px;color:var(--h2-ink-strong);flex:1}
        .v{font-size:14px;font-weight:700;color:var(--h2-muted)}
        .stepBtn{width:34px;height:34px;border-radius:50%;background:var(--h2-card-soft);color:var(--h2-accent);
          display:grid;place-items:center;flex:none}
        .stepBtn:active{background:var(--h2-accent-soft)}
        .bar{height:9px;border-radius:999px;background:var(--h2-card-soft);overflow:hidden}
        .bar i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,var(--h2-fill-a),var(--h2-fill-b));transition:width .4s}`;
    }
    _html() {
      return `<div class="card">
        <div class="row"><span class="n">${esc(this._config.name || "")}</span>
          <button class="stepBtn" id="dn">${icon("minus", 17)}</button>
          <span class="v tnum" id="v">—</span>
          <button class="stepBtn" id="up">${icon("plus", 17)}</button></div>
        <div class="bar"><i id="bar"></i></div>
      </div>`;
    }
    _bind() {
      this.$("#up").addEventListener("click", () => this._step(1));
      this.$("#dn").addEventListener("click", () => this._step(-1));
    }
    _step(sign) {
      const s = this._st(this._config.entity);
      if (!s) return;
      const a = s.attributes;
      const step = a.step || 5;
      const v = Math.min(a.max != null ? a.max : 100, Math.max(a.min || 0, (num(s.state) || 0) + sign * step));
      this._hass.callService("number", "set_value", { entity_id: this._config.entity, value: v });
    }
    _update() {
      const s = this._st(this._config.entity);
      if (!s) return;
      if (!this._config.name) this.$(".n").textContent = this._name(this._config.entity);
      const v = num(s.state, 0);
      const unit = s.attributes.unit_of_measurement || "";
      this.$("#v").textContent = v == null ? "—" : v + unit;
      const max = s.attributes.max != null ? s.attributes.max : 100;
      this.$("#bar").style.width = (v == null ? 0 : (v / max) * 100) + "%";
    }
    getCardSize() { return 1; }
  }
  customElements.define("home2-zone", H2Zone);

  /* ------------------------------------------------------------------ *
   * home2-camera — rounded camera snapshot with name pill, auto-refresh.
   * config: { entity, name, refresh: 10 }
   * ------------------------------------------------------------------ */
  class H2Camera extends H2Base {
    _css() {
      return `
        .card{padding:0;overflow:hidden;min-height:200px;cursor:pointer}
        img{display:block;width:100%;height:100%;object-fit:cover;position:absolute;inset:0}
        .overlay{position:absolute;left:14px;bottom:14px;z-index:1;display:flex;gap:8px;align-items:center}
        .namepill{background:rgba(20,22,50,.55);backdrop-filter:blur(6px);color:#fff;border-radius:999px;
          padding:7px 14px;font-size:12.5px;font-weight:700}
        .state{background:rgba(20,22,50,.4);backdrop-filter:blur(6px);color:rgba(255,255,255,.8);
          border-radius:999px;padding:7px 12px;font-size:11.5px;font-weight:600}
        .noimg{position:absolute;inset:0;display:grid;place-items:center;color:var(--h2-muted);background:var(--h2-card-soft)}`;
    }
    _html() {
      return `<div class="card"><div class="noimg">${icon("camera", 38)}</div><img id="img" hidden alt=""/>
        <div class="overlay"><span class="namepill" id="nm"></span><span class="state" id="st"></span></div></div>`;
    }
    _bind() {
      this.$(".card").addEventListener("click", () =>
        this.dispatchEvent(new CustomEvent("hass-more-info",
          { bubbles: true, composed: true, detail: { entityId: this._config.entity } })));
      clearInterval(this._timer);
      const secs = this._config.refresh || 10;
      this._timer = setInterval(() => this._refreshImage(), secs * 1000);
    }
    disconnectedCallback() { super.disconnectedCallback(); clearInterval(this._timer); }
    _refreshImage() {
      const s = this._st(this._config.entity);
      const img = this.$("#img");
      if (!s || !img) return;
      const pic = s.attributes.entity_picture;
      if (!pic) return;
      img.src = pic + (pic.includes("?") ? "&" : "?") + "h2ts=" + Date.now();
      img.hidden = false;
    }
    _update() {
      const s = this._st(this._config.entity);
      if (!s) return;
      this.$("#nm").textContent = this._config.name || this._name(this._config.entity);
      this.$("#st").textContent = s.state === "unavailable" ? "Offline" : capitalize(s.state);
      if (this.$("#img").hidden) this._refreshImage();
    }
    getCardSize() { return 4; }
  }
  customElements.define("home2-camera", H2Camera);

  /* ------------------------------------------------------------------ *
   * home2-theme — colourway picker. Persists to localStorage per browser.
   * config: { title }
   * ------------------------------------------------------------------ */
  class H2Theme extends H2Base {
    _css() {
      return `
        .head{display:flex;align-items:center;gap:10px}
        .head .ic{color:var(--h2-accent)}
        .sw{display:flex;gap:12px;flex-wrap:wrap;margin-top:16px}
        .opt{display:flex;flex-direction:column;align-items:center;gap:7px}
        .chipbtn{width:52px;height:52px;border-radius:18px;position:relative;border:3px solid transparent;transition:border-color .2s, transform .15s}
        .chipbtn:active{transform:scale(.94)}
        .chipbtn.on{border-color:var(--h2-accent)}
        .chipbtn i{position:absolute;border-radius:999px}
        .lbl{font-size:11.5px;font-weight:700;color:var(--h2-muted)}
        .opt .chipbtn.on+ .lbl{color:var(--h2-accent)}`;
    }
    _html() {
      const opts = Object.keys(PALETTES).map((k) => {
        const p = PALETTES[k].light;
        return `<div class="opt"><button class="chipbtn" data-cw="${k}" style="background:${p.bg}">
            <i style="left:8px;top:8px;right:8px;height:14px;background:linear-gradient(135deg,${p.fillA},${p.fillB})"></i>
            <i style="left:8px;bottom:8px;width:14px;height:14px;background:${p.card};box-shadow:0 1px 3px rgba(0,0,0,.15)"></i>
            <i style="left:26px;bottom:8px;right:8px;height:14px;background:${p.heroA}"></i>
          </button><span class="lbl">${PALETTES[k].label}</span></div>`;
      }).join("");
      return `<div class="card">
        <div class="head">${icon("palette", 24)}<span class="h2-label">${esc(this._config.title || "Colourway")}</span></div>
        <div class="sw">${opts}</div></div>`;
    }
    _bind() {
      this.$$(".chipbtn").forEach((b) =>
        b.addEventListener("click", () => setColourway(b.dataset.cw)));
    }
    _update() {
      const cur = getColourway();
      this.$$(".chipbtn").forEach((b) => b.classList.toggle("on", b.dataset.cw === cur));
    }
    getCardSize() { return 2; }
  }
  customElements.define("home2-theme", H2Theme);

  /* ------------------------------------------------------------------ *
   * Registration
   * ------------------------------------------------------------------ */
  window.customCards = window.customCards || [];
  const reg = (type, name, description) =>
    window.customCards.push({ type, name, description, preview: false });
  reg("home2-layout", "Home 2.0 Layout", "12-column grid layout that hosts the Home 2.0 cards");
  reg("home2-chips", "Home 2.0 Chips", "Pill status chips row");
  reg("home2-clock", "Home 2.0 Clock", "Clock, date, family presence and greeting");
  reg("home2-weather", "Home 2.0 Weather", "Weather hero with ambient animated sky");
  reg("home2-status", "Home 2.0 Status", "'Right now' status list");
  reg("home2-device", "Home 2.0 Device", "Soft device tile with toggle");
  reg("home2-energy", "Home 2.0 Energy", "Solar/battery/grid/home energy hub");
  reg("home2-batteries", "Home 2.0 Batteries", "Battery level bars");
  reg("home2-room", "Home 2.0 Room", "Room temperature, trends and pills");
  reg("home2-thermostat", "Home 2.0 Thermostat", "Climate target and mode control");
  reg("home2-zone", "Home 2.0 Zone", "Number entity stepper (AC zone damper)");
  reg("home2-camera", "Home 2.0 Camera", "Rounded camera snapshot card");
  reg("home2-theme", "Home 2.0 Theme", "Colourway picker for the Home 2.0 cards");

  console.info(`%c HOME2-CARDS %c v${VERSION} `,
    "background:#6d71dd;color:#fff;border-radius:4px 0 0 4px;padding:2px 0",
    "background:#35386b;color:#fff;border-radius:0 4px 4px 0;padding:2px 0");
})();
