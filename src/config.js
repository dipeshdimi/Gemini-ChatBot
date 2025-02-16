import dotenv from 'dotenv';
dotenv.config();

const config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  geminiApiKey: process.env.API_KEY,
  port: process.env.PORT || 3000,
};

export default config;
