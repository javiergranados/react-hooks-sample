import React, { useState } from 'react';
import Todo from './components/Todo.jsx';
import Header from './components/Header.jsx';
import Auth from './components/Auth.jsx';

const app = props => {
  const [page, setPage] = useState('auth');

  return (
    <div className="App">
      <Header onLoadTodo={() => setPage('todo')} onLoadAuth={() => setPage('auth')} />
      <hr />
      {page === 'todo' && <Todo />}
      {page === 'auth' && <Auth />}
    </div>
  );
};

export default app;
