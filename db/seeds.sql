INSERT INTO department (name)
VALUES ("Engineering"),
        ("Finance"),
        ("Legal"),
        ("Sales");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4),
    ("Salesperson", 80000, 4),
    ("Lead Engineer", 150000, 1),
    ("Software Engineer", 120000, 1),
    ("Account Manager", 160000, 2),
    ("Accountant", 125000, 2),
    ("Legal Team Lead", 250000, 3),
    ("Lawyer", 190000, 3);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("John","Connor",3,NULL),
    ("Pippa","Lara",1,NULL),
    ("Eric","Prosser",5,NULL),
    ("Blythe","Livingston",7,NULL),
    ("Sarah","Connor",4,1),
    ("Kyle","Reese",4,1),
    ("John","Smith",2,2),
    ("Rafe","Herring",6,3),
    ("Abigail","Curtis",8,4),
    ("Javan","Dalton",2,2);