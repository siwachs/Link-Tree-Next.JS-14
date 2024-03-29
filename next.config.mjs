/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.googleusercontent.com" },
      {
        protocol: "https",
        hostname: "linktree-clone-next14.s3.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
