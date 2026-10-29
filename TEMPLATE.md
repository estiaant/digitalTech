# Pixel-art presentation template

The first approved product, **Little Computer Club**, is the reusable baseline on branch **`template/pixel-art-presentations`**. Keep its working activity as a reference. Reuse its assets and interaction patterns for future resources; generate new material only where it adds something the existing collection cannot supply.

## Start the next resource

In an existing checkout, start a product branch from the template:

```sh
git fetch origin
git switch -c activity/your-resource origin/template/pixel-art-presentations
```

Cloud tasks already have an isolated checkout. Use it; no extra worktree is needed unless requested. If starting in a fresh directory, clone the repository with `--branch template/pixel-art-presentations` first.

Copy `activities/build-a-computer/` to the new activity's directory, retaining the original example. Give the new activity its own title and content. Update the root `index.html` destination if the new resource should be the entry point. When copying across repositories, bring `assets/design-references/`, this guide, `DESIGN.md`, and the font license too; replace the product-specific `PRODUCT.md` with the new resource's brief.

## What to reuse

| File | Purpose |
| --- | --- |
| `index.html` | Local script loading, game HUD, music control, restart dialog |
| `style.css` | Pixel banners, dialogue, full-screen discovery scenes, inventory, responsive rules, animation and reduced motion |
| `content.js` | Palette, component facts, stages, and knowledge checks |
| `app.js` | Explore → read → explicitly add; progress, startup, transformations, review and restart |
| `art.js` | Actual 64×64 sprite rendering, source crop coordinates, exact GPL colour mapping |
| `art/` | Original hardware atlas and illustrated laboratory backdrop |
| `art-sources.js` | Generated embedded copies of the artwork for local/offline canvas use |
| `music.js` | Original square/triangle-wave chiptune, toggle and tab-visibility behaviour |
| `fonts/` | Local Silkscreen font and its SIL Open Font License |
| `tests/smoke.py` | Example browser check for this product's full learner journey |

This is a concrete working template, not a generic lesson engine. Facts, stages, and questions are data-driven, but the computer assembly, HDD/SSD comparison and shrink sequence in `app.js` are specific to this activity. Reuse those interactions when relevant; adapt or replace them when the new subject calls for something different. Do not add a framework or speculative abstraction just to prepare for possible future modules.

## Asset conventions

Read `DESIGN.md` and both approved visual sheets before making new art. The original `lospec500.gpl` contains 42 colours; `computer-club.gpl` selects the playful working colours. Retain forest green and purple with pink, lilac, mint, peach and cream accents.

Hardware sprites render on a real 64×64 canvas. Existing source images are larger, and `art.js` isolates each object with `atlasBounds`, scales it onto that canvas and maps opaque pixels to the exact GPL colours. When replacing an atlas, check the actual object boundaries; generated sheets are not reliably perfect grids. Do not introduce ROM or the system bus into this first activity simply because their source sprites exist in the shared atlas.

The generated images are original project assets made during this project; the previous references are preserved in `assets/design-references/`. The palette's creator credits are retained in its original GPL header. Silkscreen's license stays with every distribution. This template does not grant a new license to the teaching documents, palette, or third-party font.

## Run, check, package

There is no app installation or build step. Open the activity's `index.html` directly after extracting its ZIP, or serve the repository:

```sh
python3 -m http.server 8000
```

With Playwright and Chromium available, run the example smoke check against the served activity:

```sh
python3 activities/build-a-computer/tests/smoke.py
```

Adapt the check for a new product's actual content and interactions. Check the complete learner journey, not only the opening screen.

To rebuild embedded image sources and create a standalone ZIP:

```sh
python3 scripts/package_activity.py activities/build-a-computer /tmp/computer-club.zip
```

For a copied activity, pass its directory instead. The packager includes the activity's assets and license, the palettes, and an opening guide; it excludes tests and caches. Commit the refreshed `art-sources.js` with the original artwork so the source and offline distribution stay in sync. Do not commit generated ZIPs. Extract a package and check it before sharing.
