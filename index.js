const inquirer = require("inquirer");
const mysql = require("mysql2");
const conTable = require("console.table");
const { exit } = require("process");
const { map, ConnectableObservable } = require("rxjs");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Lum0$1987!",
    database: "employees_db",
  },
  console.log(`Connected to the employees_db`)
);

//Uses inquirer package and a promise .then statement as well as a break function to direct to individual functions for each option the user is presented with
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

// Displays all employee's ID, First Name, Last Name, title(role), department, salary, and Manager in a table format
function viewAllEmp() {
  console.log("These are all employees on file.");
  db.query(
    `SELECT employee.id AS Employee_ID, 
employee.first_name, 
employee.last_name, 
role.title AS Title, 
department.name AS Department,
role.salary,
CONCAT(Manager.first_name,' ',Manager.last_name) AS manager_name
FROM employee JOIN role ON employee.role_id = role.id
JOIN department ON department.id = role.department_id
LEFT OUTER JOIN employee AS Manager ON employee.manager_id = Manager.id`,
    function (err, results) {
      console.log("=======================");
      console.table(results);
      console.log("=======================");
      mainMenu();
    }
  );
}

//Displays all Roles and their salary in a table format
function viewAllRoles() {
  console.log("This is a list of all current roles");
  db.query(`SELECT title, salary FROM role`, function (err, results) {
    console.log("=======================");
    console.table(results);
    console.log("=======================");
    mainMenu();
  });
}

//Displays all departments in a table format
function viewAllDept() {
  console.log("These are all current departments");
  db.query(
    `SELECT name AS Department_Name FROM department`,
    function (err, results) {
      console.log("=======================");
      console.table(results);
      console.log("=======================");
      mainMenu();
    }
  );
}

// Used an async callback function for this (and the others), this does an sql db query for all departments and lets user select which department to add the new role to, after naming the dept and setting salary
async function addRole() {
  db.query(`SELECT id, name FROM department;`, async (err, results) => {
    const deptArray = results.map((r) => ({ name: r.name, value: r.id }));
    const response = await inquirer.prompt([
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
        choices: deptArray,
      },
    ]);
    db.query(
      `INSERT INTO role (title, salary, department_id) VALUES ("${response.addRoleName}", ${response.addRoleSalary}, ${response.addRoleDept});`
    );
    console.log(
      `${response.addRoleName} title with ${response.addRoleSalary} salary under ${response.addRoleDept} department was added to role table.`
    );
    mainMenu();
  });
}

// queries for roles and managers and then allows for user input to set first and last name and select a role from the roles and managers provided to them in an array, then inserts that into the database under employees table
async function addEmployee() {
  db.query(`SELECT id, title FROM role;`, async (err, results) => {
    const rolesArray = results.map((res) => ({
      name: res.title,
      value: res.id,
    }));
    db.query(
      `SELECT id, first_name, last_name, manager_id FROM employees_db.employee WHERE manager_id IS null`,
      async (err, results) => {
        const mgrArray = results.map((res2) => ({
          name: res2.first_name + " " + res2.last_name,
          value: res2.id,
        }));
        const input = await inquirer.prompt([
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
            choices: rolesArray,
          },
          {
            type: "list",
            name: "AddEmpMgr",
            message: "Who is this employee's manager?",
            choices: mgrArray,
          },
        ]);
        db.query(
          `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${input.AddEmpFirstName}", "${input.AddEmpLastName}", ${input.AddEmpRole}, ${input.AddEmpMgr});`
        );
        console.log(
          `${input.AddEmpFirstName} ${input.AddEmpLastName} has been added to the employees table`
        );
        mainMenu();
      }
    );
  });
}

//This is the database sql queries for a list of employees and a list of exisitng roles, mapped out, and listed in the app for user to choose from and set
async function updateEmpRole() {
  db.query(`SELECT id, title FROM role;`, async (err, results) => {
    const rolesArray = results.map((res) => ({
      name: res.title,
      value: res.id,
    }));
    db.query(
      `SELECT id, first_name, last_name FROM employee;`,
      async (err, results) => {
        const empArray = results.map((res2) => ({
          name: res2.first_name + " " + res2.last_name,
          value: res2.id,
        }));
        const input = await inquirer.prompt([
          {
            type: "list",
            name: "updateEmp",
            message: "Which employee do you want to update?",
            choices: empArray,
          },
          {
            type: "list",
            name: "UpdateEmpRole",
            message: "Which role do you want to assign the selected employee?",
            choices: rolesArray,
          },
        ]); // End of inquirer
        db.query(
          `UPDATE employee SET employee.role_id = ${input.UpdateEmpRole} WHERE employee.id = ${input.updateEmp}`
        );
        console.log(`Employee's role has been updated`);
        mainMenu();
      }
    );
  });
}

//Inserts a new Department into the Department table, using inquirer to capture user input
function addDept() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDeptName",
        message: "What is the name of the department?",
      },
    ])
    .then((input) => {
      //   console.log(input.addDeptName);
      db.query(
        `INSERT INTO department (name) VALUES ("${input.addDeptName}");`
      );
      console.log(`${input.addDeptName} added to Departments`);
      mainMenu();
    });
}

mainMenu();
