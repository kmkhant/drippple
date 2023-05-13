/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	images: {
		domains: ["picsum.photos", "cdn.dribbble.com"],
	},
};

module.exports = nextConfig;
