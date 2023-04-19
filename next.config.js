const withPlugins = require("next-compose-plugins");
const withPreact = require("next-plugin-preact");
const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
const { withSentryConfig } = require("@sentry/nextjs");
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
module.exports =
  // withSentryConfig(
  withPlugins(
    [
      [withPreact],
      [withMDX],
      // [
      //   withSentryConfig,
      //   {
      //     hideSourceMaps: true,
      //   },
      // ],
    ],
    {
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**.dditscdn.com",
            port: "",
          },
          {
            protocol: "https",
            hostname: "**.wasabisys.com",
            port: "",
          },
        ],
      },
      webpack: (config, dev, isServer) => {
        config.experiments = { topLevelAwait: true, layers: true };
        // if (!dev && !isServer) {
        Object.assign(config.resolve.alias, {
          react: "preact/compat",
          "react-dom/test-utils": "preact/test-utils",
          "react-dom": "preact/compat",
        });
        // }
        return config;
      },
    }
    //  ),
    // sentryWebpackPluginOptions
  );
// webpack: (config, options) => {
//   config.module.rules.push({
//     test: /zcv\.wasm$/,
//     type: 'javascript/auto',
//     loader: 'file-loader',
//   });
//   const experiments = config.experiments || {};
//   config.experiments = { ...experiments, asyncWebAssembly: true };
//   // config.output.webassemblyModuleFilename = 'static/wasm/[modulehash].wasm';
//   return config;
// },
