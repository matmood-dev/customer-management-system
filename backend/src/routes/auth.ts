import express from "express";
import type { Request, Response } from "express";

const router = express.Router();

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "123";

router.post("/login", (req: Request, res: Response): void => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.json({ token: "saluber_admin_token" });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
});

export default router;
