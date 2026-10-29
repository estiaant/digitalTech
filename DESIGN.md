# Little Computer Club: pixel-art visual novel

The user rejected the original framed workbench website. The approved direction is a cosy, whimsical pixel-art game: large illustrated scenes, dialogue banners, visible square pixels, small stepped animations, and an original chiptune. No browser-window mockups, dashboard panels, or mandatory order within each category.

## Palette

`assets/design-references/lospec500.gpl` is the original 42-colour authority. `computer-club.gpl` in that directory selects 23 working colours from it. Keep dark green #1e4044 / #006554 and purple #3e3b65 / #5e5b8c as anchors. Playful accents: lilac #cc99ff, rose #c878af, pink #ffa2ac, blush #ffd1d5, mint #d3eed3, peach #f6e8e0, butter yellow #f7f3b7. Do not overwrite the original palette.

## Artwork

Retain the approved girls-school and exploded-computer sheets as references. The simpler, recoloured hardware atlas in the activity's `art/` directory is the current game artwork. Hardware is rendered onto actual 64×64 canvas sprites, with each opaque RGB pixel snapped to the GPL palette. Original source bounding boxes isolate each item; do not assume a perfect source grid. Large sprites scale to 128, 192, 256, 320, 384, or 512 display pixels using nearest-neighbour rendering. The room backdrop renders on a 480×320 palette-mapped canvas. Embedded image data keeps canvas processing compatible with local/offline use; originals remain available for future art work.

## Interaction and animation

A component click opens a full discovery scene: large floating artwork on the left, one short description and Add button on the right. Back does not add it. On Add, it leaves the inventory. Internal components travel into the tower and fade away rather than stacking visible sprites; peripheral devices appear on the desk. After startup, the completed desktop, summary, and review use the full-colour home-screen illustration as their backdrop. RAM, CPU, and motherboard are selectable in any order. ROM and the system bus are excluded from the activity. The GPU remains optional.

Gentle stepped idle bobbing, blinking dialogue cursor, twinkling pixel stars, a boot-up sparkle, and stepped shrink transitions establish the game feel. Honour reduced motion. Silkscreen is self-hosted; use it for game lettering and dialogue. Dialogue must remain readable and keyboard accessible.

The soundtrack is an original, low-volume Web Audio square/triangle loop, started through a user gesture and controlled by a persistent Music on/off toggle. Pause when the page is hidden. Never autoplay before interaction or borrow a commercial game's melody, sprites, or characters.

## Learning truth

Use textbook terminology. The build is conceptual, not an electrical assembly tutorial. Distinguish RAM from persistent storage, CPU from system unit, and dedicated from integrated graphics. Communication and startup are simulations. Keep desktop → laptop → smartphone explanations short and factual.
