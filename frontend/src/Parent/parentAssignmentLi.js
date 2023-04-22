import React from "react";
import './parent.css';
import '../components.css';

function ParentAssignmentli(props) {
    return (
        <div className="list-item">
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
        </div>
    );
}

export default ParentAssignmentli;