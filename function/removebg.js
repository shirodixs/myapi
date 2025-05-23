const axios = require("axios");

async function RemoveBG(imageUrl) {
try {
const encodedUrl = encodeURIComponent(imageUrl);
const apiUrl = `https://api.hiuraa.my.id/tools/removebg?url=${encodedUrl}`;

const response = await axios.get(apiUrl);
if (!response.data.status) {
throw new Error("Gagal menghapus latar belakang.");
}

const resultUrl = response.data.result;
const imageResponse = await axios.get(resultUrl, { responseType: "arraybuffer" });

return Buffer.from(imageResponse.data, "binary");
} catch (error) {
console.error("Error:", error.message);
return null;
}
}


module.exports = { RemoveBG }