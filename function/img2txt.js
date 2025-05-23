const fetch = require("node-fetch");

async function img2txt(imageUrl) {
const apiUrl = `https://api.siputzx.my.id/api/ai/image2text?url=${encodeURIComponent(imageUrl)}`;

try {
const response = await fetch(apiUrl);
if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();
return data.data;
} catch (error) {
console.error("Error fetching image description:", error);
return null;
}
}

module.exports = { img2txt }