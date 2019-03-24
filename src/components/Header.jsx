import React from 'react';

const header = props => (
  <header>
    <button onClick={props.onLoadTodo}>Todo list</button> | <button onClick={props.onLoadAuth}>Auth</button>
  </header>
);

export default header;
