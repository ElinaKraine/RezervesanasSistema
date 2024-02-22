import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Name from './components/carsInfo/name'
import Img from './components/carsInfo/image'
import FurtherInfo from './components/carsInfo/furtherInfo'
import Price from './components/carsInfo/price'
import Buttons from './components/carsInfo/links'


import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

const Cars = ({ startDate, endDate, onChangeStartDate, onChangeEndDate }) => {

  const [cars, setCars] = useState([])

 useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3030?startDate=${startDate}&endDate=${endDate}`)

        if (response.data && response.data.Error) {
          // console.error(response.data.Error)
          setCars([])
        } else if (Array.isArray(response.data)) {
          setCars(response.data)
        } else {
          console.error('Invalid server response. Expected an array.')
          setCars([])
        }
      } catch (error) {
        console.error('Error fetching cars. Please try again.', error)
        setCars([])
      }
    }

    fetchData()
  }, [startDate, endDate])




  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3030');

  //       if (response.data && response.data.Error) {
  //         console.error(response.data.Error);
  //         setCars([]);
  //       } else if (Array.isArray(response.data)) {
  //         setCars(response.data);
  //       } else {
  //         console.error('Invalid server response. Expected an array.')
  //         setCars([]);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching cars. Please try again.', error)
  //       setCars([])
  //     }
  //   }

  //   fetchData()
  // }, [])

  const handleDelete = (ID) => {
    axios.delete(`http://localhost:3030/delete/${ID}`)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const currentDate = new Date()

  return (
    <>
      <Link to="/create" className='btn btn-success'>Create Car</Link>

      <div>
        <label htmlFor="startDate">Start Date: </label>
        <input
          type="datetime-local"
          id="startDate"
          value={startDate}
          min={currentDate.toISOString().slice(0, -8)}
          onChange={(e) => onChangeStartDate(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDate">End Date: </label>
        <input
          type="datetime-local"
          id="endDate"
          value={endDate}
          // min={startDate}
          onChange={(e) => onChangeEndDate(e.target.value)}
          // onChange={(e) => onChangeEndDate(e.target.value < startDate ? startDate : e.target.value)}
        />
      </div>

      {cars.map((car) => (
        <section className="car" key={car.ID} style={{ margin: '3rem 0 0 0' }}>
          <div className="img">
            <Img
              image={car.Image}
            />
          </div>
          <div className="info">
            <Name
              brand={car.Brand}
              model={car.Model}
            />
            <FurtherInfo
              seats={car.Seats}
              transmission={car.Transmission}
            />
          </div>
          <div className="price">
            <Price
              onehourprice={car.OneHourPrice}
              twohoursprice={car.TwoHoursPrice}
              fivehoursprice={car.FiveHoursPrice}
              onedayprice={car.OneDayPrice}
            />
          </div>
          <div className="buttons">
            <Buttons
              site={`/update/${car.ID}`}
              title={"Update"}
            />
            <button type='button' onClick={() => handleDelete(car.ID)} className='btn btn-danger btn-sm m-2 fs-5'>Delete</button>
            <Buttons
              site={`/reservation/${car.ID}`}
              title={"Reservation"}
            />
          </div>
        </section>
      ))}
    </>
  )
}

export default Cars