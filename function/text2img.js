const axios = require('axios');
const fetch = require('node-fetch');

async function txt2img(prompt) {
  const apiUrl = `https://api.hiuraa.my.id/ai-img/text2img?text=${encodeURIComponent(prompt)}`;

  try {
    const response = await axios({
      url: apiUrl,
      method: 'get',
      responseType: 'arraybuffer',
    });

    return response.data;
  } catch (error) {
    throw new Error('Gagal menghasilkan gambar: ' + error.message);
  }
}

async function text2img(prompt) {
    const apiUrl = `https://api.vreden.my.id/api/artificial/text2image?prompt=${encodeURIComponent(prompt)}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.result && data.result.download) {
            const imageResponse = await fetch(data.result.download);
            const imageBuffer = await imageResponse.buffer();
            return imageBuffer;
        } else {
            throw new Error("Failed to get image url.");
        }
    } catch (error) {
        console.error("Error fetching image buffer:", error);
        return null;
    }
}

module.exports = { text2img, txt2img }