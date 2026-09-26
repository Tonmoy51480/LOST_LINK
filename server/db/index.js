const { Pool } = require("pg");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });

const isProduction = process.env.NODE_ENV === "production";
let connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL.trim() : "";
if (connectionString.startsWith("psql ")) {
  connectionString = connectionString.replace(/^psql\s+/, "").trim();
}
if (
  (connectionString.startsWith("'") && connectionString.endsWith("'")) ||
  (connectionString.startsWith('"') && connectionString.endsWith('"'))
) {
  connectionString = connectionString.slice(1, -1).trim();
}

const pool = new Pool({
  connectionString,
  ssl:
    connectionString && connectionString.includes("sslmode=require")
      ? { rejectUnauthorized: false }
      : false,
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error on idle client:", err.message);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
