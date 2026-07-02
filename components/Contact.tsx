import { Mail, Phone, MapPin } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import AnimatedSection from "./AnimatedSection";

const contactItems = [
  { icon: Mail,        label: "Email",    value: "ahmedshehryar645@gmail.com", href: "mailto:ahmedshehryar645@gmail.com", color: "indigo" },
  { icon: Phone,       label: "Phone",    value: "+92 335 7089076",             href: "tel:+923357089076",                 color: "purple" },
  { icon: FiLinkedin,  label: "LinkedIn", value: "shehryar-ahmed-93834026b",   href: "https://linkedin.com/in/shehryar-ahmed-93834026b", color: "blue" },
  { icon: FiGithub,    label: "GitHub",   value: "star-anonymus",              href: "https://github.com/star-anonymus", color: "slate" },
  { icon: MapPin,      label: "Location", value: "Islamabad, Pakistan",         href: null,                                color: "pink" },
];

const colorMap: Record<string, string> = {
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-100",
  purple: "bg-purple-50 text-purple-600 border-purple-100",
  blue:   "bg-blue-50 text-blue-600 border-blue-100",
  slate:  "bg-slate-50 text-slate-600 border-slate-200",
  pink:   "bg-pink-50 text-pink-600 border-pink-100",
};

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 bg-white">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">Get In Touch</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">Contact Me</h2>
          <p className="text-slate-500 mt-4 max-w-lg mx-auto leading-relaxed">
            Open to full-time roles, freelance work, and collaborations. Let&apos;s build something great together.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contactItems.map((item, i) => {
            const Icon = item.icon;
            const iconClass = colorMap[item.color];
            const content = (
              <AnimatedSection delay={i * 0.08}>
                <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 card-shadow hover:border-indigo-200 group transition-all duration-300">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${iconClass}`}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs mb-0.5 font-medium">{item.label}</p>
                    <p className="text-slate-800 text-sm font-semibold group-hover:text-indigo-600 transition-colors">{item.value}</p>
                  </div>
                </div>
              </AnimatedSection>
            );
            return item.href ? (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{content}</a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        <AnimatedSection className="text-center">
          <a href="mailto:ahmedshehryar645@gmail.com"
            className="inline-flex items-center gap-2 px-10 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg transition-all duration-200 shadow-xl shadow-indigo-600/25 hover:shadow-indigo-600/35 hover:-translate-y-0.5">
            <Mail size={22} />
            Send Me an Email
          </a>
        </AnimatedSection>
      </div>
    </section>
  );
}
