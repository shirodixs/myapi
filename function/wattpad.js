const cheerio = require('cheerio');
const axios = require('axios');

async function wattpad(query) {
    return new Promise((resolve, reject) => {
        axios.get('https://www.wattpad.com/search/' + query)
            .then(({ data }) => {
                const $ = cheerio.load(data);
                const result = [];
                const linkk = [];
                const judull = [];
                const thumb = [];
                const dibaca = [];
                const vote = [];

                $('ul.list-group > li.list-group-item').each((a, b) => {
                    linkk.push('https://www.wattpad.com' + $(b).find('a').attr('href'));
                    thumb.push($(b).find('img').attr('src'));
                });

                $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(1) > div.icon-container > div > span.stats-value').each((e, f) => {
                    dibaca.push($(f).text());
                });

                $('div.story-card-data.hidden-xxs > div.story-info > ul > li:nth-child(2) > div.icon-container > div > span.stats-value').each((g, h) => {
                    vote.push($(h).text());
                });

                $('div.story-card-data.hidden-xxs > div.story-info > div.title').each((c, d) => {
                    judull.push($(d).text().trim());
                });

                for (let i = 0; i < linkk.length; i++) {
                    if (judull[i]) {
                        result.push({
                            judul: judull[i],
                            dibaca: dibaca[i] || "N/A",
                            divote: vote[i] || "N/A",
                            thumb: thumb[i] || "N/A",
                            link: linkk[i]
                        });
                    }
                }

                resolve(result);
            })
            .catch(reject);
    });
}

module.exports = { wattpad }