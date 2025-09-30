const { body, validationResult } = require("express-validator");

const validateInstitute = [
  body("name")
    .notEmpty().withMessage("Name is required")
    .isLength({ max: 200 }).withMessage("Name must be under 200 characters"),

  body("description")
    .optional()
    .isLength({ max: 500 }).withMessage("Description must be under 500 characters"),

  body("instituteColor")
    .notEmpty().withMessage("Institute color is required")
    .isHexColor().withMessage("Institute color must be a valid hex color"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateInstitute;
