#!/usr/bin/env node

import inquirer from "inquirer";
import {
  addition,
  subtraction,
  multiplication,
  division,
} from "./operations.js";

const questions = [
  {
    type: "number",
    name: "number",
    message: "Enter a number",
  },
  {
    type: "list",
    name: "operator",
    message: "What operation do you perform?",
    choices: ["+", "-", "*", "/"],
  },
  {
    type: "number",
    name: "anotherNumber",
    message: "Enter another number",
  },
];

type Operators = "+" | "-" | "*" | "/";

const calculate = (num: number, num2: number, operator: Operators) => {
  switch (operator) {
    case "+":
      return addition(num, num2);
    case "-":
      return subtraction(num, num2);
    case "*":
      return multiplication(num, num2);
    case "/":
      return division(num, num2);
  }
};

const { number, anotherNumber, operator } = await inquirer.prompt(questions);
console.log(calculate(number, anotherNumber, operator));
