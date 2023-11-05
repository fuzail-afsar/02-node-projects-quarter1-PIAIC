import Person from "./person.js";

class Student extends Person {
  private _name: string = "";

  get name() {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

export default Student;
