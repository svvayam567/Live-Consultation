import type { ConsultationState } from '../types/consultation';

export const LOCAL_STORAGE_KEY = 'svvayam-consultation-wireframe-v1';
export const LOCAL_STORAGE_GRID_KEY = 'svvayam-reference-grid-v1';
export const LOCAL_STORAGE_JOURNEY_KEY = 'svvayam-journey-images-v1';

export interface StepDefinition {
  title: string;
  time: string;
  intro: string;
  name: string;
  fields?: [string, string, ('text' | 'date' | 'number' | 'area')?][];
  images?: boolean;
  grid?: boolean;
  journey?: boolean;
  proposal?: boolean;
}

export const CONSULTATION_STEPS: StepDefinition[] = [
  {
    name: 'Purpose',
    title: 'Let’s plan your pooja space',
    time: '0–2 min · Purpose',
    intro: 'We’ll understand your worship, confirm the space, choose three visual references and recommend a scope and indicative budget.',
    fields: [
      ['client', 'Client name'],
      ['location', 'Project location'],
      ['date', 'Consultation date', 'date']
    ]
  },
  {
    name: 'Worship',
    title: 'How does your family worship?',
    time: '2–6 min · Personalise the space',
    intro: 'Tell us what matters in your daily worship so the design feels personal to your family.',
    fields: [
      ['deity', 'Deities, traditions and idols'],
      ['rituals', 'How you worship · daily rituals and family usage', 'area'],
      ['idol', 'Idol dimensions / clearance, if known']
    ]
  },
  {
    name: 'Space',
    title: 'Confirm the available space',
    time: '6–10 min · Essential dimensions',
    intro: 'Record the available width, depth and height with units. We will verify measurements before final design.',
    fields: [
      ['dimensions', 'Width × depth × height, with units'],
      ['dimensionType', 'Internal or external · measured or approximate'],
      ['features', 'Essential storage, doors or enclosure'],
      ['site', 'Site status / constraints']
    ],
    images: true
  },
  {
    name: 'Alignment',
    title: 'Align expectations',
    time: '10–13 min · Decisions, budget and timing',
    intro: 'Let’s align who will review the design, your investment range and the dates we need to work towards.',
    fields: [
      ['approvers', 'Family / architect approvers'],
      ['budget', 'Comfortable investment range'],
      ['installation', 'Desired installation date'],
      ['decision', 'When would you like to decide?']
    ]
  },
  {
    name: 'Examples',
    title: 'Choose three references you love',
    time: '13–20 min · Visual direction',
    intro: 'Read left to right for increasing detail; move down for increasing scale. Choose three images that feel closest to what you want. These guide the design; they are not exact replicas.',
    grid: true
  },
  {
    name: 'Scope',
    title: 'Define your scope and indicative budget',
    time: '20–25 min · Recommendation',
    intro: 'Use the three selections together with worship needs and available dimensions. We will recommend the appropriate form, detailing and materials; we’ll record an indicative budget and timing together before reviewing your design engagement.',
    fields: [
      ['scope', 'Recommended scope and design direction', 'area'],
      ['materials', 'Proposed materials and finishes'],
      ['estimate', 'Indicative project budget · ₹ (enter one amount)', 'number'],
      ['timeline', 'Proposed timeline and dependencies'],
      ['exclusions', 'Tax basis, exclusions and assumptions', 'area']
    ]
  },
  {
    name: 'Your Journey',
    title: 'From first conversation to your sacred space',
    time: '25–30 min · Your journey',
    intro: 'Experience your Svvayam journey — from this first conversation to installation and handover.',
    journey: true
  },
  {
    name: 'Proposal',
    title: 'Your preliminary proposal',
    time: 'Final review · Customer-facing summary',
    intro: 'Prepared for review and confirmation.',
    proposal: true
  }
];

export const REFERENCE_ROW_NAMES = [
  'Small niche / open mandap',
  'Enclosed altar / compact unit',
  'Dedicated pooja room',
  'Large temple / pavilion · 10–15 ft'
];

export const REFERENCE_COL_NAMES = [
  'Minimal',
  'Restrained detail',
  'Rich detail',
  'Maximal'
];

export interface JourneyStageMeta {
  title: string;
  time: string;
  description: string;
  svgPath: string;
}

