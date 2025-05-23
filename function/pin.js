const axios = require('axios');

async function pinterest(judul) {
    const url = `https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(judul)}`;
    
    try {
        const res = await axios.get(url);

        if (res.data && res.data.data) {
            return res.data.data.map(item => ({
                title: item.grid_title,
                original: item.pin,
                download: item.images_url
            })).filter(img => img.image !== null);
        }

        return [];
    } catch (error) {
        console.error('Terjadi kesalahan:', error);
        return [];
    }
}

module.exports = { pinterest };