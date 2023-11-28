const { OpenAI } = require("openai");

if (!process.env.OPEN_AI_API_KEY) {
  console.error("OPEN_AI_API_KEY is not set. Please set the API key.");
  process.exit(1);
}
const openai = new OpenAI({ apiKey: process.env.OPEN_AI_API_KEY });

const generateResponse = async (message) => {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model: "gpt-3.5-turbo",
    });
    console.log(response.choices[0].text.trim());
    return response.choices[0].text.trim();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = { generateResponse };
