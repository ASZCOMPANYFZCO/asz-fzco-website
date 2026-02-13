import type { Product, TeamMember, ComplianceDocument, WhatsAppContact } from './types';

export const SITE_CONFIG = {
  name: 'ASZ Company FZCO',
  tagline: 'Suppliers of Ferro Alloys and Noble Alloys',
  description:
    'International noble alloys, ferro alloys, and minor metals trading company based in Dubai. Supplying producers, steelmakers, and industrial consumers globally with reliability, transparency, and competitive value.',
  url: 'https://aszcompany.com',
  email: 'general@aszcompany.com',
  phone: '+971502069664',
  founded: '2022',
  businessHours: 'Mon–Fri 9:00 AM – 6:00 PM (London Time)',
  address: {
    street: '150 HDS Tower',
    area: 'JLT',
    city: 'Dubai',
    country: 'United Arab Emirates',
    full: '150 HDS Tower, JLT, Dubai, UAE',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/asz-company-fzco/',
    twitter: '',
  },
} as const;

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/products', label: 'Products' },
  { href: '/news', label: 'News' },
  { href: '/compliance', label: 'Compliance' },
  { href: '/contact', label: 'Contact' },
] as const;

export const PRODUCT_CATEGORIES = {
  FERRO_ALLOY: 'ferro_alloy',
  NOBLE_ALLOY: 'noble_alloy',
  MINOR_METAL: 'minor_metal',
} as const;

export const PRODUCT_CATEGORY_LABELS: Record<string, string> = {
  [PRODUCT_CATEGORIES.FERRO_ALLOY]: 'Ferro Alloys',
  [PRODUCT_CATEGORIES.NOBLE_ALLOY]: 'Noble Alloys',
  [PRODUCT_CATEGORIES.MINOR_METAL]: 'Minor Metals',
};

export const BLOG_CATEGORIES = [
  { value: 'market-insights', label: 'Market Insights' },
  { value: 'industry-news', label: 'Industry News' },
  { value: 'company-updates', label: 'Company Updates' },
  { value: 'technical-articles', label: 'Technical Articles' },
] as const;

export const ENQUIRY_TYPES = {
  PRODUCT: 'product',
  GENERAL: 'general',
  PARTNERSHIP: 'partnership',
} as const;

export const ENQUIRY_STATUS = {
  NEW: 'new',
  READ: 'read',
  REPLIED: 'replied',
  CLOSED: 'closed',
} as const;

export const DOCUMENT_TYPES = {
  COMPLIANCE: 'compliance',
  CERTIFICATION: 'certification',
  BROCHURE: 'brochure',
  MSDS: 'msds',
  SPECIFICATION: 'specification',
  OTHER: 'other',
} as const;

export const DOCUMENT_TYPE_LABELS = {
  [DOCUMENT_TYPES.COMPLIANCE]: 'Compliance Forms',
  [DOCUMENT_TYPES.CERTIFICATION]: 'Certifications',
  [DOCUMENT_TYPES.BROCHURE]: 'Brochures',
  [DOCUMENT_TYPES.MSDS]: 'MSDS',
  [DOCUMENT_TYPES.SPECIFICATION]: 'Specifications',
  [DOCUMENT_TYPES.OTHER]: 'Other Documents',
} as const;

export const TRUST_STATS = [
  { value: '30+', label: 'Countries Supplied' },
  { value: '500+', label: 'Shipments Delivered' },
  { value: '24', label: 'Products Traded' },
  { value: '100%', label: 'Quality Assured' },
] as const;

export const VALUE_PROPOSITIONS = [
  {
    title: 'Global Reach',
    description:
      'Connecting suppliers and buyers across 30+ countries with our extensive international network.',
    icon: 'globe',
  },
  {
    title: 'Quality Assured',
    description:
      'Rigorous quality control processes ensuring only premium materials reach our clients.',
    icon: 'shield-check',
  },
  {
    title: 'Industry Expertise',
    description:
      'Deep knowledge in noble alloys, ferro alloys, and minor metals trading.',
    icon: 'award',
  },
  {
    title: 'Reliable Supply',
    description:
      'Consistent, timely delivery backed by strong supplier relationships worldwide.',
    icon: 'truck',
  },
] as const;

