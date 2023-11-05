import { faker } from "@faker-js/faker";

export interface IAccount {
  accountNumber: string;
  name: string;
  balance: number;
}

class Account {
  private _accounts: IAccount[] = [];
  private isDefaultUserCreated = false;

  constructor() {
    this.createRandomAccounts();
  }

  public get accounts() {
    return this._accounts;
  }

  private createRandomAccounts() {
    this._accounts = faker.helpers.multiple(
      this.createRandomAccount.bind(this),
      {
        count: 5,
      }
    );
  }

  private createRandomAccount(): IAccount {
    let accountNumber = faker.finance.accountNumber();

    // Default Account
    if (!this.isDefaultUserCreated) {
      accountNumber = "12345678";
      this.isDefaultUserCreated = true;
    }

    return {
      name: faker.person.fullName(),
      accountNumber,
      balance: parseInt(faker.finance.amount()),
    };
  }
}

export default Account;
