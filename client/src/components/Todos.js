import React from 'react';
import Todo  from './Todo';

import todos from '../todos.json';

const Todos = ({handleAddTodo}) =>{

    const html = todos.map(todo => <Todo key={todo.id} content={todo.content} created_at={todo.created_at}/>);

    return  (
        <div>
            <div className="addTodoBtnDiv">
                <button class="addTodoBtn" type="button" onClick={handleAddTodo}>Add Todo</button>
            </div>
            <div className="container">
                {html}
            </div>
        </div>
    );
}

export default Todos