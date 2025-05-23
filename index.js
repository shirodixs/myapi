require("./settings.js")
const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 4000;
const axios = require("axios")
const sharp = require("sharp");
const fetch = require("node-fetch");
const scp2 = require("imon-videos-downloader")
const scp = require("caliph-api")
const yts = require('yt-search');
const baseUrl = 'https://news-api-zhirrr.vercel.app/v1/cnn-news';
const handleError = (res, error, customMessage = 'Failed to retrieve data.') => {
console.error('Error:', error);
res.status(500).json({ error: customMessage });
};
const { convertCRC16, generateTransactionId, generateExpirationTime, elxyzFile, generateQRIS, createQRIS, checkQRISStatus } = require('./function/orkut.js') 
const { fetchContent } = require('./function/luminai.js')
const { android1 } = require('./function/android.js')
const { onlyanimenews } = require('./function/anime.js')
const { antaraNews } = require('./function/antara.js')
const { Apk4Free } = require('./function/apk4free.js')
const { apkmirror } = require('./function/apkmirror.js')
const { bacaresep } = require('./function/bacaresep.js')
const { bingsearch } = require('./function/bing.js')
const { blackbox } = require('./function/blackbox.js')
const { bluearchive } = require('./function/bluearchive.js')
const { BukaLapak } = require('./function/bukalapak.js')
const { capcutdown, capcutdl } = require('./function/capcut.js')
const { searchgc } = require('./function/carigc.js')
const { cerpen } = require('./function/cerpen.js')
const { dafonts } = require('./function/dafont.js')
const { deepSeekCoder } = require('./function/deepseek.js')
const { DetikNews } = require('./function/detik.js')
const { doodS } = require('./function/doodstream.js')
const { DoppleAi } = require('./function/doppleai.js')
const { douyinInstance } = require('./function/douyin.js')
const { remini } = require('./function/remini.js')
const { enhance } = require('./function/enhance.js')
const { getFacebookVideo } = require('./function/fb.js')
const { fetchFluxImage, fetchFluxAi } = require('./function/flux.js')
const { gema } = require('./function/gema.js')
const { gemini } = require('./function/gemini.js')
const { googleImage } = require('./function/gimage.js')
const { githubdl } = require('./function/github.js')
const { decxaScrape } = require('./function/githubs.js')
const { degreeGuru } = require('./function/guruai.js')
const { hertaa } = require('./function/herta.js')
const { hoshino } = require('./function/hoshino.js')
const { snapinst } = require('./function/igdl.js')
const { IndoZone } = require('./function/indozone.js')
const { downloadGram } = require('./function/instagram.js')
const { jktNews } = require('./function/jktnews.js')
const { jadwalSolat } = require('./function/jsholat.js')
const { getSearch } = require('./function/komikindo.js')
const { Kontan } = require('./function/kontan.js')
const { liputan6 } = require('./function/liputan6.js')
const { lirikLagu } = require('./function/liriklagu.js')
const { mediaFire, mfdl } = require('./function/mediafire.js')
const { meta } = require('./function/meta.js')
const { metronews } = require('./function/metro.js')
const { mistral } = require('./function/mistral.js')
const { muslimai } = require('./function/muslimai.js')
const { groq } = require('./function/openai.js')
const { otakudesu } = require('./function/otakudesu.js')
const { pinterest } = require('./function/pin.js')
const { PlayStore } = require('./function/playstore.js')
const { quotesAnime } = require('./function/quotes.js')
const { qwenai } = require('./function/qwen.js')
const { recolor } = require('./function/recolor.js')
const { RemoveBG } = require('./function/removebg.js')
const { cariresep } = require('./function/resep.js')
const { savePin } = require('./function/savepin.js')
const { shortUrl } = require('./function/shortlink.js')
const { chatSimi } = require('./function/simi.js')
const { souncloudDl } = require('./function/soundcloud.js')
const { spotiDown } = require('./function/spotify.js')
const { spotidown } = require('./function/spotifydl.js')
const { surah } = require('./function/surah.js')
const { text2img, txt2img } = require('./function/text2img.js')
const { TiktokData } = require('./function/tiktok.js')
const { ttSearch } = require('./function/tiktoks.js')
const { PixNova } = require('./function/toanime.js')
const { translate } = require('./function/translate.js')
const { savetwitter } = require('./function/twitter.js')
const { Upscale } = require('./function/upscale.js')
const { wattpad } = require('./function/wattpad.js')
const { webtoons } = require('./function/webtoons.js')
const { wikimedia } = require('./function/wikimedia.js')
const { wikipedia } = require('./function/wikipedia.js')
const { yousearch } = require('./function/yousearch.js')
const { savetube } = require('./function/youtube.js')
const { zeta } = require('./function/zeta.js')
const { searchApkCombo } = require('./function/apkcombo.js')
const { HalodocArticle } = require('./function/halodokter.js')
const { convertToSketch } = require('./function/imgtosketch.js')
const { stickersearch } = require('./function/stiker.js')
const { searchSpotifyTracks } = require('./function/spotifys.js')
const { spotify } = require('./function/spotifysearch.js')
const { Tiktok } = require('./function/tikdownloader.js')
const { aoyo, gpt4, gpt3 } = require("./function/hiuraa.js");
const { amdl } = require('./function/amdl.js')
const { img2txt } = require('./function/img2txt.js')
const { igdown } = require('./function/igdownload.js')
const { picsArt } = require('./function/upscaler.js')
const { emojimix } = require('./function/emojimix.js')
const { threadsdown } = require('./function/threads.js')
const { getBuffer } = require('./function/buffer.js')

