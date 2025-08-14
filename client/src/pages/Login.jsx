import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { useAuth } from '../store/Auth';


const Login = () => {
    const navigate = useNavigate();
    const {storeTokenInLS , API} = useAuth();

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        // const name = e.target.name;
        // const value = e.target.value;

        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };
    console.log(user)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            const res_data = await response.json();
           console.log("res from server",res_data.message)
            if (response.ok) {
                storeTokenInLS(res_data.token)
                setUser({
                    email: "",
                    password: ""
                });
                toast.success("Login successful")
                navigate("/")
            }else{
                toast.error(res_data.extraDetails ? res_data.message : res_data.extraDetails)
            }
        } catch (error) {
            console.log("login", error)
        }
    }


    return (
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png"
                                alt="lets field the login form"
                            />
                        </div>
                        <div className="registration-form">
                            <h1 className='main-heading mb-3'>Login from</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="email">email</label>
                                    <input
                                        type="email"
                                        name='email'
                                        placeholder='enter your email'
                                        id='email'
                                        required
                                        autoComplete='off'
                                        onChange={handleInput}
                                        value={user.email}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password">password</label>
                                    <input
                                        type="text"
                                        name='password'
                                        placeholder='enter your password'
                                        id='password'
                                        required
                                        autoComplete='off'
                                        onChange={handleInput}
                                        value={user.password}
                                    />
                                </div>
                                <br />
                                <button type='submit' className='btn btn-submit'>Register Now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default Login