import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cars from './carList/Cars'
import CreateCar from './carForm/CreateCar'
import UpdateCar from './carForm/UpdateCar'
import Nav from './mainPage/Nav'
import Reservation from './carList/components/reservation'
import { useState } from 'react'

export default function App() {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const handleStartDate = (startDate) => {
    setStartDate(startDate)
  }

  const handleEndDate = (endDate) => {
    setEndDate(endDate)
  }

  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route
            path='/'
            element={<Cars
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={handleStartDate}
              onChangeEndDate={handleEndDate} />}
          />
          <Route path='/create' element={<CreateCar />} />
          <Route path='/update/:ID' element={<UpdateCar />} />
          <Route path='/reservation/:ID' element={<Reservation startDate={startDate} endDate={endDate} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}