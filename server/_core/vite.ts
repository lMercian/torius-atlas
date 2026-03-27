import fs from "fs";
import path from "path";
import { nanoid } from "nanoid";

export async function setupVite(app, server, vite) {
  app.use("*", async (req, res, next) => {
    try {
      const url = req.originalUrl;

      const clientTemplate =
        process.env.NODE_ENV === "production"
          ? path.resolve("dist", "public", "index.html")
          : path.resolve("client", "index.html");

      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      template = template.replace(
        'src="/src/main.tsx"',
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      const page = await vite.transformIndexHtml(url, template);

      res.status(200)
        .set({ "Content-Type": "text/html" })
        .end(page);

    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app) {
  const distPath = path.resolve("dist", "public");
  app.use(require("express").static(distPath));
}