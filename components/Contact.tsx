import { Mail, Phone, MapPin } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "ahmedshehryar645@gmail.com",
    href: "mailto:ahmedshehryar645@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 335 7089076",
    href: "tel:+923357089076",
  },
  {
    icon: FiLinkedin,
    label: "LinkedIn",
    value: "shehryar-ahmed-93834026b",
    href: "https://linkedin.com/in/shehryar-ahmed-93834026b",
  },
  {
    icon: FiGithub,
    label: "GitHub",
    value: "star-anonymus",
    href: "https://github.com/star-anonymus",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Islamabad, Pakistan",
    href: null,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Get In Touch
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Contact Me</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">
            Open to full-time roles, freelance work, and collaborations. Feel free to reach out!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {contactItems.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/3 p-5 card-hover group">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-0.5">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="mailto:ahmedshehryar645@gmail.com"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-lg transition-all duration-200 shadow-lg shadow-indigo-600/25"
          >
            <Mail size={20} />
            Send Me an Email
          </a>
        </div>
      </div>
    </section>
  );
}
