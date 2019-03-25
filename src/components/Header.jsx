import React, { useContext } from 'react';
import AuthContext from '../auth-context';

const header = props => {
  const auth = useContext(AuthContext);

  const todoButton = <button onClick={props.onLoadTodo}>Todo list</button>;

  return (
    <header>
      {auth.status && todoButton}
      <button onClick={props.onLoadAuth}>Auth</button>
    </header>
  );
};

export default header;
