const inquirer = require("inquirer");
const cTable = require('console.table');


class trackerApp {
  constructor() {
    this.mainPrompt = [
      {
        type: "list",
        name: "todo",
        message: "What would you like to do?",
        choices: [",,,"]
      }
    
      
    ]
  }
}

module.exports = trackerApp;