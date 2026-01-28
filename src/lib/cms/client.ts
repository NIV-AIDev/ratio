import { createClient } from "@sanity/client";

type SanityConfig = {
  projectId?: string;
  dataset?: string;
  apiVersion: string;
  useCdn: boolean;
  token?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";
const token = process.env.SANITY_API_TOKEN;

export const sanityConfig: SanityConfig = {
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "production" && !token,
  token,
};

export const sanityClient = createClient(sanityConfig);

export const ensureSanityConfig = () => {
  if (!projectId || !dataset) {
    throw new Error(
      "Missing Sanity environment variables. Check NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.",
    );
  }
};
