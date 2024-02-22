import { Image } from 'antd';

export default function Img({ image }) {
    return (
        <Image
            width={350}
            src={image}
        />
    )
}