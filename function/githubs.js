const axios = require('axios');
const cheerio = require('cheerio');

async function decxaScrape(q) {
    try {
        const url = `https://github.com/search?q=${encodeURIComponent(q)}&type=repositories`;
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];

        $('div.Box-sc-g0xbh4-0.MHoGG.search-title').each((index, element) => {
            const url = $(element).find('a.prc-Link-Link-85e08').attr('href');
            const title = $(element).find('span').text().trim();

            $('div.Box-sc-g0xbh4-0.dcdlju').each((index, element) => {
                const desc = $(element).find('span').text().trim();

                $('div.application-main').each((index, element) => {
                    const type = $(element).find('span[aria-label="JavaScript language"]').first().text();

                    results.push({
                        title: title,
                        desc: desc,
                        url: `https://github.com${url}`,
                        type: type
                    });
                });
            });
        });

        return results;
    } catch (error) {
        console.error('Error saat scraping:', error);
        return [];
    }
}

module.exports = { decxaScrape }