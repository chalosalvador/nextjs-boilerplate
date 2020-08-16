/**
 * Created by chalosalvador on 3/1/20
 */
import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';

const baseURL = 'http://localhost:8000/api'; // todo move to .env
let headers = { 'Accept': 'application/json' };

const handleRequest = async( endpoint, method, params = null ) => {

    const requestData = { method };

    if( params !== null ) {
      if( params instanceof FormData ) {
        requestData[ 'body' ] = params;
        delete headers[ 'Content-Type' ];
      } else {
        requestData[ 'body' ] = JSON.stringify( params );
        headers[ 'Content-Type' ] = 'application/json';
      }
    }

    if( !headers[ 'Authorization' ] ) {
      let token = cookie.get( 'token' );
      if( token ) {
        console.log( 'Authorization token', token );
        headers[ 'Authorization' ] = 'Bearer ' + token; // start sending authorization header
      }
    }

    requestData[ 'headers' ] = headers;
    console.log( 'requestData', requestData );

    const response = await fetch( `${ baseURL }${ endpoint }`, requestData );

    console.log( 'response', response );
    const jsonResponse = await response.json();
    console.log( 'jsonResponse', jsonResponse );

    if( !response.ok ) {
      if( response.status === 401 ) { // Unauthorized (token_expired, token_absent, token_invalid)
        delete API.headers[ 'Authorization' ]; // stop sending authorization header
        // Auth.logout();
      }

      // const error = new Error( jsonResponse.error );
      // error.response = jsonResponse;
      // return Promise.reject( jsonResponse.error );
    }

    return jsonResponse;
  }
;

const post = ( endpoint, params = null ) => {
  return handleRequest( endpoint, 'POST', params );
};

const put = ( endpoint, params = null ) => {
  return handleRequest( endpoint, 'PUT', params );
};

const patch = ( endpoint, params = null ) => {
  return handleRequest( endpoint, 'PATCH', params );
};

const get = ( endpoint ) => {
  return handleRequest( endpoint, 'GET' );
};

const deleteMethod = ( endpoint ) => {
  return handleRequest( endpoint, 'DELETE' );
};

const create = ( config ) => {
  return {
    post,
    put,
    patch,
    get,
    delete: deleteMethod,
    ...config
  };
};

const API = create(
  {
    baseURL,
    headers
  }
);

export default API;
