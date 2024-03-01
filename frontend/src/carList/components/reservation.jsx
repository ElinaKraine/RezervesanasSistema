import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, message } from 'antd'
import dayjs from 'dayjs'

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
      .get(`http://localhost:3030/getrecord/${ID}`)
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

  const showError = (errorMsg) => {
    message.error({
      content: errorMsg,
      duration: 5,
      style: {
          fontSize: '1.5rem'
      },
    })
  }

  const showSuccess = (successMsg) => {
    message.success({
      content: successMsg,
      duration: 5,
      style: {
          fontSize: '1.5rem'
      },
    })
  }

  const navigate = useNavigate()

  const calculatePrice = () => {

    let totalPrice = 0
    const oneHourPrice = parseFloat(valuesCar.OneHourPrice)
    const twoHoursPrice = parseFloat(valuesCar.TwoHoursPrice)
    const fiveHoursPrice = parseFloat(valuesCar.FiveHoursPrice)
    const oneDayPrice = parseFloat(valuesCar.OneDayPrice)

    if (!isNaN(oneHourPrice) && !isNaN(twoHoursPrice) && !isNaN(fiveHoursPrice) && !isNaN(oneDayPrice)) {
      const startDateObject = new Date(startDate)
      const endDateObject = new Date(endDate)
      const totalTime = (endDateObject - startDateObject) / (1000*60*60)

      if (totalTime === 1) {
        totalPrice = oneHourPrice
      } else if (totalTime > 1 && totalTime <= 2) {
        totalPrice = twoHoursPrice
      } else if (totalTime > 2 && totalTime <= 5) {
        totalPrice = fiveHoursPrice
      } else if (totalTime > 5 && totalTime <= 24) {
        totalPrice = oneDayPrice
      } else if (totalTime > 24) {
        totalPrice = oneDayPrice * 2
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
        showSuccess('Reservation is successful!')
        navigate('/')
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
        showError("Reservation is not successful!")
       })
  }

  return (
    <>
      <section className="car">
        <div className="img">
          <img src={valuesCar.Image} alt={`${valuesCar.Brand} ${valuesCar.Model}`} />
        </div>
        <div className="info">
          <h1>{`${valuesCar.Brand} ${valuesCar.Model}`}</h1>
          <p>
            <i className="material-icons">&#xe7fd;</i>
            {valuesCar.Seats}
          </p>
          <p>
            <i className="fa fa-car"></i>
            {valuesCar.Transmission}
          </p>
        </div>
      </section>
      <br />
      <h2>{dayjs(startDate).format('YYYY-MM-DD HH:mm')}</h2>
      <h2>{dayjs(endDate).format('YYYY-MM-DD HH:mm')}</h2>
      <div className="mb-3">
        <p>
          <strong>Price:</strong> {values.Price}
        </p>
      </div>
      <Button
        type="primary"
        htmlType="submit"
        onClick={handleSubmit}
      >Submit</Button>
    </>
  )
}

export default Reservation