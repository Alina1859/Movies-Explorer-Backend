const { messageSent } = require('../consts');

const errorsHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? messageSent.errOnServ : message,
  });

  next();
};

module.exports = errorsHandler;
