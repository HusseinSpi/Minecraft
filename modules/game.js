class Game {
  constructor(player, gameName, gameMode, commands, difficulty) {
    this.player = player;
    this.gameName = gameName;
    this.gameMode = gameMode;
    this.commands = commands;
    this.difficulty = difficulty;
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
          if (i === this.grid / 2) {
            let randomNumber = Math.floor(Math.random() * 10) + 1;
            if (randomNumber === 1) {
              this.addTree(i, j);
            } else if (randomNumber === 2) {
              this.gridMap[i][j] = "zombie";
            }
          } else {
            this.gridMap[i][j] = "sky";
          }
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
            let randomNumber = Math.floor(Math.random() * 10) + 1;
            if (randomNumber <= 3) {
              newDiv.classList.add("stone");
            }
            if (randomNumber === 4) {
              newDiv.classList.add("sand");
            }
            if (randomNumber === 5) {
              newDiv.classList.add("coal");
            }
            if (randomNumber === 6) {
              newDiv.classList.add("iron");
            }
            if (randomNumber === 7) {
              newDiv.classList.add("gold");
            }
            if (randomNumber === 8) {
              newDiv.classList.add("diamond");
            }
            if (randomNumber === 9) {
              newDiv.classList.add("emerald");
            }
            if (randomNumber === 10) {
              newDiv.classList.add("redstone");
            }
            break;
          case "wood":
            newDiv.classList.add("wood");
            break;
          case "leaves":
            newDiv.classList.add("leaves");
            break;
          case "zombie":
            newDiv.classList.add("zombie");
            break;
          default:
            break;
        }

        gridElement.appendChild(newDiv);
      }
    }

    this.addCellEventListeners();
  }

  addTree(i, j) {
    this.gridMap[i][j] = "wood";
    this.gridMap[i - 1][j] = "wood";
    this.gridMap[i - 2][j] = "wood";
    this.gridMap[i - 3][j] = "leaves";
    this.gridMap[i - 3][j + 1] = "leaves";
    this.gridMap[i - 3][j + 2] = "leaves";
    this.gridMap[i - 3][j - 1] = "leaves";
    this.gridMap[i - 3][j - 2] = "leaves";
    this.gridMap[i - 4][j] = "leaves";
    this.gridMap[i - 4][j - 1] = "leaves";
    this.gridMap[i - 4][j + 1] = "leaves";
    this.gridMap[i - 5][j] = "leaves";
  }

  addCellEventListeners() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
      cell.addEventListener("click", () => {
        this.handleCellClick(cell);
      });
    });
  }

  handleCellClick(cell) {
    const blockType = Array.from(cell.classList).find((className) =>
      [
        "grass",
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
        "zombie",
      ].includes(className)
    );

    if (!blockType) {
      if (
        document.getElementById(this.player.block).attributes["data-count"]
          .value > 0
      ) {
        cell.classList.add(this.player.block);
        document.getElementById(this.player.block).attributes["data-count"]
          .value--;
      }
    } else {
      switch (this.player.tool) {
        case "axe":
          if (blockType === "wood" || blockType === "leaves") {
            document.getElementById(blockType).attributes["data-count"].value++;
            cell.className = "cell";
          }
          break;
        case "pickaxe":
          if (
            [
              "stone",
              "coal",
              "iron",
              "gold",
              "diamond",
              "emerald",
              "redstone",
            ].includes(blockType)
          ) {
            document.getElementById(blockType).attributes["data-count"].value++;
            cell.className = "cell";
          }
          break;
        case "shovel":
          if (blockType === "sand" || blockType === "grass") {
            document.getElementById(blockType).attributes["data-count"].value++;
            cell.className = "cell";
          }
          break;
        case "sword":
          if (blockType === "zombie") {
            document.getElementById(blockType).attributes["data-count"].value++;
            cell.className = "cell";
          }
          break;
        default:
          break;
      }
    }
  }
}

export default Game;
