const axios = require('axios');

async function searchApkCombo(query) {
  const apiUrl = `https://api.hiuraa.my.id/search/apkcombo?q=${encodeURIComponent(query)}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    throw new Error('Gagal mengambil data ApkCombo: ' + error.message);
  }
}

module.exports = { searchApkCombo }