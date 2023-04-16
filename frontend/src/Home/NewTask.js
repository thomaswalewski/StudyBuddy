import '../components.css';
import './home.css';

function NewTask() {
    return <div className="component-square">
        <form className='New-Task-Form'>
            <h2 className='form-title'> Create a New Task
            </h2>
            <label>Assignment Name:</label><br />
            <input type="text" onChange={(e) => { }}
                value={"Math Homework"} /><br />
            <label>How many Hours will it Take?</label><br />
            <input type="number" onChange={(e) => { }}
                value={5} /><br />
            <label>Number of Breaks to take while working?</label><br />
            <input type="number" onChange={(e) => { }}
                value={5} /><br />
            <label>How enthusiastic do you feel?</label><br />
            <input type="number" onChange={(e) => { }}
                value={5} /><br />
            <button type="submit" className='button1'>Add Task</button>
        </form>
    </div>

}

export default NewTask; 