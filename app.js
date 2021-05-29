const inquirer = require("inquirer");
const fetch = require('node-fetch')
const cTable = require('console.table');
const connect = require("db");
const mysql = require('mysql2')

let empTable = [];  //in view all employees
let departments = [];  // create new role
let managers = [];  // create and update
let roles = [];  // add new and update employee

let onlyDepts = [];
let onlyManagers = [];
let onlyRoles = [];

// connection.query(                  ** FROM LA...NEED TO CREATE MY OWN QUERIES
//   'SELECT * FROM `emp_db`',
//   function(err, results, fields) {
//     console.log(results); // results contains rows returned by server
//     console.log(fields); // fields contains extra meta data about results, if available
//   }
// );

// REDO ALL PROMPT AND PROMISES TO MATCH THIS FIRST PROMPT! *review team profile gen.*
function mainPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "toDo",
        message: "What would you like to do?",
        choices: [
          "View All Employees", 
          "View All Employees By Department", 
          "View All Employees By Manager", 
          "Add An Employee", 
          "Remove An Employee", 
          "Update Employee Role", 
          "Update Employee Manager"
        ],
      },
  ])

  .then(function (response) {    // MAKE SURE TO LOOK AT THE MOCK UP FOR THE CRITERIA BEFORE REDOING ALL THE FUNCTIONS //
    if (response.option === "View All Employees") {
      console.log(response)
        return getEmployees;
    } else if (response.option === "View All Employees By Department") {
      // function();
    } else if (response.option === "View All Employees By Manager") {
      // function();
    } else {
      fs.writeFile('index.html', generateHtml(employeeArr), err => {
        if (err) throw err;
        console.log('Portfolio complete! Check out index.html to see the output!');
      })
    } 

    this.addDeptPrompt = [
      {
        type: "input",
        name: "deptName",
        message: "Please enter department name:",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
              return ("Department name is required!");
          }
        }
      }
    ];


    this.addRolePrompt = [
      {
        type: "input",
        name: "role",
        message: "Please enter role title:",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
              return ("Role title is required!");
          }
        }
      },
      {
        type: "input",
        name: "salary",
        message: ({role}) => `Please enter the ${role}'s salary:`,
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
              return ("Salary amount is required!");
          }
        }
      },
      {
        type: "list",
        name: "deptId",
        message: ({role}) => `To what department is ${role} assigned?`,
        choices: onlyDepts
      }
    ];  


    this.addEmpPrompt = [
      {
        type: "input",
        name: "first_name",
        message: "Please enter the employee's FIRST name",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
              return ("New employee's FIRST name is required!");
          }
        }
      },
      {
        type: "input",
        name: "last_name",
        message: "Please enter the employee's LAST name",
        validate: nameInput => {
          if (nameInput) {
            return true;
          } else {
              return ("New employee's LAST name is required!");
          }
        }
      },
      {
        type: "list",
        name: "role_id",
        message: ({first_name}) => `What ROLE will ${first_name} be assigned?`,
        choices: onlyRoles
      },
      {
        type: "list",
        name: "manager_id",
        message: ({first_name}) => `To what MANAGER will ${first_name} be assigned?`,
        choices: onlyManagers
      },
    ];


    this.updateRolePrompt = [
      {
        type: "list",
        name: "id",
        message: "Please select the employee's id you would like to update:",
        choices: onlyManagers
      },
      {
        type: "list",
        name: "newRole",
        message: "Select the employee's new role:",
        choices: onlyRoles
      },
    ];
  });

  createDept() 
    inquirer
      .prompt(this.addDeptPrompt)
      .then(async data => {
        await addDeptPrompt(data);
        return this.mainPrompt();
      })

      .catch(err => {
        console.log(err);
      });


  createRole(onlyDepts) 
    inquirer
      .prompt(this.addRolePrompt)
      .then(async data => {
        for (let i = 0; i < departments.length; i++) {
          if (departments[i].name === data.department_id) {
            data.department_id = departments[i].id;
            break;
          }
        }            
        await addRolePrompt(data);
        return this.mainPrompt();
    })

    .catch(err => {
      console.log(err);
    })


  addEmployee(onlyManagers, onlyRoles) 
    inquirer
      .prompt(this.addEmpPrompt)
      .then(async data => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].role === data.role_id) {
            data.role_id = roles[i].id;
            break
          }
        }
        if (data.manager_id === "none") {
          data.manager_id = "null"
        } else {
            for (let i = 0; i < managers.length; i++) {
              if (managers[i].manager === data.manager_id) {
                data.manager_id = managers[i].id;
                break
              }
            }
        }
        await this.addEmpPrompt(data);
        return this.mainPrompt();
      })
      
      .catch(err => {
        console.log(err);
      })
  

  empRoleUpdate(onlyManagers, onlyRoles) 
    inquirer
      .prompt(this.updateRolePrompt)
      .then(async data => {
        for (let i = 0; i < roles.length; i++) {
          if (roles[i].role === data.role_id) {
            data.role_id = roles[i].id;
            break
          }
        }
        for (let i = 0; i < managers.length; i++) {
          if (managers[i].manager === data.id) {
            data.id = managers[i].id;
            break
          }
        }
        await this.updateRole(data);
        return this.mainPrompt();
      })


  mainPrompt() 
    inquirer
    .prompt(this.mainPrompt)
    .then(async data => {
      switch(data.toDo) {
        case "View All Employees ":
          empTable = await getEmployees();
          console.table("\n\n All Employees", empTable);
          console.log("\n")
          return this.mainPrompt();

        case "View All Employees By Department ":
          console.table("\n\n All Departments", await getDept());
          console.log("\n")
          return this.mainPrompt();

        case "Add An Employee":
          roles = await getRoles();
          for (let i =0; i < roles.length; i++) {
            onlyRoles[i] = roles[i].role;
          }
          managers = await getManagers();
          for (let i = 0; i < managers.length; i++) {
            onlyManagers[i] = managers[i].manager;
        }
        onlyManagers.unshift("none");
        return this.addEmpPrompt(onlyManagers, onlyRoles);
        case "Remove An Employee,":

        case "Update Employee Role":
          departments = await getDepartments();
          for (let i = 0; i < departments.length; i++) {
            onlyDepts[i]=departments[i].name;
          }
          managers = await getManagers();
          for (let i = 0; i < managers.length; i++) {
            managersOnly[i] = managers[i].manager;
        }
        return this.empRoleUpdate(onlyManagers, onlyRoles);

        case "Quit":
          return this.quitPrompt();
      }
    })
    .catch(err => {
      console.log(err);
    })
};

function quitPrompt() {
  console.log(`You've exited the prompt.`);
  return
}

module.exports = mainPrompt();