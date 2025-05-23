const axios = require('axios');

async function threadsdown(url) {
  try {
    const { data } = await axios.get('https://threads.snapsave.app/api/action', {
      params: { url: url },
      headers: {
        'accept': 'application/json, text/plain, */*',
        'referer': 'https://threads.snapsave.app/',
        'user-agent': 'Postify/1.0.0',
      },
      timeout: 10000,
    });

    const type = (type) => ({
      GraphImage: 'Photo',
      GraphVideo: 'Video',
      GraphSidecar: 'Gallery',
    }[type] || type);

    const item = data.items?.[0];

    if (!item) throw new Error("Data tidak ditemukan atau URL salah");

    return {
      type: type(item.__type),
      username: data.postinfo.username,
      description: data.postinfo.media_title,
      url: item.video_url || item.image_url,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = { threadsdown }