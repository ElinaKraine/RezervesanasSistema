import { Typography } from 'antd';
const { Title } = Typography;

export default function Price({ onehourprice, twohoursprice, fivehoursprice, onedayprice }) {

    return (
        <span>
            <Title level={4}>1h: {onehourprice} EUR</Title>
            <Title level={4}>2h: {twohoursprice} EUR</Title>
            <Title level={4}>5h: {fivehoursprice} EUR</Title>
            <Title level={4}>24h: {onedayprice} EUR</Title>
        </span>
    )
}