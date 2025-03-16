import React, { useState } from 'react';
import { registerUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccessful, setIsSuccessful] = useState(false);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await registerUser(name, email, password);
            setMessage('Registration successful. You can now log in');
            setIsSuccessful(true);
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            setMessage(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid vh-100 vw-100 p-0 d-flex align-items-center justify-content-center bg-light">
            <div className="row w-100 h-100">
                <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
                    <h3 className="mb-4 w-75 mx-auto">Sign Up</h3>
                    {message && <div className={`alert w-75 mx-auto ${isSuccessful ? 'alert-success' : 'alert-danger'}`}>{message}</div>}
                    <form onSubmit={handleRegister} className='w-75 mx-auto'>
                        <div className='mb-3 w-100 input-group'>
                            <input type="text" className="form-control" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required/>
                        </div>
                        <div className='mb-3 w-100 input-group'>
                            <input type="email" className='form-control border-end-0' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <span className="input-group-text bg-white border-start-0"><i className="bi bi-envelope-fill"></i></span>
                        </div>
                        <div className='mb-3 w-100 input-group'>
                            <input type={showPassword ? "text" : "password"} className='form-control border-end-0' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <span className="input-group-text bg-white border-start-0" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <i className="bi bi-eye"></i>  : <i className="bi bi-eye-slash"></i>}
                            </span>
                        </div>
                        <div className="mb-3 form-check text-start">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                        </div>
                        <button type="submit" className='btn btn-primary w-100' disabled={loading}>
                            Sign up
                        </button>
                        {loading ? <p>Registering new user...</p> : ''}
                    </form>
                </div>
                <div className="col-md-6 d-none d-md-block bg-primary text-white d-flex align-items-center justify-content-center" style={{ backgroundImage: "url('/assets/LA-image.jpg')", backgroundSize: "cover" }}>
                </div>
            </div>
        </div>
    )
}

export default Register;
