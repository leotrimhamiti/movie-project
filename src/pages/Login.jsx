import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import '../css/Login.css';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState(""); 
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = (e) => {
    e.preventDefault();

    const result = login(username, password);

    if (result.success) {
        navigate('/');
    } else {
        alert(result.message);
    }
};

    return (
        <div className="log-in-content">
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <p>Username:</p>
                <input 
                    type="text" 
                    className="username" 
                    placeholder='Type your username' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <p>Password:</p>
                <input 
                    type="password" 
                    className="password" 
                    placeholder='Type your password' 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="sign-up-p">No account? <Link to='/signup'>Sign up</Link></p>
                <button type="submit" className="log-in">LOG IN</button>
            </form>
            
        </div>
    );
}

export default Login;