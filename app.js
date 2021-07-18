const inquirer = require("inquirer");
const db = require("./db/connection");

let empTable = []; //in view all employees
let departments = []; // create new role
let managers = []; // create and update
let roles = []; // add new and update employee

let onlyDepts = [];
let onlyManagers = [];
let onlyRoles = [];

const mainPrompt = () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "option",
        message: "What would you like to do?",
        choices: [
          {
            name: "View All Employees",
            value: "VIEW_EMPLOYEES",
          },
          {
            name: "View All Department",
            value: "VIEW_BY_DEPARTMENT",
          },
          {
            name: "Add An Employee",
            value: "ADD_EMPLOYEE",
          },
          {
            name: "Remove An Employee",
            value: "REMOVE_EMPLOYEE",
          },
          {
            name: "Add Employee Role",
            value: "ADD_EMPLOYEE_ROLE",
          },
          {
            name: "Update Employee Manager",
            value: "UPDATE_EMPLOYEE_MANAGER",
          },
          {
            name: "Quit",
            value: "QUIT",
          },
        ],
      },
    ])
    .then((response) => {
      console.log(response);
      switch (response.option) {
        case "VIEW_EMPLOYEES":
          return getEmployees();
        case "VIEW_BY_DEPARTMENT":
          return getDepartment();
        case "ADD_EMPLOYEE":
          return addEmployee();
        case "REMOVE_EMPLOYEE":
          return removeEmployee();
        case "ADD_EMPLOYEE_ROLE":
          return addEmployeeRole();
        case "UPDATE_EMPLOYEE_ROLE":
          return updateEmployeeRole();
        case "QUIT":
          return quit();
      }
    });
};

const getEmployees = () => {
  const sql = `
SELECT a.id, a.first_name, a.last_name, b.title, c.name as department, b.salary
FROM employees a
INNER JOIN roles b ON (a.role_id = b.id)
INNER JOIN departments c ON (b.department_id = c.id)
ORDER BY a.id
`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainPrompt();
  });
};

const getDepartment = () => {
  const sql = "SELECT * FROM departments";
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainPrompt();
  });
};

const addEmployee = () => {
  inquirer
    .prompt({
      type: "input",
      message: "Enter Department Name",
      name: "department",
    })
    .then(function (res) {
      db.query(
        "INSERT INTO departments SET ?",
        {
          name: res.name,
        },
        function (err, res) {
          if (err) {
            throw err;
          }
        }
      );
      mainPrompt();
    });
};

const removeEmployee = () => {
  const sql = "DELETE employee FROM db";
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table(res);
    mainPrompt();
  });
};

const addEmployeeRole = () => {
  db.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What Role will this Title have?",
          },
          {
            name: "Salary",
            type: "input",
            message: "Enter the Role's Salary",
          },
        ])
        .then(function (res) {
          db.query(
            "INSERT INTO roles SET ?",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              conesole.table(res);
            }
          );
        });
      mainPrompt();
    }
  );
};

const updateEmployeeRole = () => {
  db.query(
    "SELECT role.title AS Title, role.salary AS Salary FROM role",
    function (err, res) {
      inquirer
        .prompt([
          {
            name: "Title",
            type: "input",
            message: "What new Role will this Title have?",
          },
          {
            name: "Salary",
            type: "input",
            message: "Enter the Role's Salary",
          },
        ])
        .then(function (res) {
          db.query(
            "INSERT INTO employees",
            {
              title: res.Title,
              salary: res.Salary,
            },
            function (err) {
              if (err) throw err;
              conesole.table(res);
            }
          );
        });
    }
  );
  mainPrompt();
};

function quit() {
  console.log(`You've exited the prompt.`);
  return;
}

mainPrompt();
