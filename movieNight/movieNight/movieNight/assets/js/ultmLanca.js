const API_URL = 'https://api.themoviedb.org/3/movie/popular?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=3'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const urlMovie = `https://api.themoviedb.org/3/trending/movie/week?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=1`;

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const moviesContainer = document.querySelector('.movies');
let currentIndex = 0;

// Get initial movies
getMovies(urlMovie)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')


            
            movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
      }
    )}
    

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})

nextButton.addEventListener('click', () => {
  currentIndex += 1;
  if (currentIndex > numMovies - 4) {
    currentIndex = numMovies - 4;
  }
  moviesContainer.style.transform = `translateX(-${currentIndex * 350}px)`;
});

// Event listener para o botão "Previous"
prevButton.addEventListener('click', () => {
  currentIndex -= 1;
  if (currentIndex < 0) {
    currentIndex = 0;
  }
  moviesContainer.style.transform = `translateX(-${currentIndex * 350}px)`;
});