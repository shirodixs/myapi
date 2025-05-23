const axios = require("axios");
const cheerio = require("cheerio");

  async function PlayStore(search) {
    return new Promise(async (resolve, reject) => {
      try {
        const encodedSearch = encodeURIComponent(search);
        const { data, status } = await axios.get(`https://play.google.com/store/search?q=${encodedSearch}&c=apps`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
          }
        });

        if (status !== 200) {
          return resolve({ status: status, message: 'Error fetching data from Play Store' });
        }

        const $ = cheerio.load(data);
        const results = [];

        $('.ULeU3b > .VfPpkd-WsjYwc').each((i, el) => {
          const linkk = $(el).find('a').attr('href');
          const nama = $(el).find('.DdYX5').text() || 'No name';
          const developer = $(el).find('.wMUdtb').text() || 'No Developer';
          const img = $(el).find('img').attr('src') || 'https://i.ibb.co/G7CrCwN/404.png';
          const rate = $(el).find('div[aria-label]').attr('aria-label');
          const link = `https://play.google.com${linkk}`;
          const link_dev = developer ? `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}` : null;

          results.push({ link, nama, developer, img, rate, link_dev });
        });

        if (results.length === 0) {
          return resolve({ status: 200, message: 'No results found' });
        }

        resolve({ status: 200, data: results });

      } catch (err) {
        console.error("Error in playstore function:", err);
        resolve({ status: 500, message: 'An error occurred', error: err.message });
      }
    });
  }
  

module.exports = { PlayStore }