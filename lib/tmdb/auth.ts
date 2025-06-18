export const auth = () => {

    const url = process.env.TMDB_AUTH_URL || 'https://api.themoviedb.org/3/authentication';
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjNhZDVjYzljM2JhNmI3YTk1MjJmOGVhZTg3NGY1NyIsIm5iZiI6MTc1MDIwMTU0Mi45NTcsInN1YiI6IjY4NTFmNGM2MmQxYzQ5NzI0MzZhZWNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3J1pyeUPVRgiQNlSWi6rZ1_upPL0e6r_il8kM1Ec4LQ' 
        }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error(err + ' sended key: ' + process.env.TMDB_API_KEY));
}