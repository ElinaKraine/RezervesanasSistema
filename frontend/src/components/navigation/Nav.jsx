import { Link } from 'react-router-dom'
import CarImage from './car.png'
import { Layout } from 'antd'
const { Header } = Layout
import './nav.css'
import successMsg from '../message/successMsg'

const Nav = ({ Current_user, setCurrentUser }) => {

    const handleLogout = () => {
        successMsg({msg: 'You are successfully logout!'})
        setCurrentUser('public')
    }
    
    return (
        <Header className='header'>
            <div style={{ display: 'flex' }}>
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <img src={CarImage} alt="Car" style={{ height: '4.5rem' }} />
                </Link>
                <h1>Car Rental Reservation System</h1>
            </div>
            {Current_user === 'admin' ?
                <Link to='/' onClick={handleLogout} className='btn btn-outline-light btn-lg'>Logout</Link>
                :
                <>
                    <Link to="/login" className='btn btn-outline-light btn-lg'>Login</Link>
                </>
            }
        </Header>
    )
}

export default Nav