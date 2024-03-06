import { Typography } from 'antd';
const { Title } = Typography;

export default function FurtherInfo ({ seats, transmission, isLastCar }) {
    return (
        <span>
            <Title level={4} style={{display:'flex' ,alignItems:'center'}}>
                <i className="material-icons">&#xe7fd;</i>{seats} seats
            </Title>
            <Title level={4}>
                <i className="fa fa-car"></i> {transmission}
            </Title>
            {isLastCar ? (
                <Title level={4} style={{color:'darkred'}}>The Last Car</Title>
            ) : (
                <></>
            )}
        </span>
    )
}