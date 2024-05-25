class Player {
  constructor() {
    this.inventory = document.getElementById("inventory");
    this.init();
    this.tool = null;
    this.block = null;
  }

  init() {
    document.addEventListener("keydown", (event) => {
      if (event.key === "e") {
        this.showInventory();
      }
    });

    const closeBtn = document.getElementById("closeBtn");
    closeBtn.addEventListener("click", () => {
      this.inventory.style.display = "none";
    });

    const axe = document.getElementById("axe");
    axe.addEventListener("click", () => {
      this.tool = "axe";
    });

    const pickaxe = document.getElementById("pickaxe");
    pickaxe.addEventListener("click", () => {
      this.tool = "pickaxe";
    });

    const sword = document.getElementById("sword");
    sword.addEventListener("click", () => {
      this.tool = "sword";
    });

    const shovel = document.getElementById("shovel");
    shovel.addEventListener("click", () => {
      this.tool = "shovel";
    });

    const items = document.querySelectorAll(".item-wrapper");
    items.forEach((item) => {
      item.addEventListener("click", () => {
        this.block = item.id;
      });
    });
  }
  showInventory() {
    this.inventory.style.display = "grid";
  }
}

export default Player;
