/**
 * Created by chalosalvador on 2/5/20
 */
import React, { useEffect } from 'react';
import API from '../api';
import cookie from 'js-cookie';

const AuthContext = React.createContext( {
  isAuthenticated: false,
  setAuthenticated: () => {},
} );

export const AuthProvider = ( { children } ) => {
  const [ isAuthenticated, setAuthenticated ] = React.useState( false );
  const [ isCheckingAuth, setIsCheckingAuth ] = React.useState( true );
  /**
   * This keeps in sync the auth status for all the browser tabs
   */
  useEffect( () => {
    const initializeAuth = async() => {
      window.addEventListener( 'storage', syncLogout );
      console.log( 'added storage event' );

      const response = await API.get( '/user' );
      setAuthenticated( !!response.id );
      setIsCheckingAuth( false );
      return () => {
        console.log( 'remove storage event' );

        window.removeEventListener( 'storage', syncLogout );
        window.localStorage.removeItem( 'login' );
      };
    };

    initializeAuth();
  }, [] );


  const syncLogout = event => {
    console.log( 'event', event );

    if( event.key === 'login' ) {
      if( event.newValue === 'true' ) {
        console.log( 'login from storage!' );
        const token = cookie.get( 'token' ); // check if the token exists
        setAuthenticated( true );
      } else {
        console.log( 'logged out from storage!' );
        cookie.remove( 'token' );
        setAuthenticated( false );
      }
    }
  };

  return (
    <AuthContext.Provider
      value={ {
        isAuthenticated,
        isCheckingAuth,
        setAuthenticated,
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext( AuthContext );
  if( context === undefined ) {
    throw new Error( 'useAuth must be used within an AuthProvider' );
  }
  return context;
}

export function useIsAuthenticated() {
  const context = useAuth();
  return context.isAuthenticated;
}

// import React, { useEffect } from 'react';
// import Router from 'next/router';
// import cookie from 'js-cookie';
// import Auth from '../api/auth';
// import authReducer from '../reducers/auth';
// import { LOGIN_ACTION, LOGOUT_ACTION } from '../constants/actions';
// import Routes from '../constants/routes';
//
// const AuthStateContext = React.createContext();
// const AuthDispatchContext = React.createContext();
//
// const AuthProvider = props => {
//
//   /**
//    * Login
//    * @param email
//    * @param password
//    * @returns {Promise<void>}
//    */
//   const login = async( email, password ) => {
//     try {
//       const token = await Auth.login( email, password );
//       console.log( 'token auth provider', token );
//       dispatchAuthAction( token );
//     } catch( e ) {
//       alert( e.message );
//     }
//   };
//
//   /**
//    * Logout
//    * @returns {Promise<void>}
//    */
//   const logout = async() => {
//     Auth.logout();
//
//     dispatchAuthAction( null );
//   };
//
//   const [ auth, dispatch ] = React.useReducer( authReducer, {
//     // token: null,
//     handleLogin: login,
//     handleLogout: logout
//   } );
//
//   useEffect( () => {
//     const token = cookie.get( 'token' ); // check if the token exists
//     console.log( 'isAuth', token );
//     dispatchAuthAction( token );
//   }, [] );
//
//   /**
//    * This keeps in sync the auth status for all the browser tabs
//    */
//   useEffect( () => {
//     window.addEventListener( 'storage', syncLogout );
//     console.log( 'added storage event' );
//
//     return () => {
//       console.log( 'remove storage event' );
//
//       window.removeEventListener( 'storage', syncLogout );
//       window.localStorage.removeItem( 'login' );
//     };
//   }, [] );
//
//
//   const syncLogout = event => {
//     console.log( 'event', event );
//
//     if( event.key === 'login' ) {
//       if( event.newValue === 'true' ) {
//         console.log( 'login from storage!' );
//         const token = cookie.get( 'token' ); // check if the token exists
//         dispatchAuthAction( token );
//       } else {
//         console.log( 'logged out from storage!' );
//         dispatchAuthAction( null );
//         Router.push( Routes.LOGIN );
//       }
//     }
//   };
//
//   /**
//    * AuthAction
//    * @param token
//    */
//   const dispatchAuthAction = ( token ) => {
//     if( token ) {
//       dispatch( {
//         type: LOGIN_ACTION,
//         payload: token
//       } );
//     } else {
//       dispatch( {
//         type: LOGOUT_ACTION,
//         payload: null
//       } );
//     }
//   };
//
//   return (
//     <AuthDispatchContext.Provider value={ dispatch }>
//       <AuthStateContext.Provider value={ auth }>
//         { props.children }
//       </AuthStateContext.Provider>
//     </AuthDispatchContext.Provider>
//   );
// };
//
// export const useDispatchAuth = () => React.useContext( AuthDispatchContext );
// export const useAuth = () => React.useContext( AuthStateContext );
// export default AuthProvider;
