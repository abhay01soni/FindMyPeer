# FindMyPeer — Landing Page Build Prompt

Paste this whole thing to the coding agent as the brief for the FindMyPeer homepage.

## Context

FindMyPeer is a 1:1 expert consultation marketplace. Clients discover and book verified professionals for outcome-oriented sessions. Launch niches: Startup & Product Advisory, Career & Interview Coaching, Technology Mentorship, Finance & Compliance, Health, Wellness & Personal Coaching. Positioning line: "Book a focused 1:1 session with someone who has already solved your problem." This is not a social network, event platform, or Calendly clone — it's narrow and outcome-focused.

Stack: Next.js (App Router) + Tailwind CSS. Build the homepage as a set of composable React components (Hero, NicheGrid, NicheCard, FeaturedAdvisors, HowItWorks, LaunchOffer, WaitlistForm, Footer) so the content is easy to wire to real data later. Motion via Framer Motion or CSS transitions — whichever the agent already has set up.

## Design direction — do not default to generic SaaS template

Treat this like a professional directory / masthead site, not a typical startup landing page. Credibility comes from surfacing real-feeling advisor profiles and niches up front, not from generic feature cards or stock-photo hero shots.

**Type**: One editorial serif for headlines — **Fraunces** (Google Fonts) — paired with **Inter** for body/UI text. The serif carries the "expert publication" personality; body text stays quiet and functional. Left-align text; avoid centered hero blocks.

**Color tokens**:
- `--ink: #1B2431` — primary text, dark sections
- `--paper: #EDEAE2` — warm stone background (not cream/off-white — slightly greyer, less yellow)
- `--card: #FFFFFF` — card surfaces
- `--brass: #A6752C` — accent for credibility marks, active states
- `--wine: #6E2A35` — secondary accent for niche/category tags
- `--slate: #6B7280` — secondary text
- `--line: #D8D4C9` — hairline borders/dividers

**Avoid these tells**: cream background + terracotta/orange accent combo; ALL-CAPS eyebrow labels above every heading; identical rounded cards with the same soft grey shadow on everything; a bright accent on a near-black background; numbered markers unless the content is a real sequence (the 3-step "How it works" is the one place numbering belongs).

**Motion**: one orchestrated moment on load (hero elements settling in), plus the niche-card expand interaction described below. Nothing else animates on scroll — no fade-slide-up on every section, no hover-lift on every card.

## Required sections, in order

1. **Nav** — logo/wordmark, links (Why FindMyPeer / For Professionals / For Clients / How It Works / FAQ), a "Join Beta" button.

2. **Hero** — Large serif headline (rework "Find Experts. Book Slots. Get Clarity." into something with more voice — write 2-3 alternatives). One sentence of sub-copy explaining the model. Two CTAs: "I'm looking for advice" (client) and "I'm an expert" (professional) — these should scroll to or open the relevant waitlist form. Beside or below the headline: a slow continuous horizontal scroll ("marquee") of small advisor chips (avatar-initial circle + name + one-line credential) — this is the one continuous-motion element on the page, meant to suggest an active roster without needing real data yet.

3. **Niche grid — the core interactive element.** Show 5 main niche cards in a grid:
   - Startup & Product Advisory
   - Career & Interview Coaching
   - Technology Mentorship
   - Finance & Compliance
   - Health, Wellness & Personal Coaching

   Each main card shows: niche name, one-line description, and a count like "12 advisors." **On click, the card expands in place** (not a modal/popup) to reveal a row/grid of sub-niche cards specific to it, animated with a smooth height expand + staggered fade-in of the sub-cards (stagger delay ~40-60ms per card, keep total reveal under 400ms). Only one main card is expanded at a time — clicking another collapses the first. Clicking the expanded card again (or an explicit close) collapses it.

   Suggested sub-niches per category (agent can refine):
   - *Startup & Product Advisory*: Fundraising Strategy, Product-Market Fit, Go-to-Market, Pitch Deck Review
   - *Career & Interview Coaching*: Resume & LinkedIn, Mock Interviews, Salary Negotiation, Career Pivots
   - *Technology Mentorship*: System Design, Code Review, Engineering Career Growth, Tech Stack Decisions
   - *Finance & Compliance*: Startup Finance & Runway, Tax & Compliance (India), Fundraising Legal/Cap Table, Personal Finance
   - *Health, Wellness & Personal Coaching*: Fitness & Nutrition Planning, Stress & Burnout, Habit Building, Life Coaching

   Each sub-niche card should be clickable through to a (not-yet-built) filtered advisor listing — link it, even if the destination page doesn't exist yet.

4. **Featured Advisors** — grid of 6 advisor cards (placeholder data): initials-avatar, name, one-line credential ("Ex-Google PM, 8 yrs"), niche tag, rate ("₹2,499 / session"), "View profile" button.

5. **How It Works** — exactly 3 numbered steps (this is the one legitimate place for numbering): Find your advisor → Book a slot → Meet on a Google Meet link, auto-created.

6. **Trust & Launch Offer** — verified-professional badge explanation, plus the launch offer: first 500 approved professionals pay no monthly fee and no listing fee; FindMyPeer takes 12% commission only on completed paid sessions.

7. **Waitlist form** — Professional/Client toggle (matches the existing form fields: name, email, LinkedIn/website, years of experience, expertise category, city, consultation areas, optional expected price per session).

8. **Footer** — standard links, social, copyright.

## Copy guidance

Write real placeholder copy for every section — no lorem ipsum, no "Lorem headline here." Plain, confident, specific language; avoid hype words like "revolutionary" or "seamless." CTAs say exactly what happens ("Join the waitlist," not "Get Started").

## Quality bar

Fully responsive down to mobile (niche cards stack to 1 column, expand interaction still works via tap). Visible keyboard focus states. Respect `prefers-reduced-motion` (fall back to instant show/hide instead of animated expand). Accessible color contrast on all text/background pairs.