app.enable("trust proxy");
app.set("json spaces", 2);
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.raw({ limit: '50mb', type: '*/*' }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.get('/dashboard', (req, res) => {
res.sendFile(path.join(__dirname, 'public/dashboard.html'));
});

app.get("/tools/bratimage", async (req, res) => {
try { 
const { text } = req.query;
if (!text) return res.json({ status: false, message: "Text is required" });

const imageUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=false&delay=500`;

const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
if (!response.data) return res.json({ status: false, message: "Error fetching image" });

res.set("Content-Type", "image/png");
res.send(response.data);
} catch (error) {
console.error(error);
res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
}
});

app.get("/tools/bratvideo", async (req, res) => {
try { 
const { text } = req.query;
if (!text) return res.json({ status: false, message: "Text is required" });

const videoUrl = `https://api.siputzx.my.id/api/m/brat?text=${encodeURIComponent(text)}&isVideo=true&delay=500`;

const response = await axios.get(videoUrl, { responseType: "arraybuffer" });
if (!response.data) return res.json({ status: false, message: "Error fetching video" });

res.set("Content-Type", "video/mp4");
res.send(response.data);
} catch (error) {
console.error(error);
res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
}
});

app.get('/orkut/createpayment', async (req, res) => {
const { amount, codeqr } = req.query;

if (!amount || !codeqr) {
return res.json("Missing required parameters: amount or QR code.");
}

try {
const qrData = await createQRIS(amount, codeqr);
res.json({ status: true, result: qrData });
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/orkut/cekstatus', async (req, res) => {
const { merchant, keyorkut } = req.query;

if (!merchant || !keyorkut) {
return res.json("Missing required parameters: merchant or keyorkut.");
}

try {
const apiUrl = `https://gateway.okeconnect.com/api/mutasi/qris/${merchant}/${keyorkut}`;
const response = await axios.get(apiUrl);
const latestTransaction = response.data?.data?.[0] || { message: "No transactions found." };
res.json(latestTransaction);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/tools/upscaler', async (req, res) => {
const { url } = req.query;
if (!url) return res.status(400).json({ message: 'URL is required.' });

try {
const result = await picsArt.processImage(url);

if (!result.status) {
return res.status(result.code).json({ message: result.message });
}

const imageUrl = result.results.image;
const imageBuffer = await picsArt.dlImage(imageUrl);

if (!imageBuffer.status) {
return res.status(imageBuffer.code).json({ message: imageBuffer.message });
}

res.set({
'Content-Type': 'image/jpeg',
'Content-Disposition': 'inline; filename="enhanced_image.jpg"',
});

return res.send(imageBuffer.data);
} catch (error) {
console.error('Error:', error);
return res.status(500).json({ message: 'Something went wrong!' });
}
});

app.get("/downloader/igdownload", async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: "URL is required" });
}

try {
const result = await igdown(url);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get("/tools/imgprompt", async (req, res) => {
const { image } = req.query;

if (!image) {
return res.status(400).json({ error: "URL image is required" });
}

const result = await img2txt(image);

if (!result) {
return res.status(500).json({ error: "Failed to process image" });
}

res.json({
status: 200, 
creator: global.creator,
data: result
});
});

app.get('/downloader/ytvideo', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({
status: false,
code: 400,
result: {
error: "Missing parameters. please provide the URL."
}
});
}

try {
const result = await amdl.download(url, '480p');
res.status(result.code).json(result);
} catch (error) {
res.status(500).json({
status: false,
code: 500,
result: { error: "Internal server error." }
});
}
});

app.get('/downloader/ytaudio', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({
status: false,
code: 400,
result: {
error: "Missing parameters. please provide the URL."
}
});
}

try {
const result = await amdl.download(url, 'mp3');
res.status(result.code).json(result);
} catch (error) {
res.status(500).json({
status: false,
code: 500,
result: { error: "Internal server error." }
});
}
});

app.get("/ai/aoyo", async (req, res) => {
const { message } = req.query;
if (!message) {
return res.status(400).json({ error: "Message is required" });
}

try {
const result = await aoyo(message);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: "An error occurred while processing the request" });
}
});

app.get("/ai/gpt4", async (req, res) => {
const { message } = req.query;
if (!message) {
return res.status(400).json({ error: "Message is required" });
}

try {
const result = await gpt4(message);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: "An error occurred while processing the request" });
}
});


app.get("/ai/gpt3", async (req, res) => {
const { message } = req.query;
if (!message) {
return res.status(400).json({ error: "Message is required" });
}

try {
const result = await gpt3(message);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: "An error occurred while processing the request" });
}
});


app.get("/ai/fluximg", async (req, res) => {
const { prompt } = req.query;
if (!prompt) {
return res.status(400).json({ error: "Text query parameter is required" });
}

try {
const imageBuffer = await fetchFluxImage(prompt);
res.set("Content-Type", "image/png");
res.send(imageBuffer);
} catch (error) {
res.status(500).json({ error: "Failed to fetch image" });
}
});

app.get("/ai/flux", async (req, res) => {
const { prompt } = req.query;
if (!prompt) {
return res.status(400).json({ error: "Text query parameter is required" });
}

try {
const imageBuffer = await fetchFluxAi(prompt);
res.set("Content-Type", "image/png");
res.send(imageBuffer);
} catch (error) {
res.status(500).json({ error: "Failed to fetch image" });
}
});


app.get('/ai/aiimage', async (req, res) => {
try {
const text = req.query.text;
if (!text) {
return res.status(400).json({ error: 'Text query parameter is required.' });
}


const apiUrl = `https://api.hiuraa.my.id/ai-img/imagen?text=${encodeURIComponent(text)}`;
const apiResponse = await axios.get(apiUrl, { responseType: 'arraybuffer' });


const imageBuffer = Buffer.from(apiResponse.data, 'binary');

res.setHeader('Content-Type', 'image/png');
res.send(imageBuffer);
} catch (error) {
console.error('Error:', error.message || error);
res.status(500).json({ error: 'Failed to generate image.', details: error.message });
}
});


