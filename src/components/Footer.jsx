import { Link } from 'react-router-dom';
import { dateFooter } from '../services/date.js';
import '../css/Footer.css';
import { useAuth } from '../contexts/AuthContext.jsx';

function Footer() {

    const {user} = useAuth();
  
   return (
    <div className="footer">
        <div className="footer-links">
            {/* Wrap these in a fragment <> </> */}
            {!user && (
                <>
                    <Link to='/' className="footer-link">Home</Link>
                    <Link to='/favourites' className="footer-link">Favourites</Link>
                    <Link to='/signup' className="footer-link">Sign up</Link>
                    <Link to='/login' className="footer-link">Log in</Link>
                </>
            )}
            
            {/* Example: What to show if the user IS logged in */}
            {user && (
                <> <div className='footer-logged-in'>
                    <Link to='/' className="footer-link">Home</Link>
                    <Link to='/favourites' className="footer-link">My Favourites</Link>
                    <p className="footer-link">Welcome, {user.username}!</p>
                  </div>   
                </>
            )}
        </div>
        <p>&copy; {dateFooter} LHMoviesApp - All Rights Reserved</p>
    </div>
);
} export default Footer;