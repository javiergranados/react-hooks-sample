import React, { Fragment, useContext } from 'react';
import AuthContext from '../auth-context';

const auth = props => {
  const auth = useContext(AuthContext);

  return (
    <Fragment>
      <h3>Auth Component</h3>
      <button onClick={() => auth.login()}>Log in</button> | <button onClick={() => auth.logout()}>Log out</button>
    </Fragment>
  );
};

export default auth;
