import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Steps } from 'antd'
import dayjs from 'dayjs'

import successMsg from '../../../components/message/successMsg'
import errorMsg from '../../../components/message/errorMsg'
import FurtherInfo from '../carsInfo/furtherInfo'
import Name from '../carsInfo/name'
import Img from '../carsInfo/image'
import '../reservation/reservation.css'

const Reservation = ({startDate, endDate}) => {

  const { ID } = useParams()

  const [valuesCar, setValuesCar] = useState({
    Brand: '',
    Model: '', 
    Seats: '',
    Transmission: '',
    OneHourPrice: '',
    TwoHoursPrice: '',
    FiveHoursPrice: '',
    OneDayPrice: '',
    Image: '',
  })

  useEffect(() => {
    axios
      .get(`http://localhost:3030/getrecordCar/${ID}`)
      .then((res) => {
        setValuesCar({
          ...valuesCar,
          Brand: res.data[0].Brand,
          Model: res.data[0].Model,
          Seats: res.data[0].Seats,
          Transmission: res.data[0].Transmission,
          OneHourPrice: res.data[0].OneHourPrice,
          TwoHoursPrice: res.data[0].TwoHoursPrice,
          FiveHoursPrice: res.data[0].FiveHoursPrice,
          OneDayPrice: res.data[0].OneDayPrice,
          Image: res.data[0].Image,
        });
      })
      .catch((err) => console.log(err))
  }, [ID])

  const formattedStartDate = dayjs(startDate).format('YYYY-MM-DD HH:mm:ss')
  const formattedEndDate = dayjs(endDate).format('YYYY-MM-DD HH:mm:ss')

  const [values, setValues] = useState({
    ID_Car: ID,
    PickUpDate: formattedStartDate,
    DropOffDate: formattedEndDate,
    Price: 0
  })

  const navigate = useNavigate()

  const startDateObject = new Date(startDate)
  const endDateObject = new Date(endDate)
  const totalTime = (endDateObject - startDateObject) / (1000 * 60 * 60)

  const calculatePrice = () => {

    let totalPrice = 0
    const oneHourPrice = parseFloat(valuesCar.OneHourPrice)
    const twoHoursPrice = parseFloat(valuesCar.TwoHoursPrice)
    const fiveHoursPrice = parseFloat(valuesCar.FiveHoursPrice)
    const oneDayPrice = parseFloat(valuesCar.OneDayPrice)

    if (!isNaN(oneHourPrice) && !isNaN(twoHoursPrice) && !isNaN(fiveHoursPrice) && !isNaN(oneDayPrice)) {

      if (totalTime == 1) {
        totalPrice = oneHourPrice
      } else if (totalTime > 1 && totalTime <= 2) {
        totalPrice = twoHoursPrice
      } else if (totalTime > 2 && totalTime <= 5) {
        totalPrice = fiveHoursPrice
      } else if (totalTime > 5 && totalTime <= 24) {
        totalPrice = oneDayPrice
      } else if (totalTime > 24) {
        const days = Math.floor(totalTime / 24)
        const hours = totalTime % 24
        totalPrice = oneDayPrice * days
        if (hours % 5 == 0 && hours % 2 == 0 || hours % 5 == 0) {
          const h5 = hours / 5
          totalPrice += h5 * fiveHoursPrice
        } else if(hours % 2 == 0) {
          const h2 = hours / 2
          totalPrice += h2 * 2
        } else {
          totalPrice += hours * oneHourPrice
        }
      }
    }
    setValues({ ...values, Price: totalPrice.toFixed(2) })
  }

  useEffect(() => {
    if (valuesCar.Brand) {
      calculatePrice()
    }
  }, [valuesCar, startDate, endDate])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .put(`http://localhost:3030/reservation/${ID}`, values)
      .then(res => {
        successMsg({ msg: 'Reservation is successful!' })
        navigate('/')
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        errorMsg({ msg: 'Reservation is not successful!'})
       })
  }

  const pickupdate = dayjs(startDate).format('YYYY-MM-DD HH:mm')
  const dropoffdate = dayjs(endDate).format('YYYY-MM-DD HH:mm')

  return (
    <>
      <div className='carAndTime'>
        <section className="carReservation">
          <div className="img">
            <Img image={valuesCar.Image} />
          </div>
          <div className="infoReservation">
            <Name
              brand={valuesCar.Brand}
              model={valuesCar.Model}
            />
            <FurtherInfo
              seats={valuesCar.Seats}
              transmission={valuesCar.Transmission}
              isLastCar=''
            />
          </div>
        </section>
        <Steps
          className='time'
          direction="horizontal"
          current={2}
          items={[
            {
              title: 'Pick-up Date',
              description: pickupdate,
            },
            {
              title: 'Drop-off Date',
              description: dropoffdate,
            }
          ]}
        />
      </div>
      <div className='row'>
          <div className='totalPrice'>
          <span className='totalTime'>Price for {totalTime} hours</span>
            <span className='priceForTotalTime'>{values.Price} EUR</span>
            <button className='btnReservation' type='submit' onClick={handleSubmit}>Book now</button>
          </div>
      </div>
    </>
  )
}

export default Reservation