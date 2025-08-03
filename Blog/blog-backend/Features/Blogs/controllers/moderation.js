// moderation.js
require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function moderateContent(content) {
  try {
    const response = await openai.moderations.create({
      input: content,
    });

    const results = response.results[0];
    return {
      flagged: results.flagged,
      categories: results.categories,
      categoryScores: results.category_scores,
    };
  } catch (error) {
    console.error('Moderation error:', error);
    throw error;
  }
}

module.exports = moderateContent;
