const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
// const signupRouter = require('./signup');
// const signinRouter = require('./signin');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');



router.use(auth);

router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

// если запрос идет на неизвестный роут
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
