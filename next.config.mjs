/** @type {import('next').NextConfig} */
const nextConfig = {
  // ESLint est géré par le job "lint" dédié dans le workflow CI.
  // Désactiver ici évite une double exécution et des échecs de build
  // liés à ESLint quand le job lint est déjà passé.
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
  },
};

export default nextConfig;
