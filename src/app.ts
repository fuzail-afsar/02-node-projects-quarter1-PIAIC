import chalk from "chalk";
import inquirer from "inquirer";
import Opponent from "./opponent.js";
import Player from "./player.js";
import Utils from "./utils.js";

enum ActionChoises {
  ATTACK = "Attack",
  DRINK_HEALTH = "Drink Health",
  RUN = "Run",
}

try {
  let isPlaying = true;

  const player = new Player();
  let opponent = new Opponent();

  console.log(chalk.bold.italic.yellowBright("Game Starts!"));
  Utils.playerLog(`Your opponent is ${opponent.name}`);

  while (isPlaying) {
    const { action } = await inquirer.prompt({
      name: "action",
      type: "list",
      choices: Object.values(ActionChoises),
      message: "Select option",
    });

    switch (action) {
      case ActionChoises.ATTACK:
        player.attack();
        opponent.attack();

        if (opponent.health <= 0) {
          Utils.playerLog("You win the game");
          player.winGame();

          opponent = new Opponent();
          Utils.playerLog(`Your new opponent is ${opponent.name}`);
        } else if (player.health <= 0) {
          Utils.opponentLog("You loss the game");
          isPlaying = false;
          continue;
        }

        Utils.playerLog(`Your Health: ${player.health}`);
        Utils.opponentLog(`Opponent Health: ${opponent.health}`);

        break;
      case ActionChoises.DRINK_HEALTH:
        if (player.chances) player.drinkHealth();
        Utils.playerLog(`Your health: ${player.health}`);
        Utils.playerLog(`Your Chances: ${player.chances}`);
        break;
      case ActionChoises.RUN:
        Utils.opponentLog("You loss the game");
        isPlaying = false;
        break;
      default:
        break;
    }
  }

  console.log(chalk.bold.italic.yellowBright("Game Ends!"));
} catch (error) {
  if (error instanceof Error)
    console.error(chalk.bold.redBright(error.message));
  else if (typeof error === "string")
    console.error(chalk.bold.redBright(error));
}
