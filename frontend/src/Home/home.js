import '../components.css';
import Nav from '../nav';
import CurrentTasks from './CurrentTasks';
import NewTask from './NewTask';

function Home() {
    return <div className="home-back">
        <Nav />
        <div className='home-flexible'>
            <CurrentTasks />
            <NewTask />
        </div>
    </div>
}

export default Home; 