app.get("/ai/cloudflareai", async (req, res) => {
const { prompt } = req.query;
if (!prompt) {
return res.status(400).json({ success: false, message: "Prompt is required" });
}

const apiUrl = `https://api.siputzx.my.id/api/cf/chat?prompt=${encodeURIComponent(prompt)}&system=${encodeURIComponent("saya ingin nama kamu adalah cloudflare AI dan kamu di buat oleh platform cloudflare")}`;

try {
const response = await fetch(apiUrl);
const data = await response.json();

if (data.success) {
res.json({
status: 200, 
creator: global.creator,
data: data.data.response
});
} else {
res.status(500).json({ success: false, message: "API response unsuccessful" });
}
} catch (error) {
res.status(500).json({ success: false, message: "Error fetching data", error: error.message });
}
});

app.get('/berita/cnbc', async (req, res) => {
try {
const cnbcUrl = 'https://news-api-zhirrr.vercel.app/v1/cnbc-news';
const response = await axios.get(cnbcUrl);
res.json(response.data);
} catch (error) {
console.error('Error fetching data from CNBC News:', error);
res.status(500).json({ error: 'Failed to fetch data' });
}
});

app.get('/downloader/tiktokdl', async (req, res) => {
try {
const { url, type } = req.query;
if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

const result = await Tiktok(url, type);
res.json({
status: 200,
creator: global.creator,
data: result 
});
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/tools/imgtosketch', async (req, res) => {
const imageUrl = req.query.imageUrl;

if (!imageUrl) {
return res.status(400).send("URL image is required");
}

try {
const imageBuffer = await convertToSketch(imageUrl);
res.setHeader('Content-Type', 'image/jpeg');
res.send(imageBuffer);
} catch (error) {
res.status(500).send(error.message);
}
});


app.get('/search/halodoc', async (req, res) => {
const query = req.query.query;

if (!query) {
return res.status(400).json({ error: "Query parameter is required" });
}

try {
const result = await HalodocArticle(query);
res.json(result);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/search/apkcombo', async (req, res) => {
const query = req.query.query;

if (!query) {
return res.status(400).json({ error: "Query parameter is required" });
}

try {
const result = await searchApkCombo(query);
res.json(result);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/downloader/threads', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required!' });
}

try {
const result = await threadsdown(url);
res.json({
status: 200,
creator: global.creator,
data: result,
});
} catch (err) {
res.status(500).json({
success: false,
error: 'Failed to fetch threads data',
details: err.message,
});
}
});

app.get('/ai/luminai', async (req, res) => {
try {
const { message } = req.query;
if (!message) {
return res.status(400).json({ status: false, error: 'Message is required.' });
}
const { result } = await fetchContent(message);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ status: false, error: error.message });
}
});

app.get('/search/android', async (req, res) => {
const { query } = req.query;

if (!query) {
return res.status(400).json({ error: 'Query is required.' });
}

try {
const data = await android1(query);
res.json({
status: 200, 
creator: global.creator,
data: data
})
} catch (error) {
res.status(500).json({ error: 'Failed to fetch data', details: error.message });
}
});

app.get('/berita/anime', async (req, res) => {
try {
const animeNews = await onlyanimenews();
res.json({
status: 200, 
creator: global.creator,
data: animeNews
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'Failed to fetch anime news' }); // Send error response
}
});

app.get("/berita/antara", async (req, res) => {
try {
const data = await antaraNews.home();
res.json({
status: 200, 
creator: global.creator,
data: data
});
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/search/apkfree', async (req, res) => {
try {
const query = req.query.query;
if (!query) {
return res.status(400).json({ error: "Query is required." });
}
const result = await Apk4Free.search(query);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: "Failed to fetch data", details: error.message });
}
});

app.get('/search/apkmirror', async (req, res) => {
const query = req.query.query;
if (!query) return res.status(400).json({ error: "Query is required" });

try {
const result = await apkmirror(query);
res.json({
status: 200, 
creator: global.creator, 
data: result
});
} catch (error) {
res.status(500).json({ error: 'Failed to fetch data' });
}
});

app.get('/search/bacaresep', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required.' });
}

try {
const data = await bacaresep(url);
res.json({
status: 200, 
creator: global.creator,
data: data
})
} catch (error) {
res.status(500).json({ error: 'Failed to fetch data', details: error.message });
}
});

app.get('/search/bing', async (req, res) => {
const search = req.query.search;

if (!search) {
return res.status(400).json({ error: 'Search is required.' });
}

try {
const results = await bingsearch(search);
res.json({
status: 200,
creator: global.creator,
data: results
});
} catch (error) {
console.error('Error in endpoint:', error);
res.status(500).json({ error: 'An error occurred while processing the request.' });
}
});

app.get('/ai/blackbox', async (req, res) => {
const { message } = req.query;

if (!message) {
return res.status(400).json({ error: 'Message is required' });
}

try {
const result = await blackbox(message);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
console.error('Error fetching response from Blackbox AI:', error.message);
res.status(500).json({ error: 'Failed to retrieve data from Blackbox AI' });
}
});


app.get('/search/bluearchive', async (req, res) => {
try {
const pedo = await bluearchive();
res.writeHead(200, {
'Content-Type': 'image/png',
'Content-Length': pedo.length,
});
res.end(pedo);
} catch (error) {
res.status(500).send(`Error: ${error.message}`);
}
});

app.get('/search/bukalapak', async (req, res) => {
const search = req.query.search;

if (!search) {
return res.status(400).json({ error: 'Search is required.' });
}

try {
 const data = await BukaLapak(search);
res.json({
status: 200, 
creator: global.creator,
data: data
})
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'A server error occurred.' });
}
});

app.get('/downloader/capcut', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

const result = await capcutdl(url);

if (!result) {
return res.status(500).json({ error: 'Failed to fetch video data' });
}

res.json({
status: 200, 
creator: global.creator,
data: result
});
});

