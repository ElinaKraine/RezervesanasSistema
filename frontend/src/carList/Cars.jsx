import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Name from './components/carsInfo/name'
import Img from './components/carsInfo/image'
import FurtherInfo from './components/carsInfo/furtherInfo'
import Price from './components/carsInfo/price'
import Buttons from './components/carsInfo/links'
import './components/carsInfo/carsInfo.css'
import DatesPicker from './components/datesPicker/datesPicker'
import Filter from './components/filter/Filter'

const Cars = ({ startDate, endDate, onChangeStartDate, onChangeEndDate, Current_user }) => {

  const [cars, setCars] = useState([])
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState([])
  const [selectedSort, setSelectedSort] = useState(null)
  const [selectedTransmission, setSelectedTransmission] = useState([])
  // const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (isSubmitted) {
      const fetchData = async () => {
        try {
          const encodedBrands = selectedBrand.map(brand => encodeURIComponent(brand)).join('&brand[]=');
          const encodedTransmissions = selectedTransmission.map(transmission => encodeURIComponent(transmission)).join('&transmission[]=');
          
          let apiUrl = `http://localhost:3030?startDate=${encodeURIComponent(startDate)}&endDate=${encodeURIComponent(endDate)}`;
          
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
            console.error(response.data.Error);
            setCars([]);
          } else if (Array.isArray(response.data)) {
            setCars(response.data);
          } else {
            console.error('Invalid server response. Expected an array.');
            setCars([]);
          }
        } catch (error) {
          console.error('Error fetching cars. Please try again.', error);
          setCars([]);
        }
      };

      fetchData();
      setIsSubmitted(false);
    }
  }, [startDate, endDate, selectedBrand, selectedSort, isSubmitted]);

  // useEffect(() => {
  //   if (isSubmitted) {
  //     const fetchData = async () => {
  //       try {
  //         const response = await axios.get(`http://localhost:3030?startDate=${startDate}&endDate=${endDate}`)

  //         if (response.data && response.data.Error) {
  //           console.error(response.data.Error)
  //           setCars([])
  //         } else if (Array.isArray(response.data)) {
  //           setCars(response.data)
  //         } else {
  //           console.error('Invalid server response. Expected an array.')
  //           setCars([])
  //         }
  //       } catch (error) {
  //         console.error('Error fetching cars. Please try again.', error)
  //         setCars([])
  //       }
  //     }

  //     fetchData()
  //     setIsSubmitted(false)
  //   }
  // }, [startDate, endDate, isSubmitted])

  const handleDelete = (ID) => {
    axios.delete(`http://localhost:3030/delete/${ID}`)
      .then(() => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // const cena = (oneH, twoH, fiveH, oneD) => {
  //   const startDateObject = new Date(startDate)
  //   const endDateObject = new Date(endDate)
  //   const totalTime = (endDateObject - startDateObject) / (1000*60*60)
  //   if (totalTime == 1) {
  //     galigaCena=oneH
  //   } else if (totalTime > 1 && totalTime <= 2) {
  //     galigaCena=twoH
  //   } else if (totalTime>2 && totalTime<=5) {
  //     galigaCena=fiveH
  //   } else if (totalTime > 5 && totalTime <= 24) {
  //     galigaCena=oneD
  //   } else if (totalTime>24) {
  //     galigaCena=oneD*2
  //   }
  //   onChangePrice(galigaCena)
  //   return (galigaCena)
  // }

  // const handleChangePrice = (price) => {
  //   setTotalPrice(price);
  // };
//   const handleChangePrice = (carIndex, price) => {
//   onChangePrice((prevGaligaCena) => {
//     // Ensure the array has the correct length
//     const newGaligaCena = [...prevGaligaCena];
//     while (newGaligaCena.length <= carIndex) {
//       newGaligaCena.push(0);  // You might want to initialize with a default value
//     }

//     // Update the specific index
//     newGaligaCena[carIndex] = price;

//     return newGaligaCena;
//   });
  // };

//   const hasDuplicates = (currentCar) => {
//   let seenCars = new Set();

//   for (const car of cars) {
//     if (car === currentCar) {
//       continue; // Skip the current car when comparing with itself
//     }

//     const key = `${car.Brand}-${car.Model}-${car.Seats}-${car.Transmission}-${car.OneHourPrice}-${car.TwoHoursPrice}-${car.FiveHoursPrice}-${car.OneDayPrice}`;

//     if (seenCars.has(key)) {
//       return true; // Duplicate found
//     }

//     seenCars.add(key);
//   }

//   return false; // No duplicates found
// };


  // const getUnique = (cars) => {
  //   const uniqueCars = cars.filter((car, index, array) => {
  //     // Check if there is no previous car with the same properties (excluding ID)
  //     return index === array.findIndex((otherCar) => {
  //       // Compare all properties except ID
  //       return (
  //         car.Brand === otherCar.Brand &&
  //         car.Model === otherCar.Model &&
  //         car.Seats === otherCar.Seats &&
  //         car.Transmission === otherCar.Transmission &&
  //         car.OneHourPrice === otherCar.OneHourPrice &&
  //         car.TwoHoursPrice === otherCar.TwoHoursPrice &&
  //         car.FiveHoursPrice === otherCar.FiveHoursPrice &&
  //         car.OneDayPrice === otherCar.OneDayPrice
  //       );
  //     });
  //   });

  //   console.log(uniqueCars);
  // }

  const getUnique = (cars) => {
  const uniqueCars = cars.filter((car, index, array) => {
    // Check if there is no previous car with the same properties (excluding ID)
    return index === array.findIndex((otherCar) => {
      // Compare all properties except ID
      return (
        car.Brand === otherCar.Brand &&
        car.Model === otherCar.Model &&
        car.Seats === otherCar.Seats &&
        car.Transmission === otherCar.Transmission &&
        car.OneHourPrice === otherCar.OneHourPrice &&
        car.TwoHoursPrice === otherCar.TwoHoursPrice &&
        car.FiveHoursPrice === otherCar.FiveHoursPrice &&
        car.OneDayPrice === otherCar.OneDayPrice
      );
    });
  });

  // Determine if each car is the last unique one
  const lastUniqueCars = uniqueCars.map((uniqueCar, index) => {
    return index === uniqueCars.length - 1;
  });

  return { uniqueCars, lastUniqueCars };
};



  return (
    <>
      {Current_user === "admin" ? 
        <Link to="/create" className='btn btn-success'>Create Car</Link>
       : 
        <></>
      }

      <DatesPicker
        startDate={startDate}
        endDate={endDate}
        onChangeStartDate={onChangeStartDate}
        onChangeEndDate={onChangeEndDate}
        setCars={setCars}
        setIsSubmitted={setIsSubmitted}
      />

      {Filter && (
        <Filter
          setSelectedBrand={setSelectedBrand}
          setSelectedSort={setSelectedSort}
          setSelectedTransmission={setSelectedTransmission}
        />
      )}

      {cars.map((car, index) => (
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
            <p>{getUnique(cars).lastUniqueCars[index] ? 'not last' : 'last'}</p>
              <FurtherInfo
                seats={car.Seats}
                transmission={car.Transmission}
                lastCar={getUnique(cars).lastUniqueCars[index]}
                // lastCar={hasDuplicates(car)}
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
              {Current_user === "admin" ? 
                <>
                  <Buttons
                    site={`/update/${car.ID}`}
                    title={"Update"}
                  />
                  <button type='button' onClick={() => handleDelete(car.ID)} className='btn btn-danger btn-sm m-2 fs-5'>Delete</button>
                </>
              : 
                <></>
              }
              <Buttons
                site={`/reservation/${car.ID}`}
                title={"Reservation"}
              />
            </div>
          </section>
        ))
      }
     </>
   )
 }

export default Cars