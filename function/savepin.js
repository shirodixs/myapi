const fetch = require("node-fetch");

async function savePin(url) {
const apiUrl = `https://api.siputzx.my.id/api/d/pinterest?url=${encodeURIComponent(url)}`;

try {
const response = await fetch(apiUrl);
if (!response.ok) {
throw new Error(`HTTP error! Status: ${response.status}`);
}

const data = await response.json();
return data.data.url;
} catch (error) {
console.error("Error fetching image description:", error);
return null;
}
}

module.exports = { savePin }