const { Router } = require('express');
const router = Router();
const { createIndexView } = require('../controllers/index.controller');

router.get('/', createIndexView);

module.exports = router;
