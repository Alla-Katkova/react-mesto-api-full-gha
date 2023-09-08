const jwt = require('jsonwebtoken');

const { SECRET_KEY = 'some-secret-key' } = process.env
// console.log(SECRET_KEY)
const UnAutorizedError = require('../errors/UnAuthtorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnAutorizedError('Авторизируйтесь!');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (err) {
    throw new UnAutorizedError('Авторизируйтесь2!!');
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
