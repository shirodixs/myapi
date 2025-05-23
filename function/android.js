const axios = require('axios');
const cheerio = require('cheerio');

async function android1(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://an1.com/tags/MOD/?story=' + query + '&do=search&subaction=search')
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const nama = [];
                const link = [];
                const rating = [];
                const thumb = [];
                const developer = [];
                const format = [];

                $('body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a > span').each(function (a, b) {
                    nama.push($(b).text());
                });

                $('div > ul > li.current-rating').each(function (c, d) {
                    rating.push($(d).text());
                });

                $('body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.developer.xsmf.muted').each(function (e, f) {
                    developer.push($(f).text());
                });

                $('body > div.page > div > div > div.app_list > div > div > div.img > img').each(function (g, h) {
                    thumb.push($(h).attr('src'));
                });

                $('body > div.page > div > div > div.app_list > div > div > div.cont > div.data > div.name > a').each(function (i, j) {
                    link.push($(j).attr('href'));
                });

                for (let i = 0; i < link.length; i++) {
                    format.push({
                        judul: nama[i],
                        dev: developer[i],
                        rating: rating[i],
                        thumb: thumb[i],
                        link: link[i]
                    });
                }

                resolve(format);
            })
            .catch(reject);
    });
}

module.exports = { android1 }