import { useState } from "react";
import Nav from "../components/Nav";
import {useCookies} from 'react-cookie'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const OnBoarding = () => {
    const [cookies, setCookie, removeCookie] = useCookies(null)
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
        e.preventDefault()
        try {
            const response = await axios.put('http://localhost:8000/user', {formData})
            const success = response.status === 200
            if (success) navigate('/dashboard')
        } catch(err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        const name = e.target.name

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    return (
        <>
            <Nav 
            minimal={true} 
            setShowModel={()=> {
            }} 
            showModel={false}
            />
            <div className="onboarding">
                <h2>CREATE ACCOUNT</h2>
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
                            <input
                                type="radio"
                                id="woman"
                                name="gender"
                                value="woman"
                                onChange={handleChange}
                                checked={formData.gender === 'woman'}
                            />
                            <label htmlFor="woman">Woman</label>
                            <input
                                type="radio"
                                id="man"
                                name="gender"
                                value="man"
                                onChange={handleChange}
                                checked={formData.gender === 'man'}
                            />
                            <label htmlFor="man">Man</label>
                            <input
                                type="radio"
                                id="other"
                                name="gender"
                                value="other"
                                onChange={handleChange}
                                checked={formData.gender === 'other'}
                            />
                            <label htmlFor="other">Other</label>
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