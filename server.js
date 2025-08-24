import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import donationRoutes from "./routes/donationRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));             // allow all for now; you can restrict later
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.json({ ok: true, name: "Pi Social Donate API" }));

app.use("/donate", donationRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { dbName: "pi_social_donate" })
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on :${PORT}`));
  })
  .catch(err => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  });
