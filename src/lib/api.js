const loaded = document.querySelector(".header__button");

export function getCharacters() {
  let url = "https://rickandmortyapi.com/api/character";
  const filterDropdown = document.querySelector(".dropdown-menu");

  const type = filterDropdown.value;

  if (type === "all") {
    url = "https://rickandmortyapi.com/api/character";
  } else if (type === "alive") {
    url = "https://rickandmortyapi.com/api/character?status=alive";
  } else if (type === "dead") {
    url = "https://rickandmortyapi.com/api/character?status=dead";
  } else if (type === "unknown") {
    url = "https://rickandmortyapi.com/api/character?status=unknown";
  }

  fetch(url)
    .then((response) => {
      loaded.textContent = "Loaded!";

      if (response.ok) {
        loaded.textContent = "Success!";
        return response.json();
      } else {
        loaded.textContent = "Ooops!";
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
        const status = document.createElement("p");
        status.classList.add("character-status");
        status.textContent = `Status: ${character.status}`;
        const wrapper = document.createElement("div");
        wrapper.classList.add("info-wrapper");

        main.append(section);
        section.append(wrapper);
        wrapper.append(h2);
        wrapper.append(status);
        section.append(img);

        if (character.status === "Alive") {
          section.style.backgroundColor = " #33FF99";
        } else if (character.status === "Dead") {
          section.style.backgroundColor = "#ff2020";
        } else if (character.status === "unknown") {
          section.style.backgroundColor = "#d4d0d0";
        }
      });
    });
}

export function clearCharacters() {
  const section = document.querySelectorAll("section");
  section.forEach((section) => section.remove());
}
