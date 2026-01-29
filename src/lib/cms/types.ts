export type Service = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  tags?: string[];
  body?: unknown[];
};

export type Project = {
  _id: string;
  title: string;
  slug: string;
  summary?: string;
  status?: string;
  disciplines?: string[];
  body?: unknown[];
};

export type PageMetadata = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  ogImageUrl?: string;
  includeLocalBusinessJsonLd?: boolean;
};

export type Testimonial = {
  _id: string;
  quote: string;
  authorName?: string;
  authorRole?: string;
  organization?: string;
};
