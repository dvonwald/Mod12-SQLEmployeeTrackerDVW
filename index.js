const inquirer = require("inquirer");
const mysql = require("mysql2");
const conTable = require("console.table");

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
  inquirer.prompt([
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
  ]);
}

function viewAllEmp() {
    db.query(`SELECT * FROM employee`)
};

function viewAllRoles() {
    db.query(`SELECT * FROM role`)
}

function viewAllDept() {
    db.query(`SELECT * FROM department`)
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRoleName',
            message: "What is the name of the role?"
        },
        {
            type: 'input',
            name: 'addRoleSalary',
            message: "What is the salary of the role?"
        },
        {
            type: 'list',
            name: 'addRoleDept',
            message: "What is the department for this role?"
            choices: []
        },
    ])
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
            type: 'list',
            name: 'UpdateEmpRole',
            message: 'Which role do you want to assign the selected employee?',
            choices: [],
        }
    ])
}

function addDept() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDeptName',
            message: "What is the name of the department?"
        }
    ])
}


// No Front end
// No Sequelize

// Application Start:
//  View All Departments
//Department Names
//Department IDs
//  View All Roles
//Job Title
//Role ID
//Role Department
//Role Salary
//  View All Employees
//Employee IDs
//First Names
//Last Names
//Job Titles
//Departments
//Salaries
//Managers
//  Add A Department
//Enter the Department Name -- Added to the DB
//  Add A Role
//Enter the Role Name, then Salary, then Department
//  Add An Employee
//Enter First Name, enter Last Name, enter Manager, -- added to the database
//  Update An Employee Role
//Select an Employee to update
//Enter new Role

db.query;

db.query("SELECT * FROM department");
//user selects
