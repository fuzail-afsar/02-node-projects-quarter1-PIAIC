import chalk from "chalk";
import Student from "./student.js";

try {
  const student1 = new Student("fuzail");
  console.log(student1);

  student1.courses = ["AI", "Web3", "Metaverse", "Soft Skills"];
  student1.deleteCourse("Soft Skills");

  student1.balance = 1000;

  console.log(student1.status);
} catch (error) {
  if (error instanceof Error)
    console.error(chalk.bold.redBright(error.message));
  else if (typeof error === "string")
    console.error(chalk.bold.redBright(error));
}
