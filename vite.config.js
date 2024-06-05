import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import pl from './i18n/pl.json';

export default defineConfig({
  root: "src",
  publicDir: "../public",
  build: {
    outDir: "../docs",
  },
  plugins: [
    ViteEjsPlugin({
      ...pl,
    }),
  ],
});
