import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dbDir = path.resolve(__dirname, "../db");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const dbPath = path.join(dbDir, "database.db");
const db = new Database(dbPath);

db.prepare(`
  CREATE TABLE IF NOT EXISTS customers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL
  )
`).run();

db.prepare("DELETE FROM customers").run();

const insert = db.prepare("INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)");
const dummy = [
  ["Mahmood AlTurabi", "matmood@outlook.com", "33733390"],
  ["Husain Ali", "husain@salubermd.com", "39552208"],
  ["Ali Ahmed", "ali@gmail.com", "33112233"]
];

dummy.forEach((cust) => insert.run(...cust));

console.log("Dummy inserted.");
