// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
    public: "/",
    src: "/dist",
  },
  routes: [
    {
      match: "routes",
      src: ".*",
      dest: "/index.html",
    },
  ],
  plugins: ["@snowpack/plugin-react-refresh", "@snowpack/plugin-postcss"],
  optimize: {
    bundle: true,
    minify: true,
    target: "es2018",
  },
  alias: {
    "@components": "./src/components",
    "@hooks": "./src/hooks",
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
