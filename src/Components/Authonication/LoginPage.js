import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { action } from '../../redux';
import { Link, useNavigate } from 'react-router-dom';
import Context from '../../Context State/ContextState';


const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const loginToken = useSelector((state) => state.authonication);
    const dispatch = useDispatch();
    const context = useContext(Context);
    const { auth, setauth } = context;
    const nagivate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login Data:', formData);

        try {
            await dispatch(action.loginAction(formData.email, formData.password));
            if (loginToken) {
                localStorage.setItem('AuthToken', loginToken);
                setauth(loginToken);
                window.location.reload();
            } else {
                console.log('Login Failed....');
            }
        } catch (error) {
            console.error('Login Error:', error.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
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
                <Link to='/sign'>Do Not Have A Account</Link>
                <div>
                    <button type="submit" className="btn btn-primary mt-4">Login</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
