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

app.get("/", async (req, res) => {
    const startDate = dayjs(req.query.startDate).format('YYYY-MM-DD HH:mm:ss')
    const endDate = dayjs(req.query.endDate).format('YYYY-MM-DD HH:mm:ss')
    const brands = req.query.brand || []
    const sort = req.query.sort
    const transmissions = req.query.transmission || []

    if (!startDate || !endDate) {
        return res.json({ Error: "Invalid date format" })
    } else {
        let sql = `
            SELECT * 
            FROM kraine.Cars
            WHERE ID NOT IN (
                SELECT ID_Car
                FROM kraine.Reservation
                WHERE (PickUpDate <= ? AND DropOffDate >= ?)
                OR (PickUpDate <= ? AND DropOffDate >= ?)
                OR (PickUpDate >= ? AND DropOffDate <= ?)
            )
        `;

        const values = [endDate, startDate, endDate, startDate, endDate, startDate]

        if (Array.isArray(brands) && brands.length > 0) {
            const placeholders = brands.map(() => '?').join(', ')
            sql += ` AND Brand IN (${placeholders})`
            values.push(...brands)
        } else {
            console.log("We dont have this type of brand")
        }

        if (Array.isArray(transmissions) && transmissions.length > 0) {
            const transmissionPlaceholders = transmissions.map(() => '?').join(', ');
            sql += ` AND Transmission IN (${transmissionPlaceholders})`;
            values.push(...transmissions);
        }else {
            console.log("We dont have this type of transmission")
        }

        if (sort) {
            sql += ' ORDER BY OneHourPrice ' + (sort === 'asc' ? 'ASC' : 'DESC')
        }else {
            console.log("We dont have this type of sort")
        }

        db.query(sql, values, (err, data) => {
            if (err) {
                console.error('Error executing SQL query:', err);
                return res.json({ Error: "Error executing SQL query" });
            } else {
                return res.json(data)
            }
        })
    }

})


// app.get("/", (req, res) => {
//     const startDate = dayjs(req.query.startDate).format('YYYY-MM-DD HH:mm:ss')
//     const endDate = dayjs(req.query.endDate).format('YYYY-MM-DD HH:mm:ss')

//     if (!startDate || !endDate) {
//         return res.json({ Error: "Invalid date format" })
//     }

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
//             // console.log(sql);
//             // console.error('SQL Error:', err);
//             return res.json({ Error: "Error" });
//         } else {
//             // console.log(sql);
//             return res.json(data);
//         }
//     })
// })




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
            return res.json({ Error: "Error" })
        } else {
            return res.json(data)
        }
    })
})

app.get('/getrecordforadmin', (req, res) => {
    const sql = "SELECT * FROM kraine.Admin"
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error" })
        } else {
            return res.json(data)
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

app.post("/login", (req, res) => {
    const sql = "SELECT * FROM kraine.Admin WHERE TRIM(Name) = ? AND TRIM(Password) = ?";

    db.query(sql, [req.body.name, req.body.password], (err, data) => {
        if (err) return res.json("Error")

        if (data.length > 0) {
            return res.json("Login Successfully")
        } else {
            return res.json("No Record")
        }
    })
})

app.listen(3030, () => {
    console.log("Running")
})