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
  inquirer.prompt(questions).then((answers) => {
    userResponse(answers);
    connection.end();
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

function userResponse(answers) {
  const { userChoice } = answers;
  console.log(JSON.stringify(userChoice));
  console.log(answers);

  switch (userChoice) {
    case "ALL_DEPARTMENTS":
      connection.query(
        "SELECT * FROM departments",
        (err,results,fields)=>{
          console.log(results)
          console.log(fields)
          console.log(err)

        }
      )

      break;

    case "ALL_ROLES":
      break;

    case "ALL_EMPLOYEES":
      break;
    case "ADD_DEPARTMENTS":
      break;
    case "ADD_ROLES":
      break;
    case "UPDATE_EMPLOYEES":
      break;

    default:
      break;
  }
}

init();
