/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "ts-api-for-ecomm-product.onrender.com",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
      "i.pinimg.com",
      "wallpapercave.com",
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
