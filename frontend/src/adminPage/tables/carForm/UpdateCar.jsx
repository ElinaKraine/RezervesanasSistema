import axios from 'axios'
import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import successMsg from '../../../components/message/successMsg'
import errorMsg from '../../../components/message/errorMsg'
import CarForm from './components/carForm'

const UpdateCar = ({ Current_user }) => {

    const { ID } = useParams()
    const [formKey, setformKey] = useState('')
    
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
        axios
            .put(`http://localhost:3030/updateCar/${ID}`, values)
            .then((res) => {
                successMsg({msg: 'The car is successfully updated!'})
                navigate('/carTable')
            })
            .catch((err) => {
                errorMsg({msg: 'The car is not successfully updated!'})
                console.log(err)
            })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3030/getrecordCar/${ID}`)
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
                }),
                setformKey('asd')
            }
            )
            .catch((err) => {
                console.log(err),
                navigate('/carTable')
            })
    }, [])

    return (
        Current_user === "admin" ?
            <CarForm
                formName={"Update a car"}
                handleForSubmit={handleSubmit}
                values={values}
                setValues={setValues}
                isCreate={false}
                btnName={'Update'}
                formKey={formKey}
            />
            : 
            <h1>You are not autharized</h1>
    )
}

export default UpdateCar