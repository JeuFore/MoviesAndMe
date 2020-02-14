const axios = require('axios');

const API_TOKEN = '058801795ffa633705abd5a68808ba59';

export function getFilmsFromApi (req) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_TOKEN}&language=fr&query=${req}`
    axios.get(url)
      .then(function (response) {
          console.log(response.data.results);
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      })
}