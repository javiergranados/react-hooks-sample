import React, { useState } from 'react';
import Todo from './components/Todo.jsx';
import Header from './components/Header.jsx';
import Auth from './components/Auth.jsx';
import AuthContext from './auth-context';

const app = props => {
  const [page, setPage] = useState('auth');
  const [authStatus, setAuthStatus] = useState(false);

  const setAuth = value => {
    setAuthStatus(value);
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ status: authStatus, login: () => setAuth(true), logout: () => setAuth(false) }}>
        <Header onLoadTodo={() => setPage('todo')} onLoadAuth={() => setPage('auth')} />
        <hr />
        {page === 'todo' && <Todo />}
        {page === 'auth' && <Auth />}
      </AuthContext.Provider>
    </div>
  );
};

export default app;
