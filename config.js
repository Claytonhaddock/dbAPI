const serverConfig = {
  mongoURL: process.env.MONGO_URL || 'mongodb://localhost:27017/appointments',
  twilioAccountSid: process.env.TWILIO_ACCOUNT_SID || 'ACf413c717ebe3d000f234719b6918da0c',
  twilioAuthToken: process.env.TWILIO_AUTH_TOKEN || '680986ebb2632bc7157a41fbf7a18360',
  twilioPhoneNumber: process.env.TWILIO_PHONE_NUMBER || '+12692223918'
};

module.exports = serverConfig;


/*
TWILIO_ACCOUNT_SID=ACf413c717ebe3d000f234719b6918da0c
TWILIO_AUTH_TOKEN=680986ebb2632bc7157a41fbf7a18360
TWILIO_PHONE_NUMBER=+12692223918
*/
