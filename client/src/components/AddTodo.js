import React, {useState} from 'react';

import todos from '../todos.json';

const AddTodo = ({setIsOpen, handleAddTodo}) => {

    const [newTodo, setNewTodo] = useState('');

    const handleOnChange = (e) => {
            setNewTodo(e.target.value.trim());
    }

    const handleAdd = () => {
        const now = new Date();
        const newTodoObj = {
            id: todos.length+1,
            content: newTodo,
            created_at: String(now)
        }
        todos.push(newTodoObj);
        // console.log(todos);
        setIsOpen(false);
    }

    return (
        <div className="popUpBox">
            <div className="box">
                <span className="close" onClick={handleAddTodo}>x</span>
                <input className="input" type="text" placeholder="Enter your Todo" required onChange={handleOnChange}></input>
                <button className="add" type="button" onClick={handleAdd} >Add</button>
            </div>         
        </div>
    )
}

export default AddTodo
