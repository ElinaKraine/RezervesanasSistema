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
                WHERE 
                    (PickUpDate <= ? AND DropOffDate >= ?)
                    OR (PickUpDate <= ? AND DropOffDate >= ?)
                    OR (PickUpDate >= ? AND DropOffDate <= ?)
            )
            AND NOT EXISTS (
                SELECT 1
                FROM kraine.Reservation
                WHERE kraine.Reservation.ID_Car = kraine.Cars.ID
                AND DropOffDate <= TIMESTAMPADD(MINUTE, -10, NOW())
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

app.get("/carTable", (req, res) => {
    const sql = 'SELECT * FROM kraine.Cars'
    db.query(sql, (err, data) => {
        if(err){
            return res.json({Error: "Error"})
        }
        return res.json(data)
    })
})

app.get("/reservationTable", (req, res) => {
    const sql = 'SELECT * FROM kraine.Reservation'
    db.query(sql, (err, data) => {
        if(err){
            return res.json({Error: "Error"})
        }
        return res.json(data)
    })
})

app.post("/createCar", (req, res) => {
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

app.put("/updateCar/:ID", (req, res) => {
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
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.error('Error updating car:', err)
            return res.status(500).json({ Error: "Error updating car" })
        }
        return res.json(data)
    })
})

app.delete("/deleteCar/:ID", (req, res) => {
    const carId = req.params.ID
    const deleteReservationsQuery = "DELETE FROM kraine.reservation WHERE ID_Car = ?"

    db.query(deleteReservationsQuery, [carId], (reservationErr, reservationData) => {
        if (reservationErr) {
            console.error('Error deleting reservations:', reservationErr)
            return res.status(500).json({ Error: "Error deleting reservations" })
        }

        const deleteCarQuery = "DELETE FROM kraine.Cars WHERE ID = ?"
        db.query(deleteCarQuery, [carId], (carErr, carData) => {
            if (carErr) {
                console.error('Error deleting car:', carErr)
                return res.status(500).json({ Error: "Error deleting car" })
            }

            return res.json({ message: 'Car and related reservations deleted successfully' })
        })
    })
})

app.get('/getrecordCar/:ID', (req, res) => {
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