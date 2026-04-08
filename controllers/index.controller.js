const { fetchAllMessages } = require('../db/queries');

createIndexView = async (req, res) => {
	const messages = await fetchAllMessages();
	res.render('index', { messages });
};

module.exports = {
	createIndexView,
};
