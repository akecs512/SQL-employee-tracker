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
  inquirer. prompt(questions).then((answers) => {
    console.log(JSON.stringify(answers));
    connection.end()
  });
}
const questions = [
  {
    name: "userChoice",
    message: "What would you like to do?",
    type: "list",
    choices: [      
    { name: "view all departments", value: "ALL_DEPARTMENTS" },
    { name: "view all roles", value: "ALL_ROLES" },
    { name: "view all employees", value: "ALL_EMPLOYEES" },
    { name: "add a department", value: "ADD_DEPARTMENTS" },
    { name: "add a role", value: "ADD_ROLES" },
    { name: "add an employee", value: "ADD_EMPLOYEES" },
    { name: "update an employee role", value: "UPDATE_EMPLOYEES" },
],
  },
];

init();
