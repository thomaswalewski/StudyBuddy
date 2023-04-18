import '../components.css';
import './home.css';
import { useState, } from 'react';
import addAssignment from '../Utils/AddAssignment';
import { checkLogin } from '../Utils/auth';

function NewTask({ onTaskAdded }) {

    const [assignmentName, setAssignmentName] = useState("Math Homework");
    const [hours, setHours] = useState("4");
    const [breaks, setBreaks] = useState("8");
    const [enthusiasm, setEnthusiasm] = useState("😀");
    const [dueDate, setDueDate] = useState("2023-04-21");

    let id;
    const get_id = async (e) => {
        const result = await checkLogin();
        id = result.userId;
    }
    get_id();


    async function handleSubmit(e) {
        e.preventDefault();
        console.log('Logging id:', id);
        await addAssignment(assignmentName, hours, dueDate, enthusiasm, breaks, id);
        onTaskAdded();
    }

    const emojiList = ["😀", "😁", "😱", "😃", "😄", "😅", "😆", "😭"];

    return <div className="component-square">
        <form className='New-Task-Form' onSubmit={handleSubmit}>
            <h2 className='form-title'> Add an Assignment
            </h2>
            <label>Assignment Name:</label><br />
            <input type="text" onChange={(e) => { setAssignmentName(e.target.value) }}
                value={assignmentName} /><br />
            <label>How many Hours will it Take?</label><br />
            <input type="number" onChange={(e) => { setHours(e.target.value) }}
                value={hours} /><br />
            <label>Number of Breaks to take while working?</label><br />
            <input type="number" onChange={(e) => { setBreaks(e.target.value) }}
                value={breaks} /><br />
            <label>How enthusiastic do you feel?</label><br />
            <select onChange={(e) => { setEnthusiasm(e.target.value) }} value={enthusiasm} >
                {emojiList.map((emoji, index) => (
                    <option key={index} value={emoji}>{emoji}</option>
                ))}
            </select><br />
            <label>When is it due?</label><br />
            <input type="date" onChange={(e) => { setDueDate(e.target.value) }}
                value={dueDate} /><br />
            <button type="submit" className='button1'>Add Assignment</button>
        </form>
    </div>

}

export default NewTask;
