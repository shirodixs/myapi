const fetch = require('node-fetch');

async function spotiDown(spotiUrl) {
  try {
   const urlOne = await fetch(`https://api.fabdl.com/spotify/get?url=${spotiUrl}`);
    const one = await urlOne.json();

    if (one.result) {
      const { id, type, name, image, artists, gid } = await one.result;
      const urlTwo = await fetch(`https://api.fabdl.com/spotify/mp3-convert-task/${gid}/${id}`);
      const two = await urlTwo.json();
      if (two.result) {
        return {
          title: name,
          creator: artists,
          type: type,
          thumbnail: image,
          url: `https://api.fabdl.com${two.result.download_url}`
          }
        } else {
          throw 'Gagal mendapatkan url musik'
        }
    } else {
      throw 'Gagal menemukan informasi musik';
    }
  } catch (error) {
    console.log(error);
    throw error.message;
  }
}

module.exports = { spotiDown }