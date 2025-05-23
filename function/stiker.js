const axios = require('axios');
const cheerio = require('cheerio');

async function stickersearch(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://getstickerpack.com/stickers?query=${query}`)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const link = [];
                $('#stickerPacks > div > div:nth-child(3) > div > a').each((a, b) => {
                    link.push($(b).attr('href'));
                });

                if (link.length === 0) return reject('No stickers found');

                const rand = link[Math.floor(Math.random() * link.length)];
                axios.get(rand)
                    .then(({ data }) => {
                        const $$ = cheerio.load(data);
                        const url = [];
                        $$('#stickerPack > div > div.row > div > img').each((a, b) => {
                            url.push($$(b).attr('src').split('&d=')[0]);
                        });

                        resolve({
                            title: $$('#intro > div > div > h1').text(),
                            author: $$('#intro > div > div > h5 > a').text(),
                            author_link: $$('#intro > div > div > h5 > a').attr('href'),
                            sticker: url
                        });
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}

module.exports = { stickersearch }