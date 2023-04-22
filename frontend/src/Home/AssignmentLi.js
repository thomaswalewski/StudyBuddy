import React from "react";
import './home.css';
import '../components.css';

function Assignmentli(props) {
    return (
        <div className="list-item">
            <div className="list-flexible">
                <div className="flexible-title">
                    <div className="list-text">
                        <h2 className='number'>
                            {props.index + 1}.
                        </h2>
                    </div>
                    <div className="list-text">
                        <h2 className='list-h2'>
                            {props.name}
                        </h2>
                    </div>
                </div>
                <div className="list-feeling">
                    <h2 className='list-h2'>
                        Feeling: {props.feeling}
                    </h2>
                </div>
                <div className="list-feeling">
                    <h2 className='list-h2'>
                        Progress:{" "}
                        {Math.round((props.minutes_spent / (props.hours_needed * 60)) * 100)}%
                    </h2>
                </div>
                <div className="list-text">
                    <h2 className='list-h2'>
                        Due Date: {props.due_date.substring(5, 10)}
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Assignmentli;
