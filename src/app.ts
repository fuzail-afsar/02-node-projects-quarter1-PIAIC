import inquirer from "inquirer";
import chalk from "chalk";

enum ActionChoices {
  WORD_COUNT = "Word Count",
  CHARACTER_COUNT = "Character Count",
}

(function () {
  function getWordCount(paragraph: string) {
    if (!paragraph) return 0;
    return paragraph.split(" ").length;
  }

  function getCharacterCount(paragraph: string) {
    if (!paragraph) return 0;
    return paragraph.replace(/\s/g, "").length;
  }

  async function getUserInput() {
    const { paragraph, action } = await inquirer.prompt([
      {
        type: "input",
        name: "paragraph",
        message: "Enter paragraph for word count or character count",
      },
      {
        type: "list",
        name: "action",
        choices: Object.values(ActionChoices),
        message: "Select option",
      },
    ]);

    let count = 0;
    switch (action) {
      case ActionChoices.CHARACTER_COUNT:
        count = getCharacterCount(paragraph);
        break;
      case ActionChoices.WORD_COUNT:
      default:
        count = getWordCount(paragraph);
        break;
    }

    console.log(`The ${action} of paragraph: ${chalk.bold.blueBright(count)}`);

    getUserInput();
  }

  function init() {
    getUserInput();
  }

  return init();
})();
