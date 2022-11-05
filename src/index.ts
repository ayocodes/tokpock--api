import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import sendMail from "./features/send-mail/index.js";
import { handleError } from "./utils/middleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: true }));

app.use((req, res, next) => {
  handleError(express.json(), req, res, next);
});

app.post("/api/send-mail", async (req, res) => {
  await sendMail(req, res);
});

/// Returns relevant server stats and logs.
app.get("/api/server-stats", (_, res) => {
  res.sendStatus(400);
});

app.listen(PORT, () => {
  console.log(`🔥 [server]: Server running at https://localhost:${PORT}`);
});
