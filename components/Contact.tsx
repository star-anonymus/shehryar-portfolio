import { Mail, MapPin, Phone } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Magnetic from "./ui/Magnetic";
import Reveal from "./ui/Reveal";
import SectionHeading from "./ui/SectionHeading";
import SpotlightCard from "./ui/SpotlightCard";
import { site } from "@/lib/site";

const items = [
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
    accent: "text-indigo-300 border-indigo-400/25 bg-indigo-500/10",
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
    accent: "text-violet-300 border-violet-400/25 bg-violet-500/10",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: site.socials.linkedinHandle,
    href: site.socials.linkedin,
    accent: "text-sky-300 border-sky-400/25 bg-sky-500/10",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: site.socials.githubUser,
    href: site.socials.github,
    accent: "text-cyan-300 border-cyan-400/25 bg-cyan-500/10",
  },
  {
    icon: MapPin,
    label: "Location",
    value: site.location,
    href: null,
    accent: "text-rose-300 border-rose-400/25 bg-rose-500/10",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-6 py-28 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 mx-auto h-[30rem] max-w-3xl rounded-full blur-[150px]"
        style={{
          background: "radial-gradient(ellipse, rgba(99,102,241,0.18) 0%, rgba(0,0,0,0) 70%)",
        }}
      />

      <div className="mx-auto max-w-4xl">
        <SectionHeading
          kicker="Get in touch"
          title="Let's build something"
          description="Open to full-time roles, freelance work, and collaborations. The fastest way to reach me is email — I answer within a day."
        />

        <div className="mb-10 grid gap-4 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            const card = (
              <SpotlightCard className="flex h-full items-center gap-4 rounded-2xl p-5">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${item.accent}`}
                >
                  <Icon size={18} />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-fog">
                    {item.label}
                  </p>
                  <p className="mt-1 truncate text-sm font-semibold text-mist">{item.value}</p>
                </div>
              </SpotlightCard>
            );

            return (
              <Reveal key={item.label} delay={i * 0.07} blur={false}>
                {item.href ? (
                  <a
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </Reveal>
            );
          })}
        </div>

        <Reveal className="text-center">
          <Magnetic strength={14}>
            <a
              href={`mailto:${site.email}`}
              className="glow-iris inline-flex items-center gap-2.5 rounded-2xl bg-indigo-600 px-9 py-4 font-display text-lg font-bold text-white transition-colors hover:bg-indigo-500"
            >
              <Mail size={20} />
              Send me an email
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
