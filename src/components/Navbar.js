import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

    return (
        <nav className="navbar">
            <div className="container-fluid ">
                <Link className="navbar-brand" to="/">Task Tracker</Link>
            </div>
        </nav>
    )
}

export default Navbar
