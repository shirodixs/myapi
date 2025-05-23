const axios = require('axios');
const cheerio = require('cheerio');

const Apk4Free = {
    async search(q) {
        const { data } = await axios.get('https://apk4free.net/?s=' + q);
        const $ = cheerio.load(data);
        const res = [];
        $('.baps > .bav').each((i, e) => {
            let obj = {
                title: $(e).find('span.title').text().trim(),
                link: $(e).find('a').attr('href'),
                developer: $(e).find('span.developer').text().trim(),
                version: $(e).find('span.version').text().trim(),
                image: $(e).find('img').attr('src').replace('150x150', '300x300'),
                rating: parseInt($(e).find('span.stars').attr('style').replace(/\D/g, '')) / 20
            };
            res.push(obj);
        });
        return res;
    },
    async download(url) {
        const { data } = await axios.get(/(download\/?)$/.test(url) ? url : url.replace(/\/$/, '') + '/download');
        const $ = cheerio.load(data);
        let obj = {
            title: $('div.pxtd > h3').text().trim(),
            package: $('div.pxtd > table tr:eq(0) td:eq(1)').text().trim(),
            version: $('div.pxtd > table tr:eq(1) td:eq(1)').text().trim(),
            size: $('div.pxtd > table tr:eq(2) td:eq(1)').text().trim(),
            requirements: $('div.pxtd > table tr:eq(3) td:eq(1)').text().trim(),
            url: $('div.pxtd #list-downloadlinks > li:eq(1) > a').attr('href')
        };

        return obj;
    },
};

module.exports = { Apk4Free }