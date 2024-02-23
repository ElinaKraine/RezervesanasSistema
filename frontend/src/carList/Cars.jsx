import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Name from './components/carsInfo/name'
import Img from './components/carsInfo/image'
import FurtherInfo from './components/carsInfo/furtherInfo'
import Price from './components/carsInfo/price'
import Buttons from './components/carsInfo/links'
import DatesPicker from './components/datesPicker'

const Cars = ({ startDate, endDate, onChangeStartDate, onChangeEndDate }) => {

  const [cars, setCars] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (isSubmitted) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3030?startDate=${startDate}&endDate=${endDate}`)

          if (response.data && response.data.Error) {
            console.error(response.data.Error)
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
    }
  }, [startDate, endDate, isSubmitted])

  const handleDelete = (ID) => {
    axios.delete(`http://localhost:3030/delete/${ID}`)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }
  
  const handleSubmit = (e) => {

    e.preventDefault()

    const now = new Date()
    const startDateObject = new Date(startDate)
    const endDateObject = new Date(endDate)

    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }

    const formattedDateTime = now.toLocaleString(undefined, options)
    const start = startDateObject.toLocaleString(undefined, options)
    const end = endDateObject.toLocaleString(undefined, options)

    const nowPlusOneHour = new Date(now.getTime() + 60 * 60 * 1000).toLocaleString(undefined, options)

    if (start > end) {
      setErrorMessage('Start date must be before or equal to end date.')
      setCars([])
      return
    } else if (start<formattedDateTime || end<formattedDateTime) {
      setErrorMessage('You cant choose the past')
      setCars([])
      return
    } else if (start < nowPlusOneHour) {
      setErrorMessage('Start date must be at least 1 hour after the current date and time.')
      setCars([])
      return
    } else if ((endDateObject - startDateObject)< 60 * 60 * 1000) {
      setErrorMessage('The duration must be at least 1 hour.')
      setCars([])
      return
    }

    setIsSubmitted(true)
    setErrorMessage('')
  }

  return (
    <>
      <Link to="/create" className='btn btn-success'>Create Car</Link>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', margin: '2rem', justifyContent: 'center', alignItems: 'center' }}
      >

        <label htmlFor="startDate" style={{ fontSize: '1.2rem' }}>Start Date: </label>
        <input
          type="datetime-local"
          id="startDate"
          value={startDate}
          style={{ height: '3rem', width: '15rem', fontSize: '1.2rem', padding: '1rem', margin: '1rem' }}
          onChange={(e) => onChangeStartDate(e.target.value)}
          required
        />

        <label htmlFor="endDate" style={{ fontSize: '1.2rem' }}>End Date: </label>
        <input
          type="datetime-local"
          id="endDate"
          value={endDate}
          style={{ height: '3rem', width: '15rem', fontSize: '1.2rem', padding: '1rem', margin: '1rem'}}
          onChange={(e) => onChangeEndDate(e.target.value)}
        />

        <button type='submit' style={{ width: '5rem', height: '2rem' }}>Submit</button>
      </form>

      {errorMessage && <p style={{ color: 'red', fontSize:'1.5rem', display:'flex', justifyContent:'center' }}>{errorMessage}</p>}

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