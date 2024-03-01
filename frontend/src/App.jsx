import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Cars from './carList/Cars'
import CreateCar from './carForm/CreateCar'
import UpdateCar from './carForm/UpdateCar'
import Nav from './components/navigation/Nav'
import Reservation from './carList/components/reservation'
import Login from './login/Login'

const Users = {
    Public: "public",
    Admin: "admin"
  }

export default function App() {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [currentUser, setCurrentUser] = useState(Users.Public);

  const handleStartDate = (startDate) => {
    setStartDate(startDate)
  }

  const handleEndDate = (endDate) => {
    setEndDate(endDate)
  }

  return (
    <>
      <BrowserRouter>
        <Nav Current_user={currentUser} />
        <Routes>
          <Route
            path='/'
            element={<Cars
              startDate={startDate}
              endDate={endDate}
              onChangeStartDate={handleStartDate}
              onChangeEndDate={handleEndDate}
              Current_user={currentUser}
            />}
          />
          <Route path='/create' element={<CreateCar Current_user={currentUser} />} />
          <Route path='/update/:ID' element={<UpdateCar Current_user={currentUser}/>} />
          <Route
            path='/reservation/:ID'
            element={<Reservation
              startDate={startDate}
              endDate={endDate}
            />}
          />
          <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}