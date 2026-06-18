import { 
  ContentfulSiteSettings, 
  ContentfulPage, 
  ContentfulServiceCard, 
  ContentfulTestimonial,
  ContentfulProcessStep,
  ContentfulTimelineMilestone,
  ContentfulFaqItem,
  ContentfulTeamMember
} from "@/types/contentful";

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
          companyName
          tagline
          phone
          email
          address
          fcaNumber
          googleReviewCount
          casesCompleted
          yearsExperience
          lenderCount
        }
      }
    }
  `;
  
  interface GraphQLSiteSettings {
    companyName: string;
    tagline: string;
    phone: string;
    email: string;
    address: string;
    fcaNumber: string;
    googleReviewCount: number;
    casesCompleted: number;
    yearsExperience: number;
    lenderCount: number;
  }

  const data = await fetchContentful<{ siteSettingsCollection: { items: GraphQLSiteSettings[] } }>(query);
  const raw = data.siteSettingsCollection.items[0];

  if (!raw) {
    throw new Error("No SiteSettings entry found in Contentful space.");
  }

  // Safely map the API camelCase variables directly back onto our application types
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