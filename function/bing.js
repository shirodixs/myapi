const axios = require('axios')
const cheerio = require('cheerio')

async function bingsearch(search) {
  try {
    const response = await axios.get(`https://www.bing.com/search?q=${search}`)
    const html = response.data
    const $ = cheerio.load(html)
    const results = []
 
    $('.b_algo').each((index, element) => {
      const title = $(element).find('h2').text()
      const link = $(element).find('a').attr('href')
      const snippet = $(element).find('.b_caption p').text()
      const image = $(element).find('.cico .rms_iac').attr('data-src')
 
      results.push({
        title,
        link,
        snippet,
        image: image ? `https:${image}` : "https://files.catbox.moe/7qn3bc.jpg",
      })
    })
 
    return results
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

module.exports = { bingsearch }