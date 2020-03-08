import { AppProps } from 'next/app';
import AuthProvider from '../contexts/AuthProvider';

// todo needed to fix an issue with antd and router, with =out this the router won't work
import 'antd/lib/button/style/index.css';
import MainLayout from '../components/Layout';

const MyApp = ( { Component, pageProps }: AppProps ) => {
  return <div>
    <AuthProvider>
      <MainLayout>
        <Component { ...pageProps } />
      </MainLayout>
    </AuthProvider>

    <style jsx>{ `
        
        ` }</style>

    <style jsx global>{ `
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          box-sizing: border-box;
        }
        
       .ant-layout {
          min-height: 100vh;
        }
        
        .header-wrapper {
          background: #001529;
        } 
        
        .ant-menu {
          background-color: transparent;
        }
        
        .ant-menu-horizontal {
          border-bottom: none;
        }
        
        .logo-wrapper {
          text-align: center;
        }
        
        .logo {
          height: 32px;
          //min-width: 120px;
          /*background-image: url('../imgs/logo.png');*/
          /*!*background-color: #00aeef;*!*/
          /*background-repeat: no-repeat;*/
          /*background-size: contain;*/
          /*background-position: center;*/
          margin: 16px;
        }
        
        .ant-layout-header {
          height: auto;
        }
        
        .header {
          background: transparent;
          padding: 0;
          /*position: fixed;*/
          z-index: 1;
          width: 100%;
        }
        
        .header__trigger {
          font-size: 18px;
          line-height: 64px;
          padding: 0 24px;
          cursor: pointer;
          transition: color .3s;
        }
        
        .header__trigger:hover {
          color: #00aeef;
        }
        
        .main-menu {
          display: none;
        }
        
        .responsive-menu-button {
          display: block;
        }
        
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-item, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-item-group-title, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-item > a{
          color: #001529;
        }
        
        .responsive-menu-wrapper .ant-popover-inner-content {
          padding:0;
        }
        
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-item:hover, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-item-active, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-active, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-open, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-selected, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-title:hover {
          background-color: #001529;
        }
        
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-item:hover > a, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-item-active > a, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-active > a, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-open > a, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-selected > a, 
        .responsive-menu-wrapper .ant-menu-dark .ant-menu-submenu-title:hover > a {
            color: #ffffff;
        }
        
        .page-title {
          font-size: 2.0rem;
          text-align: center;
          text-transform: uppercase;
          margin: 30px 0 20px;
        }
        
        .content {
          overflow: initial;
          padding: 50px 0;
          background: transparent;
          min-height: 300px;
        }
        
        .ant-table-thead > tr > th,
        .ant-table-tbody > tr > td {
          padding: 16px 16px;
          word-break: break-word;
          -ms-word-break: break-all;
        }
        
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }
        
        .footer {
          /*text-align: center;*/
          padding: 30px 20px;
          min-height: 200px;
          background-color: #2e2a25ee;
          color: #ffffff;
        }
        
        .footer a {
          color: #ffffff;
          text-decoration: underline;
        }
        
        .logo-blanco {
          padding-top: 20px;
          text-align: center;
        }
        
        .logo-menta {
          text-align: center;
          margin-top: 40px;
        }
        
        .contact-links {
          text-align: center;
          margin-top: 40px;
        }
        
        .logos-social {
          text-align: center;
          margin-top: 30px;
        }
        
        .footer-links {
          text-align: left;
        }
        
        @media (min-width: 768px) {
        
          .main-menu {
            display: block;
          }
        
          .responsive-menu-button {
            display: none;
          }
        
          .responsive-menu-button .bars{
            display: block;
            width: 20px;
            height: 2px;
            background: #1890ff;
            position: relative;
          }
          .bars:after,.bars:before{
            content: attr(x);
            width: 20px;
            position: absolute;
            top: -6px;
            left: 0;
            height: 2px;
            background: #1890ff;
          }
          .bars:after{
            top: auto;
            bottom: -6px;
          }
        
          .logo-wrapper {
            text-align: left;
          }
          
          .ant-table-thead > tr > th,
          .ant-table-tbody > tr > td {
            padding: 16px 16px;
          }
        
          .footer {
            padding: 30px 100px;
            min-height: 200px;
            background-color: #2e2a25ee;
            color: #ffffff;
          }
        
          .logo-blanco {
            text-align: left;
          }
        
          .logo-menta {
            text-align: left;
            margin-top: 0;
          }
        
          .contact-links {
            text-align: left;
            margin-top: 0;
          }
        
          .logos-social {
            margin-top: 0;
            text-align: right;
          }
        
          .footer-links {
            text-align: center;
          }
        }
        
        
        // Extra small devices (portrait phones, less than 576px)
        /*@media (max-width: 575.98px) { ... }*/
        
        // Small devices (landscape phones, 576px and up)
        /*@media (min-width: 576px) and (max-width: 767.98px) { ... }*/
        
        // Medium devices (tablets, 768px and up)
        /*@media (min-width: 768px) and (max-width: 991.98px) { ... }*/
        
        // Large devices (desktops, 992px and up)
        /*@media (min-width: 992px) and (max-width: 1199.98px) { ... }*/
        
        // Extra large devices (large desktops, 1200px and up)
        /*@media (min-width: 1200px) { ... }*/

        ` }
    </style>
  </div>;
};

export default MyApp;
