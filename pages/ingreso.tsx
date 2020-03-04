// import React from 'react';
// import {UserContext} from "../contexts/UserContextProvider";
// import { NextPage } from 'next';
// import Layout from '../components/Layout';
// import LoginButton from '../components/LoginButton';
//
//
// const LoginPage : NextPage = () => {
//   return (
//     <Layout>
//       <LoginButton/>
//     </Layout>
//   );
// };
//
// export default LoginPage;

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useRouter } from 'next/router';
import Routes from '../constants/routes';

const Login = () => {
  const [ userData, setUserData ] = useState( {
    username: 'admin@test.com',
    password: 'toptal',
    error: ''
  } );
  const auth = useAuth();
  const router = useRouter();

  const handleSubmit = async( event: any ) => {
    event.preventDefault();
    setUserData( {
      ...userData,
      error: ''
    } );

    const username = userData.username; //'admin@test.com'
    const password = userData.password; //'toptal'

    try {
      await auth.handleLogin( username, password );
    } catch( error ) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      const { response } = error;
      setUserData( {
        ...userData,
        error: response
          ? response.statusText
          : error.message
      } );
    }
  };

  console.log( 'auth.token', auth.token );
  if( auth.token ) {
    router.push( Routes.HOME );
  }

  return (
    <>
      <div className='login'>
        <form onSubmit={ handleSubmit }>
          <label htmlFor='username'>Email</label>
          <input
            type='text'
            id='username'
            name='username'
            value={ userData.username }
            onChange={ event =>
              setUserData(
                Object.assign( {}, userData, { username: event.target.value } )
              )
            }
          />

          <label htmlFor='password'>Clave</label>
          <input
            type='password'
            id='password'
            name='password'
            value={ userData.password }
            onChange={ event =>
              setUserData( {
                ...userData,
                password: event.target.value
              } )
            }
          />

          <button type='submit'>Login</button>

          { userData.error && <p className='error'>Error: { userData.error }</p> }
        </form>
      </div>
      <style jsx>{ `
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        form {
          display: flex;
          flex-flow: column;
        }
        label {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          margin: 0.5rem 0 0;
          color: brown;
        }
      ` }</style>
    </>
  );
};

export default Login;
