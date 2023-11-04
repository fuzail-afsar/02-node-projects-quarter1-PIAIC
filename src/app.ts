import chalk from "chalk";
import inquirer from "inquirer";

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  answers: string[];
};

type FetchQuestionsResponse = {
  response_code: number;
  results: Question[];
};

{
  const shuffle = <K>(arr: K[]) => {
    for (var i = 0; i < arr.length; i++) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  const fetchQuestions = async (amount = 10, type = "multiple") => {
    try {
      const res = await fetch(
        `https://opentdb.com/api.php?amount=${amount}&type=${type}`
      );
      const data = (await res.json()) as FetchQuestionsResponse;

      if (!data?.results) throw new Error("Data has not fetched");

      data.results.forEach((res) => {
        res.answers = shuffle([...res.incorrect_answers, res.correct_answer]);
      });

      return data.results;
    } catch (error) {
      throw error;
    }
  };

  (async () => {
    let score = 0;
    try {
      const questions = await fetchQuestions();
      const totalQuestions = questions.length;

      console.log(chalk.bold.italic.blue("Quiz has been started!"));

      for (let i = 0; i < totalQuestions; i++) {
        const { question, answers, correct_answer } = questions[i];

        const { userAnswer } = await inquirer.prompt({
          name: "userAnswer",
          type: "list",
          choices: answers,
          message: question,
        });

        if (userAnswer === correct_answer) {
          score++;
          console.log(chalk.green("Correct answer"));
          continue;
        }

        console.log(chalk.red("Wrong answer!"));
      }

      console.log(
        `Your score is ${chalk.bold.blue(score)} out of ${chalk.bold.blue(
          totalQuestions
        )}`
      );
    } catch (error) {
      if (error instanceof Error)
        console.error(chalk.bold.redBright(error.message));
      else if (typeof error === "string")
        console.error(chalk.bold.redBright(error));
    }
  })();
}
