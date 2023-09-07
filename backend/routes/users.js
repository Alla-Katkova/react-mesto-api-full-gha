const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegex = require('../utils/constants');
const {
  getUsersFromDB,
  getMyUserInfo,
  getUserById,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

// возвращает всех пользователей
router.get('/', getUsersFromDB);
// роут для получения информации о пользователе
router.get('/me', getMyUserInfo);
// возвращает пользователя по _id
router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
}), getUserById);

// PATCH /users/me — обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), editUserInfo);
// PATCH /users/me/avatar — обновляет аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(urlRegex),
  }),
}), editUserAvatar);

module.exports = router;
