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

async function userResponse(answers) {
  const { userChoice } = answers;
  console.log(JSON.stringify(userChoice));
  console.log(answers);

  switch (userChoice) {
    case "ALL_DEPARTMENTS":
      connection.query("SELECT * FROM departments", (err, results, fields) => {
        console.log(results);
        console.log(fields);
        console.log(err);
      });
      connection.end();
      break;

    case "ALL_ROLES":
      connection.query("SELECT * FROM roles", (err, results, fields) => {
        console.log(results);
        console.log(fields);
        console.log(err);git 
      });
      connection.end();
      break;

    case "ALL_EMPLOYEES":
      connection.query("SELECT * FROM employees", (err, results, fields) => {
        console.log(results);
        console.log(fields);
        console.log(err);
      });
      connection.end();
      break;
    case "ADD_DEPARTMENTS":
      connection.query(
        `INSERT INTO departments (id, name) VALUES ('')`,
        (err, results, fields) => {}
      );
      break;
    case "ADD_ROLES":
      let title;
      let salary;
      let departmentId;

      inquirer
        .prompt([{ name: "name", type: "input", message: "title?" }])
        .then((answers) => {
          title = answers.name;
          inquirer
            .prompt([{ name: "salary", type: "input", message: "salary?" }])
            .then((answers) => {
              salary = answers.salary;
              inquirer
                .prompt([
                  {
                    name: "department",
                    type: "input",
                    message: "department id?",
                  },
                ])
                .then((answers) => {
                  departmentId = answers.department;
                  console.log(title, salary, departmentId);
                  connection.query(
                    `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}', '${departmentId}')`,
                    (err, results, fields) => {
                      console.log(results);
                      console.log(fields);
                      console.log(err);
                    }
                  );
                  connection.end();
                });
            });
        });

      break;
    case "UPDATE_EMPLOYEES":
      break;

    default:
      break;
  }
}

init();
