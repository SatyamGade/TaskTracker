import React from 'react'

function Task(props) {

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description}</p>
                <small className="card-text text-body-secondary">{props.date}</small>
            </div>
            {
                !props.stat
                &&
                <div className="d-flex align-items-center justify-content-between m-2">
                    <div>
                        <input role="button" type="checkbox" name="done" id="done" value="done" onClick={(event) => props.markAsDone(event, props.id)} />
                        <label className="mx-2" name="done">Mark as done</label>
                    </div>
                    <div>
                        <i role="button" onClick={(event) => props.editTask(event, props.id)} className="fa-solid fa-pen-to-square mx-2"></i>
                        <i role="button" onClick={(event) => props.deleteTask(event, props.id)} className="fa-solid fa-trash mx-1"></i>
                    </div>
                </div>
            }
        </div>
    )
}

export default Task
