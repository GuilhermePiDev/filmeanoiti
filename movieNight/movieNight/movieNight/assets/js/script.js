//chamando as apis
const urlMovie = `https://api.themoviedb.org/3/trending/movie/week?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=1`;
const urlMovieTop = `https://api.themoviedb.org/3/movie/top_rated?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=1`;
const urlSerie = `https://api.themoviedb.org/3/trending/tv/week?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=1`
const urlSerieTop = `https://api.themoviedb.org/3/tv/top_rated?api_key=c6c380f82908eab9870589641a012358&language=pt-BR&page=1`
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=key=c6c380f82908eab9870589641a012358c&query="'

const swiperSlider = document.querySelector('.swiper-wrapper');


const main = document.querySelector("main")

fetch(urlMovie, { method: "get" })
  .then(resultado => resultado.json())
  .then(dados => showInfo(dados));

let favorites = []

function showInfo(images) {
  const results = images.results;

  for (let i = 0; i < 5 && i < results.length; i++) {
    const element = results[i];

    const imgSlide = document.createElement('div');
    imgSlide.classList.add('project-img');
    imgSlide.innerHTML = `
      <div class="img-container">
        <img src="https://image.tmdb.org/t/p/original/${element.backdrop_path}" alt="">
        <div class="items">
          <div class="text">
            <h3>${element.title || element.original_name}</h3>
            <h5>${element.release_date || element.first_air_date}</h5>
            <button type="button" id="${element.id}" class="btn btn-secondary btn-lg btn-light verDetalhes">Ver detalhes</button>
          </div>
          <div class="button-add">
            <button type="button" id="${element.id}" class="btn btn-secondary btn-lg btn-color  botaoLado ">
              <span class="material-symbols-outlined">
                <i class="fa-solid fa-plus"></i>
              </span>
              <p>Minha lista</p>
            </button>
          </div>
        </div>
      </div>
    `;

    const slider = document.createElement('div');
    slider.classList.add('swiper-slide');
    slider.appendChild(imgSlide);

    swiperSlider.appendChild(slider);

    // Adicionar evento de clique para o botão "Ver detalhes"

    const verDetalhesButton = slider.querySelectorAll('.verDetalhes');
    for (let i = 0; i < verDetalhesButton.length; i++) {

      verDetalhesButton[i].addEventListener('click', () => {
        console.log(verDetalhesButton[i])
        const inner = document.createElement("div");
        inner.innerHTML = `
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">${element.title || element.original_name}</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Fechar">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="imagem">
                <img src="https://image.tmdb.org/t/p/original/${element.backdrop_path}" alt="Poster do Filme">
              </div>
              <div class="textos">
                <div class="avaliacoes">
                  <p>Avaliação: [Inserir Avaliação aqui]</p>
                  <p>Data de Lançamento: [Inserir Data de Lançamento aqui]</p>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam, non, libero totam beatae ex perferendis
                  molestiae cupiditate ut consequuntur distinctio, possimus sed ullam! Dicta recusandae natus adipisci
                  aliquid cupiditate veritatis!
                </p>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary btn-lg btn-light" data-dismiss="modal">Fechar</button>
              <button type="button" class="btn btn-secondary btn-lg btn-light verDetalhes">Assistir trailer</button>
            </div>
          </div>
        </div>
      </div>
    
        `;
  
    
  
      
        // Crie o botão "Minha lista" com um atributo "data-id"
        const botaoAddDetalhes = document.createElement("button");
        botaoAddDetalhes.setAttribute("data-id", element.id);
        botaoAddDetalhes.classList.add("btn", "btn-secondary", "btn-lg", "btn-color");
        botaoAddDetalhes.innerHTML = `
      <span class="material-symbols-outlined">
        <i class="fa-solid fa-plus"></i>
      </span>
      <p>Minha lista</p>
    `;
    const modalId = `modal_${element.id}`;
        botaoAddDetalhes.forEach
        botaoAddDetalhes.addEventListener('click', ()=>{
          if (botaoAddDetalhes.classList.contains("botaoLado")) {
            botaoAddDetalhes.classList.remove("botaoLado");
            botaoAddDetalhes.classList.add("azul");
          } else {
            botaoAddDetalhes.classList.remove("azul");
            botaoAddDetalhes.classList.add("botaoLado");
          }
          console.log(botaoAddDetalhes)
          const myFavMovie = results.find(item => item.id === element.id); // Encontre o filme pelo ID.
          favorites.push(myFavMovie);
          console.log(favorites);
        })
  
        inner.appendChild(botaoAddDetalhes)
        main.appendChild(inner)
       
  

     
      $(`#${modalId}`).modal('show');
    });
   
       
      
    }
    
      
      

  // Adicionar evento de clique para o botão "Minha lista"
  const botao = slider.querySelectorAll(".botaoLado");




  botao.forEach(botao => {
    botao.addEventListener('click', () => {
      if (botao.classList.contains("botaoLado")) {
        botao.classList.remove("botaoLado");
        botao.classList.add("azul");
      } else {
        botao.classList.remove("azul");
        botao.classList.add("botaoLado");
      }
    });
  });
  for (let i = 0; i < botao.length; i++) {

    botao[i].addEventListener('click', () => {
      console.log(botao[i])

      const myFavMovie = results.find(element => element.id == botao[i].id)
      favorites.push(myFavMovie)
      console.log(favorites)
    })
  }
}

}



