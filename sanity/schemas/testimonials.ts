const testimonials = {
  name: "testimonial",
  title: "Testimonials",
  type: "document",
  fields: [
    {
      name: "quote",
      title: "Quote",
      type: "text",
      rows: 3,
      validation: (rule: { required: () => unknown }) => rule.required(),
    },
    {
      name: "authorName",
      title: "Author name",
      type: "string",
    },
    {
      name: "authorRole",
      title: "Author role",
      type: "string",
    },
    {
      name: "organization",
      title: "Organization",
      type: "string",
    },
  ],
};

export default testimonials;
