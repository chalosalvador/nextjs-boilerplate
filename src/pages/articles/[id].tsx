import { InferGetStaticPropsType } from 'next';
import API from '../../api/index';
import withAuth from '../../hocs/withAuth';
import CommentsList from '../../components/CommentsList';
import { Article } from '../../interfaces';
import React from 'react';

const ArticlePage = ( props: InferGetStaticPropsType<typeof getStaticProps> ) => (
  <>
    <h1 className='title'>
      Article: { props.article.title }
    </h1>

    <p>{ props.article.body }</p>

    <CommentsList articleId={ props.id } comments={ props.comments } />

  </>
);

// This function gets called at build time
export const getStaticPaths = async() => {
  // Call an external API endpoint to get posts
  const articles = (await API.get( '/articles' )).data;

  // Get the paths we want to pre-render based on posts
  const paths = articles.map( ( article ) => ({
    params: { id: article.id.toString() },
  }) );

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  console.log( paths );
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async( { params } ) => {
  let article: Article = null;

  let commentsList = [];
  // try {
  article = await API.get( `/articles/${ params.id }` );
  commentsList = await API.get( `/articles/${ params.id }/comments` );
  // console.log( `Fetched show: ${ article.title }` );
  console.log( `Fetched show: ${ commentsList }` );
  // } catch( e ) {
  //   console.log( 'Error', e.message );
  // }

  return {
    props: {
      id: parseInt( params.id ),
      article,
      comments: commentsList
    }
  };
};

export default withAuth( ArticlePage );
