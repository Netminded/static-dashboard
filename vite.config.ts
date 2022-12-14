import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import { VitePluginFonts } from "vite-plugin-fonts";

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VitePluginFonts({
      google: {
        families: [
          "Roboto",
          {
            name: "Poppins",
            styles: "wght@400;600;700;800",
            defer: true,
          },
          {
            name: "Karla",
            styles: "wght@400;500",
            defer: true,
          },
          {
            name: "Montserrat",
            styles: "wght@800",
            defer: true,
          },
          {
            name: "Nunito Sans",
            styles: "wght@400;500;600",
            defer: true,
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
