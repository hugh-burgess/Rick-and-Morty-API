const loaded = document.querySelector(".header__button");

export function getCharacters() {
  const url = "https://rickandmortyapi.com/api/character";

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

        main.append(section);
        section.append(h2);
        section.append(img);
      });
    });
}
