import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import CarForm from './components/carForm'

const CreateCar = () => {

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
            .post('http://localhost:3030/create', values)
            .then(res => navigate('/'))
            .catch(err => console.log(err));
    }

    return (
        <CarForm
            formName={"Add a car"}
            handleForSubmit={handleSubmit}
            values={values}
            setValues={setValues}
        />
    )
}

export default CreateCar