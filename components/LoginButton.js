import React from 'react';
import {UserContext} from "../contexts/UserContextProvider";

const LoginButton = () => {
  const user = React.useContext(UserContext);

  return <button onClick={() => user.handleLogin('admin@test.com', 'toptal')}>login</button>;
};

export default LoginButton;
