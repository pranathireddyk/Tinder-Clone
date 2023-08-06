import { useState } from "react";
import axios from 'axios';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {useCookie} from 'react-cookie';

const AuthModel = ({setShowModel, setIsSignUp, isSignUp}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)
    const [cookies, setCookie, removeCookie] = useCookie(null)

    let navigate = useNavigate()

    console.log(email, password, confirmPassword);
    const handleClick = () => {
        setShowModel(false);
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            if (isSignUp && (password !== confirmPassword)){
                setError("Passwords need to match");
                return
            }
            console.log('posting', email, password)
            const response = await axios.post(`http://localhost:8000/${isSignUp ? 'sign' : 'login'}`, {email, password})

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201

            if(success && isSignUp) navigate('/onboarding')
            if(success && !isSignUp) navigate('/dashboard')

            window.location.reload()
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="auth-model">
            <div className="close-icon" onClick={handleClick}>✖</div>
            <h2>{isSignUp ? 'Create Account' : 'Log In'}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    required={true}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {isSignUp && <input
                type="password"
                id="password-check"
                name="password-check"
                placeholder="confirm password"
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />}
                <input className="secondary-button" type="submit"/>
                <p>{error}</p>
            </form>
            Get Tinder - Find a companion!
        </div>
    )
}

export default AuthModel;