const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(express.json());

app.use(cors());

// untuk membuat koneksi database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "ujian"
})

// untuk melakukan method get pada halaman/route utama
app.get("/", (req, res) => {
    const sql = "SELECT * FROM mahasiswa";
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

// untuk melakukan method post pada halaman/route add
app.post("/add", (req, res) => {
    const sql = "INSERT INTO mahasiswa (`Npm`, `Nama`,`Email`,`Kelas`) VALUES (?)";
    const values = [
        req.body.npm,
        req.body.nama,
        req.body.email,
        req.body.kelas
    ]
    db.query(sql, [values], (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    }) 
})

// untuk melakukan method get pada halaman/route update/:id
app.get("/update/:id", (req, res) => {
    const sql = "SELECT * FROM mahasiswa WHERE `ID` = ?";
    const id = req.params.id;
    db.query(sql,[id], (err, result) => {
        if(err) return res.json("Error");
        return res.json(result);
    })
})

// untuk melakukan method put pada halaman/route edit/:id
app.put("/edit/:id", (req, res) => {
    const sql = "UPDATE mahasiswa SET `Npm` = ?, `Nama` = ?, `Email` = ?, `Kelas` = ? Where `ID` = ?";
    const id = req.params.id;
    db.query(sql, [req.body.npm, req.body.nama, req.body.email, req.body.kelas, id], (err, result) => {
        if(err) return res.json("Error");
        return res.json({updated: true})
    }) 
})

// untuk melakukan method delete pada halaman/route mahasiswa/:id
app.delete("/mahasiswa/:id", (req, res) => {
    const sql = "DELETE FROM mahasiswa WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if(err) return res.json("Error");
        return res.json({data})
    }) 
})

app.listen(8081, () => {
    console.log("listening");
})