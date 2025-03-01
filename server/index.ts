import { Request, Response } from "express";
import path from "path";
import dotenv from 'dotenv';
import { apiRouter } from "./index.routes";
import { dataSource } from "../dataSource";
import { seedData } from "./helpers/seedData";
import { subDomainMiddleware } from "./middleware/subDomainMiddleware";

const express = require("express");

dotenv.config();

const app = express();
const { OPENAI_API_KEY, PORT, NODE_ENV } = process.env;

if (!OPENAI_API_KEY) {
  throw Error("Invalid or missing env variables")
}

const clientBuildPath = path.join(__dirname, "../../client/build");

dataSource.initialize().then(() => {
  app.use(express.static(clientBuildPath));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(subDomainMiddleware);
  app.use("/api/v1", apiRouter);

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });

  if (NODE_ENV === 'development') {
    seedData();
  }

  const _port = PORT || 3001

  app.listen(_port, () => {
    console.log(`Server is running on http://localhost:${_port}`);
  });
}).catch((err: Error) => console.error(err));