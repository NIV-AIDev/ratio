const pageMetadata = {
  name: "pageMetadata",
  title: "Page Metadata",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    },
    {
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
    },
    {
      name: "includeLocalBusinessJsonLd",
      title: "Include LocalBusiness JSON-LD",
      type: "boolean",
      initialValue: false,
    },
  ],
};

export default pageMetadata;
