const { validationResult } = require('express-validator');
const { updateMembershipStatus, updateAdminStatus } = require('../db/mutations');
const {
	validateSecretPassword,
	validateAdminSecretPassword,
} = require('../lib/validator');
const { isAuth } = require('../middleware/auth.middleware');

const createUpdateUserView = (req, res) => {
	res.render('update-user', { errors: {}, user: req.user });
};

const createAdminView = (req, res) => {
	res.render('admin', { errors: {}, user: req.user });
};

const updateUserMembershipStatus = [
	...validateSecretPassword,
	isAuth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('update-user', {
				errors: errors.mapped(),
				user: req.user,
			});
		}

		const { id } = req.params;

		await updateMembershipStatus(id, 'premium');

		res.status(201).redirect('/');
	},
];

const updateUserAdminStatus = [
	...validateAdminSecretPassword,
	isAuth,
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('admin', {
				errors: errors.mapped(),
				user: req.user,
			});
		}

		const { id } = req.params;

		await updateAdminStatus(id, true);

		res.status(201).redirect('/');
	},
];

module.exports = {
	createUpdateUserView,
	updateUserMembershipStatus,
	createAdminView,
	updateUserAdminStatus,
};
