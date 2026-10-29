# Working on these learning resources

Read `TEMPLATE.md`, `PRODUCT.md`, and `DESIGN.md` before creating or changing an interactive presentation. The approved reusable baseline lives on `template/pixel-art-presentations`.

- Reuse the existing presentation, sprites, dialogue banners, animation, music, font, and palette before generating new assets or adding dependencies.
- Use the existing checkout in cloud tasks. Do not create a worktree unless explicitly requested.
- Keep original teaching documents and approved reference images intact. Verify educational wording against the relevant textbook passage.
- Preserve the pixel-art visual-novel direction. Do not introduce browser-window mockups or generic dashboard/card layouts.
- Use real 64×64 sprite canvases, the GPL colours, and nearest-neighbour display scaling. Generate new art in the established style only when the existing assets do not cover the subject.
- A component opens a large discovery scene before an explicit Add action. Allow any order within a category. Internal components disappear into the tower; the completed desktop uses the home-screen artwork. ROM and system bus are not part of this first activity.
- Keep runtime assets local and bundled. Preserve keyboard controls, visible focus, reduced-motion support, and the music toggle. Never play audio before a user gesture.
- Run the relevant browser smoke check and JavaScript syntax checks after behaviour changes. Rebuild embedded art and the ZIP with `scripts/package_activity.py` after changing source images; update `atlasBounds` when sprite placement changes.
- Keep generated ZIPs and caches out of Git. Commit source artwork, embedded runtime artwork, font license, scripts, and tests together.
