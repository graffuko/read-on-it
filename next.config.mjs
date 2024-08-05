/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/api/open-library/covers/:path*',
          destination: 'https://covers.openlibrary.org/b/:path*',
        },
        {
          source: '/api/open-library/search/:query*',
          destination: 'https://openlibrary.org/search.json?q=:query*',
        },
      ];
    },
  };
  
  export default nextConfig;