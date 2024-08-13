const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const http = require('http');

const app = express();
const server = http.createServer(app);
const db = new sqlite3.Database('./database/elements.db');

db.run('CREATE TABLE IF NOT EXISTS element(AtomicNumber INTEGER, AtomicMass REAL, Symbol TEXT, Name TEXT, ChemicalGroupBlock TEXT)');

app.use(express.json());

app.route('/elements/:AtomicNumber')
        .get((req, res) => {    
            db.serialize(() => {
              db.get(
                'SELECT AtomicNumber, AtomicMass, Symbol, Name, ChemicalGroupBlock FROM element WHERE AtomicNumber = ?',
                [req.params.AtomicNumber],
                (err, row) => {
                  if (err) return console.error(`Error encountered while querying db: ${err.message}`);
            
                  if (row) {
                    res.json({
                      AtomicNumber: row.AtomicNumber,
                      AtomicMass: row.AtomicMass,
                      Symbol: row.Symbol,
                      Name: row.Name,
                      ChemicalGroupBlock: row.ChemicalGroupBlock
                    });  
                  } else {
                    res.status(404).send('Element not found');
                  }
                }
              );
            });
          })  

  .post((req, res) => {
    db.serialize(() => {
      db.run(
        'INSERT INTO element(AtomicNumber, AtomicMass, Symbol, Name, ChemicalGroupBlock) VALUES(?, ?, ?, ?, ?)',
        [req.params.AtomicNumber, req.body.AtomicMass, req.body.Symbol, req.body.Name, req.body.ChemicalGroupBlock],
        (err) => {
          if (err) return console.error(err.message);
          console.log('New element has been added.');
          res.status(201).send(`New element has been added: ${req.params.AtomicNumber} - ${req.body.Symbol} ${req.body.Name}`);
        }
      );
    });
  })

  .put((req, res) => { 
    db.serialize(() => {
      db.run(
        'UPDATE element SET AtomicMass = ?, Symbol = ?, Name = ?, ChemicalGroupBlock = ? WHERE AtomicNumber = ?',
        [req.body.AtomicMass, req.body.Symbol, req.body.Name, req.body.ChemicalGroupBlock, req.params.AtomicNumber],
        (err) => {
          if (err) return console.error(err.message);
          console.log('Element updated successfully!');
          res.status(200).send(`Element ${req.params.AtomicNumber} updated!`);
        }
      );
    });
  })

  .delete((req, res) => {
    db.serialize(() => {
      db.run(
        'DELETE FROM element WHERE AtomicNumber = ?',
        [req.params.AtomicNumber],
        (err) => {
          if (err) return console.error(err.message);
          console.log('Element deleted successfully!');
          res.status(204).send();
        }
      );
    });
  });

  app.get('/elements', (req, res) => {
    db.serialize(() => {
      db.all(
        'SELECT AtomicNumber, AtomicMass, Symbol, Name, ChemicalGroupBlock FROM element',
        [],
        (err, rows) => {
          if (err) return console.error(err.message);
          if (rows) {
            res.send(rows);
          } else {
            res.status(404).send('No elements found!');
          }
        }
      );
    });
  });

  server.listen(3000, () => {
    console.log('app server running on port 3000');
  })