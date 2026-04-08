const pool = require('./pool');

async function fetchAllMessages() {
	const { rows } = await pool.query('SELECT * FROM messages');
	return rows;
}

module.exports = {
	fetchAllMessages,
};
