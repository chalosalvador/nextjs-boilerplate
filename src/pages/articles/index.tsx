import React, { useState } from 'react';
import { InferGetStaticPropsType, NextPage } from 'next';
import API from '../../api/index';
import { translateMessage } from '../../helpers/translateMessage';
import ArticleList from '../../components/ArticleList';
import ArticleForm from '../../components/ArticleForm';
import { Button, message } from 'antd';
import { useAuth } from '../../providers/Auth';
import { Article, Category } from '../../interfaces';

/**
 * Fetch Articles from DB
 */
export const fetchArticles = async() => {
  const articles = await API.get( '/articles' );
  console.log( `Show data fetched. Articles: ${ articles.data.length }` );

  return articles.data;
};

/**
 * Articles list page
 * @param props
 * @constructor
 */
const ArticleListPage = ( props: InferGetStaticPropsType<typeof getStaticProps> ) => {

  const [ visible, setVisible ] = useState( false );
  const [ articles, setArticles ] = useState( props.articles );
  const auth = useAuth();

  /**
   * Executed after the form is submitted
   * Fetches all the articles and refreshes the list
   * Closes the modal
   */
  const afterCreate = async() => {
    try {
      const refreshedArticles = await fetchArticles(); // refresh list of articles
      setArticles( refreshedArticles ); // set articles list state
      setVisible( false ); // close the modal
    } catch( error ) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      message.error( translateMessage( error.message ) );
    }
  };

  return (
    <div>
      {
        auth.isAuthenticated &&
        <Button
          type='primary'
          onClick={ () => {
            setVisible( true );
          } }
        >
          Nuevo artículo
        </Button>
      }

      <ArticleForm
        categories={ props.categories }
        visible={ visible }
        update={ false }
        onSubmit={ afterCreate }
        onCancel={ () => {
          setVisible( false );
        } }
      />

      <ArticleList articles={ articles } categories={ props.categories } />
    </div>
  );
};

export const getStaticProps = async() => {
  const articles: Article[] = await fetchArticles();
  const categories: Category[] = (await API.get( '/categories' )).data;
  console.log( `Show data fetched. Categories: ${ categories }` );

  return {
    props: {
      articles,
      categories
    },
    revalidate: 1, // In seconds
  };
};


export default ArticleListPage;
