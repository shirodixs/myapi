const axios = require('axios');
const cheerio = require('cheerio');

  async function liputan6() {
    try {
      const AvoskyBaik = await axios.get('https://www.liputan6.com/');
      const $ = cheerio.load(AvoskyBaik.data);

      const latestNews = $('.articles--iridescent-list').eq(2).find('article');
      const results = [];

      latestNews.each(function () {
        try {
          const title = $(this).find('figure a').attr('title');
          const link = $(this).find('figure a').attr('href');
          const image = $(this).find('figure a picture img').attr('data-src');
          const tag = $(this).find('aside header a').text();

          results.push({ title, link, tag, image, source: 'liputan6' });
        } catch (e) {
          console.error('Error scraping article:', e);
        }
      });

      return results;
    } catch (error) {
      console.error('Error fetching:', error);
      return [];
    }
  }
  
  module.exports = { liputan6 }