import React, { Fragment, useEffect, useReducer, useRef } from 'react';
import axios from 'axios';

const todo = () => {
  const todoListReducer = (state, action) => {
    switch (action.type) {
      case 'SET':
        return action.payload;
      case 'ADD':
        return state.concat(action.payload);
      case 'REMOVE':
        const newState = [].concat(state);
        const index = state.findIndex(item => item.id === action.payload);
        newState.splice(index, 1);
        return newState;
      default:
        return state;
    }
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);
  const taskRef = useRef();

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

  const taskRemoveHandler = id => {
    axios
      .delete(`https://react-hooks-sample.firebaseio.com/todoList/${id}.json`)
      .then(result => {
        dispatch({
          type: 'REMOVE',
          payload: id,
        });
      })
      .catch(error => {});
  };

  const todoAddHandler = () => {
    const task = taskRef.current.value;
    if (task && task.trim() !== '') {
      axios
        .post('https://react-hooks-sample.firebaseio.com/todoList.json', { description: task })
        .then(result => {
          setTimeout(() => {
            const item = { id: result.data.name, description: task };
            dispatch({
              type: 'ADD',
              payload: item,
            });
          }, 3000);
        })
        .catch(error => {});
    }
    taskRef.current.value = '';
  };

  return (
    <Fragment>
      <input type="text" placeholder="Todo" ref={taskRef} />
      <button type="button" onClick={todoAddHandler}>
        Add task
      </button>
      <ul>
        {todoList.map(element => (
          <li key={element.id} onClick={() => taskRemoveHandler(element.id)}>
            {element.description}
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default todo;
