/**
 * Created by chalosalvador on 2/7/20
 */
import React from "react";
import Link from "next/link";
// import {Link} from "react-router-dom";
import Routes from '../constants/routes';
import { useAuth, useDispatchAuth } from '../contexts/AuthProvider';

const linkStyle = {

};

const Navigation = (props) => {

  const auth = useAuth();
  console.log( 'auth navigation', auth );
  const dispatch = useDispatchAuth();

  return (
    <ul>
      <li>
        <Link href={Routes.HOME}>
          <a style={linkStyle}>Home</a>
        </Link>
      </li>
      <li>
        <Link href={Routes.ARTICLES}>
          <a style={linkStyle}>Articles</a>
        </Link>
      </li>
      <li>
        <Link href={Routes.PRIVATE}>
          <a style={linkStyle}>Privada</a>
        </Link>
      </li>
      {/*<li><Link to={Routes.PRIVATE}>Página privada</Link></li>*/}
      {
        auth.token
          ? <li>
            <button onClick={auth.handleLogout}>logout</button>
          </li>
          : <li>
            <Link href={Routes.LOGIN}>
              <a style={linkStyle}>Login</a>
            </Link>
          </li>
      }
      <li>
        <Link href={Routes.ABOUT}>
          <a style={linkStyle}>About</a>
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
