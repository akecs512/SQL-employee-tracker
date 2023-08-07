const mysql = require(`mysql2`);
const inquirer = require(`inquirer`);
const { printTable } = require("console-table-printer");

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

const errorOrDisplay = (err, list) => {
  if (err) {
    console.error(err);
  } else {
    printTable(list);
  }
};

async function userResponse(answers) {
  const { userChoice } = answers;
  switch (userChoice) {
    case "ALL_DEPARTMENTS":
      connection.query("SELECT * FROM departments", (err, results, _fields) => {
        errorOrDisplay(err, results);
      });
      connection.end();
      break;

    case "ALL_ROLES":
      connection.query("SELECT * FROM roles", (err, results, _fields) => {
        errorOrDisplay(err, results);
      });
      connection.end();
      break;

    case "ALL_EMPLOYEES":
      connection.query("SELECT * FROM employees", (err, results, _fields) => {
        errorOrDisplay(err, results);
      });
      connection.end();
      break;
    case "ADD_DEPARTMENTS":
      connection.query(
        `INSERT INTO departments (id, name) VALUES ('')`,
        (err, results, _fields) => {}
      );
      break;

    case "ADD_ROLES":
      const roleQuestions = [
        { name: "title", type: "input", message: "title?" },
        { name: "salary", type: "input", message: "salary?" },
        { name: "departmentId", type: "input", message: "department id?" },
      
      ];

      const query = (answers) => {
        const { title, salary, departmentId } = answers;
        return `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', '${departmentId}')`;
      };

      promptAndQuery(roleQuestions, query);
      break;

    case "UPDATE_EMPLOYEES":
      break;

    default:
      console.error("Failed to handle a question of type:", userChoice)
      process.exit(0)
      // break; // unnecessary with exit
  }
}

/**
 * Generic inquiry prompt handler
 * @param questions is the list of question objects to be asked
 * @param sqlQuery is a template string _function_ that destructures the answers into a proper SQL query.
 */
promptAndQuery = (questions, sqlQuery) => {
  inquirer.prompt(questions).then((answers) => {
    connection.query(sqlQuery(answers), (err, results, _fields) => {
      if (err) {
        console.error(error);
      } else {
        console.log(`Inserted new role with id of: ${results.insertId}`);
      }
    });
    connection.end();
  });
};

init();
