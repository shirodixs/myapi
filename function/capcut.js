const axios = require('axios');
const cheerio = require('cheerio');
const fetch = require("node-fetch");

async function capcutdl(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const videoElement = $('video.player-o3g3Ag');
        const videoSrc = videoElement.attr('src');
        const posterSrc = videoElement.attr('poster');
        const title = $('h1.template-title').text().trim();
        const actionsDetail = $('p.actions-detail').text().trim();
        const [date, uses, likes] = actionsDetail.split(',').map(item => item.trim());
        const authorAvatar = $('span.lv-avatar-image img').attr('src');
        const authorName = $('span.lv-avatar-image img').attr('alt');

        if (!videoSrc || !posterSrc || !title || !date || !uses || !likes || !authorAvatar || !authorName) {
            throw new Error('Beberapa elemen penting tidak ditemukan di halaman.');
        }

        return {            
            title: title,
            date: date,
            pengguna: uses,
            likes: likes,
            author: {
                name: authorName,
                avatarUrl: authorAvatar
            },
            videoUrl: videoSrc,
            posterUrl: posterSrc
        };
    } catch (error) {
        console.error('Error fetching video details:', error.message);
        return null;
    }
}

async function capcutdown(capcutUrl) {
    try {
        const apiUrl = `https://api.vreden.my.id/api/capcutdl?url=${encodeURIComponent(capcutUrl)}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.status === 200 && data.result.status) {
            return {
                title: data.result.title,
                download: data.result.url,
                source: "https://teknogram.id"
            };
        } else {
            throw new Error("Failed to get data.");
        }
    } catch (error) {
        console.error("Error:", error.message);
        return null;
    }
}

module.exports = { capcutdown, capcutdl }