app.get('/downloader/capcutdl', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

const result = await capcutdown(url);

if (!result) {
return res.status(500).json({ error: 'Failed to fetch video data' });
}

res.json({
status: 200, 
creator: global.creator,
data: result
});
});

app.get('/search/gc', async (req, res) => {
const query = req.query.query;
if (!query) {
return res.status(400).json({ error: 'Query is required.' });
}

const result = await searchgc(query);
res.json({
status: 200,
creator: global.creator,
data: result
});
});



app.get('/search/cerpen', async (req, res) => {
const { category } = req.query;

if (!category) {
return res.status(400).json({ error: 'Category is required.' });
}

try {
const data = await cerpen(category);
res.json({
status: 200, 
creator: global.creator,
data: data
})
} catch (error) {
res.status(500).json({ error: 'Failed to fetch data', details: error.message });
}
});

app.get('/berita/cnn', async (req, res) => {
const type = req.query.type; // Get the 'type' query parameter

let apiUrl = baseUrl;
if (type) {
apiUrl += `/${encodeURIComponent(type)}`; // Append and encode the type
}

try {
const response = await axios.get(apiUrl);

if (response.status === 200 && response.data && response.data.data && Array.isArray(response.data.data.posts)) {
const formattedData = response.data.data.posts.map(post => ({
title: post.title,
link: post.link,
thumbnail: post.thumbnail,
description: post.description,
pubDate: post.pubDate,
}));
res.status(200).json({
status: 200,
creator: global.creator,
data: formattedData
});
} else if (response.status === 200 && response.data && response.data.data) { // For detail
res.status(200).json({
status: 200,
creator: global.creator,
data: response.data.data
});
}
else {
handleError(res, new Error('Unexpected response from external API'), 'Unexpected response from external API');
}
} catch (error) {
if (error.response && error.response.status === 404) {
res.status(404).json({ error: 'News type not found.' }); // Use res.status().json()
return;
}
handleError(res, error);
}
});


app.get('/search/dafonts', async (req, res) => {
const search = req.query.search;

if (!search) {
return res.status(400).json({ error: 'Search is required.' });
}

try {
const results = await dafonts(search);
if (results.error) { // Check if the result is an error object
 return res.status(500).json({ error: results.error });
}
res.json({
status: 200, 
creator: global.creator,
data: results
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'An unexpected error occurred.' });
}
});

app.get('/ai/deepseek', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await deepSeekCoder.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});


app.get('/berita/detiknews', async (req, res) => {
try {
const data = await DetikNews();
res.json({
status: true, 
creator: global.creator,
data: data
})
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'Failed to fetch data' });
}
});

app.get("/downloader/doodstream", async (req, res) => {
const { url } = req.query;
if (!url) return res.json("URL is required");

try {
var anu = await doodS(`${url}`)

res.json({
status: 200, 
creator: global.creator,
data: anu
});
} catch (error) {
console.error(error);
res.status(500).json({ error: "An error occurred while fetching data." });
}
});

app.get('/ai/dopple', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: 'Message is required.' });
}

try {
const response = await DoppleAi(message);
if (response) {
 res.json({
 status: 200, 
 creator: global.creator,
 data: response
 });
} else {
res.status(500).json({ error: "No response from Dopple AI" });
}
} catch (error) {
console.error("API Error:", error);
res.status(500).json({ error: 'An error occurred' });
}
});


app.get('/downloader/douyin', async (req, res) => {
try {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: "URL is required" });
}

const downloadResult = await douyinInstance.download(url);

if (downloadResult && downloadResult.error) {
return res.status(404).json(downloadResult);
}
res.json({
status: 200, 
creator: global.creator,
data: downloadResult
});
} catch (error) {
console.error("Error in download endpoint:", error);
res.status(500).json({ error: "Internal server error" });
}
});

app.get('/tools/emojimix', async (req, res) => {
const { emoji1, emoji2 } = req.query;

if (!emoji1 || !emoji2) {
return res.status(400).json({ error: 'Emoji1 and Emoji2 are required!' });
}

try {
const result = await emojimix(emoji1, emoji2);
res.set('Content-Type', result.type);
res.send(result.buffer);
} catch (err) {
res.status(500).json({ error: 'Failed to create emoji mix', details: err.message });
}
});

app.get('/tools/enhance', async (req, res) => {
try {
const { url, method = 'enhance' } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required.' });
}

const response = await axios.get(url, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(response.data, 'binary');

const processedImage = await enhance(imageBuffer, method);

res.set('Content-Type', 'image/jpeg');
res.send(processedImage);
} catch (error) {
console.error('Error:', error);
res.status(500).json({ error: 'Failed to process image' });
}
});


