import { validationResult } from "express-validator";
import db from "../db/queries.js";
import validateForm from "../middlewares/formValidator.js";

const controller = {
  async getAllItems(req, res) {
    res.render("index", { items: req.items, categories: req.categories });
  },

  async getItemByID(req, res) {
    const { id } = req.params;
    const item = await db.getItem(id);
    res.render("item", { item: item });
  },

  async getEditForm(req, res) {
    const { id } = req.params;
    const item = await db.getItem(id);
    const categories = await db.getAllCategories();
    res.render("edit", { item, categories, errors: [] });
  },

  async postIdForm(req, res) {
    const errors = validationResult(req);
    const { id } = req.params;
    const categories = await db.getAllCategories();
    const { name, description, price, quantity, category_id } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).render("edit", {
        item: { name, description, price, quantity, category_id },
        categories,
        errors: errors.array(),
      });
    }

    await db.updateItem(id, name, description, price, quantity, category_id);

    res.redirect(`/${id}`);
  },

  async getCreateForm(req, res) {
    const categories = await db.getAllCategories();
    res.render("form", { categories });
  },

  async postCreateForm(req, res) {
    const errors = validationResult(req);
    const { name, description, price, quantity, category_id } = req.body;

    if (!errors.isEmpty()) {
      res.status(400).render("form", { categories, errors: errors.array() });
    }

    await db.addItem(name, description, price, quantity, category_id);

    res.redirect("/");
  },

  async deleteItem(req, res) {
    const { id } = req.params;
    await db.deleteItem(id);

    res.redirect("/");
  },
};

export default controller;
