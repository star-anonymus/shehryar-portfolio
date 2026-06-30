const skillGroups = [
  {
    category: "Languages",
    color: "indigo",
    skills: ["TypeScript", "JavaScript", "C#", "Java", "Python", "Dart", "SQL"],
  },
  {
    category: "Frontend",
    color: "purple",
    skills: ["React", "Next.js", "HTML/CSS", "Tailwind CSS", "WordPress Elementor"],
  },
  {
    category: "Mobile",
    color: "pink",
    skills: ["Flutter", "Dart"],
  },
  {
    category: "Backend",
    color: "indigo",
    skills: ["Node.js", "NestJS", "ASP.NET MVC", ".NET Framework", "Spring Boot", "Python"],
  },
  {
    category: "Databases",
    color: "purple",
    skills: ["SQL Server", "MySQL", "Firebase"],
  },
  {
    category: "Tools & QA",
    color: "pink",
    skills: ["Git", "GitHub", "JIRA", "Twilio", "SMTP", "WPF", "Unit Testing", "UAT", "Debugging"],
  },
];

const colorMap: Record<string, string> = {
  indigo: "border-indigo-500/20 bg-indigo-500/10 text-indigo-300",
  purple: "border-purple-500/20 bg-purple-500/10 text-purple-300",
  pink: "border-pink-500/20 bg-pink-500/10 text-pink-300",
};

const headingMap: Record<string, string> = {
  indigo: "text-indigo-400",
  purple: "text-purple-400",
  pink: "text-pink-400",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 bg-white/[0.02]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Technical Skills
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">What I Work With</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl border border-white/8 bg-white/3 p-6 card-hover"
            >
              <h3 className={`text-sm font-semibold uppercase tracking-widest mb-4 ${headingMap[group.color]}`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${colorMap[group.color]}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
