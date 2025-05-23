const cheerio = require('cheerio');
const axios = require('axios');

async function webtoons(query) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.webtoons.com/id/search?keyword=${query}`)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const judul = [];
                const genre = [];
                const author = [];
                const link = [];
                const likes = [];
                const result = [];

                $('#content > div > ul > li > a > div > p.subj').each((a, b) => {
                    judul.push($(b).text());
                });

                $('div > ul > li > a > span').each((a, b) => {
                    genre.push($(b).text());
                });

                $('div > ul > li > a > div > p.author').each((a, b) => {
                    author.push($(b).text());
                });

                $('div > ul > li > a > div > p.grade_area > em').each((a, b) => {
                    likes.push($(b).text());
                });

                $('#content > div > ul > li > a').each((a, b) => {
                    link.push($(b).attr('href'));
                });

                for (let i = 0; i < judul.length; i++) {
                    result.push({
                        judul: judul[i] || "Tidak tersedia",
                        genre: genre[i] || "Tidak tersedia",
                        author: author[i] || "Tidak tersedia",
                        likes: likes[i] || "Tidak tersedia",
                        link: link[i] ? `https://www.webtoons.com${link[i]}` : "Tidak tersedia"
                    });
                }

                if (result.length === 0) {
                    resolve({ status: `${query} tidak ditemukan atau terjadi error.` });
                } else {
                    resolve(result);
                }
            })
            .catch(reject);
    });
}

module.exports = { webtoons }