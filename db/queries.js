const pool = require('./pool');

async function fetchAllMessages() {
	const { rows } = await pool.query(`
		SELECT messages.*, users.first_name, users.last_name, users.username
		FROM messages
		JOIN users ON messages.user_id = users.id
		ORDER BY messages.created_at DESC
		`);
	return rows;
}

module.exports = {
	fetchAllMessages,
};
