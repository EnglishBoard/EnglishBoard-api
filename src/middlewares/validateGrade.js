const { body, validationResult } = require("express-validator");

const validateGrade = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({ max: 200 }).withMessage("Title must be under 200 characters"),

  body("shortTitle")
    .notEmpty().withMessage("Short title is required")
    .isLength({ max: 50 }).withMessage("Short title must be under 50 characters"),

  body("logo")
    .optional()
    .isString().withMessage("Logo must be a string"),

  body("gradeColor")
    .optional()
    .isHexColor().withMessage("Grade color must be a valid hex color"),

  body("playlistId")
    .optional()
    .isString().withMessage("PlaylistId must be a string"),

    body('description')
    .notEmpty().withMessage('Description is required')
    .isLength({ max: 350 }).withMessage("description must be under 350 characters"),,

  body("isExam")
    .notEmpty().withMessage("isExam is required")
    .isBoolean().withMessage("isExam must be a boolean"),

  body("institute")
    .notEmpty().withMessage("Institute ID is required")
    .isMongoId().withMessage("Institute must be a valid Mongo ID"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateGrade;
