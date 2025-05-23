const axios = require('axios');
const cheerio = require('cheerio');


async function Kontan() {
    try {
        const res = await axios.request(`https://www.kontan.co.id/`, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
            }
        });
        let hasil = [];
        const $ = cheerio.load(res.data);
        $("div.news-list > ul > li").each(function(a, b) {
            let berita = $(b).find("div.box-news.fleft > a > h1").text();
            let berita_url = $(b).find("a").attr("href");
            let berita_thumb = $(b).find("div.image-thumb").find("img").attr("data-src");
            let berita_jenis = $(b).find("a.link-orange").text();
            let berita_diupload = "";
            try {
              const text = $(b).find("div.box-news.fleft").text();
              const match = text.match(/\| (.*)/);
              if (match && match[1]) {
                  berita_diupload = match[1].trim();
              }
            } catch (err) {
              console.error("Gagal mengekstrak berita_diupload:", err);
              berita_diupload = "Tidak Diketahui";
            }

            const result = {
                berita,
                berita_url,
                berita_thumb,
                berita_jenis,
                berita_diupload
            };
            hasil.push(result);
        });
        var filter = hasil.filter(v => v.berita !== "" && v.berita_diupload !== "Tidak Diketahui");
        return filter;
    } catch (e) {
        console.error("Error scraping Kontan:", e.message);
        return { error: "Gagal mengambil data dari Kontan. Silakan coba lagi nanti." };
    }
}

module.exports = { Kontan }
