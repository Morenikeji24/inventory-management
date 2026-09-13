import db from "../db/queries.js";

async function filterItems(req, res, next) {
  const { search, category_id } = req.query;

  const categories = await db.getAllCategories();

  if (search || category_id) {
    req.items = await db.searchItems(search, category_id);
  } else {
    req.items = await db.getAllItems();
  }

  req.categories = categories;

  next();
}

export default filterItems;
