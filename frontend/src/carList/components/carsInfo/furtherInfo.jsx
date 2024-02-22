import { Typography } from 'antd';
const { Title } = Typography;

export default function FurtherInfo ({ seats, transmission }) {
    return (
        <span>
            <Title level={4}>
                <i className="material-icons">&#xe7fd;</i> {seats}
            </Title>
            <Title level={4}>
                <i className="fa fa-car"></i> {transmission}
            </Title>
        </span>
    )
}