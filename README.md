# Home 2.0 Cards

A self-contained collection of Lovelace cards with a soft, rounded, pastel design
language — clock & family presence, an ambient animated weather hero, device tiles,
an energy-flow hub, room summaries with trends, thermostat & AC zone controls,
camera tiles and a status list. One file, no dependencies.

![Colourways](https://raw.githubusercontent.com/keranm/home2-cards/main/images/preview.png)

## Features

- **13 cards** that share one design system: `home2-layout`, `home2-chips`,
  `home2-clock`, `home2-weather`, `home2-status`, `home2-device`, `home2-energy`,
  `home2-batteries`, `home2-room`, `home2-thermostat`, `home2-zone`,
  `home2-camera`, `home2-theme`
- **5 colourways** — Lavender (default), Eucalypt, Ocean, Sunset, Slate — switchable
  live from the `home2-theme` card (persisted per browser)
- **Light + dark** automatically follows Home Assistant's dark mode
- **Ambient weather** — the hero card animates the current conditions: drifting
  clouds, rain, thunderstorm flashes, snow, fog banks, wind-blown leaves, a rotating
  sun with swaying flowers on clear days, stars at night, and a frost shimmer on
  cold clear mornings
- **Trends** — room temperature/humidity show a subtle ↗/↘ derived from recorder history
- No lit/react/deps, plain web components; one ~60 kB file

## Installation (HACS)

1. HACS → three-dot menu → *Custom repositories* → add this repo as **Dashboard**
2. Install **Home 2.0 Cards**
3. The resource `/hacsfiles/home2-cards/home2-cards.js` is added automatically

## Quick start

Use `home2-layout` in a panel-mode view and compose the other cards inside it:

```yaml
type: custom:home2-layout
cards:
  - cols: 3
    card:
      type: custom:home2-clock
      persons:
        - entity: person.alice
        - entity: person.bob
  - cols: 5
    card:
      type: custom:home2-weather
      entity: weather.home
      location: Home
  - cols: 4
    card:
      type: custom:home2-status
      items:
        - entity: binary_sensor.garage_door
          name: Garage door
          icon: garage
          state_map: { "on": Open, "off": Closed }
  - section: Rooms
  - cols: 3
    card:
      type: custom:home2-room
      name: Lounge
      icon: sofa
      temperature: sensor.lounge_temperature
      humidity: sensor.lounge_humidity
      toggle: { entity: light.lounge }
```

Each card also works standalone in normal masonry/sections views.
Full option reference for every card: see the comments at the top of each card
class in [`dist/home2-cards.js`](dist/home2-cards.js) (kept deliberately readable).

## Colourways

Add the picker anywhere:

```yaml
type: custom:home2-theme
```

or pin one per card with `colourway: eucalypt`.

## License

MIT
