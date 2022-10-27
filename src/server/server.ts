import express from "express";
import cors from "cors";

import connectMongoDb from "@/domain/repositories/repositoriesMongo";
import router from "@/router";

export const server = () => {
  // Create server
  const app = express();

  // Connect mongodb(Database)
  connectMongoDb();

  app.use(express.json({}));

  // Port
  const port = process.env.PORT || 4000;

  app.use(cors());

  // routes
  app.use("/api", router);

  // Run server
  app.listen(port, () => {
    console.log("server on port=", port);
  });
};
