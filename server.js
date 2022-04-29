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
        case 'add a role':
          addRole()
          break;
          case 'add employee':
            addEmployee()
            break;
            case 'update employee': 
            updateEmployee()
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


function createDepartment(){
inquirer.prompt({
  type: 'input',
  name: 'name',
  message: "What is the name of the new department?"
})
.then(function(value){
db.query("INSERT INTO department (name) VALUES (?)", [value.name], function(err, data){
  if (err) throw err
 viewAllDepartments()
})
})

}


function addRole(){
  inquirer.prompt([{
    type: 'input',
    name: 'role',
   message: "What is the name of the new role?"


  },{
  type: 'input',
  name: "salary",
  message: "What is the salary?"
},{
type: 'list',
name: 'department_id',
message: 'which depart will it go into?',
choices: [{name:"sales", value:1}, {name:"warehouse", value:2}, {name: "accounting", value:3}]
}])
.then(function(value){
db.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [value.role, value.salary, value.department_id], function(err, data){
if (err) throw err
viewAllRoles()
})
})


} 

function addEmployee() {
  inquirer.prompt([{
    type: 'input',
    name: 'firstName',
    message: 'What is the first name of the added employee?'
  }, {
    type: "input",
    name: 'lastName',
    message: 'What is the last name of added emplyoee?'
  }, {
    type: 'list',
    name: 'department_id',
    message: 'What is department is the added employee goig into?',
    choices: [{ name: "sales", value: 1 }, { name: "warehouse", value: 2 }, { name: "accounting", value: 3 }]
  }, {
    type: 'list',
    name: 'role_id',
    message: 'What is department is the added employee goig into?',
    choices: [{ name: "manager", value: 1 }, { name: "midlevel", value: 2 }, { name: "lead", value: 3 }]
  }
])
.then(function (value) {
    db.query("INSERT INTO employee (firstName, lastName, department_id, role_id) VALUES (?,?,?,?)", [value.firstName, value.lastName, value.department_id, value.role_id], function (err, data) {
      if (err) throw err
      viewAllRoles()
    })
  })
}