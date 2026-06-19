import { createRequestHandler } from "@react-router/express";
import express from "express";
import app from "./server/app.ts";
import { connectDB } from "./server/config/db.ts";
import { ENV } from "./server/config/env.ts";

if (process.env.NODE_ENV === "development") {
  console.log('Serveur en dev');
  
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    }),
  );
  app.use(viteDevServer.middlewares);
  app.use(
    createRequestHandler({

      // @ts-expect-error - Module virtuel spécifique à React Router/Vite
      build: () =>
        viteDevServer.ssrLoadModule(
          "virtual:react-router/server-build",
        ),
    }),
  );
} else {
  app.use(express.static("build/client"));
  app.use(
    createRequestHandler({
      // @ts-expect-error - Module virtuel spécifique à React Router/Vite
      build: await import("./build/server/index.js"),
    }),
  );
}

app.listen(ENV.PORT, () => {
  console.log(`Server is running on http://localhost:${ENV.PORT}`);
  connectDB()
});
