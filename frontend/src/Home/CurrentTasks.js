import './home.css';
import '../components.css';
import getAssignments from '../Utils/GetAssignments';
import { useState, useEffect } from 'react';
import { checkLogin } from '../Utils/auth';
import Assignmentli from './AssignmentLi';

function CurrentTasks({ refreshKey }) {

    const [assignments, setAssignments] = useState();

    async function getTasks() {
        const result = await checkLogin();
        const id = result.userId;
        if (id) {
            console.log('userId:', id);
            const data = await getAssignments(id);
            console.log('Fetched assignments:', data);
            setAssignments(data);
        }
    }

    useEffect(() => {
        getTasks();
    }, [refreshKey]);

    return <div className="current-tasks component-square">
        <h1> Current Assignments:</h1>
        <div className='assignment-list'>
            {assignments?.map((item, index) => (
                <div key={item.id}><Assignmentli {...item} index={index} /></div>
            )) || "no assignments"}
        </div>
    </div>

}

export default CurrentTasks;
