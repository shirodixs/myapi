const axios = require('axios');

async function fetchFluxImage(text) {
    try {
        const url = `https://api.hiuraa.my.id/ai-img/flux?text=${encodeURIComponent(text)}&ratio=1:1`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error("Error fetching image:", error.message);
        throw error;
    }
}

async function fetchFluxAi(text) {
    try {
        const url = `https://api.hiuraa.my.id/ai-img/flux?text=${encodeURIComponent(text)}&ratio=9:16`;
        const response = await axios.get(url, { responseType: 'arraybuffer' });
        return response.data;
    } catch (error) {
        console.error("Error fetching image:", error.message);
        throw error;
    }
}


module.exports = { fetchFluxImage, fetchFluxAi }