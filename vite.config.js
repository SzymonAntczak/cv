import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import fs from "fs";
import { resolve } from "path";

const locales = ["pl", "en"];

const loadLocaleData = (locale) => {
  const filePath = resolve(__dirname, `src/i18n/${locale}.json`);
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const generateData = () =>
  locales.reduce((acc, locale) => {
    acc[locale] = loadLocaleData(locale);
    return acc;
  }, {});

export default defineConfig({
  base: "./",
  root: "src",
  publicDir: "../public",
  plugins: [
    ViteEjsPlugin(generateData()),
    {
      name: "reload-html",
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".html")) {
          server.hot.send({
            type: "full-reload",
            path: "*",
          });
        }
      },
    },
  ],
  build: {
    outDir: "../docs",
    rollupOptions: {
      input: {
        pl: resolve(__dirname, "src/index.html"),
        en: resolve(__dirname, "src/en/index.html"),
      },
    },
  },
});
