/* Content index for the "Ask" section (ask.js) on the homepage. Each entry
   is one topic a visitor might ask about, with an id (so the curated FAQ
   chips in index.html can point at an exact entry instead of relying on
   fuzzy matching), the keywords ask.js matches free-text queries against,
   a first-person answer written in Kshitij's own voice, and a link to the
   full case study where relevant. Keyword lists are intentionally wide —
   each one is a hand-curated, high-confidence signal (a real match is
   worth 3x a coincidental word overlap in the answer text), so widening
   them is the safe way to catch more real phrasings without loosening the
   matcher into guessing. Kept as plain data (not fetched/generated) so
   it's easy to hand-edit as new projects get added — just add another
   object here. */
window.SITE_QA_INDEX = [
  {
    id: "background",
    title: "About Kshitij",
    page: "/",
    keywords: ["about", "background", "who is kshitij", "experience", "pmm", "product marketing", "bio", "career", "professional background", "work history", "yourself", "introduce"],
    answer: "I'm a product marketing professional with 8 years of cross-functional experience across product, marketing, and design — based in the U.S., graduating September 2026. I've never been able to pick just one lane, so now I work at the intersection instead."
  },
  {
    id: "why-pmm",
    title: "Why product marketing",
    page: "/",
    keywords: ["why", "product marketing", "focus", "interested", "passion", "passionate", "care about", "drawn to", "love about", "excites"],
    answer: "Product decides what people get, marketing convinces them they needed it, design makes sure they enjoy it — product marketing sits right where all three collide, and that collision is honestly my favorite part of any project."
  },
  {
    id: "different",
    title: "What makes him different",
    page: "/",
    keywords: ["different", "unique", "stand out", "other candidates", "special", "usp", "why hire", "why should", "sets you apart"],
    answer: "Most of my background isn't confined to one lane — I've led creative teams, run go-to-market campaigns, and done hands-on product research, often on the same project. I'm less a specialist in one thing and more fluent in the whole conversation."
  },
  {
    id: "treebo",
    title: "Treebo Hotels",
    page: "marketing/",
    keywords: ["treebo", "youtube", "hotels", "performance marketing", "hospitality", "influencer", "video"],
    answer: "At Treebo, I rebuilt a stalled YouTube channel around a video-first, micro-influencer strategy — a 28% year-over-year lift, a 9% rise in repeat bookings, 3.6M+ impressions. Turns out nobody wants to watch another hotel ad, but they'll happily watch a good travel video."
  },
  {
    id: "team",
    title: "Team management",
    page: "marketing/",
    keywords: ["team", "manage", "management", "lead", "leadership", "schbang", "head of design", "managed people", "direct reports", "led a team", "people manager"],
    answer: "Yes — at Schbang, I led a team of 3 junior designers across three client accounts at once, reporting to the Head of Design. I've also run smaller project-specific crews, like the 3 of us who produced 120 cricketer caricatures for Castrol in under two months. Managing people and managing deadlines turned out to be the same skill."
  },
  {
    id: "gtm",
    title: "Tata NeuCard — Product",
    page: "product/",
    keywords: ["tata", "neucard", "ai", "midjourney", "product marketing", "cross-functional", "ipl", "partner brand", "go-to-market", "gtm", "campaign", "launch", "marketing strategy"],
    answer: "At Tata NeuCard, I was the go-to person coordinating product, growth, and partner stakeholders on campaign rollouts, and I brought in AI-assisted content workflows that cut delivery from 2 months to 2 weeks. I like a campaign with a deadline attached — it focuses the mind."
  },
  {
    id: "tools",
    title: "Tools and platforms",
    page: "/",
    keywords: ["tools", "platforms", "software", "stack", "hubspot", "figma", "sql", "tech stack", "technologies", "apps"],
    answer: "Day to day: HubSpot, Figma, Meta/Google Ads Manager, SQL, and PowerBI for the data side; Midjourney and ChatGPT when I want AI doing the grunt work; Jira and Kantata to keep projects from falling apart. I'm tool-agnostic, but I do have opinions."
  },
  {
    id: "process",
    title: "Working process",
    page: "/",
    keywords: ["process", "methodology", "how does he work", "loop", "discover", "define", "measure", "approach", "workflow", "way of working"],
    answer: "My process is a 6-step loop: talk to real users, place a clear bet, prototype fast, ship the smallest useful version, watch what actually happens, then decide — kill it, keep it, or double down. I don't believe in loving my first idea, so this keeps me honest."
  },
  {
    id: "start-date",
    title: "Graduation and availability",
    page: "/",
    keywords: ["graduating", "graduation", "available", "start date", "when", "availability", "notice period", "join", "start work"],
    answer: "I'm graduating in September 2026 and will be free to start full-time right after. Countdown's already running."
  },
  {
    id: "relocation",
    title: "Relocation",
    page: "/",
    keywords: ["relocate", "relocation", "move", "location", "remote", "willing to move", "relocating"],
    answer: "Yes, I'm open to relocating for the right opportunity — depends on where, so let's actually talk specifics rather than me guessing at your city."
  },
  {
    id: "visa",
    title: "Visa sponsorship",
    page: "/",
    keywords: ["visa", "sponsorship", "work authorization", "opt", "h1b", "sponsor", "authorized to work", "work permit", "immigration"],
    answer: "Yes, I'll need visa sponsorship — happy to get into the details whenever it's useful."
  },
  {
    id: "resume",
    title: "Resume",
    page: "/",
    keywords: ["resume", "cv", "download", "hire", "portfolio pdf"],
    answer: "Grab it from the “Like the way I work?” section further up this page — one click, no forms to fill out first."
  },
  {
    id: "vanguard",
    title: "Vanguard ID Systems",
    page: "product/",
    keywords: ["vanguard", "id systems", "crm", "hubspot", "salespad", "data migration", "sales records", "dashboards"],
    answer: "At Vanguard ID Systems, I migrated 20,000+ legacy sales records from Salespad into HubSpot and built revenue/pipeline dashboards from scratch — turned two decades of data nobody trusted into a single source everyone could use."
  },
  {
    id: "billbolo",
    title: "Billbolo",
    page: "product/",
    keywords: ["billbolo", "bnpl", "buy now pay later", "fintech", "tier 3", "tier 4", "onboarding", "research"],
    answer: "Billbolo was a Buy Now Pay Later app for tier 3/4 Indian cities. I led market research into how first-time credit users actually related to BNPL, and built onboarding around clarity and trust instead of speed — reassurance beats slickness when the whole concept is new to you."
  },
  {
    id: "flippar",
    title: "FlippAR",
    page: "product/",
    keywords: ["flippar", "ar", "augmented reality", "teleportation", "travel", "user testing", "bangalore"],
    answer: "FlippAR was an AR travel-tech app. I led on-the-ground user testing for its AR teleportation feature and built 3D monument replicas — the app went on to partner with Bangalore's tourism department and airport, which felt like a pretty good sign we were onto something."
  },
  {
    id: "sankey",
    title: "Sankey Business Solutions",
    page: "product/",
    keywords: ["sankey", "first job", "banking", "home safety", "ux research"],
    answer: "Sankey was my first job — researching UX for a bank website overhaul and a home-safety app at the same time. Nothing like two unrelated fires to learn fast."
  },
  {
    id: "how-built",
    title: "How this site was built",
    page: "product/#how-i-built-this",
    keywords: ["site", "website", "built", "figma", "claude", "how was this made", "portfolio"],
    answer: "I designed this site frame-by-frame in Figma, then built it in an ongoing back-and-forth with Claude. Creative direction stayed fully mine — the implementation just happened as a live conversation instead of a queue of dev tickets."
  },
  {
    id: "itsy",
    title: "Itsy by Treebo",
    page: "marketing/",
    keywords: ["itsy", "treebo trip", "rebrand", "reposition", "budget hotel"],
    answer: "Itsy by Treebo was a rebrand I proposed and drove myself, not a brief I was handed — I researched what budget travelers actually valued and rebuilt a struggling hotel tier's identity from the name up."
  },
  {
    id: "bvs",
    title: "OML — Breezer Vivid Shuffle",
    page: "marketing/",
    keywords: ["oml", "breezer", "bvs", "dance", "hip-hop", "rap battle", "ar filter"],
    answer: "Breezer Vivid Shuffle was a nationwide virtual hip-hop dance/rap competition. My team scaled it from a handful of cities to a nationwide open call with 96 finalist artists across 4 crews — mid-pandemic, which made \"nationwide dance competition\" a genuinely strange sentence to say out loud at the time."
  },
  {
    id: "circuit",
    title: "OML — The Circuit Comedy Festival",
    page: "marketing/",
    keywords: ["oml", "circuit", "comedy", "festival"],
    answer: "The Circuit was a nationwide comedy festival campaign. Testing taught me a real lesson in restraint — faces-first, minimal-copy creative won for established comedians, while newer names actually needed more copy support."
  },
  {
    id: "peppercontent",
    title: "Peppercontent",
    page: "marketing/",
    keywords: ["peppercontent", "brand voice", "positioning", "freelance"],
    answer: "For Peppercontent's market entry, I defined the brand's early positioning and voice — ambitious, loud, witty — through an initial social campaign. Nice to see it's since grown into something real."
  },
  {
    id: "mum",
    title: "MUM (My Urban Menu)",
    page: "marketing/",
    keywords: ["mum", "restaurant", "branding", "fusion cuisine"],
    answer: "MUM needed a full brand identity from nothing. I led the branding end to end — name, logo, visual identity — then carried it straight into launch marketing. Branding work doesn't always get to see itself in the wild that fast."
  },
  {
    id: "castrol",
    title: "Castrol",
    page: "marketing/",
    keywords: ["castrol", "ipl", "caricatures", "lowe lintas", "cricket"],
    answer: "For Castrol's #CastrolMatchProtector IPL campaign, I led production of 120 unique cricketer caricatures with a 3-person team in under two months, working alongside Lowe Lintas. Cricket season does not wait for anyone."
  },
  {
    id: "heart-it-out",
    title: "Heart It Out",
    page: "marketing/",
    keywords: ["heart it out", "mental health", "psychologists", "social campaign"],
    answer: "Heart It Out is a psychologists' organisation. I designed a social presence that talked about mental health without being too clinical or too saccharine — a narrower needle to thread than it sounds."
  },
  {
    id: "trapped",
    title: "Trapped",
    page: "design/",
    keywords: ["trapped", "art series", "illustration", "procreate"],
    answer: "Trapped is a personal art series about invisible confinement — expectations, fears, rules that only hold power because we've agreed they do. I gave that feeling a literal, physical shape, one piece at a time."
  },
  {
    id: "human-interactions",
    title: "Human Interactions",
    page: "design/",
    keywords: ["human interactions", "art series", "strangers", "taxi", "rickshaw"],
    answer: "Human Interactions is a series about small, wordless connections between strangers — a boy and his laptop, a taxi ride, a rickshaw driver's glance. The kind of moment everyone has and nobody talks about."
  },
  {
    id: "love-bugs",
    title: "Love Bugs",
    page: "design/",
    keywords: ["love bugs", "art series", "ladybugs"],
    answer: "Love Bugs is a personal series of ladybugs weathering heat, cold, and rain together — love as consistency rather than grand gestures. Also, I just really like drawing bugs."
  },
  {
    id: "chameleon",
    title: "Chameleon",
    page: "design/",
    keywords: ["chameleon", "art series", "camouflage", "intimacy"],
    answer: "Chameleon reimagines the habits two people pick up from loving each other a long time — as literal camouflage, two colors blending into one. Less love-at-first-sight, more we've-somehow-become-the-same-person."
  },
  {
    id: "concept-art",
    title: "Concept Art",
    page: "design/",
    keywords: ["concept art", "surreal", "illustration", "octopus", "dreamlike"],
    answer: "Concept Art is a loose personal series where the rules are just slightly off — a giant sea creature sharing a moonlit moment with a rooftop kid, that kind of thing. No client, no brief, just whatever image showed up first."
  },
  {
    id: "contact",
    title: "Contact",
    page: "/#contact",
    keywords: ["contact", "reach out", "email", "get in touch", "hire", "linkedin", "talk", "connect", "message", "reach you"],
    answer: "Best way to reach me is the contact form right below this, or LinkedIn, Instagram, and Behance are all linked there too. I actually read these, for what it's worth."
  }
];
