enum Message {
  EMPTY_VALUE = "Empty value not allowed.",
  INVALID_VALUE = "Invalid value.",
  NOT_FOUND = "Not found!",
}

class Student {
  private id: number;
  private name: string = "";
  private _courses: string[] = [];
  private _balance: number = 0;

  constructor(name: string) {
    this.id = this.generateId();
    this.name = name;
  }

  get balance() {
    return this._balance;
  }

  set balance(_balance: number) {
    if (!_balance) throw new Error(Message.INVALID_VALUE);

    this._balance += _balance;
  }

  get courses() {
    return this._courses;
  }

  set courses(_courses: string[]) {
    const hasEmptyCourses = _courses.some((course) => course === "");
    if (hasEmptyCourses) throw new Error(Message.EMPTY_VALUE);

    this._courses = [...this._courses, ..._courses];
  }

  deleteCourse(name: string) {
    if (!name) throw new Error(Message.INVALID_VALUE);

    const index = this._courses.indexOf(name);
    if (index === -1) throw new Error(Message.NOT_FOUND);

    this._courses.splice(index, 1);
  }

  get status() {
    return {
      id: this.id,
      name: this.name,
      courses: this.courses,
      balance: this.balance,
    };
  }

  private generateId() {
    return Math.floor(Math.random() * 100000);
  }
}

export default Student;
