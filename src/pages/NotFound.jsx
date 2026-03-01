import { Link } from "react-router-dom"
import Home from "./Home.jsx"
import '../css/NotFound.css'



function NotFound() {
    return <>
    <div className="not-found">
    <h1>404: ERROR NOT FOUND</h1>
    <p>We're sorry! The page you've been looking for is not found</p>
    <p>You can go back home if you like <b><Link to='/home'>Home</Link></b></p>
    </div>
   
    </>
} export default NotFound