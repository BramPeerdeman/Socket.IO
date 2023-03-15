function updateScreens() {
    // Laad de JSON-gegevens in met behulp van een AJAX-verzoek
    $.getJSON("film.json", function(data) {
      // Stel de huidige tijd in
      var currentTime = new Date().getTime() / 1000;
  
      // Stel de duur van de film in op 30 seconden
      var filmDuration = 30;
  
      // Stel de standaard sectie in op "action"
      var currentSection = "action";
  
      // Zoek alle films in de huidige sectie waarvan de releasedatum in het verleden ligt
      var currentFilms = data["genre"][currentSection].filter(function(film) {
        var releaseTime = new Date(film["release_date"]).getTime() / 1000;
        return releaseTime <= currentTime;
      });
  
      // Stuur de afbeeldingen van de huidige films naar de schermen
      for (var i = 0; i < currentFilms.length; i++) {
        console.log("Stuur film " + currentFilms[i]["title"] + " naar scherm " + (i+1));
        // Stuur de afbeelding van de film naar het bijbehorende scherm
        // (de code om dit te doen is afhankelijk van de specifieke hardware en software die wordt gebruikt)
      }
  
      // Wacht de duur van de film voordat de volgende update wordt verzonden
      setTimeout(updateScreens, filmDuration * 1000);
  
      // Controleer of een film is afgelopen en verander indien nodig de huidige sectie
      // (in dit voorbeeld wordt de sectie alleen veranderd als de film "The Matrix Resurrections" is afgelopen)
      if (currentSection == "action") {
        if (currentFilms[1]["title"] == "The Matrix Resurrections" && new Date().getTime() / 1000 >= currentTime + filmDuration * 2) {
          currentSection = "comedy";
          console.log("De film is afgelopen, schakel over naar comedy");
        }
      } else if (currentSection == "comedy") {
        if (currentFilms[1]["title"] == "Don't Look Up" && new Date().getTime() / 1000 >= currentTime + filmDuration * 2) {
          currentSection = "action";
          console.log("De film is afgelopen, schakel over naar actie");
        }
      }
    });
  }