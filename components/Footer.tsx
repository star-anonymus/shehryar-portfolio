import { Mail } from "lucide-react";
import { FiGithub, FiLinkedin } from "react-icons/fi";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-slate-50 py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl font-extrabold gradient-text">SA.</span>
          <span className="text-slate-400 text-sm">© {new Date().getFullYear()} Shehryar Ahmed. All rights reserved.</span>
        </div>
        <div className="flex items-center gap-5">
          <a href="https://github.com/star-anonymus" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900 transition-colors" aria-label="GitHub">
            <FiGithub size={18} />
          </a>
          <a href="https://linkedin.com/in/shehryar-ahmed-93834026b" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
            <FiLinkedin size={18} />
          </a>
          <a href="mailto:ahmedshehryar645@gmail.com" className="text-slate-400 hover:text-indigo-600 transition-colors" aria-label="Email">
            <Mail size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
