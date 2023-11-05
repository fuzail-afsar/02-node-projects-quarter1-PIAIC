type Personality = "Introvert" | "Extrovert" | "Mystery";

class Person {
  protected _personality: Personality = "Mystery";

  set personality(value: Personality) {
    this._personality = value;
  }
  get personality() {
    return this._personality;
  }
}

export default Person;
