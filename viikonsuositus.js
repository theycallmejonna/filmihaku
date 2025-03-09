function fetchWeeklyRecommendation() {
    fetch("viikonsuositus.json")
        .then(function(response) {
            return response.json(); // muutetaan json muotoon
        })
        .then(function(data) {
            let movieContainer = document.getElementById("weekly-movie");

            if (data.title && data.year && data.poster && data.description) {
                let title = data.title;
                let year = data.year;
                let poster = data.poster;
                let description = data.description;

                let movieContent = "<h3>" + title + " (" + year + ")</h3>";
                movieContent += "<img src='" + poster + "' alt='" + title + "' style='max-width: 200px; border-radius: 10px; margin: 10px;'>";
                movieContent += "<p>" + description + "</p>";

                movieContainer.innerHTML = movieContent;
            } else {
                movieContainer.innerHTML = "<p>Tietoja ei ole saatavilla.</p>";
            }
        })
        .catch(function(error) {
            document.getElementById("weekly-movie").innerHTML = "<p>Viikon suositusta ei voitu ladata.</p>";
            console.log("Virhe suosituksen haussa:", error);
        });
}

document.addEventListener("DOMContentLoaded", fetchWeeklyRecommendation);
