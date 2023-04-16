import '../components.css';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login, checkLogin } from '../Utils/auth';


function Login() {

    const [email, setEmail] = useState("example@buddy.com");
    const [password, setPassword] = useState("12345");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("working");
        login(email, password);
        const result = await checkLogin();
        if (result.isLoggedIn === true) navigate('/home');
    }

    return (
        <div className='login-back'>
            <div className='login-sqaure'>
                <center>
                    <h1>Welcome to</h1>
                    <h1 className='title'> StudyBuddy</h1>
                </center>
                <form onSubmit={handleSubmit} className='Login-Form'>
                    <label>Email:</label><br />
                    <input type="text" onChange={(e) => { setEmail(e.target.value); }}
                        value={email} /><br />
                    <label>Password:</label><br />
                    <input type="password" onChange={(e) => { setPassword(e.target.value); }}
                        value={password} /><br />
                    <button type="submit" onSubmit={handleSubmit} className='button1'>Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login