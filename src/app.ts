import chalk from "chalk";
import inquirer from "inquirer";
import Person from "./person.js";
import Student from "./student.js";

enum PersonalityChoises {
  INTROVERT = "Introvert",
  EXTROVERT = "Extrovert",
}

class App {
  constructor() {
    this.init();
  }

  async init() {
    const personality = await this.askPersonality();

    const person = new Person();
    person.personality = personality;

    const name = await this.askName();

    const student = new Student();
    student.name = name;

    console.log(
      chalk.blue(
        `Your name is ${chalk.bold(
          student.name
        )} and your personality type is ${chalk.bold(person.personality)}`
      )
    );
  }

  async askPersonality(): Promise<PersonalityChoises> {
    const { personality } = await inquirer.prompt({
      name: "personality",
      type: "list",
      choices: Object.values(PersonalityChoises),
      message: "Select your personality: ",
    });

    return personality;
  }

  async askName(): Promise<string> {
    const { name } = await inquirer.prompt({
      name: "name",
      type: "input",
      message: "Enter your name: ",
    });

    return name;
  }
}

new App();
