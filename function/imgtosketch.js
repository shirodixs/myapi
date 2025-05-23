const axios = require('axios');

async function convertToSketch(imageUrl) {
  const apiUrl = `https://api.siputzx.my.id/api/imgedit/convphoto?image=${encodeURIComponent(imageUrl)}&template=sketch_v2&style=manga_sketch`;

  try {
    const response = await axios({
      url: apiUrl,
      method: 'get',
      responseType: 'arraybuffer',
    });

    return response.data;
  } catch (error) {
    throw new Error('Gagal mengonversi gambar: ' + error.message);
  }
}

module.exports = { convertToSketch }