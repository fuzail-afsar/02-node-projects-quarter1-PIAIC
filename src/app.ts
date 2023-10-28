import inquirer from "inquirer";
import chalk from "chalk";

type Response = {
  result: string;
  "error-type": string;
};

type CountriesResponse = {
  supported_codes: [string, string][];
} & Response;

type ConversionResponse = {
  conversion_rate: number;
} & Response;

type Questions = {
  convertFrom: string;
  amount: number;
  convertTo: string;
};

(function () {
  const enum Messages {
    DATA_FAILED = "Sorry! Data can't be loaded.",
    SOMETHING_WENT_WRONG = "Sorry! Something went wrong.",
  }

  const BASE_URL = "https://v6.exchangerate-api.com/";
  const BASE_URL_VER = `${BASE_URL}v6/`;
  const URL = `${BASE_URL_VER}8c1f866bb03164ac358bf216/`;

  async function getCountries(): Promise<string[] | undefined> {
    try {
      const res = await fetch(`${URL}codes`);
      const data = (await res.json()) as CountriesResponse;

      if (!data) throw new Error(Messages.DATA_FAILED);
      if (data.result === "error") throw new Error(data["error-type"]);

      return data.supported_codes.map(([code]) => code);
    } catch (error) {
      throw error;
    }
  }

  async function getConversionRate(
    from: string,
    to: string
  ): Promise<number | undefined> {
    try {
      const res = await fetch(`${URL}pair/${from}/${to}`);
      const data = (await res.json()) as ConversionResponse;

      if (!data) throw new Error(Messages.DATA_FAILED);
      if (data.result === "error") throw new Error(data["error-type"]);

      return data.conversion_rate;
    } catch (error) {
      throw error;
    }
  }

  async function getInfo(countries: string[]): Promise<Questions | undefined> {
    try {
      const { convertFrom, amount, convertTo } = await inquirer.prompt([
        {
          type: "list",
          choices: countries,
          name: "convertFrom",
          message: "Currency convert from:",
        },
        {
          type: "number",
          name: "amount",
          message: ({ convertFrom }) =>
            `Enter an amount to convert from ${chalk.bold.greenBright(
              convertFrom
            )}`,
        },
        {
          type: "list",
          choices: ({ convertFrom }) =>
            countries.filter((code) => code !== convertFrom),
          name: "convertTo",
          message: "Currency convert to:",
        },
      ]);

      return { convertFrom, amount, convertTo } as Questions;
    } catch (error) {
      throw error;
    }
  }

  async function init() {
    try {
      const countries = await getCountries();
      if (!countries) throw new Error();

      const info = await getInfo(countries);
      if (!info) throw new Error();

      const { convertFrom, amount, convertTo } = info;

      const conversion_rate = await getConversionRate(convertFrom, convertTo);
      if (!conversion_rate) throw new Error();

      console.log(
        `Conversion from ${chalk.bold.greenBright(
          convertFrom
        )} to ${chalk.bold.greenBright(convertTo)} = ${chalk.bold.greenBright(
          (conversion_rate * amount).toFixed(2)
        )}`
      );

      init();
    } catch (error) {
      if (error instanceof Error) {
        console.log(
          chalk.bold.redBright(error.message || Messages.SOMETHING_WENT_WRONG)
        );
      } else if (typeof error === "string") {
        console.log(
          chalk.bold.redBright(error || Messages.SOMETHING_WENT_WRONG)
        );
      }
    }
  }

  return init();
})();
