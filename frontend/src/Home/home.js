import '../components.css';
import Nav from '../nav';
import CurrentTasks from './CurrentTasks';
import NewTask from './NewTask';
import { useNavigate } from "react-router-dom";
import { checkLogin } from '../Utils/auth';
import { useState } from 'react';

function Home() {
    const navigate = useNavigate();
    const [refreshKey, setRefreshKey] = useState(0);

    const checkLog = async (e) => {
        const result = await checkLogin();
        if (result.isLoggedIn === false) navigate('/login');
    }
    checkLog();

    const handleTaskAdded = () => {
        setRefreshKey(prevKey => prevKey + 1);
    }

    return <div className="home-back">
        <Nav />
        <div className='home-flexible'>
            <CurrentTasks refreshKey={refreshKey} />
            <NewTask onTaskAdded={handleTaskAdded} />
        </div>
    </div>
}


export default Home; 