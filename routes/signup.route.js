const { Router } = require('express');
const router = Router();

const {
	createSignUpView,
	registerUser,
} = require('../controllers/signup.controller');

router.get('/', createSignUpView);
router.post('/', registerUser);

module.exports = router;
