import { Award } from "lucide-react";

const certs = [
  { name: "Networking Basics", issuer: "Cisco", date: "Apr 2025", color: "indigo" },
  { name: "Python Essentials 2", issuer: "Cisco", date: "Dec 2024", color: "purple" },
  { name: "JavaScript Essentials 2", issuer: "Cisco", date: "Dec 2024", color: "pink" },
  { name: "Engaging Stakeholders for Success", issuer: "Cisco", date: "Oct 2024", color: "indigo" },
];

const colorMap: Record<string, string> = {
  indigo: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  pink: "text-pink-400 bg-pink-500/10 border-pink-500/20",
};

export default function Certifications() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Certifications
          </p>
          <h2 className="text-4xl font-bold text-white">Credentials</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {certs.map((c) => (
            <div
              key={c.name}
              className={`rounded-2xl border p-5 flex flex-col gap-3 card-hover ${colorMap[c.color]}`}
            >
              <Award size={20} />
              <div>
                <p className="font-semibold text-white text-sm">{c.name}</p>
                <p className="text-gray-500 text-xs mt-1">
                  {c.issuer} · {c.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
