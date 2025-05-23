const Groq = require('groq-sdk');

const apiKeys = [
"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",
"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",
"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"
];

function getRandomApiKey() {
  return apiKeys[Math.floor(Math.random() * apiKeys.length)];
}

function createClient() {
  return new Groq({
    apiKey: getRandomApiKey(),
  });
}

async function groq(teks, prompt) {
  const client = createClient();
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: teks },
      ],
      model: "llama-3.2-90b-vision-preview",
    });

    return {
      status: true,
      creator: "shiro",
      respon: chatCompletion.choices[0].message.content,
    };
  } catch (e) {
    return {
      status: false,
      creator: "shiro",
      respon: "Error: " + e.message,
    };
  }
}

module.exports = { groq }