const express = require('express');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../utils/inputCheck');


// GET ALL ROLES
router.get('/roles', (req, res) => {
  console.log("rolesRoutes")
  const sql = `SELECT 
                  r.id,
                  r.role,
                  d.name AS department,
                  r.salary
              FROM roles r
              LEFT JOIN departments d ON r.department_id = d.id`;
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// CREATE ROLE
router.post('/role', ({ body }, res) => {
  const errors = inputCheck(body, 'role', 'salary', 'department_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }
  const sql = `INSERT INTO roles (role, salary, department_id)
    VALUES (?,?,?)`;
  const params = [body.role, body.salary, body.department_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body
    });
  });
});


// DELETE ROLE
router.delete('/role/:id', (req, res) => {
  const sql = `DELETE FROM roles WHERE id = ?`;
  const params = [req.params.id];
  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: 'Role not found'
      });
    } else {
      res.json({
        message: 'deleted',
        changes: result.affectedRows,
        id: req.params.id
      });
    }
  });
});



module.exports = router;