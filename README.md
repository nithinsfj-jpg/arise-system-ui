# ARISE System UI

Build a UI prototype called ARISE — a fitness app skinned as the "System" interface from Solo Leveling. Keep this small and polished rather than broad: just 2 screens plus 1 popup, built from a shared component set.

Design tokens: background #02040f (near-black navy) with a very faint diagonal hex-texture overlay. Fonts: Chakra Petch for headers/labels, Share Tech Mono for all numbers. Colors: cyan #4dd8ff glow for default borders/headers/text, violet/purple gradient (light→dark) for rank-progression elements only, green for positive confirmations, red for warnings and Confirm/Cancel text, pink/magenta for Secret Quest names.

Shared components (build these first, reuse them everywhere below):

SystemWindow: a card with an open 4-corner bracket border — bracket ticks at each corner, not a plain rounded rectangle — plus a soft real colored glow bloom around the border and header text (match the attached "QUEST INFO" and "NOTIFICATION" reference screenshots exactly). Supports an optional floating header title sitting on the top edge.

StatBar: thin horizontal bar with a mono-font "current/max" number overlaid (e.g. "8000/12000"), small/compact, not a hero bar.

Checkbox-complete control: an unchecked square-with-corner-tick icon (match the "Daily Quest has arrived" reference screenshot) that fills into a checkmark when tapped.

SystemButton: tinted-fill bordered button — cyan default, red variant for destructive/Confirm-Cancel.

Screen 1 — Home: a profile-icon button top corner; a vitals row with an HP StatBar, MP StatBar, and a small compact circular Fatigue gauge with exactly 8 discrete segments (not a smooth arc); a small XP StatBar; and a "Today's Daily Quest" SystemWindow card summarizing the quest, tappable to open the Quest Info popup. Nothing else on this screen — no extra widgets, keep it sparse.

Screen 2 — Character/Status: Level, Job (starts "None"), Title, HP/MP StatBars, the Fatigue gauge, five attributes (STR/AGI/PER/VIT/INT) each with a "+" button and one Save button at the bottom, an "Available Ability Points: N" counter, and a row of the 9 rank badges (E, D, C, B, A, S, SS, National Level Hunter, Shadow Monarch) connected by a violet glow path that darkens toward the higher ranks.

Popup — Quest Info: a SystemWindow modal, "! QUEST INFO" header, text "[Daily Quest: Strength Training has arrived.]", underlined "GOAL" label, then rows like "Push-ups [62/100]" each with just a "+" button (no separate checkbox — progress only goes up via +, and it can overshoot up to 2x the target as a hard cap), a red warning line reading exactly "If you do not complete this quest, your heart will stop.", and the checkbox-complete control at the bottom.

Copy should read like an in-universe System message — bracketed, terse, capitalized as shown — never casual app copy.

NOTE: TRY TO MATCH EVERYTHING TO THIS THEME FONR STY;E UI AND ALL AS CLOE AS POSSIBLE

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/7bfb6fa9-3091-42cd-ac51-77ebf30f2348).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
