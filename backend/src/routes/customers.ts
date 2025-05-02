import express from "express";
import Database from "better-sqlite3";
import path from "path";
import type { Request, Response } from "express";

const router = express.Router();

interface Customer {
  id?: number;
  name: string;
  email: string;
  phone: string;
}

const dbPath = path.join(__dirname, "../../db/database.db");
const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
  )
`).run();

router.get("/", (req, res) => {
  const stmt = db.prepare("SELECT * FROM customers");
  const customers = stmt.all() as Customer[];
  res.json(customers);
});

router.get("/:id", (req: Request, res: Response): void => {
    const id = req.params.id;
    const stmt = db.prepare("SELECT * FROM customers WHERE id = ?");
    const customer = stmt.get(id);
  
    if (!customer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }
  
    res.json(customer);
  });
  
  

router.post("/", (req, res) => {
  const { name, email, phone } = req.body as Customer;
  const stmt = db.prepare("INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)");
  const result = stmt.run(name, email, phone);
  res.status(201).json({ id: result.lastInsertRowid, name, email, phone });
});

router.put("/:id", (req, res) => {
  const { name, email, phone } = req.body as Customer;
  const stmt = db.prepare("UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?");
  stmt.run(name, email, phone, req.params.id);
  res.json({ id: req.params.id, name, email, phone });
});

router.delete("/:id", (req, res) => {
  db.prepare("DELETE FROM customers WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

export default router;
