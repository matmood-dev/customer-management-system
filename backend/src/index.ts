import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth";
import customersRoutes from "./routes/customers";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/customers", customersRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
