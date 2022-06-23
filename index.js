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
