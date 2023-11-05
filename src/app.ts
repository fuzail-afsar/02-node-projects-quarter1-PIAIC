import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";
import Account, { IAccount } from "./account.js";

enum ServiceChoices {
  BALANCE_ENQUIRY = "Balance Enquiry",
  CASH_DEPOSIT = "Cash Deposit",
  CASH_WITHDRAW = "Cash Withdraw",
  EXIT = "Exit",
}

class Bank {
  private accounts: IAccount[] = [];
  constructor() {
    this.init();
  }

  private init() {
    this.setAccounts();
    this.serveServices();
  }

  private setAccounts() {
    const { accounts } = new Account();
    this.accounts = accounts;
  }

  private async serveServices() {
    try {
      const service = await this.askService();
      switch (service) {
        case ServiceChoices.BALANCE_ENQUIRY:
          await this.balanceEnquiry();
          break;
        case ServiceChoices.CASH_DEPOSIT:
          await this.transaction(ServiceChoices.CASH_DEPOSIT);
          break;
        case ServiceChoices.CASH_WITHDRAW:
          await this.transaction(ServiceChoices.CASH_WITHDRAW);
          break;
        case ServiceChoices.EXIT:
          return;
      }
      this.serveServices();
    } catch (error) {
      if (error instanceof Error) {
        console.error(chalk.bold.redBright(error.message));
      } else if (typeof error === "string") {
        console.error(chalk.bold.redBright(error));
      }
      this.serveServices();
    }
  }

  private async transaction(
    type: ServiceChoices.CASH_DEPOSIT | ServiceChoices.CASH_WITHDRAW
  ) {
    const { balance, accountNumber, ...rest } = await this.findAccount();
    const amount = await this.askAmount();
    let total = 0;

    if (type === ServiceChoices.CASH_WITHDRAW) {
      if (amount > balance) throw new Error("Insufficent Balance!");
      total = balance - amount;
    } else {
      total = balance + amount;
    }

    const index = this.accounts.findIndex(
      (acc) => acc.accountNumber === accountNumber
    );

    this.accounts.splice(index, 1, { accountNumber, ...rest, balance: total });
  }

  private async balanceEnquiry() {
    try {
      const account = await this.findAccount();
      const { name, balance } = account;

      console.log(
        `Dear! ${chalk.bold.italic(name)}, your balance is ${chalk.bold.green(
          balance
        )}`
      );
    } catch (error) {
      throw error;
    }
  }

  private async findAccount() {
    try {
      const accountNumber = await this.askAccountNumber();
      const account = this.accounts.find(
        (acc) => acc.accountNumber === accountNumber
      );

      if (!account) throw new Error("Account not found!");

      return account;
    } catch (error) {
      throw error;
    }
  }

  private async askAmount() {
    try {
      const { amount } = await inquirer.prompt({
        name: "amount",
        type: "number",
        message: "Enter Amount: ",
      });
      return amount;
    } catch (error) {
      throw error;
    }
  }

  private async askAccountNumber() {
    try {
      const { accountNumber } = await inquirer.prompt({
        name: "accountNumber",
        type: "input",
        message: "Enter Account Number: ",
      });
      return accountNumber;
    } catch (error) {
      throw error;
    }
  }

  private async askService() {
    try {
      const { service } = await inquirer.prompt({
        name: "service",
        type: "list",
        choices: Object.values(ServiceChoices),
        message: "Select the Service: ",
      });
      return service;
    } catch (error) {
      throw error;
    }
  }
}

new Bank();
