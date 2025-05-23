const axios = require('axios');
const cheerio = require('cheerio');

async function IndoZone() {
    try {
        const res = await axios.get(`https://www.indozone.id/index`, {
            method: 'GET',
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36",
            }
        });

        const hasil = [];
        const $ = cheerio.load(res.data);

        $('ul.news_box.square_box.image-left').each(function(f, d) {
            $(d).find('li').each(function(a, b) {
                let berita = $(b).find('h3').text().replace(/\n/g, '').replace(/  /g, '');
                let berita_url = $(b).find('a').attr('href');
                let berita_thumb = $(b).find('img').attr('src');
                let berita_jenis = $(b).find('div.text').text().replace(/\n/g, '').replace(/      /g, '').slice(4).slice(0, 6).replace(/ /g, '');
                let berita_diupload = $(b).find('div.info.un-i').text().replace(/\n/g, '').replace(/  /g, '');

                if (berita && berita_url && berita_thumb && berita_diupload && berita_jenis) {
                    const result = {
                        berita,
                        berita_url,
                        berita_thumb,
                        berita_diupload,
                        berita_jenis
                    };
                    hasil.push(result);
                }
            });
        });

        let akhir = hasil.filter(v => v.berita_url !== undefined && v.berita_diupload !== '');

        return akhir;

    } catch (error) {
        console.error("Error scraping IndoZone:", error.message);
        return { error: "Gagal mengambil data dari IndoZone. Silakan coba lagi nanti." };
    }
}

module.exports = { IndoZone }