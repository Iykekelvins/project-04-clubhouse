const { validationResult, matchedData } = require('express-validator');
const { validateMessage } = require('../lib/validator');
const { addNewMessage, deleteMessage } = require('../db/mutations');
const { isAuth, isAdmin } = require('../middleware/auth.middleware');

const createNewMessageView = (req, res) => {
	res.render('new-message', { body: {}, errors: {} });
};

const createMessage = [
	validateMessage,
	isAuth,
	async (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).render('new-message', {
				errors: errors.mapped(),
				body: req.body,
			});
		}

		const { title, content } = matchedData(req);
		try {
			await addNewMessage(title, content, req.user.id);
			res.redirect('/');
		} catch (error) {
			next(error);
		}
	},
];

const deleteUserMessage = [
	isAdmin,
	async (req, res, next) => {
		const id = req.params.id;

		try {
			await deleteMessage(id);
			res.redirect('/');
		} catch (error) {
			next(error);
		}
	},
];

module.exports = {
	createNewMessageView,
	createMessage,
	deleteUserMessage,
};
