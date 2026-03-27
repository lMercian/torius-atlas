import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

export async function setupVite(app, server, vite) {
  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;

      let clientTemplate;

      if (process.env.NODE_ENV === "production") {
        clientTemplate = path.resolve("dist/public/index.html");
      } else {
        clientTemplate = path.resolve("client/index.html");
      }

      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      template = template.replace(
        'src="/src/main.tsx"',
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const page = await vite.transformIndexHtml(url, template);

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app) {
  const distPath = path.resolve("dist/public");
  app.use(require("express").static(distPath));
}