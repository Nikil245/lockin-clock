---
name: Twilight Focus System
colors:
  surface: '#0b1326'
  surface-dim: '#0b1326'
  surface-bright: '#31394d'
  surface-container-lowest: '#060e20'
  surface-container-low: '#131b2e'
  surface-container: '#171f33'
  surface-container-high: '#222a3d'
  surface-container-highest: '#2d3449'
  on-surface: '#dae2fd'
  on-surface-variant: '#cac4d4'
  inverse-surface: '#dae2fd'
  inverse-on-surface: '#283044'
  outline: '#948e9d'
  outline-variant: '#494552'
  surface-tint: '#cebdff'
  primary: '#cebdff'
  on-primary: '#381385'
  primary-container: '#a78bfa'
  on-primary-container: '#3c1989'
  inverse-primary: '#674bb5'
  secondary: '#ffb95f'
  on-secondary: '#472a00'
  secondary-container: '#ee9800'
  on-secondary-container: '#5b3800'
  tertiary: '#ffb0cd'
  on-tertiary: '#640039'
  tertiary-container: '#ff65ac'
  on-tertiary-container: '#6b003e'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e8ddff'
  primary-fixed-dim: '#cebdff'
  on-primary-fixed: '#21005e'
  on-primary-fixed-variant: '#4f319c'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#ffd9e4'
  tertiary-fixed-dim: '#ffb0cd'
  on-tertiary-fixed: '#3e0022'
  on-tertiary-fixed-variant: '#8c0053'
  background: '#0b1326'
  on-background: '#dae2fd'
  surface-variant: '#2d3449'
typography:
  display-clock:
    fontFamily: Geist
    fontSize: 120px
    fontWeight: '700'
    lineHeight: 110px
    letterSpacing: -0.05em
  display-clock-mobile:
    fontFamily: Geist
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 70px
    letterSpacing: -0.05em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is centered around a "Deep Work at Dusk" narrative. It evokes the calm, immersive atmosphere of a sunset-lit study, blending high-productivity focus with a dreamlike, atmospheric aesthetic. The personality is focused, premium, and serene.

The visual style is **Glassmorphism**, utilizing high-density backdrop blurs to simulate frosted glass panels that float over a deep, nocturnal background. This is punctuated by vibrant, low-frequency glows that mimic the warmth of a setting sun (orange and pink) and the cool transition into night (lavender and navy). The interface feels layered and tactile, using light as a primary navigator.

## Colors

The palette is anchored in a dark mode experience that transitions from deep shadows to luminous highlights.

- **Midnight Black (#020617):** The foundational base color for the deepest background layers.
- **Deep Navy (#0F172A):** Used for secondary containers and structural depth.
- **Soft Lavender (#A78BFA):** The primary action color, providing a gentle contrast against dark backgrounds.
- **Sunset Orange (#F59E0B):** An accent color used for urgent alerts or active "focus" states.
- **Pink/Purple Glow (#EC4899):** Reserved for ambient glows and decorative highlights to add depth.

## Typography

This design system uses **Geist** exclusively to maintain a technical, clean, and modern developer-centric feel. 

For the main clock interface, the `display-clock` style utilizes a tight letter-spacing and heavy weight to create a massive, monolithic presence. Body text remains airy with generous line heights to ensure legibility against blurred glass backgrounds. All labels are set in uppercase with slight tracking for a refined, utilitarian touch.

## Layout & Spacing

The layout follows a **Fluid Grid** model with a maximum container width for desktop productivity. 

- **Desktop:** A 12-column grid with 24px gutters. Content is centered with wide 40px safe-area margins.
- **Mobile:** A 4-column grid with 16px gutters and 16px margins. 
- **Rhythm:** All spacing is based on an 8px base unit. 

The layout philosophy prioritizes "Z-axis" spacing; rather than cramming elements side-by-side, we use vertical stacking and varying degrees of glass opacity to create a sense of infinite room depth.

## Elevation & Depth

Hierarchy is established through **Glassmorphism** and light-based elevation rather than traditional shadows.

1.  **Level 0 (Base):** Midnight black gradient with a subtle top-down radial glow of Deep Navy.
2.  **Level 1 (Panels):** 40% opacity Navy surface with `backdrop-filter: blur(20px)`. 1px solid border at 10% white opacity.
3.  **Level 2 (Active/Modals):** 60% opacity Lavender-tinted surface with `backdrop-filter: blur(40px)`. Includes a soft outer glow (`box-shadow`) using the primary color at 20% opacity.
4.  **Level 3 (Clock Face):** The "Flip Card" layer. Solid black with a subtle inner reflection (top-edge highlight) to simulate polished acrylic.

## Shapes

The design system utilizes **Rounded** (Level 2) geometry to soften the technical nature of the typography. 

- Standard components (Buttons, Inputs) use a **0.5rem (8px)** radius.
- Glass panels and container cards use **1rem (16px)** to emphasize the "floating" feel.
- The Flip-Card clock digits use a specific **1.5rem (24px)** radius to create a distinct, premium object-like appearance.

## Components

### Premium Flip-Card Timer
The centerpiece of the system. Each digit is housed in a split-horizontal card. The top half features a subtle 1px inner highlight on the top edge to simulate light hitting the rim of a physical card. A horizontal seam (1px line) divides the card, with a very soft gradient darkening toward the center fold.

### Glassmorphic Buttons
Buttons are semi-transparent with a 1px border.
- **Primary:** Lavender tint, high blur, white text.
- **Secondary:** Ghost style, 1px white-alpha border, blurred background.
- **Interaction:** On hover, the "Sunset Orange" glow appears behind the button, increasing its brightness.

### Input Fields
Inputs are deep navy with 20% opacity. When focused, the border transitions to a Pink/Purple glow and the backdrop-blur intensifies.

### Ambient Chips
Used for timer presets (e.g., "Pomodoro", "Long Break"). These are pill-shaped with high transparency and no background color—only a thin lavender border—until selected, at which point they fill with a soft lavender glass effect.

### Lists & Activity
List items are separated by subtle 1px glass dividers (white at 5% opacity). Interaction with a list item triggers a soft outer glow that follows the cursor (light-tracking).