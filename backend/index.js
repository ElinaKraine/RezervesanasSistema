import express from 'express'
import mysql from 'mysql2'
import cors from 'cors'
import dayjs from 'dayjs'

const app = express()
app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Parole1",
  database: "kraine"
})

app.get("/", (req, res) => {
    const startDate = dayjs(req.query.startDate).format('YYYY-MM-DD HH:mm:ss')
    const endDate = dayjs(req.query.endDate).format('YYYY-MM-DD HH:mm:ss')

    if (!startDate || !endDate) {
        return res.json({ Error: "Invalid date format" })
    }

    const sql = `
        SELECT * 
        FROM kraine.Cars
        WHERE ID NOT IN (
            SELECT ID_Car
            FROM kraine.Reservation
            WHERE (PickUpDate <= ? AND DropOffDate >= ?)
            OR (PickUpDate <= ? AND DropOffDate >= ?)
            OR (PickUpDate >= ? AND DropOffDate <= ?)
        );
    `

    db.query(sql, [endDate, startDate, endDate, startDate, endDate, startDate], (err, data) => {
        if (err) {
            // console.log(sql);
            // console.error('SQL Error:', err);
            return res.json({ Error: "Error" });
        } else {
            // console.log(sql);
            return res.json(data);
        }
    })
})




// app.get("/", (req, res) => {

//     // const startDate = req.query.startDate
//     // const endDate = req.query.endDate
//     const startDate = dayjs(req.query.startDate).format('YYYY-MM-DD HH:mm:ss');
//     const endDate = dayjs(req.query.endDate).format('YYYY-MM-DD HH:mm:ss');

//     const sql = `
//         SELECT * 
//         FROM kraine.Cars
//         WHERE ID NOT IN (
//             SELECT ID_Car
//             FROM kraine.Reservation
//             WHERE (PickUpDate <= ? AND DropOffDate >= ?)
//             OR (PickUpDate <= ? AND DropOffDate >= ?)
//             OR (PickUpDate >= ? AND DropOffDate <= ?)
//         );
//     `

//     db.query(sql, [endDate, startDate, endDate, startDate, endDate, startDate], (err, data) => {
//         if (err) {
//             return res.json({ Error: "Error" });
//         } else {
//             return res.json(data);
//         }
//     })
// })


app.post("/create", (req, res) => {
    const sql = "INSERT INTO kraine.Cars (Brand, Model, Seats, Transmission, OneHourPrice, TwoHoursPrice, FiveHoursPrice, OneDayPrice, Image) VALUES (?)";
    const values = [
        req.body.Brand,
        req.body.Model,
        req.body.Seats,
        req.body.Transmission,
        req.body.OneHourPrice,
        req.body.TwoHoursPrice,
        req.body.FiveHoursPrice,
        req.body.OneDayPrice,
        req.body.Image
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error creating car:", err);
            return res.status(500).json({ error: "Internal Server Error" })
        }
        return res.json(data)
    })

})

app.put("/update/:ID", (req, res) => {
    const sql = "UPDATE kraine.Cars SET Brand = ?, Model = ?, Seats = ?, Transmission = ?,  OneHourPrice = ?, TwoHoursPrice = ?, FiveHoursPrice = ?, OneDayPrice = ?, Image = ?  WHERE ID = ?";
    
    const values = [
        req.body.Brand,
        req.body.Model,
        req.body.Seats,
        req.body.Transmission,
        req.body.OneHourPrice,
        req.body.TwoHoursPrice,
        req.body.FiveHoursPrice,
        req.body.OneDayPrice,
        req.body.Image
    ]
    const id = req.params.ID;
    db.query(sql, [...values, id] , (err, data) => {
        if (err) { return res.json({Error: "Error"}) } else {
            return res.json(data);
        }
    })
})



app.delete("/delete/:ID", (req, res) => {
    const sql = "DELETE FROM kraine.Cars WHERE ID = ?";
    const id = req.params.ID;
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        } else {
            return res.json(data);
        }
    })
})

app.get('/getrecord/:ID', (req, res) => {
    const id = req.params.ID
    const sql = "SELECT * FROM kraine.Cars WHERE ID = ?"
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        } else {
            return res.json(data);
        }
    })
})

app.put("/reservation/:ID", (req, res) => {
    const sql = "INSERT INTO kraine.Reservation (ID_Car, PickUpDate, DropOffDate, Price) VALUES (?)";
    
    const values = [
        req.body.ID_Car,
        req.body.PickUpDate,
        req.body.DropOffDate,
        req.body.Price
    ]

    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        return res.json(data);
    })
})

app.listen(3030, () => {
    console.log("Running")
})