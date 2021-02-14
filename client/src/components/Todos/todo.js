import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash,faCheckCircle } from '@fortawesome/free-solid-svg-icons'


const Todo = ({content,time}) =>{
    return(
        <div className="todo">
            <div className="content">
                {content}
            </div>
            <div className="time">
                {time}
            </div>
            <div className="actions">
                <button className="edit"><FontAwesomeIcon icon={faEdit}/></button>
                <button className="delete"><FontAwesomeIcon icon={faTrash}/></button>
                <button className="completed"><FontAwesomeIcon icon={faCheckCircle}/></button>
            </div>
        </div>
    )
}

export default Todo



