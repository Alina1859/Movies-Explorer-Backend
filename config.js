const {
  MONGODB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
  NODE_ENV,
  JWT_SECRET,
  DATA_BASE,
} = process.env;

module.exports = {
  MONGODB_URL,
  PORT,
  JWT_SECRET,
  NODE_ENV,
  DATA_BASE,
};
