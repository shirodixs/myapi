const axios = require('axios');
const cheerio = require('cheerio');
const FormData = require('form-data');

async function Tiktok(tturl, type = 'video') {
  try {
    const form = new FormData();
    form.append('q', tturl);
    form.append('TikTokId', '7465110684552940842'); 

    const response = await axios.post('https://tikdownloader.io/api/ajaxSearch', form, {
      headers: {
        ...form.getHeaders(),
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (response.data.status === 'ok') {
      const $ = cheerio.load(response.data.data);
      const title = $('.clearfix').find('h3').text().trim();
      const thumb = $('.image-tik.open-popup').find('img').attr('src');
      const linkSD = $('.dl-action p:nth-child(1)').find('a.tik-button-dl.button.dl-success').attr('href');
      const linkSD2 = $('.tik-right p:nth-child(2)').find('a.tik-button-dl.button.dl-success').attr('href');
      const linkHD = $('.tik-right p:nth-child(3)').find('a.tik-button-dl.button.dl-success').attr('href');
      const linkAUD = $('.dl-action p:nth-child(4)').find('a.tik-button-dl.button.dl-success').attr('href');

      const Foto = [];

      $('.download-items__btn').each((index, element) => {
        const link = $(element).find('a').attr('href');
        if (link) {
          Foto.push(link);
        }
      });
      
      const lagu = $('.dl-action p:nth-child(2)').find('a').attr('href');

      if (type === 'video') {
        return {
          title: title,
          thumb: thumb,
          mp3: linkAUD,
          hasil: {
            hd: linkHD,
            sd: linkSD,
          },
        };
      } else if (type === 'foto') {
        return {
          title: title,
          thumb: thumb,
          hasil: {
            foto: Foto,
            aud: lagu,
          },
        };
      } else {
        return { error: 'Only support video and other videos I dont know'};
      }
    } else {
      return { error: 'Failed try again' };
    }
  } catch (error) {
    console.log('Error:', error);
    return { error: error.message };
  }
}

module.exports = { Tiktok }