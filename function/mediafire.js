const cheerio = require('cheerio')
const fetch = require('node-fetch')
const mime = require('mime-types')

async function mediaFire(url) {
  try {
    const response = await fetch('https://r.jina.ai/' + url, {
      headers: {
        'x-return-format': 'html'
      }
    })
    const text = await response.text()
    const $ = cheerio.load(text)

    const Time = $('div.DLExtraInfo-uploadLocation div.DLExtraInfo-sectionDetails').text().match(/This file was uploaded from (.*?) on (.*?) at (.*?)\n/)
    const downloadUrl = $('a#downloadButton').attr('href')

    const result = {
      title: $('div.dl-btn-label').text().trim(),
      filename: $('div.dl-btn-label').attr('title'),
      size: $('a#downloadButton').text().match(/\((.*?)\)/)[1],
      extension: mime.extension(mime.lookup(downloadUrl) || ''),
      mimetype: mime.lookup(downloadUrl) || '',
      download: downloadUrl,
      repair: $('a.retry').attr('href'),
    }

    return result
  } catch (err) {
    throw Error(err.message)
  }
}

async function mfdl(url) {
    try {
        const apiUrl = `https://api.hiuraa.my.id/downloader/mediafire?url=${encodeURIComponent(url)}`;
        const response = await axios.get(apiUrl);

        if (!response.data.status) {
            throw new Error("Failed to fetch data from API");
        }

        const result = response.data.result;

        const filename = result.filename;
        const size = result.size;
        const mimetype = result.mimetype;
        const download = result.downloadUrl;
        const repair = result.repairUrl;

        return {
            filename,
            size,
            mimetype,
            download,
            repair,
        };
    } catch (error) {
        console.error("Error in mediaFire function:", error);
        return {
            error: "Failed to retrieve data from the link",
            details: error.message,
        };
    }
}

module.exports = { mediaFire, mfdl }