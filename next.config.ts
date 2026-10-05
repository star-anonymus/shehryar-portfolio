import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The product was renamed from Shehryar Lead Generator to ClientoraHQ — keep old links working
  async redirects() {
    return ["shehryar-lead-generator", "clientora"].map((old) => ({ source: `/projects/${old}`, destination: "/projects/clientorahq", permanent: true }));
  },
};

export default nextConfig;
