const axios = require('axios')
const cheerio = require('cheerio')

const baseUrl = 'https://komikindo2.com/'

async function getHome(){
  let { data } = await axios.get(baseUrl)
  const $ = cheerio.load(data)
  let result = {
    popular: [],
    newest: []
  }
  
  $("div.odadingslider > div.animepost").each((i, e) => {
    const title = $(e).find("div.bigor > a").text().trim()
    const url = $(e).find("div.bigor > a").attr('href')
    const img = $(e).find("div.limit > img").attr('src')
    const lastChapter = $(e).find("div.lsch > a").text().trim().replace(/\s+/g, '')
    const uploaded = $(e).find("div.lsch > span.datech").text().trim()
    
    result.popular.push({
      title,
      url,
      img,
      lastChapter,
      uploaded
    })
  })
  $("div.listupd > div.animepost").each((i, e) => {
    const title = $(e).find("div.animepostxx-top-bottom > a").attr("title").split('Komik ')[1]
    const url = $(e).find("div.animepostxx-top-bottom > a").attr('href')
    const img = $(e).find("div.limietles > img").attr('src')
    const lastChapter = $(e).find("div.lsch > a").first().text().trim().replace(/\s+/g, '')
    const rating = $(e).find("div.flex-skroep").eq(0).text().trim()
    const type = $(e).find("div.flex-skroep").eq(1).text().trim()
    const views = $(e).find("div.flex-skroep").eq(2).text().trim()
    const status = $(e).find("div.flex-skroep").eq(4).text().trim()
    
    result.newest.push({
      title,
      url,
      img,
      lastChapter,
      rating,
      views,
      type,
      status
    })
  })
  return result
}

async function getSearch(q){
  let { data } = await axios.get(`${baseUrl}?s=${q}`)
  const $ = cheerio.load(data)
  let result = []
  
  $("div.film-list > div.animepost").each((i,e) => {
    const title = $(e).find("div.bigors > a").text().trim()
    const url = $(e).find("div.bigors > a").attr('href')
    const img = $(e).find("div.limit > img").attr("src")
    const rating = $(e).find("div.adds > div.rating").text().trim()
    
    result.push({
      title,
      url,
      img,
      rating
    })
  })
  return result
}

async function getDetail(url){
  let { data } = await axios.get(url)
  const $ = cheerio.load(data)
  
  const title = $(".infoanime").find(".infox").find("span").eq(0).text().trim().split(':\n')[1].replace(/^\s+/g, '')
  const img = $(".infoanime").find(".thumb > img").attr('src')
  const status = $(".infoanime").find(".infox").find("span").eq(1).text().trim().split(':\n')[1].replace(/^\s+/g, '')
  const creator = $(".infoanime").find(".infox").find("span").eq(2).text().trim().split(':\n')[1].replace(/^\s+/g, '')
  const ilustrator = $(".infoanime").find(".infox").find("span").eq(3).text().trim().split(':\n')[1].replace(/^\s+/g, '')
  const grapich = $(".infoanime").find(".infox").find("span").eq(4).text().trim().split(':\n')[1].replace(/^\s+/g, '')
  const type = $(".infoanime").find(".infox").find("span").eq(5).text().trim().split(':\n')[1].replace(/^\s+/g, '')
  const genre = []
  $(".infoanime").find(".genre-info > a").each((i,e) => {
    genre.push($(e).text().trim())
  })
  const lastCh = $("#chapter_list").find("ul li > .lchx").eq(0).text().trim().replace(/[\s\n]+/g, '').split('Chapter')[1]
  const lastUpload = $("#chapter_list").find("ul li > .dt").eq(0).text().trim()
  const sinopsis = $(".tabsarea").find("#sinopsis").find("p").text().trim()

  let result = {
    title,
    img,
    status,
    creator,
    ilustrator,
    grapich,
    type,
    genre,
    lastCh,
    lastUpload,
    sinopsis
  }
  return result
}

module.exports = { getSearch }