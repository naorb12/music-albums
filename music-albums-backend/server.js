import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";
import albumRoutes from "./src/routes/albums.routes.js";
import reviewRoutes from "./src/routes/reviews.routes.js";
import "dotenv/config";

import { runDatabaseConnect } from "./src/database/database-client.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

try {
  await runDatabaseConnect();
  console.log("Database connected successfully");
} catch (err) {
  console.error("Failed to connetct to db: ", err);
  process.exit(1);
}

app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Music Albums API is running." });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});

app.use("/albums", albumRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
