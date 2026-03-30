# Jigar Chaudhary - Personal Brand Website

## Current State
Full website with routes: main (`/`), admin (`/#/admin`), register (`/#/register`). Main page has Navigation, Hero, About, Programs, Corporate, Testimonials, MediaCertifications, CTABanner, Contact, Footer. Assets include workshop images (ws1–ws22) in `/assets/`.

## Requested Changes (Diff)

### Add
- New route `/#/zindagi30` that renders a dedicated `Zindagi30` page component
- `src/frontend/src/components/Zindagi30.tsx` — full landing page with 10 sections:
  1. Hero — Title "Zindagi 3.0", subtitle "A 3-Day Transformation Experience", description with bold line
  2. About the Program — 6 bullet points of what participants will achieve
  3. About the Trainer — Ms. Rikita Swaroop profile with 20+ years experience, known-for list
  4. Program Structure — "What You Will Experience" with 7 bullet points
  5. Duration Box — Highlighted: 3 Days (15 Hours), 2 Half Days + 1 Full Day
  6. Who Should Attend — 4 bullet points
  7. Certification — Certificate of Completion note
  8. Image Gallery — slider/grid using existing ws* images from /assets/
  9. CTA — "Register Now" button + "Limited Seats Available" subtext
  10. Footer — Hosted by: Jigar Chaudhary, Entrepreneur | Trainer | Experience Architect
- Navigation entry or a button on main page pointing to `/#/zindagi30`

### Modify
- `App.tsx` — add `zindagi30` route and import
- Navigation or Hero to include a link/CTA for Zindagi 3.0

### Remove
- Nothing removed

## Implementation Plan
1. Create `Zindagi30.tsx` with all 10 sections, premium dark-light contrast design, mobile responsive
2. Use existing ws* images for the gallery slider
3. Add route to `App.tsx`
4. Add a "Zindagi 3.0" CTA button in the Hero or Navigation
