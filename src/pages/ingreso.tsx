import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Checkbox, Col, Form, Input, Row, Button, message } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons/lib';
import Spinner from '../components/Spinner';
import API from '../api';
import withoutAuth from '../hocs/withoutAuth';
import cookie from 'js-cookie';
import { translateMessage } from '../helpers/translateMessage';

const Login = () => {
  const { setAuthenticated } = useAuth();

  const onFinish = async( userData: any ) => {

    try {
      const response = await API.post( '/login', {
        email: userData.username,
        password: userData.password
      } );

      if( response.token ) {
        localStorage.setItem( 'login', JSON.stringify( true ) ); // this is to sync auth state in local storage
        cookie.set( 'token', response.token, { expires: 1 } );
        setAuthenticated( true );
      } else {
        console.error( 'Login error', response );
        message.error( translateMessage( response.error ) );
      }

    } catch( e ) {
      console.error( e.message );
    }
  };

  return (
    <>
      {
        <Row justify='center' className='login'>
          <Col span={ 8 }>
            <Form
              name='login-form'
              className='login-form'
              initialValues={ {
                remember: true,
                username: '',
                password: ''
              } }
              onFinish={ onFinish }
            >
              <Form.Item
                name='username'
                rules={ [
                  {
                    required: true,
                    message: 'Ingresa tu nombre de usuario'
                  },
                  {
                    type: 'email',
                    message: 'Ingresa un correo válido'
                  }
                ] }
              >
                <Input prefix={ <UserOutlined className='site-form-item-icon' /> }
                       placeholder='Email'
                       autoComplete='email' />
              </Form.Item>

              <Form.Item
                name='password'
                rules={ [
                  {
                    required: true,
                    message: 'Ingresa tu clave'
                  }
                ] }
              >
                <Input
                  prefix={ <LockOutlined className='site-form-item-icon' /> }
                  type='password'
                  placeholder='Password' autoComplete='password'
                />
              </Form.Item>

              <Form.Item name='remember' valuePropName='checked' noStyle>
                <Checkbox>Recordarme</Checkbox>
              </Form.Item>

              <Form.Item>
                <a className='login-form-forgot' href=''>
                  ¡Olvidé mi clave!
                </a>
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit' className='login-form-button'>
                  Ingresar
                </Button>
                <div>Soy nuevo, <Link href={ Routes.REGISTER }><a>registrarme</a></Link></div>
              </Form.Item>
            </Form>
            <style jsx>{ `
        .login {
          max-width: 340px;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      ` }</style>
          </Col>
        </Row>
      }
    </>
  );
};

export default withoutAuth( Login );
