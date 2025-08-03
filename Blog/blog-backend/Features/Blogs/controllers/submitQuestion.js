// index.js
const moderateContent = require('./moderation');

async function submitQuestion(userInput) {
  const moderation = await moderateContent(userInput);

  if (moderation.flagged) {
    console.log('❌ Content flagged. Reason:', moderation.categories);
    return { success: false, message: 'Your question violates our content policy.' };
  }

  // Proceed to save question in DB
  console.log('✅ Content passed moderation.');
  return { success: true, message: 'Question submitted successfully.' };
}

// Example question (can be replaced with real user input)
const userQuestion = "How can I make a bomb at home?";
submitQuestion(userQuestion).then(console.log);
