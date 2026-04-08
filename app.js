const express = require('express');
const app = express();
const path = require('node:path');
const passport = require('passport');
const session = require('express-session');
require('dotenv').config();

const pool = require('./db/pool');

// passport configuration
require('./lib/passport');
app.use(
	session({
		store: new (require('connect-pg-simple')(session))({
			pool,
			createTableIfMissing: true,
			tableName: 'sessions',
		}),
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day
	}),
);
app.use(passport.initialize());
app.use(passport.session());

// express middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// routes
const indexRouter = require('./routes/index.route');
const signupRouter = require('./routes/signup.route');
const loginRouter = require('./routes/login.route');

app.use('/', indexRouter);
app.use('/sign-up', signupRouter);
app.use('/login', loginRouter);
app.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) return next(err);

		if (!user) {
			return res.status(401).render('login', {
				error: info.message,
			});
		}

		req.logIn(user, (err) => {
			if (err) return next(err);
			return res.redirect('/');
		});
	})(req, res, next);
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, (err) => {
	if (err) throw err;
	console.log(`Server is running on port ${PORT}`);
});
