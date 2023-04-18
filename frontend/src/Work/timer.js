import React, { useState, useEffect } from 'react';
import markComplete from './markAsComplete';
import getAssignments from '../Utils/GetAssignments';
import { checkLogin } from '../Utils/auth';

const Timer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [timeInput, setTimeInput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [assignmentID, setAssignmentID] = useState(0);
    const [assignments, setAssignments] = useState([]);

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
    }, []);

    useEffect(() => {
        console.log('Assignments:', assignments);
    }, [assignments]);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (seconds === 0 && minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    clearInterval(interval);
                    setIsRunning(false);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds]);

    const startTimer = () => {
        const inputMinutes = parseInt(timeInput, 10);
        if (isNaN(inputMinutes) || inputMinutes <= 0) {
            return;
        }
        setMinutes(inputMinutes);
        setSeconds(0);
        setIsRunning(true);
    };

    const pauseTimer = () => {
        setIsRunning(false);
    };

    const stopTimer = () => {
        setIsRunning(false);
        setSeconds(0);
        setMinutes(0);
    };

    const resumeTimer = () => {
        setIsRunning(true);
    };

    const handleChange = (e) => {
        setTimeInput(e.target.value);
    };

    const handleAssignmentIDChange = (event) => {
        console.log('Assignment ID: ', event.target.value);
        console.log('Event:', event);
        setAssignmentID(event.target.value);
    };

    async function completeTask() {
        setIsRunning(false);
        setMinutes(0);
        setSeconds(0);
        await markComplete(assignmentID);
        getTasks();
    }

    return (
        <div>
            <div className='work-square'>
                <h2 className='work-title'>Time until next break</h2>
                <h2 className='timer-text'>
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </h2>
                <div className='input-container'>
                    <div className='input-group'>
                        <label htmlFor="minutes" className='minutes-title'>Minutes: </label>
                        <input
                            className='minutes-input'
                            id="minutes"
                            type="number"
                            min="1"
                            value={timeInput}
                            onChange={handleChange}
                            disabled={isRunning}
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor="assignment" className='minutes-title'>Assignment:</label>
                        <select id="assignment" name="assignment" className='minutes-input' value={assignmentID}
                            onChange={handleAssignmentIDChange}>
                            {assignments?.map((assignment) => (
                                <option key={assignment.id} value={assignment.id}>
                                    {assignment.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <button className='work-button' onClick={startTimer} disabled={isRunning}>
                    Start
                </button>
                <button className='work-button' onClick={resumeTimer} disabled={isRunning || (minutes === 0 && seconds === 0)}>
                    Resume
                </button>
            </div>
            <div className='work-square'>
                <h2 className='work-title'>
                    Need a break?
                </h2>
                <button onClick={stopTimer} disabled={minutes === 0 && seconds === 0} className='work-button'>End Timer Early</button>
                <button onClick={pauseTimer} disabled={!isRunning} className='work-button'>Pause Timer</button>
            </div>
            <div className='work-square'>
                <h2 className='work-title'>
                    Finished?
                </h2>
                <button type="submit" className='work-button' onClick={completeTask}>Mark This Task as Complete</button>
            </div>
        </div>
    );
};

export default Timer;