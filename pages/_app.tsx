import { AppProps } from 'next/app';
import Layout from '../components/Layout';
import AuthProvider from '../contexts/AuthProvider';

function MyApp( { Component, pageProps }: AppProps ) {
  return <AuthProvider>
    <Layout>
      <Component { ...pageProps } />
    </Layout>
  </AuthProvider>;


}

export default MyApp;
