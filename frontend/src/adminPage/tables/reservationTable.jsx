import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import { Table, Space } from 'antd'
import dayjs from 'dayjs'

import successMsg from '../../components/message/successMsg'
import errorMsg from '../../components/message/errorMsg'
import './tables.css'

const ReservationTable = ({ Current_user }) => {
    const [reservations, setReservations] = useState([])
  
    useEffect(() => {
        axios.get('http://localhost:3030/reservationTable')
        .then(res => setReservations(res.data))
        .catch(err => console.log(err))
    }, [])

    const handleDelete = (ID) => {
        axios.delete(`http://localhost:3030/deleteReservation/${ID}`)
        .then((res) => {
            console.log(res)
            successMsg({ msg: 'The reservation is successfully deleted!' })
            setReservations(reservations.filter(reservation => reservation.ID_R !== ID))
        })
        .catch((err) => {
            errorMsg({ msg: 'The reservation is not successfully deleted!' })
            console.log(err)
        })
    }

    const tableData = reservations.map((reservation, index) => ({
        key: index,
        ID_R: reservation.ID_R,
        ID_Car: reservation.ID_Car,
        PickUpDate: dayjs(reservation.PickUpDate).format('YYYY-MM-DD HH:mm'),
        DropOffDate: dayjs(reservation.DropOffDate).format('YYYY-MM-DD HH:mm'),
        Price: reservation.Price,
    }))
    
    const columns = [
        {
            title: 'ID_R',
            dataIndex: 'ID_R',
            key: 'ID_R',
            sorter: (a, b) => a.ID_R - b.ID_R,
        },
        {
            title: 'ID_Car',
            dataIndex: 'ID_Car',
            key: 'ID_Car',
            sorter: (a, b) => a.ID_Car - b.ID_Car,
        },
        {
            title: 'PickUpDate',
            dataIndex: 'PickUpDate',
            key: 'PickUpDate',
            sorter: (a, b) => dayjs(a.PickUpDate).valueOf() - dayjs(b.PickUpDate).valueOf()
        },
        {
            title: 'DropOffDate',
            dataIndex: 'DropOffDate',
            key: 'DropOffDate',
            sorter: (a, b) => dayjs(a.DropOffDate).valueOf() - dayjs(b.DropOffDate).valueOf()
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
            sorter: (a, b) => a.Price - b.Price,
        },
        {
            title: 'Action',
            key: 'action',
            render: (record) => (
            <Space size="middle">
                <Link to={`/updateReservation/${record.ID_R}`} className="btnUpdate" key={'updateReservation'}>
                Update
                </Link>
                <button className="btnDelete" type="button" onClick={() => handleDelete(record.ID_R)} key={'deleteReservation'}>
                Delete
                </button>
            </Space>
            ),
        },
        ]

    return(
        Current_user === "admin" ?
        <div className="table">
            <Link to="/createReservation" className='btnCreate'>Add Reservation</Link>
            <Table columns={columns} dataSource={tableData} />
        </div>
        :
        <h1>You are not autharized</h1>
    )
}

export default ReservationTable