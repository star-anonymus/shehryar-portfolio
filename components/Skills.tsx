import AnimatedSection from "./AnimatedSection";
import {
  SiTypescript, SiJavascript, SiSharp, SiPython, SiDart,
  SiReact, SiNextdotjs, SiTailwindcss, SiFlutter, SiWordpress,
  SiDotnet, SiSpringboot, SiNodedotjs, SiNestjs,
  SiMysql, SiFirebase,
  SiGit, SiGithub, SiJira,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa";

const skillGroups = [
  {
    category: "Languages",
    color: "indigo",
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "C#", icon: SiSharp },
      { name: "Java", icon: FaJava },
      { name: "Python", icon: SiPython },
      { name: "Dart", icon: SiDart },
    ],
  },
  {
    category: "Frontend",
    color: "purple",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "WordPress", icon: SiWordpress },
    ],
  },
  {
    category: "Mobile",
    color: "pink",
    skills: [
      { name: "Flutter", icon: SiFlutter },
      { name: "Dart", icon: SiDart },
    ],
  },
  {
    category: "Backend",
    color: "indigo",
    skills: [
      { name: "NestJS", icon: SiNestjs },
      { name: "Node.js", icon: SiNodedotjs },
      { name: "ASP.NET", icon: SiDotnet },
      { name: "Spring Boot", icon: SiSpringboot },
    ],
  },
  {
    category: "Databases",
    color: "purple",
    skills: [
      { name: "SQL Server", icon: FaDatabase },
      { name: "MySQL", icon: SiMysql },
      { name: "Firebase", icon: SiFirebase },
    ],
  },
  {
    category: "Tools",
    color: "pink",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "GitHub", icon: SiGithub },
      { name: "JIRA", icon: SiJira },
    ],
  },
];

const colorMap: Record<string, { heading: string; card: string; icon: string }> = {
  indigo: {
    heading: "text-indigo-400",
    card: "hover:border-indigo-500/40 hover:bg-indigo-500/5",
    icon: "text-indigo-300 group-hover:text-indigo-200",
  },
  purple: {
    heading: "text-purple-400",
    card: "hover:border-purple-500/40 hover:bg-purple-500/5",
    icon: "text-purple-300 group-hover:text-purple-200",
  },
  pink: {
    heading: "text-pink-400",
    card: "hover:border-pink-500/40 hover:bg-pink-500/5",
    icon: "text-pink-300 group-hover:text-pink-200",
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 bg-white/[0.015]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <p className="text-indigo-400 text-sm font-semibold uppercase tracking-widest mb-3">
            Technical Stack
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-white">What I Work With</h2>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillGroups.map((group, gi) => {
            const c = colorMap[group.color];
            return (
              <AnimatedSection key={group.category} delay={gi * 0.08}>
                <div className={`h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6 transition-all duration-300 ${c.card}`}>
                  <h3 className={`text-xs font-bold uppercase tracking-widest mb-5 ${c.heading}`}>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {group.skills.map(({ name, icon: Icon }) => (
                      <div
                        key={name}
                        className="group flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/8 hover:border-white/15 hover:bg-white/10 transition-all duration-200 cursor-default"
                      >
                        <Icon size={15} className={`shrink-0 transition-colors duration-200 ${c.icon}`} />
                        <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors duration-200 font-medium">
                          {name}
                        </span>
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
