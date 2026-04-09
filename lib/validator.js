const { body } = require('express-validator');
const pool = require('../db/pool');

const alphabetErr = 'must only contain letters.';
const lengthErr = 'must be between 1 and 20 characters.';

exports.validateSignup = [
	body('first_name')
		.trim()
		.isAlpha()
		.withMessage(`First name ${alphabetErr}`)
		.isLength({ min: 1, max: 20 })
		.withMessage(`First name ${lengthErr}`),
	body('last_name')
		.trim()
		.isAlpha()
		.withMessage(`Last name ${alphabetErr}`)
		.isLength({ min: 1, max: 20 })
		.withMessage(`Last name ${lengthErr}`),
	body('username')
		.trim()
		.isAlphanumeric()
		.withMessage('Username must contain only letters and numbers')
		.isLength({ min: 3, max: 20 })
		.withMessage('Username must be between 3 and 20 characters')
		.custom(async (username) => {
			const result = await pool.query('SELECT 1 FROM users WHERE username = $1', [
				username,
			]);

			if (result.rows.length > 0) {
				throw new Error('Username already in use');
			}
			return true;
		}),
	body('password')
		.trim()
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	body('confirmPassword')
		.trim()
		.notEmpty()
		.withMessage('Confirm password is required')
		.custom((value, { req }) => {
			if (value !== req.body.password) {
				throw new Error('Passwords do not match');
			}
			return true;
		}),
];

exports.validateMessage = [
	body('title')
		.trim()
		.isLength({ min: 1, max: 100 })
		.withMessage('Title must be between 1 and 100 characters'),
	body('content')
		.trim()
		.isLength({ min: 1, max: 1000 })
		.withMessage('Content must be between 1 and 1000 characters'),
];

exports.validateSecretPassword = [
	body('password')
		.trim()
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long')
		.custom((value) => {
			if (value !== '123456') {
				throw new Error('Incorrect password');
			}
			return true;
		}),
];

exports.validateAdminSecretPassword = [
	body('password')
		.trim()
		.custom((value) => {
			if (value.toLowerCase() !== process.env.SECRET_HERO) {
				throw new Error('Incorrect password');
			}
			return true;
		}),
];
