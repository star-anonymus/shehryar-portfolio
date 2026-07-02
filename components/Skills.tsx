import AnimatedSection from "./AnimatedSection";
import {
  SiTypescript, SiJavascript, SiSharp, SiPython, SiDart,
  SiReact, SiNextdotjs, SiTailwindcss, SiFlutter, SiWordpress,
  SiDotnet, SiSpringboot, SiNodedotjs, SiNestjs,
  SiMysql, SiFirebase, SiGit, SiGithub, SiJira,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";

const skillGroups = [
  {
    category: "Languages", color: "indigo",
    skills: [
      { name: "TypeScript", icon: SiTypescript }, { name: "JavaScript", icon: SiJavascript },
      { name: "C#", icon: SiSharp }, { name: "Java", icon: FaJava },
      { name: "Python", icon: SiPython }, { name: "Dart", icon: SiDart },
    ],
  },
  {
    category: "Frontend", color: "purple",
    skills: [
      { name: "React", icon: SiReact }, { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss }, { name: "WordPress", icon: SiWordpress },
    ],
  },
  {
    category: "Mobile", color: "pink",
    skills: [{ name: "Flutter", icon: SiFlutter }, { name: "Dart", icon: SiDart }],
  },
  {
    category: "Backend", color: "indigo",
    skills: [
      { name: "NestJS", icon: SiNestjs }, { name: "Node.js", icon: SiNodedotjs },
      { name: "ASP.NET", icon: SiDotnet }, { name: "Spring Boot", icon: SiSpringboot },
    ],
  },
  {
    category: "Databases", color: "purple",
    skills: [{ name: "SQL Server", icon: FaDatabase }, { name: "MySQL", icon: SiMysql }, { name: "Firebase", icon: SiFirebase }],
  },
  {
    category: "Tools", color: "pink",
    skills: [{ name: "Git", icon: SiGit }, { name: "GitHub", icon: SiGithub }, { name: "JIRA", icon: SiJira }],
  },
];

const colorMap: Record<string, { heading: string; border: string; icon: string; pill: string }> = {
  indigo: { heading: "text-indigo-600", border: "hover:border-indigo-200 hover:shadow-indigo-100/80", icon: "text-indigo-500", pill: "bg-indigo-50 border-indigo-100 hover:bg-indigo-100" },
  purple: { heading: "text-purple-600", border: "hover:border-purple-200 hover:shadow-purple-100/80", icon: "text-purple-500", pill: "bg-purple-50 border-purple-100 hover:bg-purple-100" },
  pink:   { heading: "text-pink-600",   border: "hover:border-pink-200 hover:shadow-pink-100/80",   icon: "text-pink-500",   pill: "bg-pink-50 border-pink-100 hover:bg-pink-100" },
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 section-alt">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-600 text-sm font-bold uppercase tracking-widest mb-3">Technical Stack</p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900">What I Work With</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => {
            const c = colorMap[group.color];
            return (
              <AnimatedSection key={group.category} delay={gi * 0.08}>
                <div className={`h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 card-shadow ${c.border}`}>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-5 ${c.heading}`}>{group.category}</h3>
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map(({ name, icon: Icon }) => (
                      <div key={name} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-slate-600 hover:text-slate-900 transition-all duration-200 cursor-default text-xs font-medium ${c.pill}`}>
                        <Icon size={14} className={`shrink-0 ${c.icon}`} />
                        {name}
                      </div>
                    ))}
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
