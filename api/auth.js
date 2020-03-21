/**
 * Created by chalosalvador on 3/1/20
 */
import dynamic from 'next/dynamic';
const LoginPage = dynamic( () => import('../pages/ingreso') );

import API from './index';
import { useEffect } from 'react';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Routes from '../constants/routes';
import { translateMessage } from '../helpers/translateMessage';
import { message } from 'antd';


/**
 * checkAuthentication
 * @param ctx
 * @returns {string}
 */
const checkAuthentication = ( ctx ) => {
  console.log( 'ctx', ctx );
  const { token } = nextCookie( ctx );

  // If there's no token, it means the user is not logged in.
  if( !token ) {
    delete API.headers[ 'Authorization' ]; // stop sending authorization header

    if( typeof window === 'undefined' ) { // on the server
      ctx.res.writeHead( 302, { Location: Routes.LOGIN } );
      ctx.res.end();
    } else { // on the client
      Router.push( Routes.LOGIN );
    }
  }
  API.headers[ 'Authorization' ] = 'Bearer ' + token; // start sending authorization header

  return token;
};

/**
 * Makes API call to login
 * @param email
 * @param password
 * @returns {Promise<any>}
 */
const login = async( email, password ) => {
  try {
    const response = await API.post( '/login', {
      email,
      password
    } );

    console.log( 'respponse', response );
    const token = response.token;
    // localStorage.setItem( 'auth', JSON.stringify( response ) );
    cookie.set( 'token', token, { expires: 1 } );
    Router.push( Routes.HOME ); // todo where should this redirect?

    return token;
  } catch( e ) {
    alert( translateMessage( e.message ) );
  }
};

/**
 * logout
 */
const logout = () => {
  cookie.remove( 'token' );
  // to support logging out from all windows
  window.localStorage.setItem( 'logout', Date.now() );
  Router.push( Routes.LOGIN );
};


export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const loggedIn = !!props.token;
    const syncLogout = event => {
      if( event.key === 'logout' ) {
        console.log( 'logged out from storage!' );
        Router.push( Routes.LOGIN );
      }
    };

    useEffect( () => {
      window.addEventListener( 'storage', syncLogout );

      return () => {
        window.removeEventListener( 'storage', syncLogout );
        window.localStorage.removeItem( 'logout' );
      };
    }, [] );

    console.log( 'Wrapper', props );

    return <WrappedComponent { ...props } />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = checkAuthentication( ctx );
    console.log( 'Wrapper.getInitialProps token ', token );
    // only call getInitialProps of WrappedComponent if there is a token
    const componentProps =
      token && WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps( ctx ));

    return {
      ...componentProps,
      token
    };
  };

  return Wrapper;
};

const Auth = {
  checkAuthentication,
  login,
  logout
};

export default Auth;
