import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import path from "path";

const dbPath = path.join(process.cwd(), "data", "orielle.db");
fs.mkdirSync(path.dirname(dbPath), { recursive: true });

declare global {
  var __orielleDb: DatabaseSync | undefined;
}

export const db = globalThis.__orielleDb ?? new DatabaseSync(dbPath);
if (process.env.NODE_ENV !== "production") globalThis.__orielleDb = db;

db.exec(`
  CREATE TABLE IF NOT EXISTS appointments (
    id TEXT PRIMARY KEY,
    reference TEXT NOT NULL,
    serviceId TEXT NOT NULL,
    stylistId TEXT NOT NULL,
    locationId TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    guestName TEXT NOT NULL,
    guestEmail TEXT NOT NULL,
    guestPhone TEXT NOT NULL,
    guestNotes TEXT NOT NULL,
    amount REAL NOT NULL,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    studio TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );

  CREATE INDEX IF NOT EXISTS idx_appointments_stylist_date ON appointments (stylistId, date);
`);
