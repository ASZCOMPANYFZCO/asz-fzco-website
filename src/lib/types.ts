// Product types
export interface MMTASpecs {
  origin?: string;
  tariffNo?: string;
  quality?: string;
  form?: string;
  packaging?: string;
  lotSizeTolerance?: string;
  documentation?: string;
  weighingSampling?: string;
}

export interface ProductGrade {
  name: string;
  gradePercent?: string;
  sizeMm?: string;
  carbonPercent?: string;
  purityPercent?: string;
  packaging?: string;
  origin?: string;
}

export type ProductCategory = 'ferro_alloy' | 'noble_alloy' | 'minor_metal' | 'other';

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: ProductCategory;
  shortDescription: string;
  image?: string;
  images?: string[];
  specifications: Record<string, string>;
  mmtaSpecs?: MMTASpecs;
  grades?: ProductGrade[];
  isActive: boolean;
  isFeatured: boolean;
}

// Team
export interface TeamMember {
  name: string;
  role: string;
  department?: string;
  bio?: string;
  image?: string;
}

// Compliance
export interface ComplianceDocument {
  id: string;
  title: string;
  description: string;
  fileName: string;
  fileSize: string;
  category: string;
}

// Contact / Quote form
export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  products: string[];
  quantity?: string;
  sizing?: string;
  packing?: string;
  deliveryTerms?: string;
  preferredDeliveryDate?: string;
  howHeard?: string;
  additionalNotes?: string;
}

// WhatsApp contact routing
export interface WhatsAppContact {
  name: string;
  phone: string;
  label: string;
}

// Blog post
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  category: string;
  featuredImage?: string;
  publishedAt: string;
  author: {
    name: string;
    avatar?: string;
  };
}