app.get('/downloader/fb', async (req, res) => {
const { url } = req.query;
if (!url) {
return res.status(400).json({ error: 'URL diperlukan.' });
}

try {
const data = await getFacebookVideo(url);
res.json({
status: 200,
creator: 'shiro',
data: data,
});
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get("/downloader/gdrive", async (req, res) => {
const { url } = req.query;
if (!url) return res.json("URL is required");

try {
var anu = await scp2.GDLink(`${url}`)
res.json({
status: 200, 
creator: global.creator,
data: anu.data
});
} catch (error) {
console.log(error);
res.status(500).json({ error: "An error occurred while fetching data." });
}
});

app.get('/ai/gemma', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await gema.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});

app.get('/ai/gemini', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await gemini.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});

app.get('/tools/autogempa', async (req, res) => {
try {
const response = await axios.get('https://data.bmkg.go.id/DataMKG/TEWS/autogempa.json');
res.json({
status: 200, 
creator: global.creator,
data: response.data
})
} catch (error) {
console.error(error);
res.status(500).json({ error: 'Failed to retrieve data from BMKG' });
}
});

app.get("/search/gimage", async (req, res) => {
try { 
const { search } = req.query
if (!search) return res.json("Search is required.");
const result = await googleImage(search)
if (!result) return res.json("Error!");
res.json({
status: 200, 
creator: global.creator,
data: result
})
} catch (error) {
console.log(error);
res.send(error)
}
})

app.get('/downloader/githubdl', async (req, res) => {
try {
const url = req.query.url;
if (!url) {
return res.status(400).json({ error: 'URL is required.' });
}

const result = await githubdl(url);
res.json({
status: 200, 
creator: global.creator, 
data: result
});
} catch (error) {
console.error('There is an error:', error);
res.status(500).json({ error: error.message });
}
});

app.get('/search/github', async (req, res) => {
const query = req.query.query;
if (!query) {
return res.status(400).json({ error: 'Query is required.' });
}

const results = await decxaScrape(query);
res.json({
status: 200, 
creator: global.creator, 
data: results
});
});

app.get('/ai/degreeguru', async (req, res) => {
const { message } = req.query;

if (!message) {
return res.status(400).json({ error: 'Message is required.' });
}

try {
const response = await degreeGuru(message);
res.json({
status: 200, 
creator: global.creator,
data: response
})
} catch (error) {
res.status(500).json({ error: 'Failed to contact degree guru', details: error.message });
}
});

app.get("/search/happymod", async (req, res) => {
try { 
const { search } = req.query
if (!search) return res.json("Search is required");
let result = await scp.search.happymod(search)
result = result.result.map((e) => {
return { icon: e.thumb, name: e.title, link: e.link }
 })
if (!result) return res.json("Error!");
res.json({
status: 200, 
creator: global.creator,
data: result
})
} catch (error) {
console.log(error);
res.send(error)
}
})

app.get('/ai/hertaa', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await hertaa.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});


app.get('/ai/hoshino', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await hoshino.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});

app.get('/downloader/instagram', async (req, res) => {
try {
const { url } = req.query;
if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

const result = await snapinst.app(url);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: 'There is an error', details: error.message });
}
});

app.get('/berita/indozone', async (req, res) => {
const data = await IndoZone();
if (data.error) {
return res.status(500).json({ error: data.error });
} else {
return res.json({
status: true, 
creator: global.creator,
data: data
});
}
});


app.get('/downloader/ig', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required.' });
}

try {
const result = await downloadGram(url);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: 'Failed to fetch data', detail: error });
}
});

app.get("/berita/jkt", async (req, res) => {
try {
const news = await jktNews();
res.json({
status: true, 
creator: global.creator,
data: news
})
} catch (error) {
console.error("Terjadi kesalahan di endpoint:", error);
res.status(500).json({ error: "Gagal mengambil berita" });
}
});

app.get('/search/jadwalsolat', async (req, res) => {
const { kota } = req.query;

if (!kota) {
return res.status(400).json({ error: "City parameter is required." });
}

const data = await jadwalSolat(kota);
res.json({
status: 200,
creator: global.creator,
data: data
});
});

app.get('/search/komikindo', async (req, res) => {
const search = req.query.search;
if (!search) {
return res.status(400).json({ error: 'Search is required' });
}

try {
const searchResults = await getSearch(search);
res.json({
status: 200, 
creator: global.creator,
data: searchResults
});
} catch (error) {
res.status(500).json({ error: error.message });
}
})

app.get('/berita/kontan', async (req, res) => {
const data = await Kontan();
if (data.error) {
return res.status(500).json({ error: data.error });
} else {
return res.json({
status: true, 
creator: global.creator,
data: data
});
}
});

app.get('/berita/kumparan', async (req, res) => {
try {
const kumparanUrl = 'https://news-api-zhirrr.vercel.app/v1/kumparan-news';
const response = await axios.get(kumparanUrl);
res.json(response.data);
} catch (error) {
console.error('Error fetching data from Kumparan News:', error);
res.status(500).json({ error: 'Failed to fetch data' });
}
});

app.get('/berita/liputan6', async (req, res) => {
try {
const data = await liputan6();
if (data.length === 0) {
return res.status(404).json({ message: 'No recent news found.' });
}

res.status(200).json({
status: 200,
creator: global.creator,
data: data
});
} catch (error) {
res.status(500).json({ error: 'An error occurred while retrieving data.' });
}
});

app.get("/search/liriklagu", async (req, res) => {
try { 
const { search } = req.query
if (!search) return res.json("Search is required");
const result = await lirikLagu(search)
if (!result) return res.json("Error!");
res.json({
status: 200, 
creator: global.creator,
data: result
})
} catch (error) {
console.log(error);
res.send(error)
}
})

app.get('/downloader/mediafire', async (req, res) => {
const url = req.query.url;

if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

try {
const data = await mediaFire(url);
res.json({
status: 200, 
creator: global.creator,
data: data
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'An error occurred' });
}
});

app.get('/downloader/mediafiredl', async (req, res) => {
const url = req.query.url;

if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

try {
const data = await mfdl(url);
res.json({
status: 200, 
creator: global.creator,
data: data
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'An error occurred' });
}
});

app.get('/ai/meta', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await meta.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});


app.get('/berita/metronews', async (req, res) => {
try {
const data = await metronews();
res.json({
status: true, 
creator: global.creator,
data: data
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message });
}
});


app.get('/ai/mistral', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await mistral.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});

app.get('/ai/muslimai', async (req, res) => {
const message = req.query.message;

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await muslimai(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred" });
}
});

app.get("/ai/openai", async (req, res) => {
const { teks, prompt } = req.query;

if (!teks || !prompt) {
return res.status(400).json({ status: false, message: "Missing teks or prompt" });
}

const response = await groq(teks, prompt);
res.json(response);
});

app.get('/search/otakudesu', async (req, res) => {
const { query } = req.query;

if (!query) {
return res.status(400).json({ error: 'Query is required.' });
}

try {
const data = await otakudesu(query);
res.json({
status: 200, 
creator: global.creator,
data: data
})
} catch (error) {
res.status(500).json({ error: 'Failed to fetch data', details: error.message });
}
});

