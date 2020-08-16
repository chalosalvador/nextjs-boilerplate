/**
 * Created by chalosalvador on 2/7/20
 */
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import Routes from '../constants/routes';
import { useAuth } from '../providers/Auth';
import { Menu } from 'antd';
import { LogoutOutlined, LoginOutlined, LoadingOutlined } from '@ant-design/icons';

const linkStyle = {};

const Navigation = ( props ) => {
  const router = useRouter();

  const [ menuState, setMenuState ] = useState( {
    current: router.pathname, // set the current selected item in menu, by default the current page
    collapsed: false,
    openKeys: []
  } );
  const { isAuthenticated, isCheckingAuth } = useAuth();

  useEffect( () => {
    const handleRouteChange = url => {
      console.log( 'App is changing to: ', url );
      // todo fix an error cannot update while rendering different component
      // setMenuState( {
      //   ...menuState,
      //   current: url
      // } );
    };

    Router.events.on( 'routeChangeStart', handleRouteChange );
    return () => {
      Router.events.off( 'routeChangeStart', handleRouteChange );
    };
  }, [ menuState.current, isAuthenticated ] );

  const handleClick = ( e ) => {
    console.log( 'click ', e );
    setMenuState( {
      ...menuState,
      current: e.key
    } );
  };

  return (
    <>
      <Menu
        mode={ props.mode }
        onClick={ handleClick }
        className='menu'
        theme='dark'
        selectedKeys={ [ menuState.current ] }
        style={ {
          lineHeight: '64px',
          width: 'fit-content'
        } }
      >
        <Menu.Item key={ Routes.HOME }>
          <Link href={ Routes.HOME }>
            <a style={ linkStyle }>Home</a>
          </Link>
        </Menu.Item>

        <Menu.Item key={ Routes.ARTICLES }>
          <Link href={ Routes.ARTICLES }>
            <a style={ linkStyle }>Articles</a>
          </Link>
        </Menu.Item>

        <Menu.Item key={ Routes.PRIVATE }>
          <Link href={ Routes.PRIVATE }>
            <a style={ linkStyle }>Privada</a>
          </Link>
        </Menu.Item>

        <Menu.Item key={ Routes.ANTD }>
          <Link href={ Routes.ANTD }>
            <a style={ linkStyle }>ANTD</a>
          </Link>
        </Menu.Item>

        <Menu.Item key={ Routes.ABOUT }>
          <Link href={ Routes.ABOUT }>
            <a style={ linkStyle }>About</a>
          </Link>
        </Menu.Item>

        <Menu.Item key={ Routes.LOGIN }>
          <Link href={ isAuthenticated
            ? Routes.LOGOUT
            : Routes.LOGIN }>
            <a className={ isAuthenticated && 'logout-link' }>
              {
                isCheckingAuth
                  ? <LoadingOutlined />
                  : isAuthenticated
                  ? <><LogoutOutlined /> Salir</>
                  : <><LoginOutlined /> Ingresar</>
              } </a>
          </Link>
        </Menu.Item>
      </Menu>

      <style jsx>{ `
        .logout-link {
        color: #ff4d4f!important;
        }
      ` }</style>
    </>
  );
};

export default Navigation;