export const JOURNEY_STAGES: JourneyStageMeta[] = [
  {
    title: 'First consultation',
    time: 'Today',
    description: 'Your rituals, space, references and indicative budget.',
    svgPath: 'M8 8h48v32H32L20 52V40H8z'
  },
  {
    title: 'Design onboarding',
    time: 'Design fee paid',
    description: 'Confirm your engagement and reserve your design slot.',
    svgPath: 'M14 6h36v52H14z M22 20h20 M22 30h20 M22 40l6 6 14-14'
  },
  {
    title: 'Design together',
    time: '2–4 weeks',
    description: 'Mood board, layouts, live 3D design and iterations.',
    svgPath: 'M8 48l8 8 40-40-8-8z M12 44l8 8 M8 56h48'
  },
  {
    title: 'Sign off & review BOQ',
    time: 'Your approval',
    description: 'Approve design and materials; review the detailed bill of quantities / materials line by line and request changes.',
    svgPath: 'M14 6h36v52H14z M22 20h20 M22 30h20 M22 40h20 M22 50h12'
  },
  {
    title: 'Lock scope & start production',
    time: 'Manufacturing advance paid',
    description: 'Lock materials and price; approve the technical package and pay the manufacturing advance.',
    svgPath: 'M14 28h36v30H14z M22 28V18a10 10 0 0 1 20 0v10 M32 40v8'
  },
  {
    title: 'Craft & manufacture',
    time: '3–5 months',
    description: 'We manufacture your pooja space. Duration depends on design, materials and size.',
    svgPath: 'M8 56V28l16 10V22l16 10V10h14v46z M18 46h6 M32 46h6 M46 46h6'
  },
  {
    title: 'Finish, check & dispatch',
    time: 'Ready for your site',
    description: 'Final finishing and polishing, fit and finish checks, then dispatch to your site.',
    svgPath: 'M6 20h32v30H6z M38 30h12l8 12v8H38 M14 54a5 5 0 1 0 0-10 5 5 0 1 0 0 10 M48 54a5 5 0 1 0 0-10 5 5 0 1 0 0 0 10'
  },
  {
    title: 'Installation & handover',
    time: 'Your space is ready',
    description: 'Install at site, review the completed work together and hand over your pooja space.',
    svgPath: 'M8 30L32 8l24 22 M14 26v30h36V26 M24 42l6 6 14-14'
  }
];

export const PROPOSAL_SECTIONS = [
  {
    title: 'Your worship',
    fields: [
      ['deity', 'Deities and traditions'],
      ['rituals', 'Worship and family usage'],
      ['idol', 'Idol details']
    ]
  },
  {
    title: 'Space and essentials',
    fields: [
      ['dimensions', 'Dimensions'],
      ['dimensionType', 'Dimension basis'],
      ['site', 'Site readiness'],
      ['features', 'Functional requirements']
    ]
  },
  {
    title: 'Proposed scope',
    fields: [
      ['scope', 'Design direction'],
      ['materials', 'Proposed materials and finish']
    ]
  },
  {
    title: 'Budget and timing',
    fields: [
      ['budget', 'Client budget range'],
      ['estimate', 'Indicative project budget'],
      ['installation', 'Desired installation'],
      ['timeline', 'Proposed timeline and dependencies'],
      ['exclusions', 'Tax basis, exclusions and assumptions']
    ]
  },
  {
    title: 'Your review',
    fields: [
      ['approvers', 'Design approvers'],
      ['decision', 'Preferred decision date']
    ]
  }
];

export const ENGAGEMENT_INCLUSIONS = [
  'Co-curated mood board, concept and layout development',
  'Live 3D design, realistic renders and working drawings',
  'Material recommendations and home-delivered samples',
  'Dedicated project manager',
  'Up to six virtual design sessions of 2–3 hours each; further sessions at our studio if required',
  'Unlimited revisions within the approved concept; major concept changes require a new design engagement'
];

export const DESIGN_JOURNEY_STEPS = [
  {
    step: '1. Discovery & inspiration',
    desc: 'We translate your rituals and selected references into a mood board. You approve the design direction.'
  },
  {
    step: '2. Spatial planning',
    desc: 'We plan scale, circulation, storage, seating and lighting. You approve the layout and key features.'
  },
  {
    step: '3. Live 3D design',
    desc: 'We model your space together and visualise materials. You approve the completed 3D model.'
  },
  {
    step: '4. Technical drawings',
    desc: 'We prepare executable details for carpentry, carving, brass and stone. You approve the technical package before production.'
  }
];

export const INITIAL_CONSULTATION_STATE: ConsultationState = {
  version: 1,
  fields: {
    date: new Date().toLocaleDateString('en-CA'),
    client: '',
    location: '',
    deity: '',
    rituals: '',
    idol: '',
    dimensions: '',
    dimensionType: '',
    features: '',
    site: '',
    approvers: '',
    budget: '',
    installation: '',
    decision: '',
    scope: '',
    materials: '',
    estimate: '',
    timeline: '',
    exclusions: ''
  },
  images: [],
  slide: 0,
  gallery: Array(16).fill(null),
  journey: Array(8).fill(null),
  selected: [],
  selected_projects: [],
  status: 'draft'
};
