const cheerio = require('cheerio');
const axios = require('axios');

async function wikipedia(query) {
    try {
        const res = await axios.get(`https://id.m.wikipedia.org/w/index.php?search=${query}`);
        const $ = cheerio.load(res.data);
        const title = $('title').text().trim();
        let wiki = [];
        $('#mw-content-text p').each((i, el) => {
            const text = $(el).text().trim();
            if (text) {
                wiki.push(text);
            }
        });
        let thumbnail = $('meta[property="og:image"]').attr('content');

        return {
            title,
            wiki: wiki.join('\n\n'),
            thumbnail
        };
    } catch (error) {
        return { error: 'Terjadi kesalahan saat membaca file.', details: error.message };
    }
}

module.exports = { wikipedia }