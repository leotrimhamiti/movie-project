import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext.jsx";
import "../css/Navbar.css"
import profilepic from "../assets/profile-pic.png";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to='/'>LHMoviesApp</Link>
            </div>
            <div className="navbar-links">
                <Link to='/' className="nav-link">Home</Link>
                <Link to='/favourites' className="nav-link">Favourites</Link>
                
                {user ? (
                    <>  <div className="profile-picture-logout">
                        <span className="user-greet"><img className="profile-pic" src={profilepic}></img>{user.username}</span>
                        <button onClick={handleLogout} className="logout-btn">Log Out</button></div>
                    
                        
                    </>
                ) : (
                    <>
                        <Link to='/signup' className="nav-link">Sign up</Link>
                        <Link to='/login' className="nav-link">Log in</Link>
                    </>
                )}
            </div>
        </nav>
    )
}
export default Navbar;