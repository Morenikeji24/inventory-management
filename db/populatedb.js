import { Client } from "pg";
import "dotenv/config";

const SQL = `
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

CREATE TABLE categories (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255) NOT NULL
);

CREATE TABLE items (
id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
name VARCHAR(255) NOT NULL,
description TEXT,
price NUMERIC(10, 2),
quantity INTEGER NOT NULL,
category_id INTEGER REFERENCES categories(id)
);

INSERT INTO categories (name)
VALUES ('Electronics'), ('Furniture'), ('Clothing')
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DB_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("Done.");
}

main();
