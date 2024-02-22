import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'antd'

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
      .catch((err) => console.log(err));
  }, [ID])

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
      <h2>{startDate}</h2>
      <h2>{endDate}</h2>
      <Button type="primary" htmlType="submit">Submit</Button>
    </>
  )
}

export default Reservation;