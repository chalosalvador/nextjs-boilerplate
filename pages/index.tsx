import ArticleList from '../components/ArticleList';
import Layout from '../components/Layout';
import { NextPage } from 'next';
import API from '../api';

interface Props {
  articles: []
}

const HomePage: NextPage<Props> = ( props: Props ) => (
  <>
    <h1 className='title'>
      Welcome to <a href='https://nextjs.org'>Next.js!</a>
    </h1>

    <p className='description'>
      Get started by editing <code>pages/index.js</code>
    </p>

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
