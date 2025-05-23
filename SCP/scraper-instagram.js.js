const axios = require('axios');
const crypto = require('crypto');

const hosts = {
    anonyig: {
        base: "https://anonyig.com",
        msec: "/msec",
        convert: "/api/convert",
        timestamp: 1739381824973,
        key: "5afb47490491edfebd8d9ced642d08b96107845bb56cad4affa85b921babdf95"
    },
    gramsnap: {
        base: "https://gramsnap.com",
        msec: "/msec",
        convert: "/api/convert",
        timestamp: 1739381789885,
        key: "7efd2a2ac7441343c38386f4ca733b5ee1079e9b57f872c70d5516a9d24bc0d6"
    },
    igram: {
        base: "https://igram.world",
        msec: "/msec",
        convert: "/api/convert",
        timestamp: 1739185248317,
        key: "40a71e771b673e3a35200acdd331bbd616fc4ba76c6d77d821a25985e46fb488"
    },
    sssinstagram: {
        base: "https://sssinstagram.com",
        msec: "/msec",
        convert: "/api/convert",
        timestamp: 1739186038417,
        key: "19e08ff42f18559b51825685d917c5c9e9d89f8a5c1ab147f820f46e94c3df26"
    }
}

function getHeaders(apiBase) {
    return {
        authority: new URL(apiBase).hostname,
        origin: apiBase,
        referer: apiBase,
        "user-agent": "Postify/1.0.0"
    };
}

async function times(apiBase, msecEndpoint) {
    try {
        const {
            data
        } = await axios.get(`${apiBase}${msecEndpoint}`, {
            headers: getHeaders(apiBase)
        });
        return Math.floor(data.msec * 1e3);
    } catch (error) {
        console.error("Error fetching timestamp:", error);
        return 0;
    }
}

async function download(url, host = "igram") {
    const hostConfig = hosts[host];
    if (!hostConfig) {
        return {
            status: false,
            message: "Host download yang dipilih tidak ada"
        }
    }

    const {
        base,
        msec,
        convert,
        timestamp,
        key
    } = hostConfig;

    try {
        const time = await times(base, msec);
        const ab = Date.now() - (time ? Date.now() - time : 0);
        const hash = `${url}${ab}${key}`;
    
        const signature = await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(hash)
        ).then(buffer =>
            Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, "0"))
            .join("")
        );
    
        const { data } = await axios.post(`${base}${convert}`, {
            url: url,
            ts: ab,
            _ts: timestamp,
            _tsc: time ? Date.now() - time : 0,
            _s: signature
        }, {
            headers: getHeaders(base)
        });
    
        let result;
        let media = []
        if (Array.isArray(data)) {
            for (let insta of data) {
                media.push({
                    url: insta.url[0].url,
                    thumbnail: insta.thumb,
                    type: insta.url[0].type == "mp4" ? "video" : "image"
                })
            }
            result = {
                status: true,
                media: media,
                ...data[0].meta
            }
        } else {
            media.push({
                url: data.url[0].url,
                thumbnail: data.thumb,
                type: data.url[0].type == "mp4" ? "video" : "image"
            })
            result = {
                status: true,
                media: media,
                ...data.meta
            }
        }
        return result;
    } catch (error) {
        console.error(error)
        throw error
    }
}

module.exports = {
    hosts,
    getHeaders,
    times,
    download
};