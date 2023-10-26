const express = require('express');
const mysql = require('mysql');
const add=require('path')
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'ad123456',
  database: 'todo'
});

const publicPath = add.join(__dirname, 'public');
app.get('/', (req, res) => {
  res.sendFile(add.join(publicPath, 'index.html'));
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query('SELECT * FROM login WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to login' });
    }

    if (results.length > 0) {
      res.redirect('/home');
      return res.status(200).json({ message: 'Successful login' });
    } else {
      res.redirect('/login');
    }
  });
});

app.post('/signup', (req, res) => {
  const name=req.body.name
  const username = req.body.username;
  const password = req.body.password;

  db.query('INSERT INTO login (name,username, password) VALUES (?,?, ?)', [name,username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to register' });
    }
 
    res.redirect('/login');
    return res.status(200).json({ message: 'Registered successfully' });
  });
  
});
app.post('/createtask',(req, res)=>{
const taskname=req.body.taskname;
const tasknumber=req.body.taskname
db.query('Insert into task(tasknumber,taskname,done) values(?,?,?)' ,[tasknumber,taskname,false],(err,results)=>{
  if(err){
    return res.status(500).json({ message: 'Failed to create task' });
  }
  return res.status(200).json({ message: 'Created task successfully' });
})
});
app.post('/deletetask',(req, res)=>{
  
  const tasknumber=req.body.taskname
  db.query('Delete from task where tasknumber =(?)' ,[tasknumber],(err,results)=>{
    if(err){
      return res.status(500).json({ message: 'Failed to delete task' });
    }
  })
  });
  app.post('/changestatus'),(req,res)=>{
    const status=req.body.status;
    db.query('Update todo set done=(?)',[status],(err,results)=>{
      if(err){
        return res.status(500).json({ message: 'Failed to change status' });
      }
      return res.status(200).json({ message: 'Changed status successfully' });
    })
  }
app.listen(3000, () => {
  console.log('Listening on port 3000');
});