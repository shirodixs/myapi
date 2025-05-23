const axios = require('axios');

async function fetchContent(content) {
try {
const response = await axios.post('https://luminai.my.id/', { content });
return response.data;
} catch (error) {
console.error("Error fetching content from LuminAI:", error);
throw error;
}
}

module.exports = { fetchContent }