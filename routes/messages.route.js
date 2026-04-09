const { Router } = require('express');
const {
	createNewMessageView,
	createMessage,
	deleteUserMessage,
} = require('../controllers/messages.controller');
const router = Router();

router.get('/new', createNewMessageView);
router.post('/', createMessage);
router.get('/delete/:id', deleteUserMessage);

module.exports = router;
