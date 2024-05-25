import Game from "../modules/game.js";
import Player from "../modules/player.js";

document.addEventListener("DOMContentLoaded", () => {
  const startPage = document.getElementById("StartGame");
  const createWorld = document.getElementById("createWorld");
  const gameModeButton = document.getElementById("gameModeButton");
  const difficultyButton = document.getElementById("difficultyButton");
  const commandButton = document.getElementById("commandButton");
  const gameModeText = document.getElementById("gameMode");
  const difficultyText = document.getElementById("difficulty");
  const command = document.getElementById("commands");
  const cancelButton = document.getElementById("cancelButton");
  const createWorldButton = document.getElementById("createWorldButton");

  const player = new Player();

  function singlePlayer() {
    startPage.style.display = "none";
    createWorld.style.display = "flex";
  }

  function toggleGameMode() {
    const gameModes = ["Survival", "Creative", "Hardcore"];
    const currentMode = gameModeText.textContent;
    const currentIndex = gameModes.indexOf(currentMode);
    const nextIndex = (currentIndex + 1) % gameModes.length;
    gameModeText.textContent = gameModes[nextIndex];
  }

  function toggleDifficulty() {
    const difficulties = ["Peaceful", "Easy", "Normal", "Hard"];
    const currentDifficulty = difficultyText.textContent;
    const currentIndex = difficulties.indexOf(currentDifficulty);
    const nextIndex = (currentIndex + 1) % difficulties.length;
    difficultyText.textContent = difficulties[nextIndex];
  }

  function toggleCommands() {
    command.textContent = command.textContent === "Off" ? "On" : "Off";
  }

  function cancel() {
    startPage.style.display = "flex";
    createWorld.style.display = "none";
  }

  function startGame() {
    const gameName = document.getElementById("worldName").value;
    const gameMode = gameModeText.textContent;
    const commands = command.textContent;
    const difficulty = difficultyText.textContent;

    const newGame = new Game(player, gameName, gameMode, commands, difficulty);
    newGame.createWorld();
    newGame.print();

    startPage.style.display = "none";
    createWorld.style.display = "none";
    document.getElementById("body").style.display = "flex";
    document.getElementById("tools").style.display = "flex";
  }

  function multiplayer() {
    console.log("multiplayer");
  }

  function options() {
    console.log("options");
  }

  function realms() {
    console.log("Realms");
  }

  document
    .getElementById("Singleplayer")
    .addEventListener("click", singlePlayer);
  document.getElementById("Multiplayer").addEventListener("click", multiplayer);
  document.getElementById("Options").addEventListener("click", options);
  document.getElementById("Realms").addEventListener("click", realms);

  gameModeButton.addEventListener("click", toggleGameMode);
  difficultyButton.addEventListener("click", toggleDifficulty);
  commandButton.addEventListener("click", toggleCommands);
  cancelButton.addEventListener("click", cancel);
  createWorldButton.addEventListener("click", startGame);
});
