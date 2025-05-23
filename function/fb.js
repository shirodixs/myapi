const axios = require('axios');

async function getFacebookVideo(url) {
    try {
        const apiUrl = `https://api.betabotz.eu.org/api/download/fbdown?url=${encodeURIComponent(url)}&apikey=shiroxd`;
        const response = await axios.get(apiUrl);

        if (response.status !== 200 || !response.data.status) {
            throw new Error('Gagal mengambil data video.');
        }

        const videoData = response.data.result[0];

        return {
            resolution: videoData.resolution,
            thumbnail: videoData.thumbnail,
            download_url: videoData._url
        };
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

module.exports = { getFacebookVideo }