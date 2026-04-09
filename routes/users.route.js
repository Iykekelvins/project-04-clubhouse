const { Router } = require('express');
const {
	createUpdateUserView,
	updateUserMembershipStatus,
	createAdminView,
	updateUserAdminStatus,
} = require('../controllers/users.controller');

const router = Router();

router.get('/:id', createUpdateUserView);
router.post('/:id', updateUserMembershipStatus);
router.get('/admin/:id', createAdminView);
router.post('/admin/:id', updateUserAdminStatus);

module.exports = router;
