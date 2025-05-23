const axios = require('axios');
const cheerio = require('cheerio');

  async function surah(no) {
    return new Promise(async (resolve, reject) => {
      axios.get(`https://kalam.sindonews.com/surah/${encodeURIComponent(no)}`)
        .then(({ data }) => {
          const $ = cheerio.load(data);
          const result = [];
          const ar = [];
          const id = [];
          const lt = [];

          $('div.breadcrumb-new > ul > li:nth-child(5)').each((c, d) => {
            result.audio = $(d).find('a').attr('href').replace('surah', 'audioframe');
          });

          $('div.ayat-arab').each((a, b) => {
            ar.push($(b).text());
          });

          $('li > div.ayat-text').each((e, f) => {
            id.push($(f).text().replace(',', '').trim());
          });

          $('div.ayat-latin').each((g, h) => {
            lt.push($(h).text().trim());
          });

          for (let i = 0; i < ar.length; i++) {
            result.push({
              arab: ar[i],
              indo: id[i],
              latin: lt[i]
            });
          }

          resolve(result);
        })
        .catch(reject);
    });
  }
  
module.exports = { surah }