const express = require('express');
const mysql = require('mysql2');
const path = require('path'); // Changed 'add' to 'path'
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ad123456',
  database: 'todo'
});

// Body parsing middleware
app.use(express.json());

const publicPath = path.join(__dirname, 'public');
app.get('/', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to login' });
    }

    if (results.length > 0) {
      return res.status(200).json({ message: 'Successful login' });
    } else {
      res.redirect('/login');
    }
  });
});   

app.post('/signup', (req, res) => {
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;

  db.query('INSERT INTO login (name, username, password) VALUES (?, ?, ?)', [name, username, password], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ message: 'Failed to register' });
    }
    return res.status(200).json({ message: 'Registered successfully' });
  });
});

app.post('/createtask', (req, res) => {
  const taskname =   req.body.taskname;
  const tasknumber = req.body.task_id;
  const description = req.body.description; // Fixed typo

  db.query('INSERT INTO task (task_id, taskname, description, done) VALUES (?, ?, ?, ?)', [tasknumber, taskname, description, false], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to create task' });
    }
    return res.status(200).json({ message: 'Created task successfully' });
  });
});

app.post('/deletetask', (req, res) => {
  const tasknumber = req.body.taskname; // Changed variable name

  db.query('DELETE FROM task WHERE task_id = ?', [tasknumber], (err, results) => { // Corrected the SQL query
    if (err) {
      return res.status(500).json({ message: 'Failed to delete task' });
    }
    return res.status(200).json({ message: 'Deleted task successfully' });
  });
});

app.post('/changestatus', (req, res) => {
  const status = req.body.status;

  db.query('UPDATE task SET done = ? WHERE ...', [status], (err, results) => { // Specify the condition in WHERE clause
    if (err) {
      return res.status(500).json({ message: 'Failed to change status' });
    }
    return res.status(200).json({ message: 'Changed status successfully' });
  });
});
app.post('/getdata',(req, res)=>{
  const task_id=req.body.task_id;
  db.query('Select * from task where task_id=(?)',[task_id],(err,results)=>{
  return res.json(results);
  });
});
app.listen(3000, () => {
  console.log('Listening on port 3000');
});

