import { Link } from 'react-router-dom'

export default function Buttons({ site, title }) {
    return (
        <Link
            to={site}
            className="btn btn-info btn-sm me-2 m-2 fs-5"
        >
            {title}
        </Link>
    )
}