import withPreact from "next-plugin-preact";
import withPWA from "next-pwa";

const plugins = [
  withPWA({
    dest: "public",
  }),
  withPreact,
];

/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return (_phase, { defaultConfig }) => {
    return plugins.reduce(
      (acc, plugin) => {
        return plugin(acc);
      },
      { ...config }
    );
  };
}

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp3)$/,
      type: "asset/resource",
      generator: {
        filename: "static/chunks/[path][name].[hash][ext]",
      },
    });

    return config;
  },
});
