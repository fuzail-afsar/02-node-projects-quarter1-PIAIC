import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";

interface User {
  id: string;
  pin: number;
  name: string;
  accountNumber: string;
  balance: number;
}

enum Choices {
  WITHDRAW = "Withdraw",
  BALANCE_ENQUIRY = "Balance Inquiry",
  EXIT = "Exit",
}

(function () {
  let isDefaultUserCreated = false;
  function createRandomUser(): User {
    let pin = parseInt(faker.finance.pin());

    if (!isDefaultUserCreated) {
      pin = 1234;
      isDefaultUserCreated = true;
    }

    return {
      id: faker.string.uuid(),
      pin,
      name: faker.person.fullName(),
      accountNumber: faker.finance.accountNumber(),
      balance: parseInt(faker.finance.amount()),
    };
  }

  async function ATM(users: User[]) {
    try {
      // User pin
      const { pin } = await inquirer.prompt({
        type: "password",
        name: "pin",
        message: "Enter your ATM card pin",
      });

      const user = users.find((user) => user.pin === parseInt(pin));
      if (!user) throw new Error("Invalid user pin");

      let { name, balance } = user;

      console.log(chalk.bold.blueBright(`Welcome! ${name}`));

      // User's Action
      const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        choices: Object.values(Choices),
        message: "Please select an option",
      });

      switch (action) {
        case Choices.WITHDRAW:
          const { amount } = await inquirer.prompt({
            type: "number",
            name: "amount",
            message: "Enter withdraw amount",
          });
          if (amount > balance) throw new Error("Insufficient balance");

          balance -= amount;
          console.log(chalk.bold.blueBright(`Withdraw amount: ${amount}`));
          console.log(
            chalk.bold.blueBright(`Balance after withdraw amount: ${balance}`)
          );
          break;
        case Choices.BALANCE_ENQUIRY:
          console.log(chalk.bold.blueBright(`Your Balance: ${balance}`));
          break;
      }
      console.log(chalk.bold.blueBright("Thanks for using ATM"));
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.bold.redBright(error.message));
      } else if (typeof error === "string") {
        console.log(chalk.bold.redBright(error));
      }
    }
  }

  function init() {
    const users: User[] = faker.helpers.multiple(createRandomUser, {
      count: 5,
    });
    ATM(users);
  }

  return init();
})();
