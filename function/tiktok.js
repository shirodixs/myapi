const axios = require('axios');
const cheerio = require('cheerio');

const TiktokData = async (url) => {
    try {
        const response = await axios.post('https://ttsave.app/download', {
            query: url,
            language_id: '2'
        }, {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            }
        });

        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const $ = cheerio.load(response.data);

        const title = $('h2').text().trim();
        const username = $('a[title]').text().trim();
        const description = $('p.text-gray-600').text().trim();
        const video = $('a[type="no-watermark"]').attr('href');
        const audio = $('a[type="audio"]').attr('href');
        const slides = $('a[type="slide"]').map((i, el) => ({
            number: i + 1,
            url: $(el).attr('href')
        })).get();
        

        return {
            title,
            username,
            description,
            video,
            audio,
            slides
        };
    } catch (error) {
        console.error("Error extracting data:", error);
        throw error;
    }
};

module.exports = { TiktokData }