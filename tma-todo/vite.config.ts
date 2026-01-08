import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  const tunnelHost = env.VITE_TUNNEL_HOST; 

  return {
    plugins: [react()],

    server: {
      host: true,
      port: 5173,
      strictPort: true,

      allowedHosts: true,

      hmr: tunnelHost
        ? {
            protocol: "wss",
            host: tunnelHost,
            clientPort: 443,
          }
        : false, 
    },

    preview: {
      host: true,
      port: 5173,
      strictPort: true,
    },
  };
});
