import React, { Fragment, useState } from 'react';

const todo = () => {
  const [task, setTask] = useState('');

  const inputChangeHandler = event => {
    setTask(event.target.value);
  };

  return (
    <Fragment>
      <input type="text" placeholder="Todo" onChange={inputChangeHandler} value={task} />
      <button type="button">Add</button>
      <ul />
    </Fragment>
  );
};

export default todo;
