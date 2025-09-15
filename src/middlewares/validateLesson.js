
const { body, validationResult } = require('express-validator');

const validateLesson = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be under 200 characters'),

  body('description')
    .notEmpty().withMessage('Description is required'),

  body('shortDescription')
    .notEmpty().withMessage('Short description is required')
    .isLength({ max: 300 }).withMessage('Short description must be under 500 characters'),

    body('gradeId')
    .notEmpty().withMessage('Grade ID is required')
    .isString().withMessage('Grade ID must be a string'),

  body('type')
    .notEmpty().withMessage('Type is required')
    .isIn(['grammar', 'vocabulary', 'listening', 'reading', 'writing', 'speaking']).withMessage('Invalid type'),

  body('modules')
    .isArray({ min: 1 }).withMessage('Modules must be an array with at least one module'),

  body('modules.*.title')
    .notEmpty().withMessage('Each module must have a title'),

  body('modules.*.description')
    .notEmpty().withMessage('Each module must have a description'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = validateLesson;