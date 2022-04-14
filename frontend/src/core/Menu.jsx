import React from 'react';
import { Link, withRouter } from 'react-router-dom';

const isActive = ( location, path ) => {
    if ( location.pathname === path ) {
        return { color: '#ff9900' };
    } else {
        return { color: '#ffffff' };
    }
}
// these props 'history' are coming from react-router-dom
const Menu = ( {location}) => (
    <div>
        <ul className="nav nav-tabs bg-primary">
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(location, '/')}
                    to="/"
                >
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(location, '/signin')}
                    to="/signin"
                >
                    Sign In
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(location, '/signup')}
                    to="/signup"
                >
                    Sign Up
                </Link>
            </li>
        </ul>
    </div>
);

export default withRouter(Menu);
  