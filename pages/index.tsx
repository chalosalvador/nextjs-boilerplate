import ArticleList from '../components/ArticleList';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import API from '../api';

interface Props {
  articles: []
}

const HomePage: NextPage<Props> = ( props: Props ) => (
  <>
    <h1 className='page-title'>
      <a href='https://nextjs.org'>Next.js!</a> boilerplate with <a href='https://ant.design/docs/react/introduce'>Antd</a>
    </h1>

    <p>
      Este es el contenido de la página principal.
    </p>
    
    <p>
      Empieza editando el código de <code>pages/index.js</code>
    </p>

    <h2>Lista de Artículos</h2>
    <ArticleList articles={ props.articles } />
  </>
);

HomePage.getInitialProps = async function() {
  try {
    const articles = await API.get( '/articles' );
    console.log( `Show data fetched. Count: ${ articles.length }` );

    return {
      articles
    };
  } catch( e ) {
    console.log( 'error getting articles', e );
    return {
      articles: []
    };
  }
};

export default HomePage;
