/**
 * Created by chalosalvador on 2/5/20
 */
import React from 'react';
import Auth from '../api/auth';
import cookie from 'js-cookie';
import authReducer from '../reducers/auth';
import { LOGIN_ACTION, LOGOUT_ACTION } from '../constants/actions';

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const AuthProvider = props => {

  /**
   * AuthAction
   * @param token
   */
  const dispatchAuthAction = ( token ) => {
    if( token ) {
      dispatch( {
        type: LOGIN_ACTION,
        payload: token
      } );
    } else {
      dispatch( {
        type: LOGOUT_ACTION,
        payload: null
      } );
    }
  };

  /**
   * Login
   * @param email
   * @param password
   * @returns {Promise<void>}
   */
  const login = async( email, password ) => {
    try {
      const token = await Auth.login( email, password );
      console.log( 'token auth provider', token );
      dispatchAuthAction( token );
    } catch( e ) {
      alert( e.message );
    }
  };

  /**
   * Logout
   * @returns {Promise<void>}
   */
  const logout = async() => {
    Auth.logout();

    dispatchAuthAction( null );
  };

  const [ auth, dispatch ] = React.useReducer( authReducer, {
    token: null,
    handleLogin: login,
    handleLogout: logout
  } );

  React.useEffect( () => {
    const checkAuthentication = () => {
      const token = cookie.get( 'token' ); // check if the token exists
      console.log( 'isAuth', token );
      dispatchAuthAction( token );
    };

    checkAuthentication();
  }, [] );

  return (
    <AuthDispatchContext.Provider value={ dispatch }>
      <AuthStateContext.Provider value={ auth }>
        { props.children }
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
};

export const useDispatchAuth = () => React.useContext( AuthDispatchContext );
export const useAuth = () => React.useContext( AuthStateContext );
export default AuthProvider;
