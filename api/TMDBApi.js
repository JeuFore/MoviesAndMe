const axios = require('axios');

const API_TOKEN = '058801795ffa633705abd5a68808ba59';

export async function getFilmsFromApi(req) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${req}`
  return await axios.get(url)
    .then(function (response) {
      return response.data.results;
    })
    .catch(function (error) {
      console.log(error);
    })
}

export async function getFilmsFromApiWithSearchedText(text, page) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${text}&page=${page}`
  return await axios.get(url)
  .then(function (response) {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  })
}

export function getImageApi(name) {
  if (name)
    return `https://image.tmdb.org/t/p/w300${name}`;
}