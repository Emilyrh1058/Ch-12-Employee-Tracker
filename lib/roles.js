const fetch = require('node-fetch');

const getRoles = async () => {
  try {
    let response = await fetch('http://localhost:3001/api/roles')
    let data = await response.json();
    return data.data; 
  }
  catch (error) {
    console.log (error, "Server returned error. Please check if server is online");
  }
};

const addRole = async (data) => {
  try {
    let response = await fetch('http://localhost:3001/api/role', {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let r = await response.json();
    return console.log("\n" + r.message + ". The " + r.data.role + " " + "role has been added!\n");
  }
  catch (error){
    console.log (error, "Server returned an error. Please check if server is online");    
  }
};


module.exports = {
  getRoles, 
  addRole
};