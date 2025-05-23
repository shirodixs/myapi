const axios = require('axios');
const cheerio = require('cheerio');

async function apkmirror(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.apkmirror.com/?post_type=app_release&searchtype=apk&s=${query}`)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const nama = [];
                const developer = [];
                const link = [];

                $('#content > div > div > div.appRow > div > div > div > h5 > a').each((_, el) => {
                    nama.push($(el).text());
                });

                $('#content > div > div > div.appRow > div > div > div > a').each((_, el) => {
                    developer.push($(el).text());
                });

                $('#content > div > div > div.appRow > div > div > div > div.downloadIconPositioning > a').each((_, el) => {
                    link.push('https://www.apkmirror.com' + $(el).attr('href'));
                });

                const results = nama.map((title, index) => ({
                    title,
                    developer: developer[index] || 'Unknown',
                    link: link[index] || '#'
                }));

                resolve(results);
            })
            .catch(reject);
    });
}

module.exports = { apkmirror }