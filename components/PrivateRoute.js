import React from 'react';
import {translateMessage} from '../helpers/translateMessage';
import Routes from '../constants/routes';
import {UserContext} from "../contexts/UserContextProvider";
import {useRouter} from 'next/router'
import Layout from "./Layout";

const PrivateRoute = ({
                        component,
                        ...rest
                      }) => {

  const router = useRouter();
  const user = React.useContext(UserContext);

  const Component = component;
  const getComponent = (props) => {
    if (user.isAuthenticated) {
      return <Component {...props} />;
    } else {
      // message.info( translateMessage( 'auth/requires-login' ), 5 );
      console.log(translateMessage('auth/requires-login'));
      // return (
      //   <Redirect to={ {
      //     pathname: redirectTo || Routes.LOGIN,
      //     state: { from: props.location }
      //   } } />
      // );
      router.push(Routes.LOGIN);
      return null;
    }
  };

  return <Layout>
    {getComponent()}
  </Layout>
};

export default PrivateRoute;
