import chalk from "chalk";

class Utils {
  static getRandomNumber(min = 0, max = 100) {
    return Math.floor(Math.random() * max - min + 1) + min;
  }

  static playerLog(string: string) {
    console.log(chalk.bold.greenBright(string));
  }

  static opponentLog(string: string) {
    console.log(chalk.bold.blueBright(string));
  }
}

export default Utils;
