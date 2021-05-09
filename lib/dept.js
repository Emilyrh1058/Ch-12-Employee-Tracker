const fetch = require('node-fetch');


const getDepts = async () => {
  const response = await fetch('http://localhost:3001/api/departments')
  const data = await response.json();
  return data.data; 
}