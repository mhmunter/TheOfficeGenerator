INSERT INTO department (name)
VALUES
("sales"), 
("warehouse"), 
("accounting");

INSERT INTO role (title, salary, department_id)
VALUES
("manager", 60000.00, 1),
("midlevel", 45000.00, 1),
("lead", 50000.00, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Mike", "Chan", 1, null),
("Ashely", "Rodriguez", 2, 1 ),
("Kevin", "Tupik", 3,  null);