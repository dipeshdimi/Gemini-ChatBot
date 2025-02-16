import { GoogleGenerativeAI } from '@google/generative-ai';
import config from '../config.js';

const gemini_api_key = config.geminiApiKey;
const googleAI = new GoogleGenerativeAI(gemini_api_key);
const geminiModel = googleAI.getGenerativeModel({ model: 'gemini-pro' });

export { geminiModel };
