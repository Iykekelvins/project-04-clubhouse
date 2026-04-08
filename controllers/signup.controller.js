const { validationResult, matchedData } = require('express-validator');
const { validateSignup } = require('../lib/validator');
const { createUser } = require('../db/mutations');

const bcrypt = require('bcryptjs');

const createSignUpView = (req, res) => {
	res.render('sign-up', { errors: {}, old: {} });
};

const registerUser = [
	validateSignup,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('sign-up', {
				errors: errors.mapped(),
				old: req.body,
			});
		}

		const { first_name, last_name, username, password } = matchedData(req);
		try {
			const hashedPassword = await bcrypt.hash(password, 10);
			await createUser(first_name, last_name, username, hashedPassword);
			res.redirect('/login');
		} catch (error) {
			next(error);
		}
	},
];

module.exports = {
	createSignUpView,
	registerUser,
};
