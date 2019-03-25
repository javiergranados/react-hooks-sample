import React, { Fragment, useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const todo = () => {
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
        return action.payload;
      case 'ADD':
        return state.concat(action.payload);
      case 'REMOVE':
        const newState = [...state];
        const index = state.findIndex(item => item.id === action.payload.id);
        return newState.splice(index, 1);
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);
  const [task, setTask] = useState('');
  const [storedTask, setStoredTask] = useState(null);

  useEffect(() => {
    axios.get('https://react-hooks-sample.firebaseio.com/todoList.json').then(result => {
      const todos = Object.values(result.data).map((el, i) => ({
        id: Object.keys(result.data)[i],
        description: el.description,
      }));
      dispatch({
        type: 'SET',
        payload: todos,
      });
    });
  }, []);

  useEffect(() => {
    if (storedTask) {
      dispatch({
        type: 'ADD',
        payload: storedTask,
      });
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
