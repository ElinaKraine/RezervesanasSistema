import { Typography } from 'antd';
const { Title } = Typography;

export default function Name({ brand, model }) {
    return (
        <span>
            <Title level={2}>{brand} {model}</Title>
        </span>
    )
}