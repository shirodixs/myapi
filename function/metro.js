const axios = require('axios');
const cheerio = require('cheerio');

async function metronews() {
  try {
    const { data } = await axios.get('https://www.metrotvnews.com/news');
    const $ = cheerio.load(data);
    const judul = [];
    const desc = [];
    const link = [];
    const thumb = [];
    const result = [];

    $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > div > h3 > a').each(function(a, b) {
      judul.push($(b).attr('title'));
    });

    $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > div > p').each(function(a, b) {
      const deta = $(b).text();
      desc.push(deta);
    });

    $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > div > h3 > a').each(function(a, b) {
      link.push('https://www.metrotvnews.com' + $(b).attr('href'));
    });

    $('body > div.container.layout > section.content > div > div.item-list.pt-20 > div > img').each(function(a, b) {
      thumb.push($(b).attr('src').replace('w=300', 'w=720'));
    });

    for (let i = 0; i < judul.length; i++) {
      result.push({
        judul: judul[i],
        link: link[i],
        thumb: thumb[i],
        deskripsi: desc[i]
      });
    }
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data: ' + error.message);
  }
}

module.exports = { metronews }