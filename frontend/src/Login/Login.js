import '../components.css';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../Utils/auth';
import { checkLogin } from '../Utils/auth';


function Login() {

    const [email, setEmail] = useState("jdoe@gmail.com");
    const [password, setPassword] = useState("LhP0yZ");
    const navigate = useNavigate();


    async function handleSubmit(e) {
        e.preventDefault();
        console.log("working");
        const result = await login(email, password);
        const parent_result = await checkLogin();
        const is_parent = parent_result.is_parent.data[0];
        console.log("result:")
        console.log(result);
        if (result.email === email && is_parent === 0) navigate('/');
        if (result.email === email && is_parent === 1) navigate('/parent');

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