USE emp_db;

INSERT INTO departments (name)
VALUES 
  ("Sales"),
  ("Finance"),
  ("Engineering"),
  ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES
  ("Sales Manager", 80000, 1),
  ("Sales Associate", 50000, 1),
  ("Account Specialist", 90000, 2),
  ("Senior Software Engineer", 120000, 3),
  ("Junior Software Engineer", 100000, 3),
  ("Legal Team Lead", 130000, 4),
  ("Lawyer", 120000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 11),
  ('Virginia', 'Woolf', 1, 11),
  ('Piers', 'Gaveston', 1, 11),
  ('Charles', 'LeRoi', 2, 22),
  ('Katherine', 'Mansfield', 2, 22),
  ('Dora', 'Carrington', 3, 33),
  ('Edward', 'Bellamy', 3, 33),
  ('Montague', 'Summers', 4, 44),
  ('Octavia', 'Butler', 4, 44),
  ('Unica', 'Zurn', 4, 44);
