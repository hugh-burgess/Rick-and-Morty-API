import { getCharacters } from "./lib/api";
import { clearCharacters } from "./lib/api";

const button = document.querySelector("button");

button.addEventListener("click", () => {
  clearCharacters();
  getCharacters();
  const message = document.querySelector(".start-message");
  message.remove();
});
