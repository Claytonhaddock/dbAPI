const serverConfig = {
  mongoURL: process.env.MONGO_URL || 'mongodb://appointmentsuser:Kronwall55@ds259154.mlab.com:59154/appointments',
  port: process.env.PORT || 3001
};

module.exports = serverConfig;
