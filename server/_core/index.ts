import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic } from "./vite";

const app = express();
const server = createServer(app);

async function start() {
  const isProduction = process.env.NODE_ENV === "production";

  if (isProduction) {
    serveStatic(app);
  } else {
    const viteModule = await import("vite");
    const createViteServer = viteModule.createServer;

    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    await setupVite(app, server, vite);
  }

  const port = Number(process.env.PORT) || 3009;

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
    console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  });
}

start().catch(console.error);