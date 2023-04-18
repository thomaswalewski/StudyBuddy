import '../components.css';
import './work.css'
import Buddy from '../images/SBlaptop.svg'
import Nav from '../nav';
import { useNavigate } from "react-router-dom";
import { checkLogin } from '../Utils/auth';
import Timer from './timer';


function WorkMode() {

    const navigate = useNavigate();
    const checkLog = async (e) => {
        const result = await checkLogin();
        if (result.isLoggedIn === false) navigate('/login');
    }
    checkLog();

    return <div className="home-back">
        <Nav></Nav>
        <div className='work-flexible'>
            <div className='work-container'>
                <Timer />
            </div>
            <div className='work-container'>
                <div className='svg-square'>
                    <img src={Buddy} alt="Buddy on Latop"></img>
                </div>
            </div>
        </div>
    </div >
}

export default WorkMode