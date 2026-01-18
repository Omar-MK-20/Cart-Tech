import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // allowedDevOrigins: ['192.168.8.126'],

  // experimental: {
  //   serverActions: {
  //     allowedOrigins: ['192.168.8.126'],
  //   },
  // },

  async redirects() 
  {
    return [
      {
        source: '/auth',
        destination: '/auth/login',
        permanent: true
      }
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-products/**'
      },
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-brands/**'
      },
      {
        protocol: 'https',
        hostname: 'ecommerce.routemisr.com',
        pathname: '/Route-Academy-categories/**'
      },
    ]
  }
};

export default nextConfig;
