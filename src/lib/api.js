const loaded = document.querySelector(".header__button");

export function getCharacters() {
  let url = "https://rickandmortyapi.com/api/character";
  const filterDropdown = document.querySelector(".dropdown-menu");
  const searchbar = document.querySelector(".searchbar");
  const characterName = searchbar.value;
  const type = filterDropdown.value;

  if (type === "all") {
    url = `https://rickandmortyapi.com/api/character?name=${characterName}`;
  } else if (type === "alive") {
    url = `https://rickandmortyapi.com/api/character?name=${characterName}&status=alive`;
  } else if (type === "dead") {
    url = `https://rickandmortyapi.com/api/character?name=${characterName}&status=dead`;
  } else if (type === "unknown") {
    url = `https://rickandmortyapi.com/api/character?name=${characterName}&status=unknown`;
  }

  fetch(url)
    .then((response) => {
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      async function delayedGreeting() {
        loaded.textContent = "Success!";
        await sleep(2000);
        loaded.textContent = "Load Data";
      }

      if (response.ok) {
        delayedGreeting();
        return response.json();
      } else {
        console.log(`Error: ${response.status}`);
        loaded.textContent = "Select All and Press Here";
      }
    })
    .then((dataObject) => {
      console.log(dataObject);
      dataObject.results.forEach((character) => {
        const section = document.createElement("section");
        section.classList.add("character");
        const main = document.querySelector("main");
        main.classList.add("main");

        const h2 = document.createElement("h2");
        h2.classList.add("character-name");
        h2.textContent = character.name;
        const img = document.createElement("img");
        img.classList.add("character-image");
        img.src = character.image;
        img.alt = character.name;

        const wrapper = document.createElement("div");
        wrapper.classList.add("info-wrapper");

        const status = document.createElement("p");
        status.classList.add("character-info");
        status.textContent = `Status: ${character.status}`;

        const species = document.createElement("p");
        species.classList.add("character-info");
        species.textContent = `Species: ${character.species}`;

        const gender = document.createElement("p");
        gender.classList.add("character-info");
        gender.textContent = `Gender: ${character.gender}`;

        main.append(section);
        wrapper.append(h2);
        section.append(img);
        section.append(wrapper);
        wrapper.append(status);
        wrapper.append(species);
        wrapper.append(gender);

        if (character.status === "Alive") {
          section.style.backgroundColor = "var(--alive-color-)";
        } else if (character.status === "Dead") {
          section.style.backgroundColor = "var(--dead-color-)";
        } else if (character.status === "unknown") {
          section.style.backgroundColor = "var(--unknown-color-)";
        }
      });
    });
}

export function clearCharacters() {
  const section = document.querySelectorAll("section");
  section.forEach((section) => section.remove());
}
