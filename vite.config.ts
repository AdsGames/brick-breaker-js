import { viteStaticCopy } from "vite-plugin-static-copy";

export default {
  base: "./",
  build: {
    assetsInlineLimit: 0,
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: "./assets",
          dest: "./",
        },
      ],
    }),
  ],
};
