import Player from "./player.js";
import Utils from "./utils.js";

class Opponent extends Player {
  protected _name: string = "";
  protected opponents: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];

  constructor() {
    super();
    this.setOpponent();
  }

  protected setOpponent() {
    this._name = this.opponents[Utils.getRandomNumber(0, 3)];
  }

  public get name() {
    return this._name;
  }
}

export default Opponent;
