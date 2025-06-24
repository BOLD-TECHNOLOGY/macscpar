import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../../../Context/AppContext';
import { ChevronDown, LogOut, User } from 'lucide-react';
import '../../../App.css';

export default function Layout() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    async function handleLogout(e) {
        e.preventDefault();
        
        const res = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        const data = await res.json();
        console.log(data);
        
        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem("token");
            navigate("/");
        }
        
        setIsDropdownOpen(false);
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <header>
                <nav className="nav-bar">
                    <Link to="/" className="nav-link logo">MACSCPAR</Link>
                    
                    {user ? (
                        <div className="auth-tabs" ref={dropdownRef}>

                            <button
                                onClick={toggleDropdown}
                                className="flex items-center space-x-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors duration-200"
                            >
                                <span className="text-sm font-medium">{user.name}</span>
                                <ChevronDown 
                                    className={`chevrondown w-4 h-4 transition-transform duration-200 ${
                                        isDropdownOpen ? 'rotate-180' : ''
                                    }`} 
                                />
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="auth-dropdown">
                                    <div className="py-1">
                                        
                                        <Link
                                            to="/profile"
                                            onClick={() => setIsDropdownOpen(false)}
                                            className="auth-link flex items-center space-x-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors duration-200"
                                        >
                                            <User className="w-4 h-4 mr-3" />
                                            Profile
                                        </Link>
                                        
                                        <button
                                            onClick={handleLogout}
                                            className="auth-link flex items-center space-x-2 px-3 py-2 text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors duration-200"
                                        >
                                            <LogOut className="w-4 h-4 mr-3" />
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="auth-links desktop-nav">
                                <Link to="/login" className="nav-links">Login</Link>
                                <Link to="/register" className="nav-links reg">Register</Link>
                            </div>
                            
                            <button className="mobile-menu-btn" onClick={toggleMenu}>
                                <span className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </button>
                            
                            <div className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
                                <Link to="/login" className="nav-links" onClick={() => setIsMenuOpen(false)}>Login</Link>
                                <Link to="/register" className="nav-links reg" onClick={() => setIsMenuOpen(false)}>Register</Link>
                            </div>
                        </div>
                    )}
                </nav>
            </header>
            
            <main>
                <Outlet />
            </main>
        </>
    );
}