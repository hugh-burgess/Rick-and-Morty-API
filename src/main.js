import { getCharacters } from "./lib/api";

const button = document.querySelector("button");

function clearCharacters() {
  const section = document.querySelectorAll("section");
  section.forEach((section) => section.remove());
}

button.addEventListener("click", () => {
  clearCharacters();

  getCharacters();
});
