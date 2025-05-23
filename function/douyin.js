const axios = require('axios');
const FormData = require('form-data');
const cheerio = require('cheerio');

class Douyin {
    async download(url) {
        if (!url) {
            return { error: "Invalid URL" }; 
        }

        try {
            const apiURL = "https://savetik.co/api/ajaxSearch";
            const form = new FormData();
            form.append("q", url);
            form.append("lang", "id");
            form.append("cftoken", "");

            const headers = {
                headers: {
                    ...form.getHeaders()
                }
            };

            const { data } = await axios.post(apiURL, form, headers);

            const $ = cheerio.load(data.data);
            const downloadLinks = [];
            $(".dl-action a").each((i, el) => {
                const link = $(el).attr("href");
                const quality = $(el).text().trim();
                if (link) {
                    downloadLinks.push({ quality, link });
                }
            });

            if (downloadLinks.length === 0) {
                return { error: "No download links found" }; 
            }

            return downloadLinks;

        } catch (error) {
            console.error("Error in Douyin download:", error);
            return { error: error.message || "An error occurred during download" };
        }
    }
}

const douyinInstance = new Douyin();

module.exports = { douyinInstance }