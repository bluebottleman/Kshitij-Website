/* Content index for the "Ask" section (ask.js) on the homepage. Each entry
   is one topic a visitor might ask about, with an id (so the curated FAQ
   chips in index.html can point at an exact entry instead of relying on
   fuzzy matching), the keywords ask.js matches free-text queries against,
   a one-to-two sentence answer, and a link to the full case study where
   relevant. Kept as plain data (not fetched/generated) so it's easy to
   hand-edit as new projects get added — just add another object here. */
window.SITE_QA_INDEX = [
  {
    id: "background",
    title: "About Kshitij",
    page: "/",
    keywords: ["about", "background", "who is kshitij", "experience", "pmm", "product marketing", "bio"],
    answer: "Kshitij is a product marketing professional with 8 years of cross-functional experience across product, marketing, and design, currently based in the U.S. and graduating September 2026."
  },
  {
    id: "why-pmm",
    title: "Why product marketing",
    page: "/",
    keywords: ["why", "product marketing", "focus", "interested", "passion"],
    answer: "Kshitij is drawn to the space where product, marketing, and design overlap — product decides what people get, marketing convinces them they needed it, and design makes sure they enjoy it. Product marketing sits right at that intersection."
  },
  {
    id: "different",
    title: "What makes him different",
    page: "/",
    keywords: ["different", "unique", "stand out", "other candidates"],
    answer: "Most of Kshitij's background sits at the intersection of product, marketing, and design rather than in just one lane — he's led creative teams, run go-to-market campaigns, and done hands-on product research, often on the same project."
  },
  {
    id: "treebo",
    title: "Treebo Hotels",
    page: "marketing/",
    keywords: ["treebo", "youtube", "hotels", "performance marketing", "hospitality", "influencer"],
    answer: "At Treebo, Kshitij rebuilt a stalled YouTube channel around a video-first, micro-influencer strategy, driving a 28% year-over-year lift, a 9% rise in repeat bookings, and 3.6M+ impressions."
  },
  {
    id: "team",
    title: "Team management",
    page: "marketing/",
    keywords: ["team", "manage", "management", "lead", "leadership", "schbang", "head of design"],
    answer: "Yes — at Schbang, Kshitij led a team of 3 junior designers across three client accounts at once, reporting to the Head of Design. He's also led project-specific teams, like the 3-person crew behind Castrol's IPL campaign."
  },
  {
    id: "gtm",
    title: "Tata NeuCard — Product",
    page: "product/",
    keywords: ["tata", "neucard", "ai", "midjourney", "product marketing", "cross-functional", "ipl", "partner brand", "go-to-market", "gtm", "campaign"],
    answer: "At Tata NeuCard, Kshitij was the cross-functional coordination point across product, growth, and partner stakeholders, and introduced AI-assisted content workflows that cut campaign delivery from 2 months to 2 weeks."
  },
  {
    id: "tools",
    title: "Tools and platforms",
    page: "/",
    keywords: ["tools", "platforms", "software", "stack", "hubspot", "figma", "sql"],
    answer: "Day to day: HubSpot, Figma, Meta/Google Ads Manager, SQL, and PowerBI for the data side; Midjourney and ChatGPT for AI-assisted content workflows; Jira and Kantata for project delivery."
  },
  {
    id: "process",
    title: "Working process",
    page: "/",
    keywords: ["process", "methodology", "how does he work", "loop", "discover", "define", "measure"],
    answer: "Kshitij's process is a 6-step loop: talk to real users, place a clear bet, prototype fast, ship the smallest useful version, watch what happens, then decide — kill it, keep it, or double down."
  },
  {
    id: "start-date",
    title: "Graduation and availability",
    page: "/",
    keywords: ["graduating", "graduation", "available", "start date", "when"],
    answer: "Kshitij is graduating in September 2026 and will be available to start full-time after that."
  },
  {
    id: "relocation",
    title: "Relocation",
    page: "/",
    keywords: ["relocate", "relocation", "move", "location", "remote"],
    answer: "Yes, Kshitij is open to relocating for the right opportunity — it depends on the location, so it's worth discussing specifics."
  },
  {
    id: "visa",
    title: "Visa sponsorship",
    page: "/",
    keywords: ["visa", "sponsorship", "work authorization", "opt", "h1b"],
    answer: "Yes, Kshitij will require visa sponsorship."
  },
  {
    id: "resume",
    title: "Resume",
    page: "/",
    keywords: ["resume", "cv", "download", "hire"],
    answer: "You can download Kshitij's resume from the “Like the way I work?” section on the homepage."
  },
  {
    id: "vanguard",
    title: "Vanguard ID Systems",
    page: "product/",
    keywords: ["vanguard", "id systems", "crm", "hubspot", "salespad", "data migration", "sales records", "dashboards"],
    answer: "At Vanguard ID Systems, Kshitij migrated 20,000+ legacy sales records from Salespad into HubSpot and built revenue/pipeline dashboards from scratch, turning two decades of unusable data into a single source of truth."
  },
  {
    id: "billbolo",
    title: "Billbolo",
    page: "product/",
    keywords: ["billbolo", "bnpl", "buy now pay later", "fintech", "tier 3", "tier 4", "onboarding", "research"],
    answer: "Billbolo was a Buy Now Pay Later app for tier 3/4 Indian cities. Kshitij led market research into how first-time credit users related to BNPL, shaping onboarding around clarity and trust instead of speed."
  },
  {
    id: "flippar",
    title: "FlippAR",
    page: "product/",
    keywords: ["flippar", "ar", "augmented reality", "teleportation", "travel", "user testing", "bangalore"],
    answer: "FlippAR was an AR travel-tech app. Kshitij led on-the-ground user testing for its AR teleportation feature and built 3D monument replicas, with the app going on to partner with Bangalore's tourism department and airport."
  },
  {
    id: "sankey",
    title: "Sankey Business Solutions",
    page: "product/",
    keywords: ["sankey", "first job", "banking", "home safety", "ux research"],
    answer: "Sankey was Kshitij's first job, researching UX for a bank website overhaul and a home-safety app at the same time, handling two very different research problems early in his career."
  },
  {
    id: "how-built",
    title: "How this site was built",
    page: "product/#how-i-built-this",
    keywords: ["site", "website", "built", "figma", "claude", "how was this made", "portfolio"],
    answer: "This portfolio was designed frame-by-frame in Figma, then built in an ongoing back-and-forth with Claude — creative direction stayed fully Kshitij's, with the implementation happening as a live conversation."
  },
  {
    id: "itsy",
    title: "Itsy by Treebo",
    page: "marketing/",
    keywords: ["itsy", "treebo trip", "rebrand", "reposition", "budget hotel"],
    answer: "Itsy by Treebo was a self-initiated rebrand of Treebo's struggling budget tier — Kshitij researched what budget travelers actually valued and rebuilt the segment's identity from the name up."
  },
  {
    id: "bvs",
    title: "OML — Breezer Vivid Shuffle",
    page: "marketing/",
    keywords: ["oml", "breezer", "bvs", "dance", "hip-hop", "rap battle", "ar filter"],
    answer: "Breezer Vivid Shuffle was a nationwide virtual hip-hop dance/rap competition. Kshitij's team scaled it from a handful of cities to a nationwide open call with 96 finalist artists across 4 crews."
  },
  {
    id: "circuit",
    title: "OML — The Circuit Comedy Festival",
    page: "marketing/",
    keywords: ["oml", "circuit", "comedy", "festival"],
    answer: "The Circuit was a nationwide comedy festival campaign. Testing taught a real lesson in restraint — faces-first, minimal-copy creative won for established comedians, while newer names needed more copy support."
  },
  {
    id: "peppercontent",
    title: "Peppercontent",
    page: "marketing/",
    keywords: ["peppercontent", "brand voice", "positioning", "freelance"],
    answer: "For Peppercontent's market entry, Kshitij defined the brand's early positioning and voice — ambitious, loud, and witty — through an initial social campaign."
  },
  {
    id: "mum",
    title: "MUM (My Urban Menu)",
    page: "marketing/",
    keywords: ["mum", "restaurant", "branding", "fusion cuisine"],
    answer: "MUM needed a full brand identity from nothing. Kshitij led the branding end to end — name, logo, visual identity — and carried it straight into the restaurant's launch marketing."
  },
  {
    id: "castrol",
    title: "Castrol",
    page: "marketing/",
    keywords: ["castrol", "ipl", "caricatures", "lowe lintas", "cricket"],
    answer: "For Castrol's #CastrolMatchProtector IPL campaign, Kshitij led production of 120 unique cricketer caricatures with a 3-person team in under two months, working alongside Lowe Lintas."
  },
  {
    id: "heart-it-out",
    title: "Heart It Out",
    page: "marketing/",
    keywords: ["heart it out", "mental health", "psychologists", "social campaign"],
    answer: "Heart It Out is a psychologists' organisation. Kshitij designed a social media presence that talked about mental health without being too clinical or too saccharine."
  },
  {
    id: "trapped",
    title: "Trapped",
    page: "design/",
    keywords: ["trapped", "art series", "illustration", "procreate"],
    answer: "Trapped is a personal art series about invisible confinement — expectations, fears, and rules that only hold power because we've agreed they do — given literal, physical shape."
  },
  {
    id: "human-interactions",
    title: "Human Interactions",
    page: "design/",
    keywords: ["human interactions", "art series", "strangers", "taxi", "rickshaw"],
    answer: "Human Interactions is a series about small, wordless connections between strangers — a boy and his laptop, a taxi ride, a rickshaw driver's glance."
  },
  {
    id: "love-bugs",
    title: "Love Bugs",
    page: "design/",
    keywords: ["love bugs", "art series", "ladybugs"],
    answer: "Love Bugs is a personal art series of ladybugs weathering heat, cold, and rain together — love as consistency rather than grand gestures."
  },
  {
    id: "chameleon",
    title: "Chameleon",
    page: "design/",
    keywords: ["chameleon", "art series", "camouflage", "intimacy"],
    answer: "Chameleon reimagines the habits two people pick up from loving each other a long time — as literal camouflage, two colors blending into one."
  },
  {
    id: "concept-art",
    title: "Concept Art",
    page: "design/",
    keywords: ["concept art", "surreal", "illustration", "octopus", "dreamlike"],
    answer: "Concept Art is a loose personal series of scenes where the rules are just slightly off — imagination with no client or brief attached."
  },
  {
    id: "contact",
    title: "Contact",
    page: "/#contact",
    keywords: ["contact", "reach out", "email", "get in touch", "hire", "linkedin"],
    answer: "You can reach Kshitij through the contact form at the bottom of the homepage, or via LinkedIn, Instagram, or Behance linked there."
  }
];
