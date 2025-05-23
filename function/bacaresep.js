const axios = require('axios');
const cheerio = require('cheerio');

async function bacaresep(query) {
    return new Promise(async (resolve, reject) => {
        axios.get(query)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const abahan = [];
                const atakaran = [];
                const atahap = [];

                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-name').each(function (a, b) {
                    abahan.push($(b).text());
                });

                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-recipe-ingredients-nutritions > div > table > tbody > tr > td:nth-child(2) > span.ingredient-amount').each(function (c, d) {
                    atakaran.push($(d).text());
                });

                $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-content > div.single-steps > table > tbody > tr > td.single-step-description > div > p').each(function (e, f) {
                    atahap.push($(f).text());
                });

                const judul = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-title.title-hide-in-desktop > h1').text();
                const waktu = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-cooking-time > span').text();
                const hasil = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-serves > span').text().split(': ')[1];
                const level = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-main > div.single-meta > ul > li.single-meta-difficulty > span').text().split(': ')[1];
                const thumb = $('body > div.all-wrapper.with-animations > div.single-panel.os-container > div.single-panel-details > div > div.single-main-media > img').attr('src');

                let tbahan = 'bahan\n';
                for (let i = 0; i < abahan.length; i++) {
                    tbahan += abahan[i] + ' ' + atakaran[i] + '\n';
                }

                let ttahap = 'tahap\n';
                for (let i = 0; i < atahap.length; i++) {
                    ttahap += atahap[i] + '\n\n';
                }

                const result = {
                    judul: judul,
                    waktu: waktu,
                    hasil: hasil,
                    kesulitan: level,
                    gambar: thumb,
                    bahan: tbahan.split('bahan\n')[1],
                    tutorial: ttahap.split('tahap\n')[1]
                };
                resolve(result);
            })
            .catch(reject);
    });
}

module.exports = { bacaresep }