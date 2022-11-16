import React from 'react'
import {Link,Outlet} from 'react-router-dom'

function Navigation() {
    return(
        <div>
            <nav className="navbar navbar-expand-sm bg-light">
                <Link className='nav-brand' to="/">Book Reactions</Link>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/">Home</Link>
                    </li>
                    <li className='nav-item'>
                        <Link className='nav-link' to="/about">About</Link>
                    </li>
                </ul>
            </nav> 
            <div className='container'>
                <Outlet />
            </div>            
        </div>
        );
};

export default Navigation;