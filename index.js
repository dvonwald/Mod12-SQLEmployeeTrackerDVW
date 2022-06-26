const inquirer = require("inquirer");
const mysql = require("mysql2");
const conTable = require("console.table");
const { exit } = require("process");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Lum0$1987!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db`)
);

function mainMenu() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "MainMenu",
        message: "What would you like to do?",
        choices: [
          "View All Employees", //Select all employees and details from database
          "Add Employee", // trigger addEmployee function
          "Update Employee Role", //
          "View All Roles", // Select all roles from database
          "Add Role", // insert new role into role table in database
          "View All Departments", // select all departments from database
          "Add Department", // insert new department into department table in db
          "Quit", // exits out of the application
        ],
      },
    ])
    .then((input) => {
      switch (input.MainMenu) {
        case "View All Employees":
          viewAllEmp();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmpRole();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "Add Role":
          addRole();
          break;
        case "View All Departments":
          viewAllDept();
          break;
        case "Add Department":
          addDept();
          break;
        case "Quit":
          exit();
          break;
      }
    });
}

function viewAllEmp() {
  db.query(`SELECT employee.id AS Employee_ID, 
employee.first_name, 
employee.last_name, 
role.title AS Title, 
department.name AS Department,
role.salary,
employee.manager_id AS manager_id
FROM employee JOIN role ON employee.role_id = role.id
JOIN department ON department.id = role.department_id`);
}

function viewAllRoles() {
  db.query(`SELECT title, salary FROM role`);
}

function viewAllDept() {
  db.query(`SELECT name AS Department_Name FROM department`);
}

function addRole() {
  inquirer.prompt([
    {
      type: "input",
      name: "addRoleName",
      message: "What is the name of the role?",
    },
    {
      type: "input",
      name: "addRoleSalary",
      message: "What is the salary of the role?",
    },
    {
      type: "list",
      name: "addRoleDept",
      message: "What is the department for this role?",
      choices: [],
    },
  ]);
}

function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      name: "AddEmpFirstName",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "AddEmpLastName",
      message: "What is the employee's last name?",
    },
    {
      type: "list",
      name: "AddEmpRole",
      message: "What is the employee's role?",
      choices: [],
    },
    {
      type: "list",
      name: "AddEmpMgr",
      message: "Who is this employee's manager?",
      choices: [],
    },
  ]);
}

function updateEmpRole() {
  inquirer.prompt([
    {
      type: "list",
      name: "UpdateEmpRole",
      message: "Which role do you want to assign the selected employee?",
      choices: [],
    },
  ]);
}

function addDept() {
  inquirer.prompt([
    {
      type: "input",
      name: "addDeptName",
      message: "What is the name of the department?",
    },
  ]);
}

mainMenu();