app.get('/search/pinterest', async (req, res) => {
const { search } = req.query;
if (!search) {
return res.status(400).json({ error: 'Search is required' });
}

const result = await pinterest(search);
res.json({
status: 200, 
creator: global.creator,
data: result
});
});

app.get('/search/playstore', async (req, res) => {
try {
const search = req.query.search;

if (!search) {
return res.status(400).json({ status: 400, message: 'Search is required'});
}

const results = await PlayStore(search);
res.status(results.status).json(results);

} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ status: 500, message: 'Internal server error', error: error.message });
}
});


app.get('/tools/quotesanime', async (req, res) => {
try {
const quotes = await quotesAnime();
res.json({
status: 200, 
creator: global.creator,
data: quotes
})
} catch (error) {
console.error("Error fetching quotes:", error);
res.status(500).json({ error: "Failed to fetch quotes" });
}
});

app.get('/ai/qwen', async (req, res) => {
const message = req.query.message; 

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await qwenai.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});

app.get('/tools/recolor', async (req, res) => {
try {
const { url, method = 'recolor' } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required.' });
}

const response = await axios.get(url, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(response.data, 'binary');

const processedImage = await recolor(imageBuffer, method);

res.set('Content-Type', 'image/jpeg');
res.send(processedImage);
} catch (error) {
console.error('Error:', error);
res.status(500).json({ error: 'Failed to process image' });
}
});

app.get("/tools/remini", async (req, res) => {
try { 
const { url } = req.query
if (!url) return res.json("URL is required");
const image = await getBuffer(url)
if (!image) res.json("Error!");
const result = await remini(image, "enhance")
await res.set("Content-Type", "image/png")
await res.send(result)
} catch (error) {
console.log(error);
res.send(error)
}
})


app.get('/tools/removebg', async (req, res) => {
const { url } = req.query;
if (!url) return res.status(400).json({ message: 'URL is required.' });

try {
const bgRemovedImage = await RemoveBG(url);

if (!bgRemovedImage) {
return res.status(500).json({ message: 'Failed to remove image background!' });
}

res.set({
'Content-Type': 'image/png',
'Content-Disposition': 'inline; filename="no-bg-image.png"',
});

return res.send(bgRemovedImage);
} catch (error) {
console.error('Error:', error.message);
return res.status(500).json({ message: 'An error occurred while processing the image.' });
}
});

app.get('/tools/removebackground', async (req, res) => {
try {
const image = req.query.image;
if (!image) {
return res.status(400).json({ error: 'URL is required.' });
}

const apiResponse = await axios.get(
`https://api.siputzx.my.id/api/iloveimg/removebg?image=${encodeURIComponent(image)}&scale=2`,
{ responseType: 'arraybuffer' }
);


const finalImageBuffer = Buffer.from(apiResponse.data, 'binary');

res.setHeader('Content-Type', 'image/png');
res.send(finalImageBuffer);

} catch (error) {
console.error('Error:', error.message || error);
res.status(500).json({ error: 'Failed to process image.', details: error.message });
}
});

app.get('/berita/republika', async (req, res) => {
try {
const republikaUrl = 'https://news-api-zhirrr.vercel.app/v1/republika-news';
const response = await axios.get(republikaUrl);
res.json(response.data);
} catch (error) {
console.error('Error fetching data from Republika News:', error);
res.status(500).json({ error: 'Failed to fetch data' });
}
});


app.get('/search/cariresep', async (req, res) => {
const query = req.query.query;
if (!query) {
return res.status(400).json({ error: 'Query is required' });
}

try {
const result = await cariresep(query);
res.json({
status: 200, 
creator: global.creator, 
data: result
})
} catch (error) {
res.status(500).json({ error: 'There is an error', details: error.message });
}
});


app.get('/downloader/pinterest', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ success: false, message: 'URL is required' });
}

try {
const result = await savePin(url);
res.json({
status: 200, 
creator: global.creator,
data: result
})
} catch (error) {
console.error("Endpoint Error:", error);
res.status(500).json({ success: false, message: 'An error occurred during processing.' });
}
});

app.get("/search/sfile", async (req, res) => {
try { 
const { search } = req.query
if (!search) return res.json("Search is required");
let result = await scp.search.sfile(search)
if (!result) return res.json("Error!");
res.json({
status: 200, 
creator: global.creator,
data: result.result
})
} catch (error) {
console.log(error);
res.send(error)
}
})

app.get("/tools/tinyurl", async (req, res) => {
try { 
const { url } = req.query
if (!url) return res.json("URL is required");
if (!url.startsWith("https://")) res.json("The link is invalid!")
const result = await shortUrl(url)
if (!result) return res.json("Error!");
res.json({
status: 200, 
creator: global.creator,
data: result
})
} catch (error) {
console.log(error);
res.send(error)
}
})

app.get('/tools/simi', async (req, res) => {
const { text } = req.query;

if (!text) {
return res.status(400).json({ error: 'Text is required.' });
}

try {
const response = await chatSimi(text);
res.json({ message: response });
} catch (error) {
console.error("Error while processing simi request:", error);

if (error === 'Invalid text') {
res.status(400).json({ error: error });
} else if (error === 'Invalid response from SimSimi API.') {
res.status(502).json({ error: 'Invalid response from SimSimi API.' });
} else if (error === 'Failed to communicate with SimSimi API.') {
res.status(503).json({ error: 'SimSimi service is not available.' });
} else {
res.status(500).json({ error: 'An error occurred on the server.' });
}
}
});

app.get("/downloader/soundcloud", async (req, res) => {
const { url } = req.query;
if (!url) return res.json("URL is required");

try {
var anu = await souncloudDl.process(`${url}`)
res.json({
status: 200,
creator: global.creator,
result: anu 
});
} catch (error) {
console.error(error);
res.status(500).json({ error: "An error occurred while fetching data." });
}
})

