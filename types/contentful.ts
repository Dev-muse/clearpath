export interface ContentfulAsset {
  sys: { id: string };
  url: string;
  title: string;
  width?: number;
  height?: number;
}

export interface ContentfulPage {
  title: string;
  slug: string;
  seo_title: string;
  seo_description: string;
  og_image: ContentfulAsset | null;
}

export interface ContentfulSiteSettings {
  company_name: string;
  tagline: string;
  phone: string;
  email: string;
  address: string;
  fca_number: string;
  google_review_count: number;
  cases_completed: number;
  years_experience: number;
  lender_count: number;
}

export interface ContentfulHeroSection {
  headline: string;
  subheadline: string;
  cta_text: string;
  cta_url: string;
  image_url: string | null;
}

export interface ContentfulServiceCard {
  title: string;
  description: string;
  icon: string;
  cta_text: string;
  cta_url: string;
  feature_badge?: string;
  sub_features?: string[];
}

export interface ContentfulProcessStep {
  step_number: number;
  title: string;
  description: string;
  icon: string;
  bullet_points?: string[];
}

export interface ContentfulTimelineMilestone {
  label: string;
  title: string;
  description: string;
  sort_order: number;
}

export interface ContentfulTestimonial {
  quote: string;
  author_name: string;
  area: string;
  mortgage_type: string;
  star_rating: number;
}

export interface ContentfulFaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface ContentfulTeamMember {
  name: string;
  role: string;
  bio: string;
  photo: ContentfulAsset | null;
  qualifications: string;
}