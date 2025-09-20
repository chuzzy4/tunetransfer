import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate", // keeps SW fresh
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Tune Transfer",
        short_name: "MyApp",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#317EFB",
        icons: [
          {
            src: "/icons/tt192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icons/tt512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
