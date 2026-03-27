import express from "express";
import { createServer } from "http";
import { serveStatic } from "./vite";

const app = express();
const server = createServer(app);

async function start() {
  serveStatic(app);

  const port = Number(process.env.PORT) || 3009;

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
    console.log(`NODE_ENV=${process.env.NODE_ENV}`);
  });
}

start().catch(console.error);