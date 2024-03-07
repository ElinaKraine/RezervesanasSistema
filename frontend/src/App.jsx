import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'

import Cars from './carList/Cars'
import CreateCar from './adminPage/tables/carForm/CreateCar'
import UpdateCar from './adminPage/tables/carForm/UpdateCar'
import Nav from './components/navigation/Nav'
import Reservation from './carList/components/reservation/reservation'
import Login from './login/Login'
import CarTable from './adminPage/tables/carTable'
import ReservationTable from './adminPage/tables/reservationsTable'

const Users = {
  Public: "public",
  Admin: "admin"
}

export default function App() {

  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const storedUser = localStorage.getItem('currentUser')
  const initialUser = storedUser ? storedUser : Users.Public
  const [currentUser, setCurrentUser] = useState(initialUser)

  const handleStartDate = (startDate) => {
    setStartDate(startDate)
  }

  const handleEndDate = (endDate) => {
    setEndDate(endDate)
  }

  const setCurrentUserWithStorage = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', user)
  }

  return (
    <>
      <BrowserRouter>
        <Nav Current_user={currentUser} setCurrentUser={setCurrentUserWithStorage}/>
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
          <Route path='/createCar' element={<CreateCar Current_user={currentUser} />} />
          <Route path='/updateCar/:ID' element={<UpdateCar Current_user={currentUser} />} />
          <Route
            path='/reservation/:ID'
            element={<Reservation
              startDate={startDate}
              endDate={endDate}
            />}
          />
          <Route path='/login' element={<Login setCurrentUser={setCurrentUser}/>}></Route>
          <Route path='/carTable' element={<CarTable Current_user={currentUser} />}></Route>
          <Route path='/reservationTable' element={<ReservationTable Current_user={currentUser} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}