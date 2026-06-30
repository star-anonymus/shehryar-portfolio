import { Award, ExternalLink } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const certs = [
  { name: "Networking Basics", issuer: "Cisco", date: "Apr 2025", color: "indigo" },
  { name: "Python Essentials 2", issuer: "Cisco", date: "Dec 2024", color: "purple" },
  { name: "JavaScript Essentials 2", issuer: "Cisco", date: "Dec 2024", color: "pink" },
  { name: "Engaging Stakeholders for Success", issuer: "Cisco", date: "Oct 2024", color: "indigo" },
];

const colorMap: Record<string, { border: string; icon: string; badge: string }> = {
  indigo: {
    border: "border-indigo-500/20 hover:border-indigo-500/40",
    icon: "text-indigo-400",
    badge: "bg-indigo-500/10 text-indigo-300",
  },
  purple: {
    border: "border-purple-500/20 hover:border-purple-500/40",
    icon: "text-purple-400",
    badge: "bg-purple-500/10 text-purple-300",
  },
  pink: {
    border: "border-pink-500/20 hover:border-pink-500/40",
    icon: "text-pink-400",
    badge: "bg-pink-500/10 text-pink-300",
  },
};

export default function Certifications() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">Credentials</p>
          <h2 className="text-4xl font-bold text-white">Certifications</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((c, i) => {
            const colors = colorMap[c.color];
            return (
              <AnimatedSection key={c.name} delay={i * 0.1}>
                <div className={`rounded-2xl border bg-white/[0.02] p-5 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${colors.border}`}>
                  <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${colors.icon}`}>
                    <Award size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white text-sm leading-snug">{c.name}</p>
                    <p className="text-gray-500 text-xs mt-1">{c.issuer}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colors.badge}`}>
                      {c.date}
                    </span>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
