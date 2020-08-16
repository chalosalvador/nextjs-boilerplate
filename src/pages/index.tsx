import { InferGetStaticPropsType, NextPage } from 'next';
import API from '../api/index';
import ArticleList from '../components/ArticleList';
import { Article } from '../interfaces';

const HomePage = ( props: InferGetStaticPropsType<typeof getStaticProps> ) => (
  <>
    <h1 className='page-title'>
      <a href='https://nextjs.org'>Next.js!</a> boilerplate
      with <a href='https://ant.design/docs/react/introduce'>Antd</a>
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

export const getStaticProps = async() => {
  let articles: Article[] = [];
  try {
    articles = (await API.get( '/articles' )).data;
    console.log( `Show data fetched. Count: ${ articles.length }` );

    return {
      props: {
        articles
      }
    };
  } catch( e ) {
    console.log( 'error getting articles', e );
    return {
      articles
    };
  }
};

export default HomePage;
