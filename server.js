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
        case 'add an employee':
          addEmployee()
          break;
          case 'update an employee role':
            updateRole()
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
    name: 'first_name',
    message: 'What is the first name of the added employee?'
  }, {
    type: "input",
    name: 'last_name',
    message: 'What is the last name of added emplyoee?'
  },{
    type: 'list',
    name: 'role_id',
    message: 'What is department is the added employee goig into?',
    choices: [{ name: "manager", value: 1 }, { name: "midlevel", value: 2 }, { name: "lead", value: 3 }]
  },
])
.then(function (value) {
    db.query("INSERT INTO employee (first_name, last_name, role_id) VALUES (?,?,?)", [value.first_name, value.last_name, value.role_id], function (err, data) {
      if (err) throw err
      viewAllRoles()
    })
  })
}




// function updateRole(){
// inquirer.prompt([{
//   type: "input",
//   name: "updateName",
//   Message: "What is the Employee's name?"
// },{
// type: "input",
// name: "updateRole",
// Message: "what is their new role?"
// }])
// .then(function (value) {
//   db.query("UPDATE employee SET role_id = WHERE id = ?", {
//     if (err) throw err
//     viewAllRoles()
//   })
// })
// }

// function getRoleId(roleName) {
//   let query = "SELECT * FROM role WHERE role.title=?";
//   let args = [roleName];
//   const rows = await db.query(query, args);
//   return rows[0].id;
// }



function updateRole() {
  //const newRole = db.query('SELECT * from employee LEFT JOIN role ON employee.role_id = role.id')
  //let joinEmplyoeeNames = db.query(`SELECT CONCAT(first_name , " ", last_name) AS 'Fullname' FROM employee;`)
  //console.log(joinEmplyoeeNames)
  inquirer.prompt([{
    type: 'list',
    name: 'updatedRole',
    message: 'What new role does employee have?',
    choices: [{ name: "manager", value: 1 }, { name: "midlevel", value: 2 }, { name: "lead", value: 3 }]
  },{
    type: 'input',
    name: 'first_name',
    message: 'What is the first name of the updated employee?'
  },{
    type: 'input',
    name: 'last_name',
    message: 'What is the last name of the updated employee?'
  }
])
.then(function (value) {
    db.query("UPDATE employee SET role_id = ? where first_name = ? and last_name = ?",[value.updatedRole, value.first_name, value.last_name], function (err, data) {
      if (err) throw err
      viewAllRoles()
    })
  })
}
//"UPDATE employee SET role_id = ? WHERE id = ?",