var swiper = new Swiper(".swiper", {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination"
  },
  keyboard: true,

})

//chamando classes das categorias para adicionar os posters
const releasesMovies = document.querySelector('.releases-movies');
const ratedMovies = document.querySelector('.rated-movies');
const ratedSeries = document.querySelector('.rated-series');
const series = document.querySelector('.series');

//função de adicionar os poster nas classes
let idMovie;

function createCard(movie, container) {
  const imgMovie = document.createElement('div');
  imgMovie.classList.add("movie-image");
  imgMovie.innerHTML = `
    <a class="page-description" href="" target="_blank">
      <img src="https://image.tmdb.org/t/p/original/${movie.poster_path}" alt="">
    </a>
    <p>${movie.title || movie.name} </p>`;
  const cardMovie = document.createElement('div');
  cardMovie.classList.add("movie-card");
  cardMovie.appendChild(imgMovie);
  container.appendChild(cardMovie);

}

//funcao de requerimento da url dos poster e do conteiner que ele sera adicionado
function fetchDataAndRender(url, container) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      movies.forEach(movie => {
        createCard(movie, container);
      });
    })
}

//criando as funções para passar a funcao e passar seus parametros de conteudo
function fetchMoviesData() {
  fetchDataAndRender(urlMovie, releasesMovies);
}

function fetchMoviesDataTop() {
  fetchDataAndRender(urlMovieTop, ratedMovies);
}

function fetchSeriesData() {
  fetchDataAndRender(urlSerie, series);
}

function fetchSeriesDataTop() {
  fetchDataAndRender(urlSerieTop, ratedSeries);
}

//chamando as funções
fetchMoviesData();
fetchMoviesDataTop();
fetchSeriesDataTop();
fetchSeriesData();

//eventlister para ele passar 900px pra esquerda ou para a direita
const scrollAmount = 850;


//função de mover para a esquerda e para direita a lista do overflow hidden
document.getElementById('scroll-left-releases').addEventListener('click', () => {
  document.getElementById('releases').querySelector('.movie-slide').scrollLeft -= scrollAmount;
});

document.getElementById('scroll-right-releases').addEventListener('click', () => {
  document.getElementById('releases').querySelector('.movie-slide').scrollLeft += scrollAmount;
});

document.getElementById('scroll-left-top-rated').addEventListener('click', () => {
  document.getElementById('top-rated').querySelector('.movie-slide').scrollLeft -= scrollAmount;
  console.log(idMovie);
});

document.getElementById('scroll-right-top-rated').addEventListener('click', () => {
  document.getElementById('top-rated').querySelector('.movie-slide').scrollLeft += scrollAmount;
});
document.getElementById('scroll-left-top-rated-series').addEventListener('click', () => {
  document.getElementById('top-rated-series').querySelector('.movie-slide').scrollLeft -= scrollAmount;
});

document.getElementById('scroll-right-top-rated-series').addEventListener('click', () => {
  document.getElementById('top-rated-series').querySelector('.movie-slide').scrollLeft += scrollAmount;
});
document.getElementById('scroll-left-releases-series').addEventListener('click', () => {
  document.getElementById('releases-series').querySelector('.movie-slide').scrollLeft -= scrollAmount;
});

document.getElementById('scroll-right-releases-series').addEventListener('click', () => {
  document.getElementById('releases-series').querySelector('.movie-slide').scrollLeft += scrollAmount;
});

//Iniciando a parte do inner Html de quando clicar em algum filme




