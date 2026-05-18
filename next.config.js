/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Change this to your GitHub repo name
  // e.g. if your repo is https://github.com/tuusuario/universo-bienvenida
  // set basePath: '/universo-bienvenida'
  // basePath: '/universo-bienvenida',
}

module.exports = nextConfig
