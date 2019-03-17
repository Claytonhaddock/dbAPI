const serverConfig = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/appointments'
};

module.exports = serverConfig;
