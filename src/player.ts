import Utils from "./utils.js";

class Player {
  private maxHealth: number = 100;
  private _health: number = this.maxHealth;
  private maxAttackThreshold: number = 25;
  private _chances: number = 3;

  public get chances() {
    return this._chances;
  }

  public winGame() {
    return this._chances++;
  }

  public drinkHealth() {
    if (this._chances < 1) return false;

    this._chances--;

    const health = Utils.getRandomNumber(1, 15);
    const healthTotal = health + this._health;

    this._health = healthTotal > this.maxHealth ? this.maxHealth : healthTotal;

    return true;
  }

  public attack() {
    this._health -= Utils.getRandomNumber(0, this.maxAttackThreshold);
    if (this._health < 1) return -1;

    return this._health;
  }

  public get health() {
    return this._health;
  }
}

export default Player;
