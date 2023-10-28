import inquirer from "inquirer";
import chalk from "chalk";

enum TodosAction {
  VIEW = "View",
  CREATE = "Create",
  UPDATE = "Update",
  DELETE = "Delete",
}

(function () {
  const todos: string[] = [];

  async function createTodo() {
    const { todo } = await inquirer.prompt({
      type: "input",
      name: "todo",
      message: "Enter todo",
    });
    todos.push(todo);
  }

  async function updateTodo() {
    const { updateTodo, todo } = await inquirer.prompt([
      {
        type: "list",
        choices: todos,
        name: "updateTodo",
        message: "Select todo to update",
      },
      {
        type: "input",
        name: "todo",
        message: "Enter updated todo",
      },
    ]);

    const index = todos.indexOf(updateTodo);
    if (index === -1) throw new Error("Todo not fount!");

    todos.splice(index, 1, todo);
  }

  async function deleteTodo() {
    const { deleteTodo } = await inquirer.prompt({
      type: "list",
      choices: todos,
      name: "deleteTodo",
      message: "Select todo to delete",
    });

    const index = todos.indexOf(deleteTodo);
    if (index === -1) throw new Error("Todo not fount!");

    todos.splice(index, 1);
  }

  function viewTodos() {
    todos.forEach((todo) => console.log(chalk.bold.blueBright(todo)));
  }

  async function getTodoActions() {
    try {
      const { action } = await inquirer.prompt({
        type: "list",
        choices: Object.values(TodosAction),
        name: "action",
        message: "Select todo option",
      });

      switch (action) {
        case TodosAction.VIEW:
          viewTodos();
          break;
        case TodosAction.CREATE:
          await createTodo();
          break;
        case TodosAction.UPDATE:
          await updateTodo();
          break;
        case TodosAction.DELETE:
          await deleteTodo();
          break;
      }
      getTodoActions();
    } catch (error) {
      if (error instanceof Error) {
        console.log(chalk.bold.redBright(error.message));
      } else if (typeof error === "string") {
        console.log(chalk.bold.redBright(error));
      }
    }
  }

  function init() {
    getTodoActions();
  }

  return init();
})();
