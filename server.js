const mysql = require("mysql2");
const inquirer = require("inquirer");
const db = require("./db/connection.js")


function openQuestion(){
  inquirer.prompt({
type: "list",
name: "choice",
choices: ["all departments", "view all roles","view all employees", "add a department","add a role", "add an employee", "update an employee role"],
message: "what do you want too do?"

  })
  .then(function(value){
    switch (value.choice){
      case 'all departments':
        viewAllDepartments()
        break;
      case 'view all roles':
        viewAllRoles()
        break;
      case 'view all employees':
        viewAllEmployees()
        break;
      case 'add a department':
        createDepartment()
        break;
default: 
console.log(value.choice, "There is no case for this option.")

    }
  })
}

db.connect(function(err){
if(err) throw err;
openQuestion()
})


function viewAllDepartments(){
  db.query("SELECT * FROM department", function(err, data){
    if(err) throw err
    console.table(data)
    openQuestion()
  })
 
}


function viewAllRoles(){
  db.query("SELECT * From role", function(err, data){
    if(err) throw err
    console.table(data)
    openQuestion()
  })
}

function  viewAllEmployees(){
  db.query("SELECT * FROM employee", function(err, data){
    if (err) throw err
    console.table(data)
    openQuestion()
  })
}


function addDepartment(){

}






  



  