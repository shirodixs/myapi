const cheerio = require('cheerio');
const axios = require('axios');

async function cariresep(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://resepkoki.id/?s=' + query)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const link = [];
                const judul = [];
                const result = [];

                $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-media > a').each((a, b) => {
                    link.push($(b).attr('href'));
                });

                $('body > div.all-wrapper.with-animations > div:nth-child(5) > div > div.archive-posts.masonry-grid-w.per-row-2 > div.masonry-grid > div > article > div > div.archive-item-content > header > h3 > a').each((c, d) => {
                    judul.push($(d).text());
                });

                for (let i = 0; i < link.length; i++) {
                    result.push({
                        judul: judul[i],
                        link: link[i]
                    });
                }

                resolve(result);
            })
            .catch(reject);
    });
}

module.exports = { cariresep }