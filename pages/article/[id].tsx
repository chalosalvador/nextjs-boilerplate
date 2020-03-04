import Head from 'next/head';
import Link from 'next/link';
import Header from '../../components/Header';
import Layout from '../../components/Layout';
import { NextPage } from 'next';

interface Props {
  article: {
    title: string,
    body: string
  }
}

const ArticlePage: NextPage<Props> = ( props: Props ) => (
  <>

    <h1 className='title'>
      Article: { props.article.title }
    </h1>

    <p>{ props.article.body }</p>

  </>
);

ArticlePage.getInitialProps = async function( context ) {
  const { id } = context.query;
  const res = await fetch( `http://localhost:8000/api/articles/${ id }` );
  const article = await res.json();

  console.log( `Fetched show: ${ article.title }` );

  return { article };
};

export default ArticlePage;
