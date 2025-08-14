import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import { useAuth } from '../store/Auth'

const Navbar = () => {
    const { isLoggedIn } = useAuth()
    return (
        <>
            <header>
                <div className="container">
                    <div className="logo-brand">
                        <a href="/">MernStackProject</a>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/service">Services</NavLink></li>
                            <li><NavLink to="/Contact">Contact</NavLink></li>
                            {isLoggedIn ? <li><NavLink to="/logout">Logout</NavLink></li>
                                :
                                <>
                                    <li><NavLink to="/register">Register</NavLink></li>
                                    <li><NavLink to="/login">Login</NavLink></li>
                                    
                                </>
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}

export default Navbar