// WhatsApp contacts for routing
export const WHATSAPP_CONTACTS: WhatsAppContact[] = [
  {
    name: 'Roman Adel',
    phone: '447508319271',
    label: 'Ferro Alloys',
  },
  {
    name: 'Ahmad Zarrien',
    phone: '971502069664',
    label: 'Noble Alloys',
  },
];

// Team members
export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Ahmad Zarrien',
    role: 'Trader – Noble Alloys',
    department: 'Trading',
  },
  {
    name: 'Roman Adel',
    role: 'Trader – Ferro Alloys',
    department: 'Trading',
  },
  {
    name: 'Maria Yatskiv',
    role: 'Supply Chain Manager',
    department: 'Operations',
  },
  {
    name: 'C. Ramakrishna',
    role: 'Supply Chain Associate',
    department: 'Operations',
  },
];

// Compliance documents
export const COMPLIANCE_DOCUMENTS: ComplianceDocument[] = [
  {
    id: '1',
    title: 'Code of Conduct',
    description:
      'Our comprehensive code of conduct outlining principles of professional integrity, respect, confidentiality, health and safety, and environmental responsibility.',
    fileName: '/documents/code-of-conduct.pdf',
    fileSize: '377 KB',
    category: 'compliance',
  },
  {
    id: '2',
    title: 'Anti-Corruption Program',
    description:
      'Our anti-corruption, anti-extortion, and anti-embezzlement program covering due diligence, internal controls, and reporting mechanisms.',
    fileName: '/documents/anti-corruption-program.pdf',
    fileSize: '126 KB',
    category: 'compliance',
  },
  {
    id: '3',
    title: 'Anti-Bribery Program',
    description:
      'Anti-bribery and conflict of interest program outlining our policies on gifts, conflicts, and ethical business conduct.',
    fileName: '/documents/anti-bribery-program.pdf',
    fileSize: '118 KB',
    category: 'compliance',
  },
  {
    id: '4',
    title: 'COSHH Compliance Plan',
    description:
      'Control of Substances Hazardous to Health compliance plan covering risk assessment, hazard control, safe handling, and employee training.',
    fileName: '/documents/coshh-compliance-plan.pdf',
    fileSize: '104 KB',
    category: 'compliance',
  },
  {
    id: '5',
    title: 'Modern Slavery & Human Trafficking Policy',
    description:
      'Our commitment to preventing modern slavery and human trafficking in our business and supply chains, with supplier due diligence and reporting mechanisms.',
    fileName: '/documents/modern-slavery-policy.pdf',
    fileSize: '337 KB',
    category: 'compliance',
  },
];

// Countries list for form dropdown
export const COUNTRIES = [
  'Afghanistan', 'Albania', 'Algeria', 'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan',
  'Bahrain', 'Bangladesh', 'Belarus', 'Belgium', 'Bolivia', 'Bosnia and Herzegovina', 'Brazil', 'Bulgaria',
  'Cambodia', 'Cameroon', 'Canada', 'Chile', 'China', 'Colombia', 'Congo', 'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic',
  'Denmark', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Estonia', 'Ethiopia',
  'Finland', 'France',
  'Georgia', 'Germany', 'Ghana', 'Greece', 'Guatemala',
  'Honduras', 'Hong Kong', 'Hungary',
  'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 'Ireland', 'Israel', 'Italy',
  'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kuwait', 'Kyrgyzstan',
  'Latvia', 'Lebanon', 'Libya', 'Lithuania', 'Luxembourg',
  'Malaysia', 'Mexico', 'Moldova', 'Mongolia', 'Morocco', 'Mozambique', 'Myanmar',
  'Nepal', 'Netherlands', 'New Zealand', 'Nigeria', 'North Macedonia', 'Norway',
  'Oman',
  'Pakistan', 'Panama', 'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal',
  'Qatar',
  'Romania', 'Russia', 'Rwanda',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Singapore', 'Slovakia', 'Slovenia', 'South Africa', 'South Korea', 'Spain', 'Sri Lanka', 'Sudan', 'Sweden', 'Switzerland', 'Syria',
  'Taiwan', 'Tajikistan', 'Tanzania', 'Thailand', 'Tunisia', 'Turkey', 'Turkmenistan',
  'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan',
  'Venezuela', 'Vietnam',
  'Yemen',
  'Zambia', 'Zimbabwe',
] as const;

