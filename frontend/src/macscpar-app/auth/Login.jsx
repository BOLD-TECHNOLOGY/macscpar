import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../Context/AppContext';
import '../../App.css';

export default function Login() {
    const { setToken } = useContext(AppContext);
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
    email: "",
    password: "",
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const [errors, setErrors] = useState({});

    async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/login", {
        method: "post",
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.errors) {
        setErrors(data.errors);
    } else {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        navigate(data.dashboard_route);
    }
    }

    return (
        <div className="register-container">
            <div className="bg-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
                <div className="floating-particles">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className={`particle particle-${i + 1}`}></div>
                    ))}
                </div>
            </div>

            <div className="register-content">
                <div className="register-card">
                    <div className="card-header">
                        <div className="welcome-section">
                            <div className="icon-wrapper">
                                <div className="user-icon">
                                    <div className="icon-circle"></div>
                                    <div className="icon-body"></div>
                                </div>
                            </div>
                            <h1 className="register-title">Login to Continue</h1>
                            <p className="register-subtitle">Login to your account and start your journey with us</p>
                        </div>
                    </div>

                    <form className="register-form" onSubmit={handleLogin}>
                        
                        <div className="form-group">
                            <div className={`input-wrapper ${formData.email ? 'filled' : ''}`}>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.email && <p className="error">{errors.email[0]}</p>}
                                <label>Email Address</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className={`input-wrapper password-wrapper ${formData.password ? 'filled' : ''}`}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                {errors.password && <p className="error">{errors.password[0]}</p>}
                                <label>Password</label>
                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '👁️' : '👁️‍🗨️'}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="register-btn">
                            <span className="btn-text">Login</span>
                            <div className="btn-shine"></div>
                        </button>

                        <div className="form-footer">
                            <p>Don`t have an account? <a href="/register" className="login-link">Create One</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}