const apiURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const form = document.querySelector('form');

getMovies(apiURL);
async function getMovies (url) {
    const res = await fetch(url);
    const respData = await res.json();
    
    showMovies(respData.results);
}

const showMovies = (movies) => {
    const imgPath = "https://image.tmdb.org/t/p/w1280";
    const mainContainer = document.querySelector('#main');

    main.innerHTML = "";

    movies.forEach(movie => {
        const movieEl = document.createElement("div");
        const { poster_path, title, vote_average, original_title, overview } = movie
        movieEl.classList.add('movie');

        // Checks if the path of image is valid, if not, not is displayed the movie
        if(!poster_path) return
        const urlImg = imgPath + poster_path;
        console.log(vote_average.toFixed(1))

        movieEl.innerHTML = `
        <img src="${urlImg}" alt="${title}">
        <div class="movie-info">
            <h3>${original_title}</h3>
            <span class="${getClassByNote(vote_average)}">${vote_average.toFixed(1)}</span>
        </div>
        <div class="overview">
            <h3>Overview:</h3>
            <p>
            ${overview}
            </p>
        </div>
        `;

        mainContainer.appendChild(movieEl);
    });
}

const getClassByNote = (vote) => {
    if(vote >= 8) return "green"
    else if (vote >= 5) return 'blue'
    else return 'red'
}

form.addEventListener('submit', (e) => {
    const searchAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
    const search = document.querySelector('#search');
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm) {
        getMovies(searchAPI + searchTerm);

        search.value = '';
    }

})