const https = require('https');
const cheerio = require('cheerio');

async function downloadGram(urlInsta) {
const payload = new URLSearchParams();
payload.append('url', urlInsta);
payload.append('v', '3');
payload.append('lang', 'id');

const requestData = {
hostname: 'api.downloadgram.org',
path: '/media',
method: 'POST',
headers: {
'accept-language': 'id-ID',
'content-length': payload.toString().length,
'content-type': 'application/x-www-form-urlencoded',
'origin': 'https://downloadgram.org',
'priority': 'u=0',
'referer': 'https://downloadgram.org/',
'sec-fetch-dest': 'empty',
'sec-fetch-mode': 'cors',
'sec-fetch-site': 'same-site',
'te': 'trailers',
'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
}
};

return new Promise((resolve, reject) => {
const req = https.request(requestData, (res) => {
let responseData = '';
res.on('data', (chunk) => {
responseData += chunk;
});

res.on('end', () => {
const $ = cheerio.load(responseData);
const resultData = {};

const videoElement = $('video');
if (videoElement.length > 0) {
resultData.urlVideo = videoElement.find('source').attr('src');
resultData.urlButton = $('a[download]').attr('href');
} else {
const imageElement = $('img');
if (imageElement.length > 0) {
resultData.urlImage = imageElement.attr('src');
resultData.urlButton = $('a[download]').attr('href');
}
}

Object.keys(resultData).forEach((i) => {
if (resultData[i]) {
resultData[i] = resultData[i].replace(/\\\\"/g, '').replace(/\\"/g, '');
}
});

resolve(resultData);
});
});

req.on('error', (error) => {
console.log(error);
reject(error.message);
});

req.write(payload.toString());
req.end();
});
}


module.exports = { downloadGram }