// Delivery terms options
export const DELIVERY_TERMS = [
  'FOB', 'CIF', 'CFR', 'CIP', 'DAP', 'DDP', 'FCA', 'EXW',
] as const;

// How did you hear about us options
export const HOW_HEARD_OPTIONS = [
  'Search Engine (Google, Bing, etc.)',
  'LinkedIn',
  'Industry Event / Conference',
  'Referral / Word of Mouth',
  'MMTA Directory',
  'Trade Publication',
  'Other',
] as const;

// Product data
export const MOCK_PRODUCTS: Product[] = [
  // ======== FERRO ALLOYS ========
  {
    id: '1',
    name: 'Ferro Silicon',
    slug: 'ferro-silicon',
    category: 'ferro_alloy',
    shortDescription:
      'Premium ferro silicon for steel deoxidation, alloying, and casting applications.',
    image: '',
    specifications: {
      Si: '72–78%',
      Al: '1–2%',
      C: '0.1% max',
      Form: 'Lumps / Granules',
      Size: '10–100mm',
    },
    mmtaSpecs: {
      origin: 'China, Brazil, Norway, Russia',
      quality: 'FeSi 75% Standard Grade',
      form: 'Lumps, Granules',
      packaging: 'Big bags (1–1.5 MT) or drums',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [
      {
        name: 'Ferro-Silicon 75% Standard Grade',
        gradePercent: '75%',
        sizeMm: '10-60mm',
        carbonPercent: '0.1% max',
        purityPercent: '75% Si min',
        packaging: 'Big bags 1MT',
        origin: 'China / Brazil',
      },
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Ferro Chrome',
    slug: 'ferro-chrome',
    category: 'ferro_alloy',
    shortDescription:
      'High-carbon and low-carbon ferro chrome for stainless steel and alloy production.',
    image: '',
    specifications: {
      Cr: '60–70%',
      C: '4–10% (HC) / 0.1% max (LC)',
      Si: '1–3%',
      Form: 'Lumps',
      Size: '10–100mm',
    },
    mmtaSpecs: {
      origin: 'South Africa, India, Kazakhstan, Turkey',
      quality: 'High Carbon / Low Carbon / Medium Carbon grades',
      form: 'Lumps',
      packaging: 'Big bags (1–1.5 MT) or bulk',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate, Certificate of Origin',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [
      {
        name: 'Ferro-Chrome 60% High Carbon',
        gradePercent: '60%',
        sizeMm: '10-100mm',
        carbonPercent: '6-8%',
        purityPercent: '60% Cr min',
        packaging: 'Big bags 1MT',
        origin: 'South Africa / India',
      },
      {
        name: 'Ferro-Chrome 60% Low Carbon',
        gradePercent: '60%',
        sizeMm: '10-80mm',
        carbonPercent: '0.1% max',
        purityPercent: '60% Cr min',
        packaging: 'Big bags 1MT',
        origin: 'South Africa',
      },
      {
        name: 'Ferro-Chrome 65% High Carbon',
        gradePercent: '65%',
        sizeMm: '10-100mm',
        carbonPercent: '6-8%',
        purityPercent: '65% Cr min',
        packaging: 'Big bags 1MT',
        origin: 'South Africa / India',
      },
      {
        name: 'Ferro-Chrome 65% Medium Carbon',
        gradePercent: '65%',
        sizeMm: '10-80mm',
        carbonPercent: '1-4%',
        purityPercent: '65% Cr min',
        packaging: 'Big bags 1MT',
        origin: 'South Africa',
      },
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Ferro Manganese',
    slug: 'ferro-manganese',
    category: 'ferro_alloy',
    shortDescription:
      'High-quality ferro manganese for steel production and alloying across grades.',
    image: '',
    specifications: {
      Mn: '65–78%',
      C: '0.5–7%',
      Si: '1–2%',
      Form: 'Lumps',
      Size: '10–80mm',
    },
    mmtaSpecs: {
      origin: 'India, South Africa, China, Ukraine',
      quality: 'High Carbon / Medium Carbon / Low Carbon',
      form: 'Lumps',
      packaging: 'Big bags (1–1.5 MT)',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [
      {
        name: 'Ferro-Manganese (High Carbon)',
        gradePercent: '75%',
        sizeMm: '10-80mm',
        carbonPercent: '6-7%',
        purityPercent: '75% Mn min',
        packaging: 'Big bags 1MT',
        origin: 'India / South Africa',
      },
      {
        name: 'Ferro-Manganese (Medium Carbon)',
        gradePercent: '78%',
        sizeMm: '10-80mm',
        carbonPercent: '1-2%',
        purityPercent: '78% Mn min',
        packaging: 'Big bags 1MT',
        origin: 'India / China',
      },
      {
        name: 'Ferro-Manganese (Low Carbon)',
        gradePercent: '80%',
        sizeMm: '10-60mm',
        carbonPercent: '0.5% max',
        purityPercent: '80% Mn min',
        packaging: 'Big bags 1MT',
        origin: 'India',
      },
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Silico Manganese',
    slug: 'silico-manganese',
    category: 'ferro_alloy',
    shortDescription:
      'Combined silicon-manganese alloy for efficient steel production and deoxidation.',
    image: '',
    specifications: {
      Mn: '65–68%',
      Si: '16–21%',
      C: '2% max',
      Form: 'Lumps',
      Size: '10–80mm',
    },
    mmtaSpecs: {
      origin: 'India, Georgia, Ukraine, Malaysia',
      quality: 'SiMn 65/16 Standard',
      form: 'Lumps',
      packaging: 'Big bags (1–1.5 MT)',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Ferro Phosphorus',
    slug: 'ferro-phosphorus',
    category: 'ferro_alloy',
    shortDescription:
      'Ferro phosphorus used as a phosphorus additive in steelmaking and foundry applications.',
    image: '',
    specifications: {
      P: '23–28%',
      Si: '2–5%',
      Mn: '2–4%',
      Form: 'Lumps',
      Size: '10–50mm',
    },
    mmtaSpecs: {
      origin: 'China, India',
      quality: 'FeP 24% Standard',
      form: 'Lumps',
      packaging: 'Big bags or drums',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },

  // ======== NOBLE ALLOYS ========
  {
    id: '6',
    name: 'Ferro Molybdenum',
    slug: 'ferro-molybdenum',
    category: 'noble_alloy',
    shortDescription:
      'Ferro molybdenum for high-strength low-alloy steels and specialty applications.',
    image: '',
    specifications: {
      Mo: '60–70%',
      C: '0.1% max',
      Si: '1% max',
      Form: 'Lumps',
      Size: '10–50mm',
    },
    mmtaSpecs: {
      origin: 'China, Chile, Netherlands, Belgium',
      quality: 'FeMo 60% / FeMo 65%',
      form: 'Lumps',
      packaging: 'Drums (200–250 kg)',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate, Certificate of Origin',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [
      {
        name: 'Ferro-Molybdenum 60%',
        gradePercent: '60%',
        sizeMm: '10-50mm',
        carbonPercent: '0.1% max',
        purityPercent: '60% Mo min',
        packaging: 'Drums 250kg',
        origin: 'China / Chile',
      },
      {
        name: 'Ferro-Molybdenum 65%',
        gradePercent: '65%',
        sizeMm: '10-50mm',
        carbonPercent: '0.1% max',
        purityPercent: '65% Mo min',
        packaging: 'Drums 250kg',
        origin: 'Netherlands / Belgium',
      },
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '7',
    name: 'Ferro Vanadium',
    slug: 'ferro-vanadium',
    category: 'noble_alloy',
    shortDescription:
      'High-purity ferro vanadium for specialty and high-strength steel applications.',
    image: '',
    specifications: {
      V: '50–80%',
      C: '0.5% max',
      Si: '2% max',
      Form: 'Lumps',
      Size: '10–50mm',
    },
    mmtaSpecs: {
      origin: 'China, South Africa, Russia, Brazil',
      quality: 'FeV 50% / FeV 80%',
      form: 'Lumps',
      packaging: 'Drums (200–250 kg)',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '8',
    name: 'Ferro Titanium',
    slug: 'ferro-titanium',
    category: 'noble_alloy',
    shortDescription:
      'Ferro titanium for deoxidation and micro-alloying in steel production.',
    image: '',
    specifications: {
      Ti: '25–70%',
      Al: '5–10%',
      C: '0.1% max',
      Form: 'Lumps',
      Size: '10–50mm',
    },
    mmtaSpecs: {
      origin: 'UK, China, India',
      quality: 'FeTi 70% (Western) / Titanium Sponge',
      form: 'Lumps, Sponge',
      packaging: 'Drums or big bags',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [
      {
        name: 'Ferro-Titanium 70% (Western)',
        gradePercent: '70%',
        sizeMm: '10-50mm',
        carbonPercent: '0.1% max',
        purityPercent: '70% Ti min',
        packaging: 'Drums',
        origin: 'UK',
      },
      {
        name: 'Titanium (Sponge)',
        gradePercent: '99%+',
        sizeMm: '0.8-12.7mm',
        carbonPercent: '0.02% max',
        purityPercent: '99%+ Ti',
        packaging: 'Drums',
        origin: 'Japan / Kazakhstan',
      },
    ],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '9',
    name: 'Ferro Tungsten',
    slug: 'ferro-tungsten',
    category: 'noble_alloy',
    shortDescription:
      'Ferro tungsten for high-speed steels, tool steels, and wear-resistant alloys.',
    image: '',
    specifications: {
      W: '70–80%',
      C: '0.5% max',
      Mn: '0.5% max',
      Form: 'Lumps',
      Size: '10–50mm',
    },
    mmtaSpecs: {
      origin: 'China',
      quality: 'FeW 75% (Chinese)',
      form: 'Lumps',
      packaging: 'Drums',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [
      {
        name: 'Ferro-Tungsten (Chinese 75%)',
        gradePercent: '75%',
        sizeMm: '10-50mm',
        carbonPercent: '0.5% max',
        purityPercent: '75% W min',
        packaging: 'Drums',
        origin: 'China',
      },
    ],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '10',
    name: 'Ferro Niobium',
    slug: 'ferro-niobium',
    category: 'noble_alloy',
    shortDescription:
      'Ferro niobium for micro-alloying in HSLA steels and superalloy applications.',
    image: '',
    specifications: {
      Nb: '60–70%',
      C: '0.1% max',
      Si: '3% max',
      Form: 'Lumps',
      Size: '10–50mm',
    },
    mmtaSpecs: {
      origin: 'Brazil',
      quality: 'FeNb 66%',
      form: 'Lumps',
      packaging: 'Drums',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: true,
  },
  {
    id: '11',
    name: 'Ferro Boron',
    slug: 'ferro-boron',
    category: 'noble_alloy',
    shortDescription:
      'Ferro boron for hardening steel and improving mechanical properties.',
    image: '',
    specifications: {
      B: '17–20%',
      C: '0.5% max',
      Si: '2% max',
      Form: 'Lumps / Powder',
      Size: '10–50mm',
    },
    mmtaSpecs: {
      origin: 'China',
      quality: 'FeB 18%',
      form: 'Lumps, Powder',
      packaging: 'Drums or bags',
      lotSizeTolerance: 'As per contract',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },

  // ======== MINOR METALS ========
  {
    id: '12',
    name: 'Antimony',
    slug: 'antimony',
    category: 'minor_metal',
    shortDescription:
      'Antimony metal and trioxide for flame retardants, batteries, and alloys.',
    image: '',
    specifications: {
      Sb: '99.65%+',
      As: '0.1% max',
      Pb: '0.1% max',
      Form: 'Ingots',
    },
    mmtaSpecs: {
      origin: 'China, Tajikistan, Bolivia',
      form: 'Ingots',
      packaging: 'On pallets, banded',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '13',
    name: 'Chromium',
    slug: 'chromium',
    category: 'minor_metal',
    shortDescription:
      'Aluminothermic and electrolytic chromium metal for superalloys and aerospace applications.',
    image: '',
    specifications: {
      Cr: '99%+',
      Al: '0.5% max',
      Fe: '0.3% max',
      Form: 'Lumps / Powder',
    },
    mmtaSpecs: {
      origin: 'China, Russia',
      form: 'Lumps, Powder, Briquettes',
      packaging: 'Drums or big bags',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '14',
    name: 'Cobalt',
    slug: 'cobalt',
    category: 'minor_metal',
    shortDescription:
      'Cobalt metal for batteries, superalloys, and catalytic applications.',
    image: '',
    specifications: {
      Co: '99.8%+',
      Ni: '0.05% max',
      Fe: '0.01% max',
      Form: 'Cathodes / Briquettes',
    },
    mmtaSpecs: {
      origin: 'DRC, Zambia, Finland, China',
      form: 'Cathodes, Briquettes, Powder',
      packaging: 'Drums or on pallets',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '15',
    name: 'Hafnium',
    slug: 'hafnium',
    category: 'minor_metal',
    shortDescription:
      'Hafnium metal for nuclear, aerospace, and high-temperature applications.',
    image: '',
    specifications: {
      Hf: '97%+',
      Zr: '2.5% max',
      Fe: '0.1% max',
      Form: 'Crystal Bar / Sponge',
    },
    mmtaSpecs: {
      origin: 'France, USA',
      form: 'Crystal Bar, Sponge',
      packaging: 'Drums',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '16',
    name: 'Manganese',
    slug: 'manganese',
    category: 'minor_metal',
    shortDescription:
      'Electrolytic manganese metal for special alloys and steel production.',
    image: '',
    specifications: {
      Mn: '99.7%+',
      Fe: '0.01% max',
      Se: '0.01% max',
      Form: 'Flakes',
    },
    mmtaSpecs: {
      origin: 'China, South Africa',
      form: 'Flakes, Briquettes',
      packaging: 'Drums or big bags',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '17',
    name: 'Molybdenum',
    slug: 'molybdenum',
    category: 'minor_metal',
    shortDescription:
      'Molybdenum metal for high-temperature and high-strength alloy applications.',
    image: '',
    specifications: {
      Mo: '99.95%+',
      Fe: '0.01% max',
      O: '0.01% max',
      Form: 'Powder / Wire / Sheet',
    },
    mmtaSpecs: {
      origin: 'China, Chile, USA',
      form: 'Powder, Wire, Sheet, Rod',
      packaging: 'Drums or cases',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '18',
    name: 'Niobium (Colombium)',
    slug: 'niobium',
    category: 'minor_metal',
    shortDescription:
      'Niobium metal for superconductors, micro-alloying, and aerospace applications.',
    image: '',
    specifications: {
      Nb: '99.9%+',
      Ta: '0.1% max',
      Fe: '0.01% max',
      Form: 'Ingots / Powder',
    },
    mmtaSpecs: {
      origin: 'Brazil',
      form: 'Ingots, Powder, Strip',
      packaging: 'Drums or cases',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '19',
    name: 'Silicon',
    slug: 'silicon',
    category: 'minor_metal',
    shortDescription:
      'High-purity silicon metal for aluminium, chemical, and solar industries.',
    image: '',
    specifications: {
      Si: '99%+',
      Fe: '0.4% max',
      Al: '0.3% max',
      Form: 'Lumps',
      Size: '10–100mm',
    },
    mmtaSpecs: {
      origin: 'China, Brazil, Norway, France',
      form: 'Lumps',
      packaging: 'Big bags (1–1.5 MT)',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '20',
    name: 'Titanium',
    slug: 'titanium',
    category: 'minor_metal',
    shortDescription:
      'Titanium sponge and ingots for aerospace, medical, and industrial applications.',
    image: '',
    specifications: {
      Ti: '99.5%+',
      Fe: '0.15% max',
      O: '0.1% max',
      Form: 'Sponge / Ingots',
    },
    mmtaSpecs: {
      origin: 'Japan, Kazakhstan, Russia, China',
      form: 'Sponge, Ingots',
      packaging: 'Drums',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '21',
    name: 'Tungsten',
    slug: 'tungsten',
    category: 'minor_metal',
    shortDescription:
      'Tungsten metal for hard metals, lighting, electronics, and high-temperature applications.',
    image: '',
    specifications: {
      W: '99.95%+',
      Mo: '0.01% max',
      Fe: '0.01% max',
      Form: 'Powder / Wire / Rod',
    },
    mmtaSpecs: {
      origin: 'China, Vietnam, Russia',
      form: 'Powder, Wire, Rod, APT',
      packaging: 'Drums or cases',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '22',
    name: 'Vanadium',
    slug: 'vanadium',
    category: 'minor_metal',
    shortDescription:
      'Vanadium pentoxide and metal for steel micro-alloying and energy storage.',
    image: '',
    specifications: {
      V: '99.5%+',
      Fe: '0.05% max',
      Si: '0.05% max',
      Form: 'Flake / Powder',
    },
    mmtaSpecs: {
      origin: 'China, South Africa, Russia, Brazil',
      form: 'Flake, Powder, Pentoxide',
      packaging: 'Drums',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '23',
    name: 'Yttrium',
    slug: 'yttrium',
    category: 'minor_metal',
    shortDescription:
      'Yttrium metal for ceramics, phosphors, lasers, and superalloy applications.',
    image: '',
    specifications: {
      Y: '99.9%+',
      Fe: '0.01% max',
      Form: 'Lumps / Powder',
    },
    mmtaSpecs: {
      origin: 'China',
      form: 'Lumps, Powder, Oxide',
      packaging: 'Drums',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
  {
    id: '24',
    name: 'Zirconium',
    slug: 'zirconium',
    category: 'minor_metal',
    shortDescription:
      'Zirconium metal for nuclear, chemical processing, and corrosion-resistant applications.',
    image: '',
    specifications: {
      Zr: '99.5%+',
      Hf: '1% max',
      Fe: '0.1% max',
      Form: 'Sponge / Ingots',
    },
    mmtaSpecs: {
      origin: 'USA, France, China',
      form: 'Sponge, Ingots, Powder',
      packaging: 'Drums',
      documentation: 'Certificate of Analysis, Weight Certificate',
      weighingSampling: 'At loading port per industry standards',
    },
    grades: [],
    isActive: true,
    isFeatured: false,
  },
];

export const MOCK_BLOG_POSTS = [
  {
    id: '1',
    title: 'Global Ferro Alloys Market Outlook 2025',
    slug: 'global-ferro-alloys-market-outlook-2025',
    excerpt:
      'An analysis of key trends shaping the ferro alloys market and what to expect in the coming year.',
    category: 'market-insights',
    featuredImage: '/images/blog/market-outlook.jpg',
    publishedAt: '2025-01-15',
    author: 'ASZ Company FZCO',
  },
  {
    id: '2',
    title: 'Understanding Ferro Silicon Grades and Applications',
    slug: 'understanding-ferro-silicon-grades',
    excerpt:
      'A comprehensive guide to different ferro silicon grades and their industrial applications.',
    category: 'technical-articles',
    featuredImage: '/images/blog/ferro-silicon-guide.jpg',
    publishedAt: '2025-01-10',
    author: 'ASZ Company FZCO',
  },
  {
    id: '3',
    title: 'ASZ Company FZCO Joins the MMTA',
    slug: 'asz-joins-mmta',
    excerpt:
      'We are proud to announce our membership with the Minor Metals Trade Association.',
    category: 'company-updates',
    featuredImage: '/images/blog/expansion.jpg',
    publishedAt: '2025-01-05',
    author: 'ASZ Company FZCO',
  },
] as const;
