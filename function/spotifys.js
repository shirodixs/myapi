const fetch = require('node-fetch');

async function searchSpotifyTracks(query) {
  const clientId = 'acc6302297e040aeb6e4ac1fbdfd62c3';
  const clientSecret = '0e8439a1280a43aba9a5bc0a16f3f009';
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  const getToken = async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      body: new URLSearchParams({ grant_type: 'client_credentials' }),
      headers: { Authorization: `Basic ${auth}` },
    });
    const result = await response.json();
    return result.access_token;
  };

  const accessToken = await getToken();

  const offset = 10;
  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&offset=${offset}`;
  const response = await fetch(searchUrl, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const data = await response.json();

  const trackDetails = data.tracks.items.map(track => ({
    name: track.name,
    artist: track.artists.map(artist => artist.name).join(', '),
    album: {
      name: track.album.name,
      link: track.album.external_urls.spotify,
      images: track.album.images[0]?.url,
      release: track.album.release_date,
      total: track.album.total_tracks,
    },
    previewUrl: track.preview_url,
    popularity: track.popularity,
    spotifyUrl: track.external_urls.spotify
  }));

  return trackDetails;
}

module.exports = { searchSpotifyTracks }