app.get('/downloader/spotify', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

try {
const data = await spotiDown(url);
res.json({
status: 200, 
creator: global.creator, 
data: data
});
} catch (error) {
res.status(500).json({ error: error.message || 'There is an error' });
}
});

app.get('/downloader/spotifydl', async (req, res) => {
const url = req.query.url;

if (!url) {
return res.status(400).json({ status: false, message: 'URL is required.' });
}

const result = await spotidown(url);
res.json({
status: 200, 
creator: global.creator,
data: result
});
});

app.get('/search/spotify', async (req, res) => {
const search = req.query.search;

if (!search) {
return res.status(400).json({ error: 'Search is required.' });
}

try {
const results = await searchSpotifyTracks(search);
res.json({
status: 200, 
creator: global.creator,
data: results
});
} catch (error) {
console.error("Error di endpoint:", error);
res.status(500).json({ error: 'Failed to perform search.' });
}
});

app.get('/search/spotifysearch', async (req, res) => {
const search = req.query.search;

if (!search) {
return res.status(400).json({ error: 'Search is required.' });
}

try {
const results = await spotify(search);
res.json({
status: 200, 
creator: global.creator,
data: results
});
} catch (error) {
console.error("Error di endpoint:", error);
res.status(500).json({ error: 'Failed to perform search.' });
}
});

app.get('/search/sticker', async (req, res) => {
const { query } = req.query;
if (!query) {
return res.status(400).json({ error: "Query is required" });
}

try {
const result = await stickersearch(query);
res.json({
status: 200, 
creator: global.creator,
data: result
});
} catch (error) {
res.status(500).json({ error: error.toString() });
}
});

app.get('/search/surah', async (req, res) => {
const number = req.query.number;
if (!number) {
return res.status(400).json({ error: 'Search parameter not found. please enter the surah number.' });
}

try {
const hasil = await surah(number);
res.status(200).json({ hasil });
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/berita/tempo', async (req, res) => {
try {
const tempoUrl = 'https://news-api-zhirrr.vercel.app/v1/tempo-news';
const response = await axios.get(tempoUrl);
res.json(response.data);
} catch (error) {
console.error('Error fetching data from Tempo News:', error);
res.status(500).json({ error: 'Failed to fetch data' });
}
});

app.get('/ai/txt2img', async (req, res) => {
const prompt = req.query.prompt;

if (!prompt) {
return res.status(400).send("Prompt is required");
}

try {
const imageBuffer = await txt2img(prompt);
res.setHeader('Content-Type', 'image/jpeg');
res.send(imageBuffer);
} catch (error) {
res.status(500).send(error.message);
}
});

app.get('/ai/text2img', async (req, res) => {
const prompt = req.query.prompt;

if (!prompt) {
return res.status(400).send("Prompt is required");
}

try {
const imageBuffer = await text2img(prompt);
res.setHeader('Content-Type', 'image/jpeg');
res.send(imageBuffer);
} catch (error) {
res.status(500).send(error.message);
}
});


app.get('/downloader/tiktok', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

try {
const data = await TiktokData(url);
res.json({
status: 200,
creator: global.creator,
data: data 
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'Failed to extract tiktok data' });
}
});

app.get("/search/tiktoksearch", async (req, res) => {
try { 
const { search } = req.query
if (!search) return res.json("Search is required");
const result = await ttSearch(search)
if (!result) return res.json("Error!");
res.json({
status: 200, 
creator: global.creator,
data: result
})
} catch (error) {
console.log(error);
res.send(error)
}
})

app.get("/tools/toanime", async (req, res) => {
try {
const { image, prompt = "Anime", negative, strength } = req.query;
if (!image) {
return res.status(400).json({ error: "URL is required." });
}

const result = await PixNova({ prompt, negative, strength }, image, false);
if (result.output && result.output.result.length > 0) {
const imageUrl = result.output.result[0];
const imageResponse = await axios.get(imageUrl, { responseType: "arraybuffer" });

res.set("Content-Type", "image/jpeg");
res.send(imageResponse.data);
} else {
res.status(500).json({ error: "Image not found in API response." });
}
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/tools/translate', async (req, res) => {
const { text, language } = req.query;

if (!language) {
return res.status(400).json({ error: 'Language is required.' });
}

try {
const translatedText = await translate(text, language);
res.json({ translatedText });
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: 'An error occurred during translation.' });
}
})

app.get('/downloader/twitter', async (req, res) => {
const url = req.query.url;

if (!url) {
return res.status(400).json({ error: "URL is required." });
}

try {
const result = await savetwitter(url);
res.json(result);
} catch (error) {
console.error("Error handling request:", error);
res.status(500).json({ error: "Internal server error" });
}
});

app.get('/tools/upscale', async (req, res) => {
try {
const url = req.query.url;
const scale = req.query.scale ? parseInt(req.query.scale) : 2;

if (!url) {
return res.status(400).json({ error: 'URL is required' });
}

const response = await axios.get(url, { responseType: 'arraybuffer' });
const imageBuffer = Buffer.from(response.data);

const result = await Upscale.send(imageBuffer, scale);
const finalResult = await Upscale.wait(result);

res.json(finalResult);
} catch (error) {
res.status(500).json({ error: error.message });
}
});

app.get('/search/wattpad', async (req, res) => {
const query = req.query.query;
if (!query) {
return res.status(400).json({ error: 'Query is required' });
}

try {
const result = await wattpad(query);
res.json({
status: 200, 
creator: global.creator, 
data: result
})
} catch (error) {
res.status(500).json({ error: 'There is an error', details: error.message });
}
});

app.get('/search/webtoons', async (req, res) => {
const query = req.query.query;
if (!query) {
return res.status(400).json({ error: 'Query is required' });
}

try {
const result = await webtoons(query);
res.json({
status: 200, 
creator: global.creator, 
data: result
})
} catch (error) {
res.status(500).json({ error: 'There is an error', details: error.message });
}
});


