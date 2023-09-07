const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnAutorizedError = require('../errors/UnAuthtorizedError');
const urlRegex = require('../utils/constants');

// Опишем схему:
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(url) {
        return urlRegex.test(url);
      },
      message: 'Некорректный url',
    },
  },
  email: {
    type: String,
    required: [true, 'Заполните поле'],
    unique: [true, 'Email уже существуют'],
    validate: {
      validator(email) {
        return validator.isEmail(email);
        // return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Введите верный email или пароль',
    },
  },
  password: {
    type: String,
    required: [true, 'Заполните поле'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAutorizedError('Неправильные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnAutorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

// создаём модель и экспортируем её
module.exports = mongoose.model('user', userSchema);
