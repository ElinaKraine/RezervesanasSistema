import axios from 'axios'
import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateCar = () => {

    const { ID } = useParams ()
    
    const [values, setValues] = useState({
        Brand: "",
        Model: "",
        Seats: "",
        Transmission: "",
        OneHourPrice: "",
        TwoHoursPrice: "",
        FiveHoursPrice: "",
        OneDayPrice: "",
        Image: ""
    })

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:3030/update/${ID}`, values)
            .then(res => navigate('/'))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3030/getrecord/${ID}`)
            .then((res) => {
                setValues({
                ...values,
                Brand: res.data[0].Brand,
                Model: res.data[0].Model,
                Seats: res.data[0].Seats,
                Transmission: res.data[0].Transmission,
                OneHourPrice: res.data[0].OneHourPrice,
                TwoHoursPrice: res.data[0].TwoHoursPrice,
                FiveHoursPrice: res.data[0].FiveHoursPrice,
                OneDayPrice: res.data[0].OneDayPrice,
                Image: res.data[0].Image,
                })}
            )
            .catch((err) => console.log(err))
    }, [])

    return (
        <div className="d-flex align-items-center flex-column mt-3">
            <h2>Update Car</h2>
            <form className="w-50" onSubmit={handleSubmit}>
                <div className="mb-3 mt-3">
                    <label htmlFor="brand" className="form-label">
                        Brand:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="brand"
                        placeholder="Enter Car Brand"
                        name="brand"
                        value={values.Brand}
                        onChange={(e) => setValues({...values, Brand: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="model" className="form-label">
                        Model:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Car Model"
                        name="model"
                        value={values.Model}
                        onChange={(e) => setValues({...values, Model: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="seats" className="form-label">
                        Seats:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Car Seats"
                        name="seats"
                        value={values.Seats}
                        onChange={(e) => setValues({...values, Seats: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="transmission" className="form-label">
                        Transmission:
                    </label>
                    <select
                        className="form-control"
                        name="transmission"
                        value={values.Transmission}
                        onChange={(e) =>
                            setValues({
                            ...values,
                            Transmission: e.target.value,
                        })
                        }
                    >
                        <option value="">Select Transmission</option>
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="oneHourPrice" className="form-label">
                        One Hour Price:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter One Hour Price"
                        name="oneHourPrice"
                        value={values.OneHourPrice}
                        onChange={(e) => setValues({...values, OneHourPrice: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="twoHoursPrice" className="form-label">
                        Two Hours Price:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Two Hours Price"
                        name="twoHoursPrice"
                        value={values.TwoHoursPrice}
                        onChange={(e) => setValues({...values, TwoHoursPrice: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="fiveHoursPrice" className="form-label">
                        Five Hours Price:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Five Hours Price"
                        name="fiveHoursPrice"
                        value={values.FiveHoursPrice}
                        onChange={(e) => setValues({...values, FiveHoursPrice: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="oneDayPrice" className="form-label">
                        One Day Price:
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter One Day Price"
                        name="oneDayPrice"
                        value={values.OneDayPrice}
                        onChange={(e) => setValues({...values, OneDayPrice: e.target.value})}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">
                        Image link:
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Car Image Link"
                        name="image"
                        value={values.Image}
                        onChange={(e) => setValues({...values, Image: e.target.value})}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default UpdateCar