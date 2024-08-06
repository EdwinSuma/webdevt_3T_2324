const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database('./database/student.db');

db.run('CREATE TABLE IF NOT EXISTS student(id INT, first_name TEXT, last_name TEXT)');

app.use(express.json());

app.route('/students/:id')
  .get((req, res) => {
    db.serialize(() => {
        db.get(
          'SELECT id, first_name, last_name FROM student WHERE id = ?',
          [req.params.id],
          (err, row) => {
            if (err) return console.error(`Error encountered while querying db: ${err.message}`);
      
            if (row) {
              res.json({
                id: row.id,
                first_name: row.first_name,
                last_name: row.last_name
              });  
            } else {
              res.status(404).send('Student not found', 404);
            }
          }
        )
      });
  })

  .post((req, res) => {
    db.serialize(() => {
        db.run(
          'INSERT INTO student(id, first_name, last_name) VALUES(?, ?, ?)',
          [req.params.id, req.body.first_name, req.body.last_name],
          (err) => {
            if (err) return console.error(err.message);
            console.log('New student has been added.');
            res.status(201).send(`New student has been added: ${req.params.id} - ${req.body.first_name} ${req.body.last_name}`);
          }
        )
      }); 
  })

  .put((req, res) => {
    db.serialize(() => {
        db.run(
          'UPDATE student SET first_name = ?, last_name = ? WHERE id = ? ',
          [req.body.first_name, req.body.last_name, req.params.id],
          (err) => {
            if (err) return console.error(err.message);
            console.log('Student updated successfully!');
            res.status(200).send(`Student ${req.params.id} updated!`);
          }
        );
      });
  })

  .delete((req, res) => {
    db.serialize(() => {
        db.run(
          'DELETE FROM student WHERE id = ?',
          [req.params.id],
          (err) => {
            if (err) return console.error(err.message);
            console.log('Student deleted successfully!');
            res.status(204).send();
          }
        );
      });
  });

app.get('/students', (req, res) => {
    db.serialize(() => {
      db.all(
        'SELECT id, first_name, last_name FROM student',
        [],
        (err, rows) => {
          if (err) return console.error(err.message);
          if (rows) {
            res.send(rows);
          } else {
            res.status(404).send('No students found!');
          }
        }
      )
    });
  });

  server.listen(3000, () => {
    console.log('app server running on port 3000');
  })