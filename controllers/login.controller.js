const createLoginView = (req, res) => {
	res.render('login', { error: {} });
};

module.exports = createLoginView;
