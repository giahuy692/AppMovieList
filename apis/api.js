export const GetStockInfo = (symbol) => {
    return fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=0AECLI5YR5X89YTR`)
    .then(res => res.json())
    .then(json => {
        return json["Global Quote"]
    })
    .catch(e => console.log(e))
}

//apikey: 23613bd5 / 1ef9c0e4
export const SearchMovie = (keywork, page) => {
    return fetch(`https://www.omdbapi.com/?s=${keywork}&page=${page}&apikey=23613bd5`)
    .then(res => res.json())
    .then(json => {
        return json
    })
    .catch(e => alert(e))
}

export const GetMovieDetail = (id) => {
    return fetch(`https://www.omdbapi.com/?i=${id}&apikey=23613bd5`)
    .then(res => res.json())
    .then(json => {
        return json
    })
    .catch(e => alert(e))
}
