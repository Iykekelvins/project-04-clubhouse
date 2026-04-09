const pool = require('./pool');

const createUser = async (first_name, last_name, username, password) => {
	await pool.query(
		'INSERT INTO users (first_name, last_name, username, password_hash) VALUES ($1, $2, $3, $4)',
		[first_name, last_name, username, password],
	);
};

const addNewMessage = async (title, content, user_id) => {
	await pool.query(
		'INSERT INTO messages (title, content, user_id) VALUES ($1, $2, $3)',
		[title, content, user_id],
	);
};

const updateMembershipStatus = async (user_id, status) => {
	await pool.query('UPDATE users SET membership_status = $1 WHERE id = $2', [
		status,
		user_id,
	]);
};

const updateAdminStatus = async (user_id, status) => {
	await pool.query('UPDATE users SET is_admin = $1 WHERE id = $2', [
		status,
		user_id,
	]);
};

const deleteMessage = async (id) => {
	await pool.query('DELETE FROM messages WHERE id = $1', [id]);
};

module.exports = {
	createUser,
	addNewMessage,
	updateMembershipStatus,
	updateAdminStatus,
	deleteMessage,
};
