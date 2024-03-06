import Buttons from '../carList/components/carsInfo/links'
import { Typography } from 'antd'
const { Title } = Typography
import './adminPage.css'

const AdminPage = () => {

    return(
        <div className='adminPage'>
            <Title level={1}>Tables</Title>
            <Buttons
                site={'/carTable'}
                title={"Cars"}
            />
            <Buttons
                site={'/reservationTable'}
                title={"Reservation"}
                className='buttons'
            />
        </div>
    )
}

export default AdminPage