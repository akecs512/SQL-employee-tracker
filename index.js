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
      const departmentsQuestions = [
        {
          name: "departmentName",
          type: "input",
          message: "What is the department name?",
        },
      ];
      const query = (answers) => {
        const { departmentName } = answers;
        return `INSERT INTO departments (name) VALUES ('${departmentName}')`;
      };
      promptAndQuery(departmentsQuestions, query);
      break;

    case "ADD_ROLES":
      connection.query(
        "SELECT * FROM departments",
        (_err, results, _fields) => {
          const departmentChoices = results.map((department) => {
            return department.name;
          });

          const roleQuestions = [
            {
              name: "title",
              type: "input",
              message: "What is the title for the role?",
            },
            {
              name: "salary",
              type: "input",
              message: "What is the salary for this role?",
            },
            {
              name: "department",
              type: "list",
              message: "what department does this role belong to?",
              choices: departmentChoices,
            },
          ];

          inquirer.prompt(roleQuestions).then((answers) => {
            const { title, salary, department: selectedDepartment } = answers;

            const departmentId = results.find((d) => {
              return d.name === selectedDepartment;
            }).id;

            connection.query(
              `INSERT INTO roles (title, salary, department_id) VALUES ('${title}', '${salary}','${departmentId}')`,
              (err, results, _fields) => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(
                    `Inserted new role with id of: ${results.insertId}`
                  );
                }
              }
            );
            connection.end();
          });
        }
      );

      break;

    case "ADD_EMPLOYEES":
      connection.query("SELECT * FROM roles", (_err, results, _fields) => {
        const rolesChoices = results.map((roles) => {
          return roles.title;
        });

        const employeeQuestions = [
          {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role",
            type: "list",
            message: "What is the employee's role?",
            choices: rolesChoices,
          },
        ];

        inquirer.prompt(employeeQuestions).then((answers) => {
          const { firstName, lastName, selectedRole } = answers;

          const roleId = results.find((r) => {
            return r.name === selectedRole;
          }).id;
          connection.query(
            `INSERT INTO employees (first_name, last_name, role_id) VALUES ('${firstName}', '${lastName}','${roleId}')`,
            (err, results, _fields) => {
              if (err) {
                console.error(err);
              } else {
                console.log(
                  `Inserted new role with id of: ${results.insertId}`
                );
              }
            }
          );
          connection.end();
        });
      });
      break;

    case "UPDATE_EMPLOYEES":
      connection.query("SELECT * FROM employees", (_err, results, _fields) => {
        const employeeChoices = results.map((employee) => {
          return {name: employee.first_name + " " + employee.last_name, value: employee.id};
        });
        connection.query("SELECT * FROM roles", (_err, results, _fields) => {
          const updatedRoleChoices = results.map((updatedRole) => {
            return {name: updatedRole.title, value: updatedRole.id};
          });

        const updateEmployeeQuestions = [
          {
            name: "employeeId",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employeeChoices,
          }, //picking employees.role_id
          {
            name: "roleId",
            type: "list",
            message: "What is the employee's new role?",
            choices: updatedRoleChoices,
          }, //picking roles.role_id
        ];
        inquirer.prompt(updateEmployeeQuestions).then((answers) => {
          const { employeeId, roleId } = answers;

   
          connection.query(
            `UPDATE employees set role_id = ${roleId} WHERE id = ${employeeId}`,
            (err, results, _fields) => {
              if (err) {
                console.error(err);
              } else {
                console.log(
                  `Updated employee with new role'}`
                );
              }
            }
          );


          connection.end();
        });
      });
    
        });


  
  

      break;

    default:
      console.error("Failed to handle a question of type:", userChoice);
      process.exit(0);
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
        console.error(err);
      } else {
        console.log(`Inserted new role with id of: ${results.insertId}`);
      }
    });
    connection.end();
  });
};

init();
