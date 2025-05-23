const axios = require("axios");
const cheerio = require("cheerio");

class AntaraNews {
  constructor() {
    this.BASE_URL = "https://www.antaranews.com";
  }

  async request(url) {
    let { data } = await axios.get(url, {
      headers: {
        referer: "https://www.google.com/",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36",
      },
    });
    return cheerio.load(data);
  }

  async home() {
    const $ = await this.request(this.BASE_URL);
    let result = [];

    $(".popular__section-news .col-md-6").each((i, e) => {
      let title = $(e).find(".card__post__title").text().trim();
      let uploaded = $(e).find(".list-inline-item").text().trim();
      let url = $(e).find(".card__post__title a").attr("href");
      let img = $(e).find("img").attr("data-src");
      result.push({ title, uploaded, url, img });
    });

    $(".wrapper__list__article .mb-3").each((i, e) => {
      let title = $(e).find(".card__post__title").text().trim();
      let uploaded = $(e).find(".list-inline-item").text().trim();
      let url = $(e).find(".card__post__title a").attr("href");
      let img = $(e).find("img").attr("data-src");
      result.push({ title, uploaded, url, img });
    });

    return result;
  }
}

const antaraNews = new AntaraNews();


module.exports = { antaraNews }