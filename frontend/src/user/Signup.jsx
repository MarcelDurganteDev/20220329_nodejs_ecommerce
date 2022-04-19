import React, { useState } from 'react';
import Layout from '../core/Layout';
import { API } from '../config'

const Signup = () => {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        success: false
    } );
    
    const { firstName, lastName, email, password } = values;

    const signup = ( user ) => {
        console.log(user);
        //send data to backend
        fetch( `${API}/signup`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify( user )
        } )
        .then( response => {
            return response.json()
        } )
        .catch( err => {
            console.log(err)
        })
    }
    
    const handleChange = e => {
        const { name, value } = e.target;
        setValues( { ...values, error: false, [name]: value } );
        
    };

    const handleSubmit = e => {
        e.preventDefault();
        // javascript object will send to signup function as 'user' object
        signup({firstName, lastName, email, password});
    };

    const signUpForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">First Name</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="firstName"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Last Name</label>
                <input
                    onChange={handleChange}
                    type="text"
                    name="lastName"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    className="form-control"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    className="form-control"
                />
            </div>
            <button onClick={handleSubmit} type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );

    return (
        
        <Layout
            title="Sign Up Page"
            description="Sign Up Page"
            className="container col-md-8 offset-md-2"
        >
            {signUpForm()}
            {JSON.stringify(values)}
        </Layout>
    );
};
export default Signup;
