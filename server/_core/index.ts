import express from "express";
import { createServer } from "http";
import { setupVite, serveStatic } from "./vite";

const app = express();
const server = createServer(app);

async function start() {
  if (process.env.NODE_ENV === "production") {
    // PRODUCTION → sadece static serve
    serveStatic(app);
  } else {
    // DEV → vite
    const vite = await import("vite");
    await setupVite(app, server, vite);
  }

  const port = process.env.PORT || 3009;

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
}

start();