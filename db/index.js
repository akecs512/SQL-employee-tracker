const mysql = require(`mysql2`);
const inquirer = require(`inquirer`);

const db = mysql.connection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log("connected to the employee db")
);

function init() {
  inquirer.createPromptModule([
    {
      type: "list",
      name: "choices",
      message: "What would you like to do?",
      choices: [
        { choice: "view all departments", value: "ALL_DEPARTMENTS" },
        { choice: "view all roles", value: "ALL_ROLES" },
        { choice: "view all employees", value: "ALL_EMPLOYEES" },
        { choice: "add a department", value: "ADD_DEPARTMENTS" },
        { choice: "add a role", value: "ADD_ROLES" },
        { choice: "add an employee", value: "ADD_EMPLOYEES" },
        { choice: "update an employee role", value: "UPDATE_EMPLOYEES" },
      ],
    },
  ]);
}
.then((answers) => {
    const options = new options(
      answers.choice
    );

init();
