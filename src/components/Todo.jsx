import React, { Fragment, useState } from 'react';
import axios from 'axios';

const todo = () => {
  const [task, setTask] = useState('');
  const [todoList, setTodoList] = useState(['Initial task']);

  const inputChangeHandler = event => {
    setTask(event.target.value);
  };

  const todoAddHandler = () => {
    if (task && task.trim() !== '') {
      setTodoList(todoList.concat(task));
      axios
        .post('https://react-hooks-sample.firebaseio.com/todoList.json', { description: task })
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
    setTask('');
  };

  return (
    <Fragment>
      <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={task} />
      <button type="button" onClick={todoAddHandler}>
        Add task
      </button>
      <ul>
        {todoList.map((element, i) => (
          <li key={i}>{element}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default todo;
