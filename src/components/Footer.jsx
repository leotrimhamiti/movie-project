import { Link } from 'react-router-dom';
import { dateFooter } from '../services/date.js';
import '../css/Footer.css';

function Footer() {
  
    return (
        <>
        <div className="footer">
            <div className="footer-links">
                <Link to='/home' className="footer-link">Home</Link>
                <Link to='/favourites' className="footer-link">Favourites</Link>
                <Link to='/signup' className="footer-link">Sign up</Link>
                <Link to='/login' className="footer-link">Log in</Link>
            </div>
             <p>&copy; {dateFooter} LHMoviesApp - All Rights Reserved</p>
        </div>
        </>
    )
} export default Footer;