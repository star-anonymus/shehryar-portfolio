import { Award } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const certs = [
  { name: "Networking Basics", issuer: "Cisco", date: "Apr 2025", color: "indigo" },
  { name: "Python Essentials 2", issuer: "Cisco", date: "Dec 2024", color: "purple" },
  { name: "JavaScript Essentials 2", issuer: "Cisco", date: "Dec 2024", color: "pink" },
  { name: "Engaging Stakeholders for Success", issuer: "Cisco", date: "Oct 2024", color: "indigo" },
];

const colorMap: Record<string, { border: string; icon: string; badge: string }> = {
  indigo: { border: "border-indigo-100 hover:border-indigo-200 hover:shadow-indigo-100/60", icon: "text-indigo-500 bg-indigo-50", badge: "bg-indigo-50 text-indigo-700" },
  purple: { border: "border-purple-100 hover:border-purple-200 hover:shadow-purple-100/60", icon: "text-purple-500 bg-purple-50", badge: "bg-purple-50 text-purple-700" },
  pink:   { border: "border-pink-100 hover:border-pink-200 hover:shadow-pink-100/60",   icon: "text-pink-500 bg-pink-50",   badge: "bg-pink-50 text-pink-700" },
};

export default function Certifications() {
  return (
    <section className="py-20 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">Credentials</p>
          <h2 className="text-4xl font-extrabold text-slate-900">Certifications</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((c, i) => {
            const colors = colorMap[c.color];
            return (
              <AnimatedSection key={c.name} delay={i * 0.1}>
                <div className={`rounded-2xl border bg-white p-5 flex flex-col gap-4 transition-all duration-300 card-shadow ${colors.border}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colors.icon}`}>
                    <Award size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900 text-sm leading-snug">{c.name}</p>
                    <p className="text-slate-400 text-xs mt-1">{c.issuer}</p>
                  </div>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full self-start ${colors.badge}`}>{c.date}</span>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
