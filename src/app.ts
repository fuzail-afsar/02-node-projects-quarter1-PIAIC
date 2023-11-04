import chalk from "chalk";
import inquirer from "inquirer";
import { setInterval } from "timers";

let { timeSeconds } = await inquirer.prompt({
  name: "timeSeconds",
  type: "number",
  message: "Enter timer value in seconds: ",
});

let intervalId = setInterval(() => {
  timeSeconds--;

  const min = Math.floor(timeSeconds / 60)
    .toFixed()
    .padStart(2, "0");
  const sec = Math.floor(timeSeconds % 60)
    .toFixed()
    .padStart(2, "0");
  console.log(`Time left: ${chalk.bold.blue(min)}:${chalk.bold.blue(sec)}`);

  if (timeSeconds <= 0) clearInterval(intervalId);
}, 1000);
