import withPreact from "next-plugin-preact";
import withPWA from "next-pwa";

const plugins = [
  withPWA({
    dest: "public",
    register: false,
    skipWaiting: false,
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
});
