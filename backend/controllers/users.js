const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');

const { SECRET_KEY } = process.env;

// создать юзера
module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    })
      .then((user) => res.status(201).send({
        name: user.name, about: user.about, avatar: user.avatar, _id: user._id, email: user.email,
      }))
      .catch((err) => {
        if (err.code === 11000) {
          next(new ConflictError('Пользователь с таким email уже существует'));
        } else if (err instanceof mongoose.Error.ValidationError) {
          next(new BadRequestError(err.message));
        } else {
          next(err);
        }
      }));
};

// вывести список юзера
module.exports.getUsersFromDB = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

// найти юзера по айди
module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequestError('Некорректный _id'));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        // res.status(500).send({ message: 'На сервере произошла ошибка' });
        next(err);
      }
    });
};

// редактировать инфу юзера
module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  // if (req.user._id) {
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: 'true', runValidators: true }) // чтобы валидация происходила не только в пост запросах, но и в патч исп runValidators
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

// редактировать аватар юзера
module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: 'true', runValidators: true }) // чтобы валидация происходила не только в пост запросах, но и в патч исп runValidators
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(err.message));
      } else if (err instanceof mongoose.Error.DocumentNotFoundError) {
        next(new NotFoundError('Пользователь с указанным _id не найден.'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getMyUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};
