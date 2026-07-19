# Home 2.0 Cards

A self-contained collection of Lovelace cards with a soft, rounded, pastel design
language — clock & family presence, an ambient animated weather hero, device tiles,
an energy-flow hub, room summaries with trends, thermostat & AC zone controls,
camera tiles and a status list. One file, no dependencies.

![Colourways](https://raw.githubusercontent.com/keranm/home2-cards/main/images/preview.png)

## Features

- **14 cards** that share one design system: `home2-layout`, `home2-chips`,
  `home2-clock`, `home2-weather`, `home2-status`, `home2-device`, `home2-energy`,
  `home2-batteries`, `home2-alerts`, `home2-room`, `home2-thermostat`, `home2-zone`,
  `home2-camera`, `home2-theme`
- **5 colourways** — Lavender (default), Eucalypt, Ocean, Sunset, Slate — switchable
  live from the `home2-theme` card (persisted per browser)
- **Light + dark** automatically follows Home Assistant's dark mode
- **Semantic colour** — levels and sensors carry green/amber/red state colour
  independent of the colourway, so a low battery reads at a glance rather than
  having to be read
- **Two kinds of battery** — rechargeable packs are judged on "will it last the
  day", replaceable coin cells on "do I need to buy one", with separate bands.
  Charging shows a moving fill while keeping its level colour
- **Two kinds of alert** — *events* (mail arrived) announce themselves once and
  then hold still; *conditions* (dead cell, door left open) never animate
- **Interaction** — hover lifts, press compresses, state changes ripple from the
  point of contact; all of it respects `prefers-reduced-motion`
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

### Batteries and alerts

```yaml
type: custom:home2-batteries
items:
  - entity: sensor.alice_iphone_battery_level
    name: A phone
    charging: sensor.alice_iphone_battery_state   # or a battery_charging binary_sensor
  - entity: sensor.door_sensor_battery
    name: Front door
    kind: cell            # replaceable — earlier amber band, "coin cell" label
---
type: custom:home2-alerts
alerts:
  - entity: input_boolean.is_there_mail
    kind: event           # animates once on arrival, then holds
    icon: mail
    on: Mail waiting
    off: No mail          # omit `off` to hide the pill entirely when clear
  - entity: binary_sensor.garage_door
    kind: condition       # never animates
    icon: garage
    on: Garage door open
  - type: battery         # standing alert derived from a battery level
    entity: sensor.door_sensor_battery
    name: Front door
    kind: cell
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
