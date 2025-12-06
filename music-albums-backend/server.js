import express from "express";
import cors from "cors";
import userRoutes from "./src/routes/users.routes.js";
import albumRoutes from "./src/routes/albums.routes.js";
import reviewRoutes from "./src/routes/reviews.routes.js";

import { runDatabaseConnect } from "./src/database/database-client.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log("Listening on port " + port);
});

await runDatabaseConnect();

app.use("/albums", albumRoutes);
app.use("/users", userRoutes);
app.use("/reviews", reviewRoutes);