app.get('/search/wikimedia', async (req, res) => {
const { search } = req.query;

if (!search) {
return res.status(400).json({ error: "Search is required." });
}

try {
const results = await wikimedia(search);
res.json({
status: 200, 
creator: global.creator,
data: results
})
} catch (error) {
console.error("Error fetching Wikimedia data:", error);
res.status(500).json({ error: "Failed to fetch Wikimedia data." });
}
});

app.get('/search/wikipedia', async (req, res) => {
const query = req.query.query;
if (!query) {
return res.status(400).json({ error: 'Query is required' });
}

const result = await wikipedia(query);
res.json({
status: 200, 
creator: global.creator, 
data: result
})
});

app.get("/ai/yousearch", async (req, res) => {
const searchTerm = req.query.searchTerm;

if (!searchTerm) {
return res.status(400).json({ error: "Searchterm is required." });
}

try {
const result = await yousearch(searchTerm);
res.json({
status: 200, 
creator: global.creator, 
data: result
})
} catch (error) {
res.status(500).json({ error: "An error occurred in the search." });
}
});

app.get('/downloader/yta', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({
status: false,
code: 400,
result: { error: "Missing parameter. please provide the link." }
});
}

try {
const result = await savetube.download(url, 'mp3');
res.status(result.code).json(result);
} catch (error) {
res.status(500).json({
status: false,
code: 500,
result: { error: "Internal server error." }
});
}
});

app.get('/downloader/ytv', async (req, res) => {
const { url } = req.query;

if (!url) {
return res.status(400).json({
status: false,
code: 400,
result: { error: "Missing parameter. please provide the link." }
});
}

try {
const result = await savetube.download(url, '480');
res.status(result.code).json(result);
} catch (error) {
res.status(500).json({
status: false,
code: 500,
result: { error: "Internal server error." }
});
}
});

app.get("/downloader/ytmp3", async (req, res) => {
try {
const url = req.query.url;
const format = req.query.format || "mp3";

if (!url) {
return res.status(400).json({ error: "URL is required!" });
}

const headers = {
"accept": "*/*",
"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
"sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
"sec-ch-ua-mobile": "?1",
"sec-ch-ua-platform": "\"Android\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
"Referer": "https://id.ytmp3.mobi/",
"Referrer-Policy": "strict-origin-when-cross-origin"
};

const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
const init = await initial.json();

const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];

if (!id) {
return res.status(400).json({ error: "Youtube url format is invalid!" });
}

let convertURL = init.convertURL + `&v=${id}&f=${format}&_=${Math.random()}`;

const converts = await fetch(convertURL, { headers });
const convert = await converts.json();

let info = {};
for (let i = 0; i < 3; i++) {
let j = await fetch(convert.progressURL, { headers });
info = await j.json();
if (info.progress == 3) break;
}

const result = {
url: convert.downloadURL,
title: info.title
};

res.json({
status: 200,
creator: global.creator,
data: result
});
} catch (error) {
console.error(error);
res.status(500).json({ error: "An error occurred in the conversion process" });
}
});



app.get("/downloader/ytmp4", async (req, res) => {
try {
const url = req.query.url;
const format = "mp4";

if (!url) {
return res.status(400).json({ error: "URL is required!" });
}

const headers = {
"accept": "*/*",
"accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
"sec-ch-ua": "\"Not A(Brand\";v=\"8\", \"Chromium\";v=\"132\"",
"sec-ch-ua-mobile": "?1",
"sec-ch-ua-platform": "\"Android\"",
"sec-fetch-dest": "empty",
"sec-fetch-mode": "cors",
"sec-fetch-site": "cross-site",
"Referer": "https://id.ytmp3.mobi/",
"Referrer-Policy": "strict-origin-when-cross-origin"
};

const initial = await fetch(`https://d.ymcdn.org/api/v1/init?p=y&23=1llum1n471&_=${Math.random()}`, { headers });
const init = await initial.json();

const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*embed\/))([^&?/]+)/)?.[1];

if (!id) {
return res.status(400).json({ error: "Youtube url format is invalid!" });
}

let convertURL = init.convertURL + `&v=${id}&f=${format}&_=${Math.random()}`;

const converts = await fetch(convertURL, { headers });
const convert = await converts.json();

let info = {};
for (let i = 0; i < 3; i++) {
let j = await fetch(convert.progressURL, { headers });
info = await j.json();
if (info.progress == 3) break;
}

const result = {
url: convert.downloadURL,
title: info.title
};

res.json({
status: 200,
creator: global.creator,
data: result
});
} catch (error) {
console.error(error);
res.status(500).json({ error: "An error occurred in the conversion process" });
}
});

app.get('/search/youtube', async (req, res) => {
const { search } = req.query;
if (!search) {
return res.status(400).json({ status: false, error: 'Search is required' });
}
try {
const ytResults = await yts.search(search);
const ytTracks = ytResults.videos.map(video => ({
title: video.title,
channel: video.author.name,
duration: video.duration.timestamp,
imageUrl: video.thumbnail,
link: video.url
}));
res.status(200).json({
status: 200,
data: ytTracks
});
} catch (error) {
res.status(500).json({ status: false, error: error.message });
}
});

app.get('/ai/zetaa', async (req, res) => {
const message = req.query.message; 

if (!message) {
return res.status(400).json({ error: "Message is required." });
}

try {
const response = await zeta.chat(message);
res.json({
status: 200, 
creator: global.creator,
data: response
});
} catch (error) {
console.error("Error in endpoint:", error);
res.status(500).json({ error: error.message || "An error occurred." });
}
});


app.use((err, req, res, next) => {
console.log(err.stack);
res.status(500).send("Error");
});


app.listen(PORT, () => {
console.log(`Server berjalan di http://localhost:${PORT}`);
});