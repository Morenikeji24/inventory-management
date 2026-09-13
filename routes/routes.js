import { Router } from "express";
import controller from "../controllers/controller.js";
import validateForm from "../middlewares/formValidator.js";
import filterItems from "../middlewares/filterItems.js";

export const itemRouter = Router();

itemRouter.get("/", filterItems, controller.getAllItems);
itemRouter.get("/create", controller.getCreateForm);
itemRouter.post("/create", validateForm, controller.postCreateForm);

itemRouter.post("/:id/delete", controller.deleteItem);

itemRouter.get("/:id", controller.getItemByID);
itemRouter.get("/:id/edit", controller.getEditForm);
itemRouter.post("/:id/edit", validateForm, controller.postIdForm);
