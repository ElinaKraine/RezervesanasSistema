import CarImage from './car.png'
import { Layout } from 'antd';
const { Header } = Layout;

const Nav = () => {
    return (
        <Header style={{ display: 'flex', alignItems: 'center', height: '7rem' }} >
            <img src={CarImage} style={{height:'4.5rem'}}/>
            <h1 style={{color:'#fff', margin:'1rem 2rem'}}>Car Rental Reservation System</h1>
        </Header>
    )
}

export default Nav