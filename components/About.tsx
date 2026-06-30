import { MapPin, GraduationCap, Briefcase } from "lucide-react";

const stats = [
  { label: "Years of Experience", value: "1+" },
  { label: "Projects Built", value: "15+" },
  { label: "Technologies", value: "20+" },
  { label: "CGPA", value: "2.98" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">About Me</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">Who I Am</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-5">
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm a <span className="text-white font-medium">Software Engineer</span> currently in my 7th
              semester of BS Software Engineering at{" "}
              <span className="text-indigo-400">Riphah International University, Islamabad</span>.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              I specialize in full-stack development — building everything from RESTful APIs and
              healthcare backends to Flutter mobile apps and React dashboards. I'm also experienced in
              QA processes, having worked as a{" "}
              <span className="text-white font-medium">QA Developer</span> at Authox and a{" "}
              <span className="text-white font-medium">QA Project Manager</span> at Corammers.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              I love clean architecture, secure system design, and delivering reliable software in
              collaborative team environments.
            </p>

            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin size={16} className="text-indigo-400 shrink-0" />
                <span>Islamabad, Pakistan</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <GraduationCap size={16} className="text-indigo-400 shrink-0" />
                <span>BS Software Engineering — Riphah International University (2022–2027)</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Briefcase size={16} className="text-indigo-400 shrink-0" />
                <span>Quality Assurance Developer @ Authox (Full-time)</span>
              </div>
            </div>
          </div>

          {/* Right: Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/8 bg-white/3 p-6 text-center card-hover"
              >
                <div className="text-4xl font-extrabold gradient-text mb-2">{s.value}</div>
                <div className="text-gray-500 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
