import express from "express";
import mysql from "mysql";
import cors from 'cors';

const app = express();

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "niloy155",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello from backend api");
});
app.get("/books", (req, res) => {
  const q = " SELECT * FROM books";
  db.query(q, (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  });
});

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`cover`,`price`) VALUES(?)";
  const values = [req.body.title, req.body.desc, req.body.cover,req.body.price];

  db.query(q, [values], (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json("Book created successfully!");
    }
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id
  const q = "DELETE FROM books WHERE id = ? ";
  const values = [req.body.title, req.body.desc, req.body.cover,req.body.price];

  db.query(q, [bookId], (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json("Book has been deleted successfully!");
    }
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(7000, console.log("server is running in port 7000"));
