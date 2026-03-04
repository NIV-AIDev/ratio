import Container from "@/components/ui/container";
import Section from "@/components/ui/section";

type ContactSectionProps = {
  title: string;
  body: string;
  email: string;
  phone: string;
};

export default function ContactSection({
  title,
  body,
  email,
  phone,
}: ContactSectionProps) {
  return (
    <Section className="bg-[#1a1a18] py-24 text-white">
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.4em] text-white/60">
            Start a project
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
            {title}
          </h2>
          <p className="text-base leading-relaxed text-white/80">{body}</p>
          <div className="space-y-3 text-sm text-white/70">
            <p>General enquiries: {email}</p>
            <p>Studio line: {phone}</p>
          </div>
        </div>
        <form className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-8">
          <label className="text-[11px] uppercase tracking-[0.32em] text-white/60">
            Name
            <input
              type="text"
              name="name"
              className="mt-2 w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
              placeholder="Your full name"
            />
          </label>
          <label className="text-[11px] uppercase tracking-[0.32em] text-white/60">
            Email
            <input
              type="email"
              name="email"
              className="mt-2 w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
              placeholder="you@email.com"
            />
          </label>
          <label className="text-[11px] uppercase tracking-[0.32em] text-white/60">
            Message
            <textarea
              name="message"
              rows={5}
              className="mt-2 w-full rounded-2xl border border-white/20 bg-transparent px-4 py-3 text-sm text-white focus:border-white focus:outline-none"
              placeholder="Project scope, timeline, budget range"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-[#b6814b] px-6 py-3 text-[11px] uppercase tracking-[0.32em] text-[#1a1a18] transition duration-300 hover:bg-[#9c6b3f]"
          >
            Send enquiry
          </button>
        </form>
      </Container>
    </Section>
  );
}
