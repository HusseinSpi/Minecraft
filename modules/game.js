class Game {
  constructor(gameName, gameMode, commands, difficulty) {
    this.gameName = gameName;
    this.gameMode = gameMode;
    this.commands = commands;
    this.difficulty = difficulty;
    this.isPlayer = null;
    this.isMonster = null;
    this.grid = null;
    this.gridMap = [];
  }

  setGame() {
    this.grid =
      this.gameMode === "Creative"
        ? 20
        : this.gameMode === "Hardcore"
        ? 32
        : 26;

    const blockTypes = [
      "sky",
      "grass",
      "dirt",
      "stone",
      "sand",
      "coal",
      "iron",
      "gold",
      "diamond",
      "emerald",
      "redstone",
      "wood",
      "leaves",
    ];

    for (let i = 0; i < this.grid; i++) {
      this.gridMap[i] = [];
      for (let j = 0; j < this.grid; j++) {
        if (i <= this.grid / 2) {
          this.gridMap[i][j] = "sky";
        } else if (i <= Math.floor(this.grid / 2) + 2) {
          this.gridMap[i][j] = "grass";
        } else {
          this.gridMap[i][j] = "stone";
        }
      }
    }
    console.log(this.gridMap);
  }

  createWorld() {
    switch (this.difficulty) {
      case "Peaceful":
      case "Easy":
        this.isMonster = false;
        break;
      case "Normal":
      case "Hard":
        this.isMonster = true;
        break;
      default:
        break;
    }
    this.setGame();
  }

  print() {
    const gridElement = document.getElementById("grid");
    gridElement.innerHTML = "";
    gridElement.style.gridTemplateColumns = `repeat(${this.grid}, 1fr)`;

    for (let c = 0; c < this.gridMap.length; c++) {
      for (let r = 0; r < this.gridMap[0].length; r++) {
        const newDiv = document.createElement("div");
        newDiv.className = "cell";

        switch (this.gridMap[c][r]) {
          case "sky":
            newDiv.classList.add("sky");
            break;
          case "grass":
            newDiv.classList.add("grass");
            break;
          case "stone":
            newDiv.classList.add("stone");
            break;
          default:
            break;
        }
        gridElement.appendChild(newDiv);
      }
    }
  }
}

export default Game;
