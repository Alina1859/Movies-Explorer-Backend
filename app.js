require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/rateLimiter');
const mainRouter = require('./routes');
const errorsHandler = require('./middlewares/errorsHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const {
  MONGODB_URL, PORT, NODE_ENV, DATA_BASE,
} = require('./config');

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(helmet());
app.use(cookieParser());

app.use(cors);

mongoose.connect(NODE_ENV !== 'production' ? MONGODB_URL : DATA_BASE);

app.use(limiter);

app.use(requestLogger);

app.use(mainRouter);

app.use(errorLogger);

app.use(errors());
app.use(errorsHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
