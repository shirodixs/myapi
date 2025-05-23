const axios = require('axios');
const cheerio = require('cheerio');

async function otakudesu(query) {
    const url = `https://otakudesu.cloud/?s=${query}&post_type=anime`;
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const animeList = [];

        $('.chivsrc li').each((index, element) => {
            const title = $(element).find('h2 a').text().trim();
            const link = $(element).find('h2 a').attr('href');
            const imageUrl = $(element).find('img').attr('src');
            const genres = $(element).find('.set').first().text().replace('Genres : ', '').trim();
            const status = $(element).find('.set').eq(1).text().replace('Status : ', '').trim();
            const rating = $(element).find('.set').eq(2).text().replace('Rating : ', '').trim() || 'N/A';

            animeList.push({
                title,
                link,
                imageUrl,
                genres,
                status,
                rating
            });
        });

        return animeList;
    } catch (error) {
        console.error('Error fetching data:', error);
        return { error: 'Error fetching data' };
    }
}

module.exports = { otakudesu }