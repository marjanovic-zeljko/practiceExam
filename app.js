//Web page is loaded
document.addEventListener("DOMContentLoaded", function () {
  var page = 1;
  var totalPages = 1;
  var isLoading = false;
  var limit = 3;

  function loadCharacters(page, limit) {
    isLoading = true;
    var loadMoreButton = document.getElementById("load-more");
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = "Loading...";

    //pULLING API
    var api = new XMLHttpRequest();
    api.open(
      "GET",
      "https://rickandmortyapi.com/api/character?page=" +
        page +
        "&limit=" +
        limit,
      true
    );
    api.onload = function () {
      //Check if server status okay
      if (api.status === 200) {
        var response = JSON.parse(api.responseText);
        totalPages = response.info.pages;

        response.results.forEach(function (character) {
          //Creating card container and creating elements via javascript
          var characterCard = document.createElement("div");
          characterCard.classList.add("character-card");

          var characterText = document.createElement("div");
          characterText.classList.add("character-text");
          //creating species container
          var characterTextSpecies = document.createElement("div");
          characterTextSpecies.classList.add("character-text-species");
          //creating origin container
          var characterTextOrigin = document.createElement("div");
          characterTextOrigin.classList.add("character-text-origin");
          //creating location container
          var characterTextLocation = document.createElement("div");
          characterTextLocation.classList.add("character-text-location");

          var characterImage = document.createElement("img");
          characterImage.src = character.image;
          characterImage.alt = character.name;

          var characterName = document.createElement("h3");
          characterName.textContent = character.name;
          //species
          var characterSpecies = document.createElement("p");
          characterSpecies.textContent = "Species";
          var characterSpecies2 = document.createElement("p");
          characterSpecies2.textContent = character.species;
          //origin
          var characterOrigin = document.createElement("p");
          characterOrigin.textContent = "Origin";
          var characterOrigin2 = document.createElement("p");
          characterOrigin2.textContent = character.origin.name;

          //location
          var characterLocation = document.createElement("p");
          characterLocation.textContent = "Location";
          var characterLocation2 = document.createElement("p");
          characterLocation2.textContent = character.location.name;

          characterCard.appendChild(characterImage);
          characterText.appendChild(characterName);

          //Click to call function for card description
          characterCard.addEventListener("click", function () {
            showCharacterDetails(character);
          });

          var characterList = document.getElementById("character-list");
          characterList.appendChild(characterCard);
          characterList.appendChild(characterText);
          characterCard.appendChild(characterText);

          characterText.appendChild(characterTextSpecies);
          characterText.appendChild(characterTextOrigin);
          characterText.appendChild(characterTextLocation);

          //species
          characterTextSpecies.appendChild(characterSpecies);
          characterTextSpecies.appendChild(characterSpecies2);
          //origin
          characterTextOrigin.appendChild(characterOrigin);
          characterTextOrigin.appendChild(characterOrigin2);
          character;

          //location
          characterTextLocation.appendChild(characterLocation);
          characterTextLocation.appendChild(characterLocation2);
        });

        isLoading = false;
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = "Load More";
      }
    };
    api.send();
  }

  //CHARACTER DETAIL ON CLICK
  function showCharacterDetails(character) {
    var detailsUrl = "details.html?id=" + character.id;
    window.location.href = detailsUrl;
    var characterDetails = document.getElementById("character-details");
    characterDetails.innerHTML = "";
    characterDetails.style.display = "block";

    var characterImage = document.createElement("img");
    characterImage.src = character.image;

    var characterName = document.createElement("h2");
    characterName.textContent = character.name;
    var characterStatus = document.createElement("p");
    characterStatus.textContent = "Status: " + character.status;
    var characterSpecies = document.createElement("p");
    characterSpecies.textContent = "Species: " + character.species;
    var characterOrigin = document.createElement("p");
    characterOrigin.textContent = "Origin: " + character.origin.name;
    var characterLocation = document.createElement("p");
    characterLocation.textContent = "Location: " + character.location.name;

    characterDetails.appendChild(characterImage);
    characterDetails.appendChild(characterName);
    characterDetails.appendChild(characterStatus);
    characterDetails.appendChild(characterSpecies);
    characterDetails.appendChild(characterOrigin);
    characterDetails.appendChild(characterLocation);
  }

  //   Search functioN
  var searchInput = document.getElementById("search-input");
  searchInput.addEventListener("input", function () {
    clearTimeout(this.timer);
    var searchQuery = this.value;

    if (searchQuery.length >= 3) {
      this.timer = setTimeout(function () {
        var characterList = document.getElementById("character-list");
        characterList.innerHTML = "";
        page = 1; // Reset the page when searching
        loadCharactersBySearch(searchQuery, limit);
      }, 500);
    }
  });

  function loadCharactersBySearch(searchQuery, limit) {
    isLoading = true;
    var loadMoreButton = document.getElementById("load-more");
    loadMoreButton.disabled = true;
    loadMoreButton.textContent = "Loading...";

    var api = new XMLHttpRequest();
    api.open(
      "GET",
      "https://rickandmortyapi.com/api/character?page=" +
        page +
        "&name=" +
        searchQuery +
        "&limit=" +
        limit,
      true
    );
    api.onload = function () {
      if (api.status === 200) {
        var response = JSON.parse(api.responseText);
        totalPages = response.info.pages;

        response.results.forEach(function (character) {
          var characterCard = document.createElement("div");
          characterCard.classList.add("character-card");

          var characterText = document.createElement("div");
          characterText.classList.add("character-text");
          //creating species container
          var characterTextSpecies = document.createElement("div");
          characterTextSpecies.classList.add("character-text-species");
          //creating origin container
          var characterTextOrigin = document.createElement("div");
          characterTextOrigin.classList.add("character-text-origin");
          //creating location container
          var characterTextLocation = document.createElement("div");
          characterTextLocation.classList.add("character-text-location");

          var characterImage = document.createElement("img");
          characterImage.src = character.image;

          var characterName = document.createElement("h3");
          characterName.textContent = character.name;
          //species
          var characterSpecies = document.createElement("p");
          characterSpecies.textContent = "Species";
          var characterSpecies2 = document.createElement("p");
          characterSpecies2.textContent = character.species;
          //origin
          var characterOrigin = document.createElement("p");
          characterOrigin.textContent = "Origin";
          var characterOrigin2 = document.createElement("p");
          characterOrigin2.textContent = character.origin.name;

          //location
          var characterLocation = document.createElement("p");
          characterLocation.textContent = "Location";
          var characterLocation2 = document.createElement("p");
          characterLocation2.textContent = character.location.name;

          characterCard.appendChild(characterImage);
          characterText.appendChild(characterName);
          characterCard.addEventListener("click", function () {
            showCharacterDetails(character);
          });

          var characterList = document.getElementById("character-list");
          characterList.appendChild(characterCard);
          characterList.appendChild(characterText);
          characterCard.appendChild(characterText);

          characterText.appendChild(characterTextSpecies);
          characterText.appendChild(characterTextOrigin);
          characterText.appendChild(characterTextLocation);

          //species
          characterTextSpecies.appendChild(characterSpecies);
          characterTextSpecies.appendChild(characterSpecies2);
          //origin
          characterTextOrigin.appendChild(characterOrigin);
          characterTextOrigin.appendChild(characterOrigin2);
          character;

          //location
          characterTextLocation.appendChild(characterLocation);
          characterTextLocation.appendChild(characterLocation2);
        });

        isLoading = false;
        loadMoreButton.disabled = false;
        loadMoreButton.textContent = "Load More";
      }
    };
    api.send();
  }

  //   document.getElementById("load-more").addEventListener("click", function () {
  //     if (!isLoading && page < totalPages) {
  //       page++;
  //       loadCharacters(page, limit);
  //     }
  //   });

  loadCharacters(page, limit);

  //   Adding more cards on scroll
  window.onscroll = function (ev) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadCharacters(page, limit);
    }
  };
});

