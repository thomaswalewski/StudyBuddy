import './home.css';
import '../components.css';
import getAssignments from '../Utils/GetAssignments';
import { useState, useEffect } from 'react';
import { checkLogin } from '../Utils/auth';

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
        <ol className='assignment-list'>
            {assignments?.map(item => (
                <div key={item.id}>{assignmentli(item)}</div>
            )) || "no assignments"}
        </ol>
    </div>

}

export default CurrentTasks;

function assignmentli(props) {

    return <li className='list-item'>
        <div className='flexible'>
            <h2 className='list-text'>
                {props.name}
            </h2>
            <div className='flexible'>
                <h2 className='list-feeling'>
                    Feeling: {props.feeling}
                </h2>
                <h2 className='list-feeling'>
                    Percent Completed: {Math.round((props.minutes_spent / (props.hours_needed * 60)) * 100)} %
                </h2>
                <h2 className='list-text'>
                    Due Date: {props.due_date.substring(5, 10)}
                </h2>
            </div>
        </div>
    </li >
}
