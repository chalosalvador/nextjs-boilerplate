/**
 * Created by chalosalvador on 3/1/20
 */

import fetch from 'isomorphic-unfetch';
import cookie from 'js-cookie';

const baseURL = 'http://localhost:8000/api'; // todo move to .env
const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const handleRequest = async( endpoint, method, params = null ) => {

  const requestData = {
    method,
    headers
  };

  if( !headers[ 'Authorization' ] ) {
    let token = cookie.get( 'token' );
    if( token ) {
      headers[ 'Authorization' ] = 'Bearer ' + token; // start sending authorization header
    }
  }

  if( params !== null ) {
    requestData[ 'body' ] = JSON.stringify( params );
  }

  const response = await fetch( `${ baseURL }${ endpoint }`, requestData );

  // console.log('response', response);
  const jsonResponse = await response.json();
  console.log('jsonResponse', jsonResponse);

  if( !response.ok ) {
    const error = new Error( jsonResponse.error );
    error.response = jsonResponse;
    return Promise.reject( error );
  }

  return jsonResponse;
};

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
