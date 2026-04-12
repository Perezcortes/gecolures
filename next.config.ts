/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true, // Apagamos el motor de Next.js porque Cloudinary es superior
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dkem2i0fv/**', // Mantenemos tu Cloud Name para máxima seguridad
      },
    ],
  },
};

export default nextConfig;