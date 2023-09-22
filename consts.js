// eslint-disable-next-line no-useless-escape
const LINK_REGULAR = /^(http|https):\/\/(?:www\.)?[a-zA-Z0-9._~\-:?#[\]@!$&'()*+,\/;=]{2,256}\.[a-zA-Z0-9.\/?#-]{2,}(?:\?.*)?$/;

const VALIDATION_ERROR = 400;
const UNAUTHORIZED_ERROR = 401;
const FORBIDDEN_ERROR = 403;
const NOT_FOUND_ERROR = 404;
const CONFLICT_ERROR = 409;
const REFERENCE_ERROR = 500;

const messageValidationError = {
  required: 'Это поле должно быть заполнено',
  minlength: 'Минимальная длина поля - 2',
  maxlength: 'Максимальная длина поля - 30',
  email: 'Некорректный адрес почты',
  url: 'Некорректный URL формат',
  movie: 'Переданы некорректные данные при создании фильма',
  user: 'Переданы некорректные данные при создании пользователя',
};

const messageUnauthorizedError = {
  errAuth: 'Неправильные почта или пароль',
  neededAuth: 'Необходима авторизация',
};

const messageNotFoundError = {
  movie: 'Фильм с указанным id не найден',
  user: 'Пользователь по указанному id не найден',
  wrongPath: 'Передан некорректный путь',
};

const messageForbiddenError = {
  movie: 'У вас нет прав на удаление данного фильма',
};

const messageConflictError = {
  user: 'Пользователь с данным email уже существует',
};

const messageSent = {
  login: 'Авторизация прошла успешно',
  signout: 'Выход',
  errOnServ: 'На сервере произошла ошибка',
  servWillLay: 'Сервер сейчас упадёт',
};

module.exports = {
  LINK_REGULAR,
  VALIDATION_ERROR,
  UNAUTHORIZED_ERROR,
  FORBIDDEN_ERROR,
  NOT_FOUND_ERROR,
  CONFLICT_ERROR,
  REFERENCE_ERROR,
  messageValidationError,
  messageUnauthorizedError,
  messageNotFoundError,
  messageForbiddenError,
  messageConflictError,
  messageSent,
};
