# Calculator

A clean, glassmorphism-style calculator built with vanilla HTML, CSS, and JavaScript.

## Preview

Soft dusty rose & cream palette with frosted glass UI, subtle background blobs, and smooth button interactions.

## Files

```
├── index.html   — structure and layout
├── style.css    — all styling and theme
└── index.js     — calculator logic
```

## How to run

No setup needed. Just open `index.html` in any browser.

## Features

- Basic operations — addition, subtraction, multiplication, division
- `+/−` to toggle sign, `%` for percentage
- Expression preview above the main display
- Chained calculations (e.g. `2 + 3 × 4` without pressing `=` in between)
- Division by zero handled gracefully with an `Error` message
- Ripple effect on every button press
- Full keyboard support:

| Key | Action |
|---|---|
| `0–9` | Enter digits |
| `+ - * /` | Set operator |
| `Enter` or `=` | Calculate |
| `Backspace` | Delete last digit |
| `Escape` | Clear |

## Design

- **Palette** — Dusty Rose & Cream
- **Font** — DM Mono (display), Syne (label)
- **Background** — layered blurred blobs over warm ivory `#f7ede8`
- **Card** — frosted glass with `backdrop-filter: blur(32px)`
- **Accent color** — terracotta `#c07870` used on the `=` button and the display number