import React, { useState } from 'react';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            navigate('/dashboard');
        } catch(err) {
            setError(err);
        }
    };

    return (
        <div className="container-fluid vh-100 vw-100 p-0 d-flex align-items-center justify-content-center">
            <div className="row w-100 h-100">
                <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
                    <h3 className="mb-4 w-75 mx-auto">Sign In to The App</h3>
                    {error && <div className='alert alert-danger'>{error}</div>}
                    <form onSubmit={handleLogin} className='w-75 mx-auto'>
                        <div className='mb-3 h-25 input-group'>
                            <input type="email" className='form-control border-end-0' placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} required/>
                            <span className="input-group-text bg-white border-start-0"><i className="bi bi-envelope-fill"></i></span>
                        </div>
                        <div className='mb-3 h-25 input-group'>
                            <input type={showPassword ? "text" : "password"} className='form-control border-end-0' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required/>
                            <span className="input-group-text bg-white border-start-0" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <i className="bi bi-eye"></i>  : <i className="bi bi-eye-slash"></i>}
                            </span>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="remember" />
                            <label className="form-check-label" htmlFor="remember">Remember me</label>
                        </div>
                        <button type="submit" className='btn btn-primary w-100'>Sign in</button>
                    </form>
                    <div className="mt-5 mx-auto">
                        <span>Don't have an account? <a href="/register">Sign up</a></span>
                    </div>
                </div>
                <div className="col-md-6 d-none d-md-block bg-primary text-white d-flex align-items-center justify-content-center" style={{ backgroundImage: "url('/assets/LA2-image.jpeg')", backgroundSize: "cover" }}>
                </div>
            </div>
        </div>
            
            

    )
}

export default Login;
