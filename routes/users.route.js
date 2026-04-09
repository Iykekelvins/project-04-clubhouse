const { Router } = require('express');
const {
	createUpdateUserView,
	updateUserMembershipStatus,
} = require('../controllers/users.controller');

const router = Router();

router.get('/:id', createUpdateUserView);
router.post('/:id', updateUserMembershipStatus);

module.exports = router;
