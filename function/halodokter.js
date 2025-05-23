const axios = require('axios');

async function HalodocArticle(query) {
  const apiUrl = `https://api.hiuraa.my.id/search/halodoc-article?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Gagal mengambil data Halodoc: ' + error.message);
  }
}

module.exports = { HalodocArticle }