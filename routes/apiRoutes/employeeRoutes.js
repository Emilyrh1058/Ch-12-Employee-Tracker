const express = require("express");
const router = express.Router();
const db = require("../../db/connect");
const inputCheck = require("../../utils/inputCheck");

// GET ALL EMPLOYEES
router.get("/employees", (req, res) => {
  const sql = `SELECT 
                e.id, 
                e.first_name, 
                e.last_name, 
                r.role AS role, 
                d.name AS department, 
                r.salary AS salary,
                CONCAT (e1.first_name, " ", e1.last_name) AS manager
                FROM employees e
                LEFT JOIN roles r ON e.role_id = r.id 
                LEFT JOIN departments d ON r.department_id = d.id
                LEFT JOIN employees e1 ON e.manager_id = e1.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});

// GET ALL MANAGERS
router.get("/managers", (req, res) => {
  const sql = `SELECT 
                e.id, 
                CONCAT (e.first_name, " ", e.last_name) AS manager
                FROM employees e`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
});


// CREATE NEW EMPLOYEE
router.post("/employee", ({ body }, res) => {
  const errors = inputCheck(
    body,
    "first_name",
    "last_name",
    "role_id",
    "manager_id"
  );
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;
  const params = [
    body.first_name,
    body.last_name,
    body.role_id,
    body.manager_id,
  ];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
});


// UPDATE ROLE
router.put('/employee/:id', (req, res) => {
  const errors = inputCheck(req.body, 'role_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `UPDATE employees SET role_id = ?
                WHERE id = ?`;
  const params = [req.body.role_id, req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
    return;
    }
    res.json({
      message: 'success',
      data: req.body,
      changes: result.affectedRows
    });
  });
});


module.exports = router;