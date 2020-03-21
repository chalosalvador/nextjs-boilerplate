import React  from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Routes from '../constants/routes';
import { useAuth } from '../contexts/AuthProvider';
import { Checkbox, Col, Form, Input, Row, Button } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons/lib';

const Login = () => {
  const auth = useAuth();
  const router = useRouter();

  React.useEffect( () => {
    const checkAuthentication = () => {
      console.log( 'auth.token', auth );
      if( auth.token ) {
        router.push( Routes.HOME );
      }
    };

    checkAuthentication();
  }, [ auth ] );

  const onFinish = async( userData: any ) => {
    console.log( 'Received values of form: ', userData );

    try {
      await auth.handleLogin( userData.username, userData.password );
    } catch( error ) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );
    }
  };

  return (
    <>
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
            >
              <Input
                prefix={ <LockOutlined className='site-form-item-icon' /> }
                type='password'
                placeholder='Password'
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
              <div>Soy nuevo, <Link href={Routes.REGISTER}><a>registrarme</a></Link></div>
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

export default Login;
