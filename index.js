const mysql = require(`mysql2`);
const inquirer = require(`inquirer`);

const connection = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "employee_db",
  },
  console.log("connected to the employee db")
);

function init() {
  const prompt = inquirer.createPromptModule();
  prompt({
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
  });
}

init();
