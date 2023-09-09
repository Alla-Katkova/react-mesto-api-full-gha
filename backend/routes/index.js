const router = require('express').Router();
const signupRouter = require('./signup');
const signinRouter = require('./signin');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
const auth = require('../middlewares/auth');
router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// app.use('/signup', require('./routes/signup'));
// app.use('/signin', require('./routes/signin'));

// если запрос идет на неизвестный роут
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
