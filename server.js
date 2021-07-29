const express = require("express");
const uuid = require("uuid");
const mysql = require("mysql");
const fs = require("fs");
const cors = require("cors");
const BASE_URL = "/api";

const app = express();

app.use(express.json());
app.use(cors());

// Create Databases

const db = mysql.createConnection({
  host: "blcv3djfbzmc7pdez3nn-mysql.services.clever-cloud.com",
  user: "u79brigz8fv1yd8j",
  password: "j3q4ogaBBeAFsi7luuLs",
  database: "blcv3djfbzmc7pdez3nn",
});

db.connect((err) => {
  if (err) {
    console.error("error connecting : ", err.stack);
    return;
  }
  console.log("database connected");
});

app.get(`${BASE_URL}/project/`, (req, res) => {
  let sql = "SELECT * FROM project";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post(`${BASE_URL}/project/post/`, (req, res) => {
  const post = {
    id: uuid.v4(),
    github: req.body.Github,
    cloudinary: req.body.Cloudinary,
  };
  post.id = post.id.replace(/-/g, "");

  let sql = "INSERT INTO project SET ?";
  db.query(sql, post, (err, result) => {
    if (err) throw err;
    res.send("post 1 reussie...");
  });
});

app.delete(`${BASE_URL}/project/delete/:id`, (req, res) => {
  let sql = `DELETE FROM project WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Delete reussie...");
  });
});

app.put(`${BASE_URL}/project/update/:id`, cors(), (req, res) => {
  console.log("1", req.body.NewGithub);
  console.log("2", req.body.NewCloudinary);

  let sql = `UPDATE project SET github = '${req.body.NewGithub}', cloudinary = '${req.body.NewCloudinary}' WHERE id = '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("put reussie...");
  });
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, function () {
  console.log(`server is running on Port ${PORT}`);
});
