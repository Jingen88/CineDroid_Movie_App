export const TMDB_CONFIG = {

    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY: process.env.EXPO_PUBLIC_MOVE_API_KEY,
    headers:{
        accept:'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVE_API_KEY}`
    }


}

export const fetchMovies = async({ query}: {query:string})=>{
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    :`${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint, {
        method: 'GET',
        headers : TMDB_CONFIG.headers,
    })

    if(!response.ok){
        throw new Error(`Failed to fetch movies: ${response.statusText}`);
    }
    const data =await response.json()

    return data.results;
}


export const fetchMovieDetails = async(movieId: string): Promise<MovieDetalis> =>{
    try{
const response = await fetch(`${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
    {method:'GET',
    headers: TMDB_CONFIG.headers,

})
if(!response.ok)throw new Error('Failed to fetch movie detals')    
const data = await response.json();
return data;
}catch(error){
        console.log(error);
        throw error;
    }
}



// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NzQ3MjJiOTlhNzczYzY5MmJkOTBmOTQyZWRiYmQ4MyIsIm5iZiI6MTc0MzUzMjU4OS4yNjcsInN1YiI6IjY3ZWMzMjJkYzU0NDIzM2Q4ZjJmYzVjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MZz9PeWCTWH98xGxfwqZYGhOGIoPjlwRFhBU1rPomNs'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));