import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../../redux';
import Context from '../../Context State/ContextState';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const context = useContext(Context);
    const { setauth } = context;
    const SignToken = useSelector((state) => state.authonication);
    const dispatch = useDispatch();
    const nagivate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sign Up Data:', formData);
        dispatch(action.siginAction(formData.name, formData.email, formData.password));
        if (SignToken) {
            localStorage.setItem('AuthToken', SignToken);
            setauth(SignToken);
            nagivate('/')
        }
        else {
            console.log('Login Failed....');
        }
    };

    return (
        <div className="container mt-5">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <Link to='/login'>Have A Account</Link>
                <div>
                    <button type="submit" className="btn btn-primary mt-4">Sign Up</button>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
