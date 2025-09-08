import { json } from "express";
import fs from "fs";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
// import data from "./data.json" assert { type: "json" };

const dbFile = "./database/bhisa.db";
const exists = fs.existsSync(dbFile);
const sqlite3Verbose = sqlite3.verbose();
let db: any; // bisa ketik dengan tipe yang lebih tepat kalau mau

async function initDb() {
  try {
    db = await open({
      filename: dbFile,
      driver: sqlite3Verbose.Database,
    });
    
    console.log("connected to db");
    return db;
  } catch (err) {
    console.error(err);
  }
}
 
async function checktable(db : any,tableName:string){
  const result = await db.get(
  `SELECT name FROM sqlite_master WHERE type='table' AND name=?`,
    [tableName]
  );

  if (result) {
    console.log(`Tabel '${tableName}' ADA`);
  } else {
    console.log(`Tabel '${tableName}' TIDAK ADA`);
  }
}

export {initDb,db, checktable}