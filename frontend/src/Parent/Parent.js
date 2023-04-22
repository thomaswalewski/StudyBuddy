import './parent.css'
import '../components.css';
import Nav from '../nav';
import { useNavigate } from "react-router-dom";
import { checkLogin } from '../Utils/auth';
import { useState, useEffect } from 'react';
import getAssignments from '../Utils/GetAssignments';
import getCompletedAssignments from '../Utils/getCompletedAssignments';
import getName from '../Utils/getName';
import ParentAssignmentli from './parentAssignmentLi';

function ParentMode() {

    const [assignments, setAssignments] = useState();
    const [completedAssignments, setCompletedAssignments] = useState();
    const [studentName, setStudentName] = useState("");

    const navigate = useNavigate();
    useEffect(() => {
        const checkLog = async () => {
            const result = await checkLogin();
            if (result.isLoggedIn === false) navigate('/login');
        }

        checkLog();
    }, [navigate]);

    useEffect(() => {
        async function getInfo() {
            const result = await checkLogin();
            const id = result.child_id;
            if (id) {
                console.log('userId:', id);
                const nameData = await getName(id);
                const Assignmentdata = await getAssignments(id);
                const completedAssignmentData = await getCompletedAssignments(id);
                console.log('Fetched name:', nameData[0].name);
                setStudentName(nameData[0].name);
                setAssignments(Assignmentdata);
                setCompletedAssignments(completedAssignmentData);
            }
        }
        getInfo();
    }, []);







    return (
        <div className="home-back">
            <Nav></Nav>
            <div className='parent-flexible'>
                <div className='vert-flex'>
                    <div className='monitor-square'>
                        <h2 className='parent-title'>
                            Student Report for:
                        </h2>
                        <h2 className='parent-description'>
                            {studentName}
                        </h2>

                    </div>
                    <div className='monitor-square'>
                        <h2 className='parent-title'>
                            Current Buddy Health:
                        </h2>
                        <h2 className='buddy-health'>
                            76/100
                        </h2>

                    </div>
                    <div className='monitor-square'>
                        <h2 className='parent-title'>
                            Task Completion Rate:
                        </h2>
                        <div className='flexible-desc'>
                            <h2 className='parent-description'>
                                82%
                            </h2>
                            <h2>
                                (+4% WoW)
                            </h2>
                        </div>


                    </div>
                </div>
                <div className='vert-flex'>
                    <div className='task-square'>
                        <h2 className='parent-title'>
                            Recently Completed Tasks:
                        </h2>
                        <ol className='assignment-list'>
                            {completedAssignments?.map((item, index) => (
                                <div key={item.id}><ParentAssignmentli {...item} index={index} /></div>
                            )) || "no assignments"}
                        </ol>

                    </div>
                    <div className='monitor-square'>
                        <h2 className='parent-title'>
                            Pro-active Completion Rate:
                        </h2>
                        <div className='flexible-desc'>
                            <h2 className='parent-description'>
                                80%
                            </h2>
                            <h2>
                                (+1% WoW)
                            </h2>
                        </div>

                    </div>

                </div>
                <div className='vert-flex'>
                    <div className='task-square'>
                        <h2 className='parent-title'>
                            Upcoming Tasks:
                        </h2>
                        <ol className='assignment-list'>
                            {assignments?.map((item, index) => (
                                <div key={item.id}><ParentAssignmentli {...item} index={index} /></div>
                            )) || "no assignments"}
                        </ol>

                    </div>
                    <div className='monitor-square'>
                        <h2 className='parent-title'>
                            Daily Usage Rate:
                        </h2>
                        <div className='flexible-desc'>
                            <h2 className='parent-description'>
                                85%
                            </h2>
                            <h2>
                                (-15% WoW)
                            </h2>
                        </div>

                    </div>

                </div>

            </div>
        </div>)
}

export default ParentMode