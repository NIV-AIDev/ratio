export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingTime: string;
  publishedOn: string;
  searchTerms: string[];
  intro: string;
  sections: BlogSection[];
  conclusion: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "architecture-decisions-that-protect-budget",
    title: "How Early Architecture Decisions Protect Your Build Budget",
    excerpt:
      "When the massing, structure, and services strategy are settled early, costs become predictable and late redesign is dramatically reduced.",
    category: "Architecture",
    readingTime: "7 min read",
    publishedOn: "2026-02-02",
    searchTerms: ["feasibility", "structural grid", "cost planning", "value engineering"],
    intro:
      "Budget control starts before finishes are selected. The biggest wins come from aligning spatial ambition with structural logic and service distribution in concept design.",
    sections: [
      {
        heading: "Fix primary geometry before detail design",
        paragraphs: [
          "Every late movement of walls, stair cores, or ceiling zones ripples through engineering packages and contractor pricing. Locking key geometry at concept stage removes a common source of change orders.",
          "A clear spatial grid allows suppliers to quote confidently, which improves price quality and reduces provisional sums that later become budget surprises.",
        ],
        bullets: [
          "Set room heights and structural depths in one coordinated model.",
          "Confirm plant and riser zones before planning submission.",
          "Issue one agreed plan set for all early cost checks.",
        ],
      },
      {
        heading: "Coordinate architecture and MEP at the same cadence",
        paragraphs: [
          "Mechanical routes, electrical distribution, and drainage often force late compromises when considered too late. Weekly technical workshops during concept and developed design prevent this.",
          "When architecture and MEP evolve together, you protect both performance and aesthetic intent without expensive rework.",
        ],
      },
      {
        heading: "Use cost plans as design feedback, not post-rationalisation",
        paragraphs: [
          "A cost plan is most useful when it informs decisions in real time. Reviewing benchmark rates by element at each gateway helps teams correct course while options are still open.",
        ],
      },
    ],
    conclusion:
      "A controlled brief, a coordinated grid, and early technical alignment provide the strongest foundation for budget certainty throughout delivery.",
  },
  {
    slug: "interior-design-briefs-that-save-site-time",
    title: "Interior Design Briefs That Save Weeks on Site",
    excerpt:
      "A precise interior brief does not limit creativity, it accelerates procurement, reduces RFIs, and keeps the construction sequence intact.",
    category: "Interior Design",
    readingTime: "6 min read",
    publishedOn: "2026-01-25",
    searchTerms: ["briefing", "procurement", "joinery", "design intent"],
    intro:
      "The site team moves fastest when design intent is clear before first fix. Interior briefs should define function, quality level, and performance expectations in measurable terms.",
    sections: [
      {
        heading: "Define performance criteria, not just mood references",
        paragraphs: [
          "Reference images are useful, but contractors need dimensional and performance information. Durability targets, maintenance standards, and acoustic expectations should be written early.",
        ],
      },
      {
        heading: "Freeze key room-by-room decisions before package tender",
        paragraphs: [
          "Bathrooms, kitchens, and principal joinery packages drive critical path trades. If those decisions are deferred, suppliers hold programme slots and pricing expires.",
          "A room data sheet that captures fixtures, electrical intent, and storage logic can remove weeks of back-and-forth during procurement.",
        ],
        bullets: [
          "Issue room data sheets with finish intent and equipment lists.",
          "Confirm sanitaryware and brassware rough-in requirements early.",
          "Align specialist joinery details with wall buildup and tolerances.",
        ],
      },
      {
        heading: "Close information loops with site markups",
        paragraphs: [
          "Short, structured design walks with contractor markups keep drawing sets current and reduce duplicated coordination meetings.",
        ],
      },
    ],
    conclusion:
      "A strong interior brief creates creative clarity and site efficiency at the same time, especially in packages with high custom content.",
  },
  {
    slug: "construction-programme-critical-path-basics",
    title: "Construction Programme Basics: Reading the Critical Path",
    excerpt:
      "Understanding the true sequence of dependencies helps clients prioritise decisions that keep practical completion on track.",
    category: "Construction",
    readingTime: "8 min read",
    publishedOn: "2026-01-17",
    searchTerms: ["critical path", "programme", "dependencies", "practical completion"],
    intro:
      "Many delays are not caused by site productivity, but by late information and approvals that sit on critical path activities. Knowing where float does and does not exist is essential.",
    sections: [
      {
        heading: "Separate milestone dates from activity logic",
        paragraphs: [
          "Milestones are useful for reporting, but they do not explain risk. Activity-level logic shows what must happen first, what can overlap, and where delays are absorbable.",
        ],
      },
      {
        heading: "Track information release dates as programme drivers",
        paragraphs: [
          "A drawing issued one week late can postpone multiple trades. Programmes should include information release points and approval windows as first-class tasks.",
          "When design release is managed as part of the programme, procurement and installation remain aligned.",
        ],
      },
      {
        heading: "Watch handover pathways from mid-project onward",
        paragraphs: [
          "Commissioning, statutory sign-off, and O&M compilation often begin too late. Embedding these items early protects completion and occupation dates.",
        ],
        bullets: [
          "Plan witness testing windows before commissioning starts.",
          "Set document handover requirements in every subcontract.",
          "Review partial completion zones for phased access where possible.",
        ],
      },
    ],
    conclusion:
      "Programme reliability comes from dependency discipline, not optimistic durations. The critical path should guide decision priority every week.",
  },
  {
    slug: "materials-selection-for-longevity",
    title: "Selecting Stone, Timber, and Metals for Longevity",
    excerpt:
      "Material quality is not only about appearance, it is about lifecycle performance, serviceability, and environmental fit.",
    category: "Materials",
    readingTime: "7 min read",
    publishedOn: "2026-01-09",
    searchTerms: ["stone", "timber", "metals", "maintenance", "durability"],
    intro:
      "Elegant interiors age well when selection criteria include movement, porosity, repairability, and how surfaces react to real occupancy patterns.",
    sections: [
      {
        heading: "Choose by use profile, not showroom conditions",
        paragraphs: [
          "A polished stone tested under showroom lighting may underperform in high-traffic family zones. Understanding wear profile and cleaning regimes is as important as tone and veining.",
        ],
      },
      {
        heading: "Coordinate substrate and fixing method early",
        paragraphs: [
          "Material failures are often interface failures. Timber movement allowances, adhesive compatibility, and substrate tolerances should be coordinated before orders are placed.",
        ],
        bullets: [
          "Confirm moisture content assumptions for engineered timber.",
          "Validate adhesive systems with supplier technical sheets.",
          "Prototype edge details for metal trims and transition lines.",
        ],
      },
      {
        heading: "Build a maintenance narrative for handover",
        paragraphs: [
          "Clients and facilities teams need clear maintenance instructions from day one. Proper care guidance protects appearance and warranty conditions.",
        ],
      },
    ],
    conclusion:
      "Durable luxury is achieved when aesthetics and technical performance are selected together, then documented for long-term care.",
  },
  {
    slug: "planning-permission-vs-building-regulations",
    title: "Planning Permission vs Building Regulations: What Homeowners Need",
    excerpt:
      "These approvals serve different goals. Treating them as one process creates avoidable delays and repeated submissions.",
    category: "Planning",
    readingTime: "6 min read",
    publishedOn: "2026-01-02",
    searchTerms: ["planning permission", "building regulations", "approvals", "compliance"],
    intro:
      "Planning and Building Regulations are complementary but separate controls. Projects move faster when submission strategy reflects that difference from the outset.",
    sections: [
      {
        heading: "Planning tests impact and policy alignment",
        paragraphs: [
          "Planning authorities assess context, massing, overlooking, and policy fit. Visual clarity and neighbour impact evidence are often decisive.",
        ],
      },
      {
        heading: "Building Regulations test safety and performance",
        paragraphs: [
          "Regulations focus on structure, fire safety, thermal performance, drainage, and access. Technical packages must be coordinated and buildable, not only conceptually strong.",
          "Treating regulation sign-off as a late-stage formality usually creates redesign pressure during tender.",
        ],
      },
      {
        heading: "Sequence consultants to avoid duplicate work",
        paragraphs: [
          "A staged consultant plan avoids repeated drawing cycles and improves certainty for contractors.",
        ],
        bullets: [
          "Define planning drawing scope separately from technical package scope.",
          "Run pre-application feedback where complexity is high.",
          "Begin regulation coordination before planning determination where viable.",
        ],
      },
    ],
    conclusion:
      "A dual-track approvals strategy improves speed, quality, and tender confidence without compromising design outcomes.",
  },
  {
    slug: "procurement-route-for-residential-projects",
    title: "Choosing a Procurement Route for Residential Projects",
    excerpt:
      "Main contractor, trade packages, and design-and-build each carry different risk allocations, management demands, and pricing behaviour.",
    category: "Construction",
    readingTime: "9 min read",
    publishedOn: "2025-12-23",
    searchTerms: ["procurement", "main contractor", "trade packages", "design and build"],
    intro:
      "The right procurement model depends on your design maturity, appetite for involvement, and how much programme certainty you need at contract stage.",
    sections: [
      {
        heading: "Main contractor route",
        paragraphs: [
          "This route centralises responsibility and is often best for clients who want a single delivery lead. It can offer stronger programme accountability when design information is mature.",
        ],
      },
      {
        heading: "Trade package management",
        paragraphs: [
          "Direct package procurement can improve transparency and control for experienced teams, but it requires disciplined coordination and clear interfaces.",
        ],
        bullets: [
          "Higher control over specialist quality and sequencing.",
          "More client-side management load and risk ownership.",
          "Greater exposure to interface disputes if scope is unclear.",
        ],
      },
      {
        heading: "Design and build",
        paragraphs: [
          "Design and build can compress programme and cost negotiation if employer requirements are robust. Weak requirements, however, can dilute design outcomes.",
        ],
      },
    ],
    conclusion:
      "Procurement should be selected as a strategic decision early in pre-construction, not as a reaction once tender pressure starts.",
  },
  {
    slug: "controlling-variations-without-losing-design-intent",
    title: "Managing Variations Without Losing Design Intent",
    excerpt:
      "Change is normal on complex homes. The key is a controlled variation process that protects programme, budget, and design quality.",
    category: "Budgeting",
    readingTime: "7 min read",
    publishedOn: "2025-12-15",
    searchTerms: ["variations", "change control", "cost certainty", "design intent"],
    intro:
      "Variations become costly when decisions are made informally. A documented route for request, pricing, approval, and integration keeps the project stable.",
    sections: [
      {
        heading: "Create one source of truth for change",
        paragraphs: [
          "Every design, client, and contractor change should be logged with scope description, reason, cost effect, and programme effect.",
          "Without a consolidated register, teams underestimate cumulative impact and lose forecast accuracy.",
        ],
      },
      {
        heading: "Price against clear assumptions",
        paragraphs: [
          "Variation quotes should state labour assumptions, lead times, and knock-on effects. Ambiguous quotations often trigger secondary claims later.",
        ],
      },
      {
        heading: "Approve by decision windows",
        paragraphs: [
          "Set weekly decision cut-offs tied to procurement milestones. This avoids urgent approvals that bypass technical checks.",
        ],
        bullets: [
          "Use red-amber-green coding for variation urgency.",
          "Escalate unresolved items before procurement lock dates.",
          "Issue revised drawings and programme updates immediately after approval.",
        ],
      },
    ],
    conclusion:
      "Good variation control does not block change. It ensures each change is intentional, priced properly, and integrated without project drift.",
  },
  {
    slug: "lighting-coordination-before-first-fix",
    title: "Lighting Design Coordination Before First Fix",
    excerpt:
      "The most common lighting compromises happen before fixtures are purchased. Early coordination of circuits, dimming, and ceiling build-ups prevents rework.",
    category: "Interior Design",
    readingTime: "6 min read",
    publishedOn: "2025-12-07",
    searchTerms: ["lighting design", "first fix", "dimming", "ceiling coordination"],
    intro:
      "Lighting quality is determined by planning discipline as much as fixture selection. First-fix decisions shape the final atmosphere more than many clients expect.",
    sections: [
      {
        heading: "Coordinate fixture intent with electrical strategy",
        paragraphs: [
          "Decorative intent, task lighting, and scene control should be planned with circuit logic from the beginning. Retrofits after first fix usually add cost and visual compromise.",
        ],
      },
      {
        heading: "Protect ceiling and joinery zones",
        paragraphs: [
          "Recessed fixtures, curtain tracks, extract grilles, and smoke detection all compete for limited ceiling volume. A reflected ceiling coordination review avoids clashes.",
        ],
      },
      {
        heading: "Mock up key spaces before bulk order",
        paragraphs: [
          "A simple mock-up in a principal room validates beam spread, glare comfort, and colour rendering before procurement is locked.",
        ],
      },
    ],
    conclusion:
      "Lighting coordination is an early-stage technical exercise that directly affects spatial quality, comfort, and programme reliability.",
  },
  {
    slug: "realistic-contingency-for-home-budgets",
    title: "How to Build a Realistic Contingency in Residential Budgets",
    excerpt:
      "Contingency should reflect project risk, not a generic percentage. Targeted allowances provide better control and clearer client reporting.",
    category: "Budgeting",
    readingTime: "7 min read",
    publishedOn: "2025-11-28",
    searchTerms: ["contingency", "budget planning", "risk allowances", "cost reporting"],
    intro:
      "Contingency is often misunderstood as spare money. In well-run projects, it is a planned response to identified uncertainty and is released with discipline.",
    sections: [
      {
        heading: "Separate design contingency from construction contingency",
        paragraphs: [
          "Design development risk and on-site delivery risk behave differently. Splitting allowances improves transparency and helps teams focus mitigation actions.",
        ],
      },
      {
        heading: "Link contingency drawdown to risk events",
        paragraphs: [
          "Each drawdown should reference a specific event, such as a discovered structural issue or a client-approved upgrade. This keeps forecasting credible.",
        ],
        bullets: [
          "Maintain a monthly risk register with probability and impact.",
          "Track approved drawdowns separately from contract changes.",
          "Re-forecast remaining contingency at each cost report.",
        ],
      },
      {
        heading: "Report confidence ranges, not single-point optimism",
        paragraphs: [
          "Clients make better decisions when they see likely ranges and risk drivers, rather than one fixed number with hidden assumptions.",
        ],
      },
    ],
    conclusion:
      "A structured contingency strategy supports confident decisions and prevents reactive budget corrections late in construction.",
  },
  {
    slug: "handover-readiness-for-high-end-homes",
    title: "Handover Readiness: Snagging, O&M Manuals, and Move-In",
    excerpt:
      "The final month determines how the project is remembered. Structured handover planning reduces stress and protects the opening experience.",
    category: "Programme",
    readingTime: "8 min read",
    publishedOn: "2025-11-19",
    searchTerms: ["handover", "snagging", "om manuals", "practical completion"],
    intro:
      "Handover is not a single event at practical completion. It is a phased process of quality verification, documentation, and user onboarding.",
    sections: [
      {
        heading: "Start snagging in zones",
        paragraphs: [
          "Waiting for whole-project completion before snagging creates congestion and rework pressure. Zoned reviews enable earlier close-out and cleaner final inspections.",
        ],
      },
      {
        heading: "Treat documentation as part of delivery",
        paragraphs: [
          "Operation and maintenance manuals, warranties, and commissioning records should be compiled during construction, not after completion.",
        ],
      },
      {
        heading: "Plan move-in support and aftercare",
        paragraphs: [
          "Occupier induction, seasonal commissioning checks, and clear defect response pathways improve long-term performance and client confidence.",
        ],
        bullets: [
          "Schedule user training for key systems before occupation.",
          "Confirm defect liability response times in writing.",
          "Set a 30-day and 90-day post-occupation review cadence.",
        ],
      },
    ],
    conclusion:
      "Projects that finish well are those that plan handover from mid-delivery onward, with equal focus on quality, documentation, and occupant readiness.",
  },
];

export const blogCategories = Array.from(new Set(blogPosts.map((post) => post.category)));

const blogDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatBlogDate(publishedOn: string) {
  return blogDateFormatter.format(new Date(`${publishedOn}T00:00:00`));
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
