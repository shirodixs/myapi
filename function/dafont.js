const cheerio = require('cheerio');

async function dafonts(q) {
    try {
        const response = await fetch(`https://www.dafont.com/search.php?q=${q}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        const $ = cheerio.load(html);
        const results = [];
        const regex = /<div class="lv1left dfbg">.*?<span class="highlight">(.*?)<\/span>.*?by <a href="(.*?)">(.*?)<\/a>.*?<\/div>.*?<div class="lv1right dfbg">.*?<a href="(.*?)">(.*?)<\/a>.*?>(.*?)<\/a>.*?<\/div>.*?<div class="lv2right">.*?<span class="light">(.*?)<\/span>.*?<\/div>.*?<div style="background-image:url\((.*?)\)" class="preview">.*?<a href="(.*?)">/g;

        let match;
        while ((match = regex.exec(html)) !== null) {
            const [, title, authorLink, author, themeLink, theme, , totalDownloads, previewImage, link] = match;
            results.push({
                title: title.trim() || 'Tidak diketahui',
                authorLink: `https://www.dafont.com/${authorLink.trim()}` || 'Tidak diketahui',
                author: author.trim() || 'Tidak diketahui',
                themeLink: `https://www.dafont.com/${themeLink.trim()}` || 'Tidak diketahui',
                theme: theme.trim() || 'Tidak diketahui',
                totalDownloads: totalDownloads.trim().replace(/[^0-9]/g, '') || 'Tidak diketahui',
                previewImage: `https://www.dafont.com${previewImage.trim()}` || 'Tidak diketahui',
                link: `https://www.dafont.com/${link.trim()}` || 'Tidak diketahui',
            });
        }
        return results;
    } catch (error) {
        console.error("Error fetching data from dafont:", error);
        return { error: "Failed to fetch data from dafont." };
    }
}

module.exports = { dafonts }