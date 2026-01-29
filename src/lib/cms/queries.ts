import { ensureSanityConfig, sanityClient } from "./client";
import type { PageMetadata, Project, Service, Testimonial } from "./types";

const fetchFromSanity = async <T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> => {
  ensureSanityConfig();
  return sanityClient.fetch<T>(query, params);
};

const serviceFields = [
  "_id",
  "title",
  "\"slug\": slug.current",
  "summary",
  "tags",
  "body",
].join(", ");

const projectFields = [
  "_id",
  "title",
  "\"slug\": slug.current",
  "summary",
  "status",
  "disciplines",
  "body",
].join(", ");

const testimonialFields = [
  "_id",
  "quote",
  "authorName",
  "authorRole",
  "organization",
].join(", ");

const pageMetadataFields = [
  "_id",
  "title",
  "\"slug\": slug.current",
  "description",
  "\"ogImageUrl\": ogImage.asset->url",
  "includeLocalBusinessJsonLd",
].join(", ");

export const servicesQuery = `*[_type == "service"]|order(title asc){${serviceFields}}`;
export const projectsQuery = `*[_type == "project"]|order(title asc){${projectFields}}`;
export const testimonialsQuery = `*[_type == "testimonial"]|order(_createdAt desc){${testimonialFields}}`;
export const pageMetadataQuery = `*[_type == "pageMetadata" && slug.current == $slug][0]{${pageMetadataFields}}`;

export const fetchServices = () =>
  fetchFromSanity<Service[]>(servicesQuery);

export const fetchProjects = () =>
  fetchFromSanity<Project[]>(projectsQuery);

export const fetchTestimonials = () =>
  fetchFromSanity<Testimonial[]>(testimonialsQuery);

export const fetchPageMetadata = (slug: string) =>
  fetchFromSanity<PageMetadata | null>(pageMetadataQuery, { slug });
