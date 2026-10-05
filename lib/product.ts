/** The product I build and sell — shown as its own section on the home page. */
export const leadGenerator = {
  name: "ClientoraHQ",
  url: "https://clientorahq.com",
  demoUrl: "https://clientorahq.com/#demo",
  pricingUrl: "https://clientorahq.com/#pricing",
  slug: "clientorahq",
  tagline: "An AI desk for Windows that finds clients, projects and jobs — and writes every message for you.",
  price: "From $400 one-time",
  trial: "14-day trial · $50",
  /** Each screen of the app, cycled in the showcase window. */
  screens: [
    { src: "/products/slg/command.webp", label: "Command", caption: "Ghulam, the assistant — speak or type in English or Roman Urdu" },
    { src: "/products/slg/client-hunt.webp", label: "Client Hunt", caption: "AI turns what you sell into the searches real buyers use" },
    { src: "/products/slg/review.webp", label: "Review", caption: "Every lead scored, with the reason and the message already written" },
    { src: "/products/slg/local-biz.webp", label: "Local Biz", caption: "Businesses with no website — and an honest audit of the weak ones" },
    { src: "/products/slg/freelance.webp", label: "Freelance", caption: "Freelancer.com projects scored for your skills, bids drafted" },
    { src: "/products/slg/posts.webp", label: "Posts", caption: "This week's trends turned into LinkedIn posts, with an image" },
  ],
  features: [
    { title: "Client Hunt", text: "People on LinkedIn & Instagram who want to hire right now — nobody else." },
    { title: "Local Biz", text: "Businesses with no website, plus honest audits and the email to send." },
    { title: "Freelance & Jobs", text: "Projects and remote jobs scored for you, with bids and CVs ready." },
    { title: "Inbox & WhatsApp", text: "Replies drafted; WhatsApp opens pre-typed and you press Send." },
  ],
  numbers: [
    { value: 93, suffix: "", label: "local businesses found in one search" },
    { value: 62, suffix: "", label: "of them had no website" },
    { value: 36, suffix: "", label: "freelance projects scored in one run" },
  ],
  stack: ["Electron", "TypeScript", "Chrome MV3", "Claude API", "Gemini", "SQLite"],
} as const;
