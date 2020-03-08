/**
 * Created by chalosalvador on 2/7/20
 */
import React, { useState } from 'react';
import Link from 'next/link';
// import {Link} from "react-router-dom";
import Routes from '../constants/routes';
import { useAuth, useDispatchAuth } from '../contexts/AuthProvider';
import { Menu } from 'antd';

const linkStyle = {};

const Navigation = ( props ) => {

  const [ menuState, setMenuState ] = useState( {
    current: 'home',
    collapsed: false,
    openKeys: []
  } );
  const auth = useAuth();

  // const onOpenChange = ( openKeys ) => {
  //   const latestOpenKey = openKeys.find( key => this.state.openKeys.indexOf( key ) === -1 );
  //   if( this.rootSubmenuKeys.indexOf( latestOpenKey ) === -1 ) {
  //     this.setState( { openKeys } );
  //   } else {
  //     this.setState( {
  //       openKeys: latestOpenKey
  //         ? [ latestOpenKey ]
  //         : []
  //     } );
  //   }
  // };

  const handleClick = ( e ) => {
    console.log( 'click ', e );
    setMenuState( {
      ...menuState,
      current: e.key
    } );
  };

  return (
    <Menu
      mode={ props.mode }
      onClick={ handleClick }
      className='menu'
      theme='dark'
      style={ { lineHeight: '64px' } }
    >
      <Menu.Item key='home'>
        <Link href={ Routes.HOME }>
          <a style={ linkStyle }>Home</a>
        </Link>
      </Menu.Item>

      <Menu.Item key='articles'>
        <Link href={ Routes.ARTICLES }>
          <a style={ linkStyle }>Articles</a>
        </Link>
      </Menu.Item>

      <Menu.Item key='private'>
        <Link href={ Routes.PRIVATE }>
          <a style={ linkStyle }>Privada</a>
        </Link>
      </Menu.Item>

      <Menu.Item key='antd'>
        <Link href={ Routes.ANTD }>
          <a style={ linkStyle }>ANTD</a>
        </Link>
      </Menu.Item>

      {
        auth.token
          ? <Menu.Item key='login'>
            <button onClick={ auth.handleLogout }>logout</button>
          </Menu.Item>
          : <Menu.Item key='login'>
            <Link href={ Routes.LOGIN }>
              <a style={ linkStyle }>Login</a>
            </Link>
          </Menu.Item>
      }

      <Menu.Item key='about'>
        <Link href={ Routes.ABOUT }>
          <a style={ linkStyle }>About</a>
        </Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
