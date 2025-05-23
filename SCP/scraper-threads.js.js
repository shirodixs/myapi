const axios = require("axios")

async function threads(url) {
    try {
        const params = new URLSearchParams();
        params.append('url', url);
        params.append('url', url);
        
        const { data } = await axios.get('https://threads.snapsave.app/api/action', {
            params: params,
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'User-Agent': 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Mobile Safari/537.36',
                'Referer': 'https://threads.snapsave.app/'
            }
        });
        if (data.status_code !== 0) return {
            status: false,
            message: "Link invalid or private account"
        }
        let media = []
        for (let res of data.items) {
            if (res.__type == "GraphVideo") {
                media.push({
                    id: res.id,
                    url: res.video_url,
                    type: "video"
                })
            } else if (res.__type == "GraphImage" || data.postinfo.__type == "GraphSidecar") {
                media.push({
                    id: res.id,
                    url: res.url,
                    type: "image"
                })
            }
        }
        return {
            status: true,
            id: data.postinfo.id,
            username: data.postinfo.username,
            title: data.postinfo.media_title,
            avatar_url: data.postinfo.avatar_url,
            media: media
        }
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = { threads }