// Catching id
var urlParams = new URLSearchParams(window.location.search);
var characterId = urlParams.get("id");

//Calling api
var apiUrl = "https://rickandmortyapi.com/api/character/" + characterId;
fetch(apiUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (character) {
    // sHOWING CHARACTERS
    var characterDetails = document.getElementById("character-details");
    //for Episodes
    var episodes = document.getElementById("episodes");

    var characterImage = document.createElement("img");
    characterImage.src = character.image;
    characterImage.alt = character.name;

    characterDetails.appendChild(characterImage);
    characterImage.classList.add("characterImage");

    var characterName = document.createElement("h2");
    characterName.textContent = character.name;

    var species = document.getElementById("species");
    species.textContent = character.species;

    var originText = document.getElementById("origin");
    originText.textContent = character.origin.name;

    var locationText = document.getElementById("location");
    locationText.textContent = character.location.name;

    var statusText = document.getElementById("status");
    statusText.textContent = character.status;

    var genderText = document.getElementById("gender");
    genderText.textContent = character.gender;

    var episodesArray = character.episode;

    characterDetails.appendChild(characterName);

    episodesArray.forEach(function (episodeLink) {
      var episodeParagraph = document.createElement("p");
      var episodeLinkElement = document.createElement("a");
      episodeLinkElement.href = episodeLink;
      episodeLinkElement.textContent = episodeLink;

      episodes.appendChild(episodeParagraph);
      episodes.appendChild(episodeLinkElement);
    });
  })

  .catch(function (error) {
    console.log("Data is not available", error);
  });
