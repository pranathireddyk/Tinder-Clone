import { useState } from "react";
import Nav from "../components/Nav";
import {useCookie} from 'react-cookie'
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookie(null)
    const [showModel, setShowModel] = useState(false)
    const [isSignUp, setIsSignUp] = useState(true)
    const authToken = false
    let navigate = useNavigate()

    const [formData, setFormData] =  useState({
        user_id: cookies.userId,
        first_name: '',
        last_name: '',
        dob_day: '',
        dob_month: '',
        dob_year: '',
        gender: 'woman',
        gender_in: 'man',
        url: '',
        about: '',
        matches: []
    })

    const handleSubmit = async(e) => {
        console.log('submitted')
        e.preventDefault()
        try {
            const response = await axios.put('https://localhost:8000/user', {formData})
            const success = response.statusCode === 200
            if (success) navigate('/dashboard')
        } catch(err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        console.log('e', e)
        const value = e.target.value
        const name = e.target.name
        console.log('value' + value, 'name' + name)

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    console.log(formData)

    return (
        <>
            <Nav minimal={false} authToken={authToken} setShowModel={setShowModel} showModel={showModel} setIsSignUp={setIsSignUp} />
            <div className="onboarding">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            placeholder="First Name"
                            required={true}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            placeholder="Last Name"
                            required={true}
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                        <label>Birthday</label>
                        <div className="mul-container">
                            <input
                                type="number"
                                id="dob_day"
                                name="dob_day"
                                placeholder="Day"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                id="dob_month"
                                name="dob_month"
                                placeholder="Month"
                                required={true}
                                value={formData.dob_month}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                id="dob_year"
                                name="dob_year"
                                placeholder="Year"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            />
                        </div>
                        <label>Gender</label>
                        <div className="mul-container">
                            <label htmlFor="woman">Woman</label>
                            <input
                                type="radio"
                                id="woman"
                                name="gender"
                                required={true}
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender === 'woman'}
                            />
                            <label htmlFor="man">Man</label>
                            <input
                                type="radio"
                                id="man"
                                name="gender"
                                required={true}
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender === 'man'}
                            />
                            <label htmlFor="other">Other</label>
                            <input
                                type="radio"
                                id="other"
                                name="gender"
                                required={true}
                                value="other"
                                onChange={handleChange}
                                checked={formData.gender === 'other'}
                            />
                        </div>
                        <label>Gender Interest</label>
                        <div className="mul-container">
                            <label htmlFor="woman-in">Woman</label>
                            <input
                                type="radio"
                                id="woman-in"
                                name="gender-in"
                                required={true}
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender_in === 'woman'}
                            />
                            <label htmlFor="man-in">Man</label>
                            <input
                                type="radio"
                                id="man-in"
                                name="gender-in"
                                required={true}
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender_in === 'man'}
                            />
                            <label htmlFor="everyone-in">Everyone</label>
                            <input
                                type="radio"
                                id="everyone-in"
                                name="gender-in"
                                required={true}
                                value="everyone"
                                onChange={handleChange}
                                checked={formData.gender_in === 'everyone'}
                            />
                        </div>

                        <label htmlFor="about">About me</label>
                        <input
                            id="about"
                            type="text"
                            name="about"
                            required={true}
                            placeholder="I like ..."
                            value={formData.about}
                            onChange={handleChange}
                        />
                        <input type="submit" />
                    </section>

                    <section>
                        <label htmlFor="about">Profile</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                        />
                        <div className="photo-container">
                            {formData.url && <img src={formData.url} alt="profile pic preview"/>}
                        </div>
                    </section>
                </form>
            </div>
        </>
    )
}

export default OnBoarding;