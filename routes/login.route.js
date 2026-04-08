const { Router } = require('express');
const createLoginView = require('../controllers/login.controller');
const router = Router();

router.get('/', createLoginView);

module.exports = router;
