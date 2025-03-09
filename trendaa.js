let TMDB_API_KEY = "62cdcb1b2d41e931eccc632db557ac75"; // TMDb API-avain

document.addEventListener("DOMContentLoaded", function () {
    fetch("https://api.themoviedb.org/3/trending/movie/day?api_key=" + TMDB_API_KEY + "&language=fi-FI&include_adult=false")
        .then(function (response) {
            return response.json(); // muutetaan json-muotoon
        })
        .then(function (data) {
            let movieContainer = document.getElementById("trending-movies");
            movieContainer.innerHTML = "";

            // tarkistetaan tulokset suosituimmista elokuvista
            if (data.results) {
                data.results.slice(0, 6).forEach(function (movie) { // näytetään kerrallaan kuusi suosituinta elokuvaa

                    // hakee elokuvan oletusjulisteen 
                    let poster = "https://via.placeholder.com/300x450?text=No+Image";
                    if (movie.poster_path) {
                        poster = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
                    }

                    // haluttu muotoilu elokuvan julkaisupäivälle, joko ei tietoa tai muotoa pp.kk.vvvv
                    let formattedDate = "Ei tietoa julkaisupäivästä";
                    if (movie.release_date) {
                        formattedDate = new Date(movie.release_date).toLocaleDateString("fi-FI");
                    }

                    // näytetään kortteina
                    let movieCard =
                        '<div class="col-md-4 mb-4">' +
                        '<div class="card movie-card">' +
                        '<img src="' + poster + '" class="card-img-top" alt="' + movie.title + '">' +
                        '<div class="card-body">' +
                        '<h5 class="card-title">' + movie.title + '</h5>' +
                        '<p class="card-text">Julkaisupäivä: ' + formattedDate + '</p>' +
                        "</div>" +
                        "</div>" +
                        "</div>";

                    movieContainer.innerHTML += movieCard;
                });
            } else {
                // näytetään viesti, jos suosittuja elokuvia ei pystytty hakemaan
                movieContainer.innerHTML = "<p class='text-white text-center'>Suosituimpien elokuvien tietoja ei pystytty hakemaan.</p>";
            }
        });
});
