import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import Name from './components/carsInfo/name'
import Img from './components/carsInfo/image'
import FurtherInfo from './components/carsInfo/furtherInfo'
import Price from './components/carsInfo/price'
import Buttons from './components/carsInfo/links'
import DatesPicker from './components/datesPicker/datesPicker'
import Filter from './components/filter/Filter'
import AdminPage from '../adminPage/adminPage'
import './components/cars.css'

const Cars = ({ startDate, endDate, onChangeStartDate, onChangeEndDate, Current_user }) => {

  const [cars, setCars] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedSort, setSelectedSort] = useState(null)
  const [selectedTransmission, setSelectedTransmission] = useState([])
  const [showNoCarsMessage, setShowNoCarsMessage] = useState(false)

  //Šis koda bloks ir atbildīgs par datu pieprasījuma veikšanu no servera, 
  //kad mainās noteikti parametri, un servera atbildes apstrādi atkarībā no 
  //tās satura
  useEffect(() => {
    if (isSubmitted) {
      const fetchData = async () => {
        try {
          const encodedBrands = selectedBrand.map(brand => encodeURIComponent(brand)).join('&brand[]=')
          const encodedTransmissions = selectedTransmission.map(transmission => encodeURIComponent(transmission)).join('&transmission[]=')
          
          let apiUrl = `http://localhost:3030?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`
          
          if (selectedBrand && selectedBrand.length > 0) {
            apiUrl += `&brand[]=${encodedBrands}`
          }

          if (selectedSort) {
            apiUrl += `&sort=${selectedSort}`
          }

          if (selectedTransmission && selectedTransmission.length > 0) {
            apiUrl += `&transmission[]=${encodedTransmissions}`
          }

          const response = await axios.get(apiUrl)
          console.log(apiUrl)

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
        } finally {
          setIsSubmitted(false)
          setShowNoCarsMessage(true)
        }
      }
  
      fetchData()
    }
  }, [startDate, endDate, selectedBrand, selectedSort, isSubmitted])

  const getUniqueAndNonUnique = (cars) => {
    //Unikālo atslēgu (uniqueKeys) un unikālo automobiļu (uniqueCars) un 
    //unikālo automobiļu (nonUniqueCars) masīvu izveide
    const uniqueKeys = new Set()
    const uniqueCars = []
    const nonUniqueCars = []
  
    //Katram automašīnas objektam no cars masīva
    cars.forEach((car) => {
      //tiek izveidots jauns carWithoutID objekts, izņemot īpašību ID
      const { ID, ...carWithoutID } = car
      //unikāla atslēga, pamatojoties uz noteiktām mašīnas īpašībām
      const carKey = `${carWithoutID.Brand}_${carWithoutID.Model}_${carWithoutID.Seats}_${carWithoutID.Transmission}_${carWithoutID.OneHourPrice}_${carWithoutID.TwoHoursPrice}_${carWithoutID.FiveHoursPrice}_${carWithoutID.OneDayPrice}`
  
      //Mašīnas unikalitātes pārbaude:

      //pašreizējo mašīnu uzskata par unikālu, ja tās atslēga (atvasināta no noteiktām īpašībām) 
      //nav sastopama iepriekš apstrādātajās mašīnās
      if (!uniqueKeys.has(carKey)) {
        uniqueKeys.add(carKey)
        uniqueCars.push(carWithoutID)
      //Ja atslēga jau ir sastapta, uzskata, ka pašreizējā mašīna nav unikāla
      } else {
        //Mēģinām atrast atbilstošās unikālās mašīnas indeksu unikālo mašīnu sarakstā
        const indexInUnique = uniqueCars.findIndex((uniqueCar) => {
          const uniqueCarKey = `${uniqueCar.Brand}_${uniqueCar.Model}_${uniqueCar.Seats}_${uniqueCar.Transmission}_${uniqueCar.OneHourPrice}_${uniqueCar.TwoHoursPrice}_${uniqueCar.FiveHoursPrice}_${uniqueCar.OneDayPrice}`
          return uniqueCarKey === carKey;
        })

        //Ja tādu atrodam, noņemam unikālo mašīnu no saraksta
        if (indexInUnique !== -1) {
          uniqueCars.splice(indexInUnique, 1)
        }

        nonUniqueCars.push(carWithoutID)
      }
    })
    return { uniqueCars, nonUniqueCars }
  }

  return (
    <>
      {Current_user === "admin" ? 
        <AdminPage />
       : 
        <>
          <DatesPicker
            startDate={startDate}
            endDate={endDate}
            onChangeStartDate={onChangeStartDate}
            onChangeEndDate={onChangeEndDate}
            setCars={setCars}
            setIsSubmitted={setIsSubmitted}
          />
          <div className='mainPage'>
            <div className='filter'>
              {Filter && (
                <Filter
                  setSelectedBrand={setSelectedBrand}
                  setSelectedSort={setSelectedSort}
                  setSelectedTransmission={setSelectedTransmission}
                />
              )}
            </div>
            <div className='carList'>
            {(showNoCarsMessage && cars.length <= 0) ? (
                  <h1 style={{marginLeft:'2rem', color:'darkred'}}>No cars</h1>
                ) : (
                  cars.map((car) => {
                    //Izsaukt getUniqueAndNonUnique(cars)
                    const { uniqueCars, nonUniqueCars } = getUniqueAndNonUnique(cars)
                    //Ar metodi some tiek pārbaudīts, vai pašreizējais automobilis ir unikāls
                    const isUniqueCar = uniqueCars.some((uniqueCar) => {
                      //Tas tiek darīts, veicot pašreizējās mašīnas īpašību salīdzināšanu ar mašīnu īpašībām no uniqueCars masīva
                      const uniqueCarKey = `${uniqueCar.Brand}_${uniqueCar.Model}_${uniqueCar.Seats}_${uniqueCar.Transmission}_${uniqueCar.OneHourPrice}_${uniqueCar.TwoHoursPrice}_${uniqueCar.FiveHoursPrice}_${uniqueCar.OneDayPrice}`
                      const carKey = `${car.Brand}_${car.Model}_${car.Seats}_${car.Transmission}_${car.OneHourPrice}_${car.TwoHoursPrice}_${car.FiveHoursPrice}_${car.OneDayPrice}`
                      return uniqueCarKey === carKey
                    })
  
                    return (
                      <section className="car" key={car.ID}>
                        <div className="column">
                          <Img image={car.Image}/>
                        </div>
                          <div className="column">
                            <Name
                              brand={car.Brand}
                              model={car.Model}
                            />
                            <FurtherInfo
                              seats={car.Seats}
                              transmission={car.Transmission}
                              isLastCar={isUniqueCar}
                            />
                          </div>
                          <div className="column">
                            <Price
                              onehourprice={car.OneHourPrice}
                              twohoursprice={car.TwoHoursPrice}
                              fivehoursprice={car.FiveHoursPrice}
                              onedayprice={car.OneDayPrice}
                          />
                          <span className='reservationButton'>
                            <Buttons
                              site={`/reservation/${car.ID}`}
                              title={"Reservation"}
                            />
                          </span>
                          </div>
                        </section>
                      )
                  })
                )}
            </div>
          </div>
        </>
      }
    </>
  )
}

export default Cars