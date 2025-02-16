import dotenv from 'dotenv';
dotenv.config();

const config = {
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  geminiApiKey: process.env.GEMINI_API_KEY,
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
  port: process.env.PORT || 3000,
};

export default config;
