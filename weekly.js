// hakee viikon suosituksen weekly.json:sta
function fetchWeeklyRecommendation() {
    fetch("weekly.json") // haetaan json tieto
        .then(function(response) {
            return response.json(); // muutetaan json muotoon
        })
        .then(function(data) {
            // etsitään html elementti johon suositus lisätään
            let movieContainer = document.getElementById("weekly-movie");

            // tarkistetaan että jsonissa on kaikki tarvittavat tiedot
            if (data.title && data.year && data.poster && data.description) {
                let title = data.title; // leffan nimi
                let year = data.year; // leffan julk. vuosi
                let poster = data.poster; // julistekuvan url
                let description = data.description; // kuvaus leffasta 

                // rakentaa leffan tiedot html muodossa
                let movieContent = "<h3>" + title + " (" + year + ")</h3>";
                movieContent += "<img src='" + poster + "' alt='" + title + "' style='max-width: 200px; border-radius: 10px; margin: 10px;'>";
                movieContent += "<p>" + description + "</p>";

                // lisää suosituksen html elementtiin
                movieContainer.innerHTML = movieContent;
            } else {
                // jos tietoja puuttuu, näytetään ilmoitus
                movieContainer.innerHTML = "<p>Tietoja ei ole saatavilla.</p>";
            }
        })
        .catch(function(error) {
            // jos json lataus epäonnistuu, tulee virheilmoitus
            document.getElementById("weekly-movie").innerHTML = "<p>Viikon suositusta ei voitu ladata.</p>";
            console.log("Virhe suosituksen haussa:", error); 
        });
}
// kun sivu on ladattu kutsutaan funktiota jotta viikon suositus haetaan automaattisesti
document.addEventListener("DOMContentLoaded", fetchWeeklyRecommendation);
