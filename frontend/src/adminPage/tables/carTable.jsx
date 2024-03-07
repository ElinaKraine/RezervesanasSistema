import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import { Table, Space } from 'antd'

import successMsg from '../../components/message/successMsg'
import errorMsg from '../../components/message/errorMsg'
import './tables.css'

const CarTable = ({ Current_user }) => {
  
  const [cars, setCars] = useState([])
  
  useEffect(() => {
      axios.get('http://localhost:3030/carTable')
      .then(res => setCars(res.data))
      .catch(err => console.log(err))
  }, [])

  const handleDelete = (ID) => {
    axios.delete(`http://localhost:3030/deleteCar/${ID}`)
      .then((res) => {
        console.log(res)
        successMsg({ msg: 'The car is successfully deleted!' })
        setCars(cars.filter(car => car.ID !== ID))
      })
      .catch((err) => {
        errorMsg({ msg: 'The car is not successfully deleted!' })
        console.log(err)
      })
  }


  const tableData = cars.map((car, index) => ({
    key: index,
    ID: car.ID,
    Brand: car.Brand,
    Model: car.Model,
    Seats: car.Seats,
    Transmission: car.Transmission,
    OneHourPrice: car.OneHourPrice,
    TwoHoursPrice: car.TwoHoursPrice,
    FiveHoursPrice: car.FiveHoursPrice,
    OneDayPrice: car.OneDayPrice,
  }))
    
  const columns = [
      {
        title: 'ID',
        dataIndex: 'ID',
        key: 'ID',
        sorter: (a, b) => a.ID - b.ID,
      },
      {
        title: 'Brand',
        dataIndex: 'Brand',
        key: 'Brand',
        filters: [
          {
            text: 'VW',
            value: 'VW',
          },
          {
            text: 'Fiat',
            value: 'Fiat',
          },
          {
              text: 'Renault',
              value: 'Renault',
          },
          {
              text: 'Skoda',
              value: 'Skoda',
          },
          {
              text: 'Toyota',
              value: 'Toyota',
          },
          {
              text: 'Smarts',
              value: 'Smarts',
          },
          {
              text: 'Kia',
              value: 'Kia',
          },
          {
              text: 'Ford',
              value: 'Ford',
          },
          {
              text: 'Audi',
              value: 'Audi',
          },
          {
              text: 'Opel',
              value: 'Opel',
          },
          {
              text: 'Nissan',
              value: 'Nissan',
          },
          {
              text: 'Lincoln',
              value: 'Lincoln',
          },
        ],
        filterSearch: true,
        onFilter: (value, record) => record.Brand.startsWith(value),
      },
      {
        title: 'Model',
        dataIndex: 'Model',
        key: 'Model',
      },
      {
        title: 'Seats',
        dataIndex: 'Seats',
        key: 'Seats',
        sorter: (a, b) => a.Seats - b.Seats,
      },
      {
        title: 'Transmission',
        dataIndex: 'Transmission',
        key: 'Transmission',
        filters: [
          {
            text: 'Manual',
            value: 'Manual',
          },
          {
            text: 'Automatic',
            value: 'Automatic',
          },
        ],
        onFilter: (value, record) => record.Transmission.startsWith(value),
      },
      {
        title: '1h',
        dataIndex: 'OneHourPrice',
        key: 'OneHourPrice',
        sorter: (a, b) => a.OneHourPrice - b.OneHourPrice,
      },
      {
        title: '2h',
        dataIndex: 'TwoHoursPrice',
        key: 'TwoHoursPrice',
        sorter: (a, b) => a.TwoHoursPrice - b.TwoHoursPrice,
      },
      {
        title: '5h',
        dataIndex: 'FiveHoursPrice',
        key: 'FiveHoursPrice',
        sorter: (a, b) => a.FiveHoursPrice - b.FiveHoursPrice,
      },
      {
        title: '24h',
        dataIndex: 'OneDayPrice',
        key: 'OneDayPrice',
        sorter: (a, b) => a.OneDayPrice - b.OneDayPrice,
      },
      {
        title: 'Action',
        key: 'action',
        render: (record) => (
          <Space size="middle">
            <Link key={`link-${record.ID}`} to={`/updateCar/${record.ID}`} className="btnUpdate">Update</Link>
            <button className="btnDelete" type="button" key={`button-${record.ID}`} onClick={() => handleDelete(record.ID)}>Delete</button>
          </Space>
        ),
      },
    ]

    return(
        Current_user === "admin" ?
        <div className="table">
            <Link to="/createCar" className='btnCreate'>Create Car</Link>
            <Table columns={columns} dataSource={tableData} />
        </div>
        :
        <h1>You are not autharized</h1>
    )
}

export default CarTable