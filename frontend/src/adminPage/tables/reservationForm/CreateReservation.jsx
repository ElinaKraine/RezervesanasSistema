import axios from 'axios'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

import errorMsg from '../../../components/message/errorMsg'
import successMsg from '../../../components/message/successMsg'
import ReservationForm from './components/reservationForm'

const CreateReservation = ({ Current_user }) => {
    
    const [values, setValues] = useState({
        ID_Car: "",
        PickUpDate: "",
        DropOffDate: "",
        Price: 0
    })

    const navigate = useNavigate()

    const handleSubmit = () => {
        console.log(values)
        axios
            .post('http://localhost:3030/createReservation', values)
            .then((res) => {
                successMsg({msg: 'The reservation is successfully created!'})
                navigate('/reservationTable')
            })
            .catch((err) => {
                errorMsg({msg: 'The reservation is not successfully created!'})
                console.log(err)
            })
    }

    return (
        Current_user === "admin" ?
            <ReservationForm
                formName={"Add a reservation"}
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

export default CreateReservation