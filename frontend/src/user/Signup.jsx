import React, { useState } from 'react';
import Layout from '../core/Layout';

const Signup = () => {
    const [inputValues, setInputValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    /**
     * @desc: A higher-order function is one which either a) takes a function as an argument or b) returns a function.
     */

    const handleChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, error: false, [name]: value });
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
            <button className="btn btn-primary">Submit</button>
        </form>
    );

    return (
        <Layout
            title="Sign Up Page"
            description="Sign Up Page"
            className="container col-md-8 offset-md-2"
        >
            {signUpForm()}
            {JSON.stringify(inputValues)}
        </Layout>
    );
};
export default Signup;
