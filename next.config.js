const path = require("path");
const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");

/** @type {import('next').NextConfig} */

module.exports = () => {
  const plugins = [createVanillaExtractPlugin()];

  return plugins.reduce(
    (acc, next) => {
      return next(acc);
    },
    {
      reactStrictMode: true,
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "raw.githubusercontent.com",
          },
          {
            protocol: "https",
            hostname: "avatars.githubusercontent.com",
          },
        ],
      },
      // Workaround for Next issue with locally linked packages `Cannot read properties of null (reading 'useRef')`
      webpack: (config) => {
        // This fixes the invalid hook React error which
        // will occur when multiple versions of React is detected
        // This can happen since common project is also using Next (which is using React)
        const reactPaths = {
          react: path.join(__dirname, "node_modules/react"),
          "react-dom": path.join(__dirname, "node_modules/react-dom"),
        };
        config.resolve = {
          ...config.resolve,
          alias: {
            ...config.resolve.alias,
            ...reactPaths,
          },
        };
        return config;
      },
    }
  );
};
