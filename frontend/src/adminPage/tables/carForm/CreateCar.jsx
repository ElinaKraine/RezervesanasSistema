import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import CarForm from './components/carForm'
import successMsg from '../../../components/message/successMsg'
import errorMsg from '../../../components/message/errorMsg'

const CreateCar = ({ Current_user }) => {

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

    const handleSubmit = () => {
        console.log(values)
        axios
            .post('http://localhost:3030/createCar', values)
            .then((res) => {
                successMsg({msg: 'The car is successfully created!'})
                navigate('/carTable')
            })
            .catch((err) => {
                errorMsg({msg: 'The car is not successfully created!'})
                console.log(err)
            })
    }

    return (
        Current_user === "admin" ?
            <CarForm
                formName={"Add a car"}
                handleForSubmit={handleSubmit}
                values={values}
                setValues={setValues}
                isCreate={true}
                btnName={'Create'}
                initialValuesBrand={''}
                key={''}
            />
        :
            <h1>You are not autharized</h1>
    )
}

export default CreateCar