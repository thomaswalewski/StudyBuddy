import './parent.css'
import '../components.css';
import Nav from '../nav';

function ParentMode() {
    return (
        <div className="home-back">
            <Nav></Nav>
            <div className='parent-flexible'>
                <div className='vert-flex'>
                    <div className='monitor-square'>
                        <h2>
                            Student Report for:
                        </h2>
                        <h2>
                            Thomas
                        </h2>

                    </div>
                    <div className='monitor-square'>
                        <h2>
                            Current Buddy Health:
                        </h2>
                        <h2>
                            76/100
                        </h2>

                    </div>
                    <div className='monitor-square'>
                        <h2>
                            Task Completion Rate:
                        </h2>
                        <h2>
                            82% (+4% WoW)
                        </h2>

                    </div>
                </div>
                <div className='vert-flex'>
                    <div className='monitor-square'>
                        <h2>
                            Recently Completed Tasks:
                        </h2>
                        <h2>

                        </h2>

                    </div>
                    <div className='monitor-square'>
                        <h2>
                            Pro-active Completion Rate
                        </h2>
                        <h2>
                            80% (+1% WoW)
                        </h2>

                    </div>

                </div>
                <div className='vert-flex'>
                    <div className='monitor-square'>
                        <h2>
                            Upcoming Tasks:
                        </h2>
                        <h2>

                        </h2>

                    </div>
                    <div className='monitor-square'>
                        <h2>
                            Daily Usage Rate:
                        </h2>
                        <h2>
                            85% (-15% WoW)
                        </h2>

                    </div>

                </div>

            </div>
        </div>)
}

export default ParentMode