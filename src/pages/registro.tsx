import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Routes from '../constants/routes';
import API from '../api/index';
import { useAuth } from '../providers/Auth';
import { Button, Col, Form, Input, message, Row } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons/lib';
import ErrorList from '../components/ErrorList';
import { translateMessage } from '../helpers/translateMessage';
import withoutAuth from '../hocs/withoutAuth';

const Register = () => {
  // const auth = useAuth();
  // const router = useRouter();

  // React.useEffect( () => {
  //   const checkAuthentication = () => {
  //     console.log( 'auth.token', auth );
  //     if( auth.token ) {
  //       router.push( Routes.HOME );
  //     }
  //   };
  //
  //   checkAuthentication();
  // }, [ auth ] );

  const onFinish = async( userData: any ) => {
    console.log( 'Received values of form: ', userData );
    const { name, email, password, password_confirmation } = userData;

    try {
      await API.post( '/register', {
        name,
        email,
        password,
        password_confirmation
      } );
    } catch( error ) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );
      const errorList = error.response.error_list && <ErrorList errors={ error.response.error_list } />;

      message.error( <>
        { translateMessage( error.message ) }
        { errorList }
      </> );
    }
  };

  return (
    <>
      <Row justify='center' className='login'>
        <Col span={ 8 }>
          <Form
            name='register-form'
            className='register-form'
            initialValues={ {
              email: '',
              password: ''
            } }
            onFinish={ onFinish }
          >
            <Form.Item
              name='name'
              rules={ [
                {
                  required: true,
                  message: 'Ingresa tu nombre'
                }
              ] }
              hasFeedback
            >
              <Input prefix={ <UserOutlined className='site-form-item-icon' /> } placeholder='Nombre' />
            </Form.Item>

            <Form.Item
              name='email'
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
              hasFeedback
            >
              <Input prefix={ <UserOutlined className='site-form-item-icon' /> } placeholder='Email' />
            </Form.Item>

            <Form.Item
              name='password'
              rules={ [
                {
                  required: true,
                  message: 'Ingresa tu clave'
                }
              ] }
              hasFeedback
            >
              <Input.Password prefix={ <LockOutlined className='site-form-item-icon' /> } placeholder='Clave' />
            </Form.Item>

            <Form.Item
              name='password_confirmation'
              dependencies={ [ 'password' ] }
              hasFeedback
              rules={ [
                {
                  required: true,
                  message: 'Confirma tu clave',
                },
                ( { getFieldValue } ) => ({
                  validator( rule, value ) {
                    if( !value || getFieldValue( 'password' ) === value ) {
                      return Promise.resolve();
                    }
                    return Promise.reject( 'Las claves no coinciden' );
                  },
                }),
              ] }
            >
              <Input.Password prefix={ <LockOutlined className='site-form-item-icon' /> }
                              placeholder='Confirma tu clave' />
            </Form.Item>

            <Form.Item>
              <Button type='primary' htmlType='submit' className='login-form-button'>
                Registrarme
              </Button>
              <div><Link href={ Routes.LOGIN }><a>Ya tengo una cuenta</a></Link></div>
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
    </>
  );
};

export default withoutAuth( Register );
