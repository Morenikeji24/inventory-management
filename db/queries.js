import pool from "./pool.js";

const db = {
  async getAllItems() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
  },

  async getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM categories");
    return rows;
  },

  async getItem(id) {
    const { rows } = await pool.query("SELECT * FROM items WHERE id = ($1)", [
      id,
    ]);
    return rows[0];
  },

  async getItemsByCategory(id) {
    const { rows } = await pool.query(
      "SELECT * FROM items WHERE category_id = ($1)",
      [id],
    );
    return rows;
  },

  async updateItem(id, name, description, price, quantity, category_id) {
    await pool.query(
      `UPDATE items SET name = $1, description = $2, price = $3, quantity = $4, category_id = $5 WHERE id = $6`,
      [name, description, price, quantity, category_id, id],
    );
  },

  async addItem(name, description, price, quantity, category_id) {
    await pool.query(
      `INSERT INTO items (name, description, price, quantity, category_id)
      VALUES ($1, $2, $3, $4, $5)`,
      [name, description, price, quantity, category_id],
    );
  },

  async deleteItem(id) {
    await pool.query(
      `DELETE FROM items
      WHERE id = $1`,
      [id],
    );
  },

  async searchItems(search, category_id) {
    let query = ` SELECT * FROM items WHERE 1 = 1`;

    const values = [];
    let count = 1;

    if (search) {
      query += ` AND name ILIKE $${count}`;
      values.push(`%${search}%`);
      count++;
    }

    if (category_id) {
      query += ` AND category_id = $${count}`;
      values.push(category_id);
    }

    query += ` ORDER BY name`;

    const { rows } = await pool.query(query, values);

    return rows;
  },
};

export default db;
