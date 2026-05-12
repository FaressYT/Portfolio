# Portfolio Website Implementation Spec

## 1. Project Goal

Build a minimal, polished portfolio website that presents you as both a web developer and a marketer. The site should feel like an interactive pitch deck: focused, visual, easy to scan, and built around hiring proof rather than decoration.

Primary audience:
- Recruiters or hiring managers evaluating fit quickly.
- Small businesses or founders looking for a developer with marketing judgment.
- Collaborators who want to see both execution and strategic thinking.

Core message:
> A developer-marketer who can build clean web experiences and understand how they drive attention, trust, and conversion.

Tech stack:
- HTML5
- CSS3
- Vanilla JavaScript
- Tailwind CSS via CDN for the first version

## 2. Product Principles

- The first screen must immediately communicate name, role, and value.
- Every slide should answer one hiring question.
- Motion should support navigation and focus, not become the point of the site.
- Use strong whitespace, clear typography, and a restrained color system.
- Prefer evidence over claims: projects, outcomes, links, metrics, screenshots, and concise explanations.
- Keep the first version compact. A memorable 8-10 slide site is better than a stretched 20-slide site.

## 3. Information Architecture

The site has three top-level tabs:

1. Resume
2. Web Development
3. Marketing

Each tab is a separate vertical presentation track. Switching tabs resets that tab to its first slide.

Global UI:
- Fixed tab navigation.
- Slide progress indicator.
- Persistent contact shortcut.
- Keyboard navigation with arrow keys.
- Touch and wheel scrolling through CSS scroll snap.

## 4. Layout Model

Main structure:

```html
<body>
  <header>Fixed global navigation</header>
  <main>
    <section data-track="resume">Resume slides</section>
    <section data-track="development">Development slides</section>
    <section data-track="marketing">Marketing slides</section>
  </main>
</body>
```

Recommended behavior:
- Only one track is visible at a time.
- Each track uses its own scroll container.
- Slides use `min-height: 100svh` instead of only `100vh` to behave better on mobile browsers.
- Each slide uses `scroll-snap-align: start`.
- Use `scroll-snap-type: y mandatory` on desktop and `proximity` on small screens if mandatory snapping feels too rigid.

## 5. Final Slide Structure

### Tab 1: Resume

Purpose: establish who you are, what you offer, and why someone should keep looking.

Slide 1: Hero
- Content:
  - Name.
  - Role: Web Developer + Marketing Strategist.
  - One-line value proposition.
  - Primary CTA: View Work.
  - Secondary CTA: Contact.
- Layout:
  - Large typography.
  - One strong visual system: oversized type, grid lines, or a subtle interactive cursor/spotlight effect.
- Copy placeholder:
  - "I build clean web experiences with the marketing sense to make them useful, persuasive, and measurable."

Slide 2: Positioning
- Content:
  - Short paragraph about how you work.
  - Three proof points.
- Suggested proof points:
  - Frontend development.
  - Landing pages and conversion thinking.
  - Campaign and content strategy.
- Layout:
  - Left: concise statement.
  - Right: three compact capability blocks.

Slide 3: Experience
- Content:
  - Timeline of roles, freelance work, internships, or major projects.
  - Each item should include role, organization/client/project, date, and one outcome.
- Layout:
  - Vertical timeline on mobile.
  - Horizontal or split timeline on desktop.

Slide 4: Skills + Contact
- Content:
  - Skills grouped by category.
  - Direct links: email, LinkedIn, GitHub, resume download if available.
- Skill groups:
  - Frontend: HTML, CSS, JavaScript, Tailwind.
  - Tools: Git, GitHub, Figma or relevant design tools.
  - Marketing: SEO, copywriting, analytics, paid/organic campaigns.
- Layout:
  - Skills matrix plus contact panel.
- Note:
  - Skip a full contact form for version one. Direct links are simpler and more reliable.

### Tab 2: Web Development

Purpose: prove that you can build usable, responsive, polished web projects.

Slide 1: Development Intro
- Content:
  - One-sentence development philosophy.
  - Short list of what you care about: responsive layout, clean UI, performance, maintainability.
- Layout:
  - Compact intro with a preview strip of project thumbnails.

Slide 2: Featured Project 1
- Content:
  - Project title.
  - Screenshot or short silent preview.
  - Problem solved.
  - Tech stack.
  - Live link and repo link.
- Layout:
  - Large visual on one side.
  - Details on the other side.

Slide 3: Featured Project 2
- Same structure as Slide 2.

Slide 4: Featured Project 3
- Same structure as Slide 2.
- If only two strong projects are available, remove this slide.

Project content template:

```md
Project Name:
Problem:
What I built:
Tech:
Result:
Live:
Repo:
Asset:
```

### Tab 3: Marketing

Purpose: prove that you understand positioning, messaging, campaigns, and measurable outcomes.

Slide 1: Marketing Intro
- Content:
  - One-sentence marketing philosophy.
  - Three areas of strength.
