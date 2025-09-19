import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'lh3.googleusercontent.com', // Google profile images
      'avatars.githubusercontent.com', // GitHub avatars
      'pbs.twimg.com', 
      'upload.wikimedia.org'// Twitter avatars
    ],
  },
  
};

export default nextConfig;
