import { createRequestHandler } from "@react-router/express";
import express from "express";
// import app, { server } from "./server/app.ts";
// import { connectDB } from "./server/config/db.ts";
// import { ENV } from "./server/config/env.ts";

import cookieParser from "cookie-parser";
import { PORT } from "./server/config/env.ts";
import { connectDB } from "./server/config/db.ts";


const app = express();
app.use(express.json({ limit: "5mb" })); // requête JSON
app.use(cookieParser());
app.use('/api',(req,res)=>res.send("L'API fonctionne !"))

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
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB()
});
