import { Link, useNavigate } from 'react-router-dom'
import '../css/Signup.css'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx';

function SignUp() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setErrors] = useState({});

    const {register} = useAuth();
    const navigate = useNavigate();

    const validate = () => {

        let newErrors = {};

        if(!username) {
            newErrors.username = "Username is required!";
        } else if (username.length < 8) {
            newErrors.username = "More than 8 characters are required!"
        } 

        if(!email) {
            newErrors.email = "Email shouldn't be blank"
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is not valid";
        }

        if(!password) {
            newErrors.password = "Password is required"
        } else if(password.length < 8) {
            newErrors.password = "Password is not long enough"
        } else if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            newErrors.password = "Password must contain a letter, number, or upper case"
        }

        if(!confirmPassword) {
            newErrors.confirmPassword = "Password is required";
        } else if(password !== confirmPassword) {
            newErrors.confirmPassword = "Passwords does not match!"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0;
    };

   const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
        const result = register(username, password);

        if (result.success) {
            alert("Account created successfully!");
            navigate("/login");
        } else {
            alert(result.message);}
        }
    };
    
    return (
        <>
        <div className="sign-up-content">
            <h2>Sign up</h2>
               <form onSubmit={handleSubmit}>
               <p>Username:</p>
               <input type="text" className="username" placeholder='Type your username' value={username} 
               onChange={(e) => setUsername(e.target.value)}></input>
               {error.username && <p style={{ color: "red" }}>{error.username}</p>}
            <p>Email:</p>
              <input type="text" className="email" placeholder='Type your email' value={email}
               onChange={(e) => setEmail(e.target.value)}></input>
               {error.email && <p style={{color: "red"}}>{error.email}</p>}
            <p>Password:</p>
               <input type="password" className="password" placeholder='Type your password' value={password}
               onChange={(e) => setPassword(e.target.value)}></input>
               {error.password && <p style={{color: "red"}}>{error.password}</p>}
            <p>Confirm Password:</p>
               <input type="password" className="confirm-password" placeholder='Re-type your password' value={confirmPassword}
               onChange={(e) => setConfirmPassword(e.target.value)}></input>
               {error.confirmPassword && (<p style={{ color: "red" }}>{error.confirmPassword}</p>)}
               <p className="log-in-p">Already have an account? <Link to='/login'>Log in</Link></p>
            <button type='submit' className="sign-up">SIGN UP</button>
            </form>
        </div>
        </>
    );
} export default SignUp