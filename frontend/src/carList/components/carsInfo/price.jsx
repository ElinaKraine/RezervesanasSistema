import { Card, List, Typography } from 'antd'

const { Text } = Typography

export default function Price({ onehourprice, twohoursprice, fivehoursprice, onedayprice }) {
  const data = [
    {
      title: '1 hour',
      content: onehourprice,
    },
    {
      title: '2 hour',
      content: twohoursprice,
    },
    {
      title: '5 hour',
      content: fivehoursprice,
    },
    {
      title: '1 day',
      content: onedayprice,
    },
  ]

  return (
    <List
      grid={{
        gutter: 5,
        column: 4
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item>
          <Card title={item.title}>
            <Text style={{fontSize:'1.2rem'}}>{item.content} EUR</Text>
          </Card>
        </List.Item>
      )}
    />
  )
}
