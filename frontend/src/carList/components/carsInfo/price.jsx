import { Typography } from 'antd'
const { Title } = Typography

export default function Price({ onehourprice, twohoursprice, fivehoursprice, onedayprice }) {
  return (
    <span>
          <Title level={4}>{onehourprice} EUR</Title>
          <Title level={4}>{twohoursprice} EUR</Title>
          <Title level={4}>{fivehoursprice} EUR</Title>
          <Title level={4}>{onedayprice} EUR</Title>
    </span>
  )
}