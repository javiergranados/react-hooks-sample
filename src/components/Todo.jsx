import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

const todo = () => {
  const [task, setTask] = useState('');
  const [storedTask, setStoredTask] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    axios.get('https://react-hooks-sample.firebaseio.com/todoList.json').then(result => {
      const todos = Object.values(result.data).map((el, i) => ({
        id: Object.keys(result.data)[i],
        description: el.description,
      }));
      setTodoList(todos);
    });
  }, []);

  useEffect(() => {
    if (storedTask) {
      setTodoList(todoList.concat(storedTask));
    }
  }, [storedTask]);

  const inputChangeHandler = event => {
    setTask(event.target.value);
  };

  const todoAddHandler = () => {
    if (task && task.trim() !== '') {
      axios
        .post('https://react-hooks-sample.firebaseio.com/todoList.json', { description: task })
        .then(result => {
          setTimeout(() => {
            const item = { id: result.data.name, description: task };
            setStoredTask(item);
          }, 3000);
        })
        .catch(error => {});
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
        {todoList.map(element => (
          <li key={element.id}>{element.description}</li>
        ))}
      </ul>
    </Fragment>
  );
};

export default todo;
