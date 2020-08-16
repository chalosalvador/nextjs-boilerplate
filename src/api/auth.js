/**
 * Created by chalosalvador on 3/1/20
 */

// import API from './index';
// import Router from 'next/router';
// import nextCookie from 'next-cookies';
// import cookie from 'js-cookie';
// import Routes from '../constants/routes';
// import { translateMessage } from '../helpers/translateMessage';
// import React, { useEffect } from 'react';
//
//
// /**
//  * checkAuthentication
//  * @param ctx
//  * @returns {string}
//  */
// const checkAuthentication = ( ctx ) => {
//   // console.log( 'ctx', ctx );
//   const { token } = nextCookie( ctx );
//
//   // If there's no token, it means the user is not logged in.
//   if( !token ) {
//     delete API.headers[ 'Authorization' ]; // stop sending authorization header
//
//     if( typeof window === 'undefined' ) { // on the server
//       ctx.res.writeHead( 302, { Location: Routes.LOGIN } );
//       ctx.res.end();
//     } else { // on the client
//       Router.push( Routes.LOGIN );
//     }
//   } else {
//     API.headers[ 'Authorization' ] = 'Bearer ' + token; // start sending authorization header
//   }
//
//   return token;
// };
//
// /**
//  * Makes API call to login
//  * @param email
//  * @param password
//  * @returns {Promise<any>}
//  */
// const login = async( email, password ) => {
//   try {
//     const response = await API.post( '/login', {
//       email,
//       password
//     } );
//
//     console.log( 'response', response );
//     const token = response.token;
//     localStorage.setItem( 'login', true );
//     // localStorage.removeItem( 'logout' );
//     cookie.set( 'token', token, { expires: 1 } );
//     Router.push( Routes.HOME ); // todo where should this redirect?
//
//     return token;
//   } catch( e ) {
//     alert( translateMessage( e.message ) );
//   }
// };
//
// /**
//  * logout
//  */
// const logout = () => {
//   cookie.remove( 'token' );
//   // to support logging out from all windows
//   window.localStorage.setItem( 'login', false );
//   Router.push( Routes.LOGIN );
// };
//
// export const withAuthSync = (Component) => {
//   const Wrapper = (props) => {
//     // const syncLogout = (event) => {
//     //   if (event.key === 'logout') {
//     //     console.log('logged out from storage!')
//     //     Router.push('/login')
//     //   }
//     // }
//     //
//     // useEffect(() => {
//     //   window.addEventListener('storage', syncLogout)
//     //
//     //   return () => {
//     //     window.removeEventListener('storage', syncLogout)
//     //     window.localStorage.removeItem('logout')
//     //   }
//     // }, [])
//
//     return <Component {...props} />
//   }
//
//   return Wrapper
// }
//
// const Auth = {
//   checkAuthentication,
//   login,
//   logout
// };
//
// export default Auth;
