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
          company_name
          tagline
          phone
          email
          address
          fca_number
          google_review_count
          cases_completed
          years_experience
          lender_count
        }
      }
    }
  `;
  const data = await fetchContentful<{ siteSettingsCollection: { items: ContentfulSiteSettings[] } }>(query);
  return data.siteSettingsCollection.items[0];
}