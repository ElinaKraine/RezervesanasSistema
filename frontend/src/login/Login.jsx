import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import successMsg from '../components/message/successMsg'

export default function Login({ setCurrentUser }) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [infoMessage, setInfoMessage] = useState('');

    const navigate = useNavigate()

    function handleSubmit(event) {
        event.preventDefault();
        axios
            .post('http://localhost:3030/login', { name, password })
            .then(res => {
                if (res.data === "Login Successfully") {
                    successMsg({msg:'Login Successfully!'})
                    setCurrentUser("admin")
                    localStorage.setItem('currentUser', 'admin')
                    navigate('/')
                } else {
                    setInfoMessage('Login unsuccessful. Please check your username and password.')
                }
            })
            .catch((err) => {
                console.log(err)
                setInfoMessage('An error occurred during login. Please try again.')
            })
    }

    return (
        <div className="container">
            <div>
                <div className="col-md-6">
                    <div className="card">
                        <form onSubmit={handleSubmit} className="box">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                onChange={(e) => setName(e.target.value)}
                                required
                                autoComplete="off"
                            />
                            <input
                                type="password"
                                name="ps"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="off"
                            />
                            <input type="submit" name="" value="Login" />
                            <p className='info'>{infoMessage}</p>
                            <div className="col-md-12">
                                <ul className="social-network social-circle">
                                    <li><a className="icoFacebook" title="Facebook" ><i className="fa fab fa-facebook-f"></i></a></li> <li><a className="icoTwitter" title="Twitter"><i className="fa fab fa-twitter"></i></a></li>
                                    <li><a className="icoGoogle" title="Google +"><i className="fa fab fa-google-plus"></i></a></li>
                                </ul>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}