import { body, validationResult, matchedData } from "express-validator";

const validateForm = [
  body("name").trim().notEmpty().withMessage("Name is required"),

  body("description").trim().notEmpty().withMessage("Description is required"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a non negative number"),

  body("quantity")
    .isFloat({ min: 0 })
    .withMessage("Quantity must be a non negative number"),

  body("category_id").isInt().withMessage("Invalid Category"),
];

export default validateForm;
