const axios = require('axios');
const cheerio = require('cheerio');

async function cerpen(category) {
    return new Promise(async (resolve, reject) => {
        let title = category.toLowerCase().replace(/[()*]/g, "");
        let judul = title.replace(/\s/g, "-");
        let page = Math.floor(Math.random() * 5);

        axios.get('http://cerpenmu.com/category/cerpen-' + judul + '/page/' + page)
            .then((get) => {
                let $ = cheerio.load(get.data);
                let link = [];

                $('article.post').each(function (a, b) {
                    link.push($(b).find('a').attr('href'));
                });

                if (link.length === 0) {
                    return reject(new Error('Tidak ada cerpen yang ditemukan untuk kategori ini.'));
                }

                let random = link[Math.floor(Math.random() * link.length)];

                axios.get(random)
                    .then((res) => {
                        let $$ = cheerio.load(res.data);
                        let hasil = {
                            title: $$('#content > article > h1').text(),
                            author: $$('#content > article').text().split('Cerpen Karangan: ')[1]?.split('Kategori: ')[0]?.trim(),
                            kategori: $$('#content > article').text().split('Kategori: ')[1]?.split('\n')[0]?.trim(),
                            lolos: $$('#content > article').text().split('Lolos moderasi pada: ')[1]?.split('\n')[0]?.trim(),
                            cerita: $$('#content > article > p').text().trim()
                        };
                        resolve(hasil);
                    })
                    .catch(reject);
            })
            .catch(reject);
    });
}


module.exports = { cerpen }