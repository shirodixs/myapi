const axios = require('axios');
const cheerio = require('cheerio');

async function quotesAnime() {
    return new Promise((resolve, reject) => {
        const page = Math.floor(Math.random() * 184);
        axios.get(`https://otakotaku.com/quote/feed/${page}`)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const hasil = [];
                $('div.kotodama-list').each(function (l, h) {
                    const link = $(h).find('a').attr('href') || '';
                    const gambar = $(h).find('img').attr('data-src') || '';
                    const karakter = $(h).find('div.char-name').text().trim() || '';
                    const anime = $(h).find('div.anime-title').text().trim() || '';
                    const episode = $(h).find('div.meta').text() || '';
                    const up_at = $(h).find('small.meta').text() || '';
                    const quotes = $(h).find('div.quote').text().trim() || '';


                    hasil.push({
                        link,
                        gambar,
                        karakter,
                        anime,
                        episode,
                        quotes
                    });
                });

                resolve(hasil);
            })
            .catch(reject);
    });
}


module.exports = { quotesAnime }