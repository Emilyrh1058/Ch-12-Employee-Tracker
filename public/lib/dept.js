const fetch = require('node-fetch');


const getDepts = async () => {
  try {
    let response = await fetch('http://localhost:3001/api/departments')
    let data = await response.json();
    return data.data; 
  }
  catch (error) {
    console.log (error, "Server returned error. Please check if server is online");
  }
};

const addDept = async (data) => {
  try {
    let response = await fetch('http://localhost:3001/api/departments', {
      method: 'POST',
      headers: {
              'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    })
    let r = await response.json();
    return console.log("\n" + r.message + ". The New Department named '" + r.data.name + "' has been created!\n");
  }
  catch (error){
    console.log (error, "Server returned an error. Please check if server is online");    
  }
};


module.exports = {
  getDepts, 
  addDept
};
