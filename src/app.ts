import inquirer from "inquirer";
import chalk from "chalk";

const MAX = 9;
const MIN = 0;

const getRadomNumber = (max = MAX, min = MIN) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomNumber = getRadomNumber();
const questions = [
  {
    type: "number",
    name: "guessedNumber",
    message: `Guess a number between ${MAX} and ${MIN}`,
    validate: (val: string) => {
      const num = parseInt(val);
      if (isNaN(num)) {
        return "Invalid number";
      }
      if (num > MAX || num < MIN) {
        return "Outof range number";
      }
      return true;
    },
  },
];

const { guessedNumber } = await inquirer.prompt(questions);

if (randomNumber === guessedNumber) {
  console.log(chalk.bold.blueBright("Congratulations! You won."));
} else {
  console.log(chalk.bold.redBright("Sorry! You loss."));
}
