const axios = require('axios');
const cheerio = require('cheerio');

async function DetikNews() {
    try {
        const res = await axios.get(`https://www.detik.com/terpopuler?tag_from=framebar&_ga=2.250751302.1905924499.1623147163-1763618333.1613153099`, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });

        const hasil = [];
        const $ = cheerio.load(res.data);

        $('article').each(function (a, b) {
            let berita = $(b).find('div > div > h3.media__title > a.media__link').text().trim();
            let berita_url = $(b).find('a.media__link').attr('href');
            let berita_thumb = $(b).find('img').attr('src');

            if (berita_thumb) {
                 berita_thumb = berita_thumb.replace('?w=220&q=90', '');
            }

            let berita_diupload = $(b).find('div.media__date > span').attr('title');

            const result = {
                berita,
                berita_url,
                berita_thumb,
                berita_diupload
            };
            hasil.push(result);
        });

        return hasil;

    } catch (error) {
        console.error("Error scraping Detik News:", error);
        if (error.response) {
            console.error("Status Code:", error.response.status);
            console.error("Response Data:", error.response.data);
        } else if (error.request) {
            console.error("No response received:", error.request);
        } else {
            console.error("Error setting up request:", error.message);
        }
        return [];
    }
}

module.exports = { DetikNews }