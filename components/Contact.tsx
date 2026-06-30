import { Mail, Phone, MapPin } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import AnimatedSection from "./AnimatedSection";

const contactItems = [
  { icon: Mail, label: "Email", value: "ahmedshehryar645@gmail.com", href: "mailto:ahmedshehryar645@gmail.com", color: "pink" },
  { icon: Phone, label: "Phone", value: "+92 335 7089076", href: "tel:+923357089076", color: "indigo" },
  { icon: FiLinkedin, label: "LinkedIn", value: "shehryar-ahmed-93834026b", href: "https://linkedin.com/in/shehryar-ahmed-93834026b", color: "blue" },
  { icon: FiGithub, label: "GitHub", value: "star-anonymus", href: "https://github.com/star-anonymus", color: "purple" },
  { icon: MapPin, label: "Location", value: "Islamabad, Pakistan", href: null, color: "green" },
];

const colorMap: Record<string, string> = {
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20 group-hover:bg-pink-500/20",
  indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/20",
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20 group-hover:bg-purple-500/20",
  green: "text-green-400 bg-green-500/10 border-green-500/20 group-hover:bg-green-500/20",
};

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-white/[0.015]">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Contact Me</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Open to full-time roles, freelance work, and collaborations. I usually respond within 24 hours.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const iconClass = colorMap[item.color];
            const card = (
              <div className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5 hover:border-white/15 hover:bg-white/5 transition-all duration-200 hover:-translate-y-0.5">
                <div className={`w-11 h-11 rounded-xl border flex items-center justify-center shrink-0 transition-colors duration-200 ${iconClass}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                  <p className="text-white text-sm font-medium break-all">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <AnimatedSection key={item.label} delay={i * 0.08}>
                <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                  {card}
                </a>
              </AnimatedSection>
            ) : (
              <AnimatedSection key={item.label} delay={i * 0.08}>
                {card}
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center">
          <a
            href="mailto:ahmedshehryar645@gmail.com"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg transition-all duration-200 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-500/35 hover:-translate-y-0.5"
          >
            <Mail size={20} />
            Send Me an Email
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
