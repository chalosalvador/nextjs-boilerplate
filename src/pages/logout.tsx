import React, { useEffect } from 'react';
import { useAuth } from '../providers/Auth';
import withAuth from '../hocs/withAuth';
import API from '../api';
import cookie from 'js-cookie';

const Logout = () => {
  const { setAuthenticated } = useAuth();
  useEffect( () => {
    async function doLogout() {
      const response = await API.post( '/logout' );
      // if( response.status === 'success' ) {
        cookie.remove( 'token' );
        // to support logging out from all windows
        window.localStorage.setItem( 'login', JSON.stringify( false ) );
        setAuthenticated( false );
      // } else {
      //   console.error( 'Failed to logout', response );
      // }
    }

    doLogout();
  }, [ setAuthenticated ] );
  return <p>Logging out...</p>;
};

export default withAuth( Logout, '/' );
