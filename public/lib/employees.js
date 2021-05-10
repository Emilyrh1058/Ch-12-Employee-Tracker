const fetch = require('node-fetch');

const getEmployees = async () => {
  try {
    let response = await fetch('http://localhost:3001/api/employees')
    let data = await response.json();
    return data.data; 
  }
  catch (error) {
    console.log (error, "Server returned error. Please check if server is online");
  }
};

const addEmployee = async (data) => {
  try {
    let response = await fetch('http://localhost:3001/api/employee', {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let r = await response.json();
    return console.log("\n" + r.message + ". " + r.data.first_name + " " + r.data.last_name + " has been added to the employees roster!\n");
  }
  catch (error){
    console.log (error, "Server returned an error. Please check if server is online");    
  }
};



const getManagers = async (data) => {
  try {
    let response = await fetch('http://localhost:3001/api/managers')
    let data = await response.json();
    return data.data; 
  }
  catch (error) {
    console.log (error, "Server returned error. Please check if server is online");
  }
};


const updateRole = async (data) => {
  try {
    let response = await fetch(`http://localhost:3001/api/employee/${data.id}`, {
      method: 'PUT',
      headers: {
              'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let r = await response.json();
    return console.log("\n Update successful!\n");
  }
  catch (error) {
    console.log (error, "Server returned error. Please check if server is online");
  }
};



module.exports = {
  getEmployees, 
  addEmployee, 
  getManagers, 
  updateRole
};