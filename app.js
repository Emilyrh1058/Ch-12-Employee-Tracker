const inquirer = require("inquirer");
const fetch = require('node-fetch')
const cTable = require('console.table');




class trackerApp {
  constructor() {
    this.mainPrompt = [ 
      {
        type: "list",
        name: "toDo",
        message: "What would you like to do?",
        choices: ["View All Employees, View All Employees By Department, View All Employees By Manager, Add An Employee, Remove An Employee, Update Employee Role, Update Employee Manager"],
      }
    ];


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
        message: ({ role }) => `Please enter the ${role}'s salary:`,
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
        message: ({ role }) => `To what department is ${role} assigned?`,
        choices: "" // add departments here
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
        message: ({ first_name }) => `What ROLE will ${first_name} be assigned?`,
        choices: "" // add roles here
      },
      {
        type: "list",
        name: "manager_id",
        message: ({ first_name }) => `To what MANAGER will ${first_name} be assigned?`,
        choices: "" // add manager id's here
      }
    ];


    this.updateRolePrompt = [
      {
        type: "list",
        name: "id",
        message: "Please select the employee's id you would like to update:",
        choices: "" // add roles here
      },
      {
        type: "list",
        name: "newRole",
        message: "Select the employee's new role:",
        choices: "" // new role here
      }
    ];
  }

  createDept() {
    inquirer
      .prompt(this.addDeptPrompt)
      .then(async data => {
        await addDeptPrompt(data);
        return this.mainPrompt();
      })

      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = trackerApp;