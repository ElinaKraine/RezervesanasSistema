import axios from 'axios'
import {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import errorMsg from "../../../components/message/errorMsg"
import successMsg from "../../../components/message/successMsg"
import ReservationForm from "./components/reservationForm"

const UpdateReservation = ({ Current_user }) => {
    
    const { ID } = useParams()
    const [rformKey, setrformKey] = useState('')
    
    const [values, setValues] = useState({
        ID_Car: "",
        PickUpDate: "",
        DropOffDate: "",
        Price: ""
    })

    const navigate = useNavigate()

    const handleSubmit = () => {
        axios
            .put(`http://localhost:3030/updateReservation/${ID}`, values)
            .then((res) => {
                successMsg({msg: 'The reservation is successfully updated!'})
                navigate('/reservationTable')
            })
            .catch((err) => {
                errorMsg({msg: 'The reservation is not successfully updated!'})
                console.log(err)
            })
    }

    useEffect(() => {
        axios
            .get(`http://localhost:3030/getrecordReservation/${ID}`)
            .then((res) => {
                setValues({
                    ...values,
                    ID_Car: res.data[0].ID_Car,
                    PickUpDate: res.data[0].PickUpDate,
                    DropOffDate: res.data[0].DropOffDate,
                    Price: res.data[0].Price
                }),
                setrformKey('a')
            }
            )
            .catch((err) => console.log(err))
    }, [])

    return (
        Current_user === "admin" ?
            <ReservationForm
                formName={"Update a reservation"}
                handleForSubmit={handleSubmit}
                values={values}
                setValues={setValues}
                isCreate={false}
                btnName={'Update'}
                formKey={rformKey}
            />
        :
        <h1>You are not autharized</h1>
    )
}

export default UpdateReservation