- Suggested areas:
  - Messaging and positioning.
  - Landing page strategy.
  - Campaign analysis and optimization.

Slide 2: Case Study 1
- Content:
  - Campaign or project title.
  - Challenge.
  - Strategy.
  - Execution.
  - Result or learning.
  - Supporting visual.
- Layout:
  - Metric-led header if real metrics exist.
  - Otherwise, lead with challenge and strategic reasoning.

Slide 3: Case Study 2
- Same structure as Slide 2.

Slide 4: Case Study 3
- Same structure as Slide 2.
- If only two strong case studies are available, remove this slide.

Marketing content template:

```md
Case Study Name:
Challenge:
Audience:
Strategy:
Execution:
Result:
Evidence/Asset:
```

Important:
- Do not invent inflated metrics.
- If metrics are unavailable, use honest outcomes such as deliverables, decisions made, lessons learned, or before/after messaging.

## 6. Visual Direction

Recommended first-version direction:

- Background: deep charcoal `#101113`
- Main text: soft white `#F4F1EA`
- Muted text: warm gray `#AAA39A`
- Accent: sharp cyan `#39D5FF`
- Secondary accent: muted red/orange `#E65F3C`
- Borders: translucent white `rgba(255,255,255,0.12)`

Typography:
- Headings: Inter, Space Grotesk, or Syne.
- Body: Inter or system sans-serif.
- Use large type only for slide-level headings.
- Keep body copy short and readable.

Visual style:
- Minimal, editorial, and precise.
- Avoid generic cards everywhere.
- Use full-width slide layouts.
- Use project images, campaign visuals, charts, or screenshots wherever possible.
- Use simple line work, grids, and subtle accent blocks instead of decorative gradients.

## 7. Interaction Design

Navigation:
- Fixed top or side navigation with three tab buttons.
- Active tab is visually clear.
- Contact icon/button remains available.
- On tab change:
  - Hide inactive tracks.
  - Show selected track.
  - Reset selected track to top.
  - Update progress indicator.

Scroll behavior:
- Mouse wheel and trackpad scroll through slides.
- Touch swiping works on mobile.
- ArrowDown / ArrowRight moves to next slide.
- ArrowUp / ArrowLeft moves to previous slide.
- Home jumps to first slide.
- End jumps to last slide.

Animations:
- Use Intersection Observer.
- Animate slide content with subtle opacity and vertical movement.
- Keep transitions around 250-450ms.
- Respect `prefers-reduced-motion`.

## 8. Responsive Rules

Desktop:
- Slides may use two-column layouts.
- Visuals can occupy 45-60% of the slide width.
- Navigation can be top-centered or left-side.

Tablet:
- Keep two columns only when content remains readable.
- Reduce visual dominance if copy gets cramped.

Mobile:
- Slides become single-column.
- Use `100svh`.
- Keep each slide concise enough to fit without awkward overflow.
- Navigation should remain accessible without covering important content.
- Use scroll snapping carefully; switch to `proximity` if mandatory snap traps users.

## 9. Asset Checklist

Needed before final polish:

- Name and preferred title.
- Short value proposition.
- Resume or experience history.
- Email address.
- LinkedIn URL.
- GitHub URL.
- Resume PDF if available.
- 2-3 web development projects.
- Screenshots or videos for each development project.
- Live and repo links for each development project.
- 2-3 marketing case studies.
- Metrics, screenshots, campaign visuals, or written proof for each case study.

## 10. Build Phases

Phase 1: Static Foundation
- Create `index.html`.
- Add Tailwind CDN.
- Add semantic layout for header, tracks, and slides.
- Add placeholder content using this spec.

Phase 2: Core Presentation Behavior
- Add CSS scroll snap.
- Implement tab switching.
- Reset scroll position on tab switch.
- Add slide progress state.

Phase 3: Responsive Design
- Build desktop and mobile layouts.
- Verify slide content does not overlap or overflow badly.
- Tune `100svh`, spacing, and navigation placement.

Phase 4: Portfolio Content
- Replace placeholders with real copy.
- Add project and marketing assets.
- Add real links.

Phase 5: Polish
- Add Intersection Observer animations.
- Add keyboard controls.
- Add reduced-motion handling.
- Test on desktop and mobile viewport sizes.

## 11. Open Decisions

Resolve these before final implementation:

- Final name/title text.
- Exact hero value proposition.
- Whether the nav should be top-centered or side-mounted.
- Whether the site should include a downloadable resume.
- Which 2-3 development projects are strongest.
- Which 2-3 marketing case studies are strongest.
- Whether marketing examples have real metrics or should be framed as strategic/process case studies.

## 12. First Build Recommendation

Start with a lean version:

- Resume: 4 slides.
- Development: 3 slides total if only two projects are ready, 4 slides if three projects are ready.
- Marketing: 3 slides total if only two case studies are ready, 4 slides if three case studies are ready.

That produces a focused site with 10-12 total slides, which is enough to feel substantial without becoming slow or repetitive.
