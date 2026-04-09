const { Router } = require('express');
const {
	createNewMessageView,
	createMessage,
} = require('../controllers/messages.controller');
const router = Router();

router.get('/new', createNewMessageView);
router.post('/', createMessage);

module.exports = router;
