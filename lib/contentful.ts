import { 
  ContentfulSiteSettings, 
  ContentfulHeroSection,
  ContentfulServiceCard, 
  ContentfulProcessStep,
  ContentfulTestimonial
} from "@/types/contentful";

// Page response aggregation container
export interface HomePagePayload {
  hero: ContentfulHeroSection | null;
  services: ContentfulServiceCard[];
  process_steps: ContentfulProcessStep[];
  testimonials: ContentfulTestimonial[];
}

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

async function fetchContentful<T>(query: string): Promise<T> {
  if (!SPACE_ID || !ACCESS_TOKEN) {
    throw new Error("Missing Contentful environment variables configuration markers.");
  }

  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 }, 
    }
  );

  const json = await response.json();
  if (json.errors) {
    throw new Error(`Contentful GraphQL execution error: ${JSON.stringify(json.errors)}`);
  }
  return json.data as T;
}

export async function getSiteSettings(): Promise<ContentfulSiteSettings> {
  const query = `
    query {
      siteSettingsCollection(limit: 1) {
        items {
          companyName tagline phone email address fcaNumber
          googleReviewCount casesCompleted yearsExperience lenderCount
        }
      }
    }
  `;
  
  interface GraphQLSiteSettings {
    companyName: string; tagline: string; phone: string; email: string; address: string; fcaNumber: string;
    googleReviewCount: number; casesCompleted: number; yearsExperience: number; lenderCount: number;
  }

  const data = await fetchContentful<{ siteSettingsCollection: { items: GraphQLSiteSettings[] } }>(query);
  const raw = data.siteSettingsCollection.items[0];

  if (!raw) throw new Error("No SiteSettings entry found in Contentful space.");

  return {
    company_name: raw.companyName,
    tagline: raw.tagline,
    phone: raw.phone,
    email: raw.email,
    address: raw.address,
    fca_number: raw.fcaNumber,
    google_review_count: raw.googleReviewCount,
    cases_completed: raw.casesCompleted,
    years_experience: raw.yearsExperience,
    lender_count: raw.lenderCount
  };
}

export async function getHomePageData(): Promise<HomePagePayload> {
  const query = `
    query {
      heroSectionCollection(limit: 1) {
        items {
          headline subheadline ctaText ctaUrl
          image { url }
        }
      }
      serviceCardCollection(order: title_ASC) {
        items {
          title description icon ctaText ctaUrl
        }
      }
      processStepCollection(order: stepNumber_ASC) {
        items {
          stepNumber title description icon
        }
      }
      testimonialCollection {
        items {
          quote authorName area mortgageType starRating
        }
      }
    }
  `;

  interface GraphQLHomeResponse {
    heroSectionCollection: {
      items: Array<{ headline: string; subheadline: string; ctaText: string; ctaUrl: string; image?: { url: string } }>;
    };
    serviceCardCollection: {
      items: Array<{ title: string; description: string; icon: string; ctaText: string; ctaUrl: string }>;
    };
    processStepCollection: {
      items: Array<{ stepNumber: number; title: string; description: string; icon: string }>;
    };
    testimonialCollection: {
      items: Array<{ quote: string; authorName: string; area: string; mortgageType: string; starRating: number }>;
    };
  }

  const data = await fetchContentful<GraphQLHomeResponse>(query);
  const rawHero = data.heroSectionCollection.items[0];

  return {
    hero: rawHero ? {
      headline: rawHero.headline,
      subheadline: rawHero.subheadline,
      cta_text: rawHero.ctaText,
      cta_url: rawHero.ctaUrl,
      image_url: rawHero.image?.url || null
    } : null,

    services: data.serviceCardCollection.items.map(item => ({
      title: item.title,
      description: item.description,
      icon: item.icon,
      cta_text: item.ctaText,
      cta_url: item.ctaUrl
    })),

    process_steps: data.processStepCollection.items.map(item => ({
      step_number: item.stepNumber,
      title: item.title,
      description: item.description,
      icon: item.icon
    })),

    testimonials: data.testimonialCollection.items.map(item => ({
      quote: item.quote,
      author_name: item.authorName,
      area: item.area,
      mortgage_type: item.mortgageType,
      star_rating: item.starRating
    }))
  };
}