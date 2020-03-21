import React, { useState } from 'react';
import { NextPage } from 'next';
import API from '../../api';
import { translateMessage } from '../../helpers/translateMessage';
import ArticleList from '../../components/ArticleList';
import ArticleForm from '../../components/ArticleForm';
import { Button, message } from 'antd';

interface Props {
  articles: []
}

/**
 * Fetch Articles from DB
 */
const fetchArticles = async() => {
  const articles = await API.get( '/articles' );
  console.log( `Show data fetched. Count: ${ articles.length }` );

  return {
    articles
  };
};

/**
 * Articles list page
 * @param props
 * @constructor
 */
const ArticleListPage: NextPage<Props> = ( props: Props ) => {
  const [ visible, setVisible ] = useState( false );
  const [ articles, setArticles ] = useState( props.articles );

  /**
   * onCreate article
   * Called when the user clicks on button to create article
   * @param values
   */
  const onCreate = async values => {
    console.log( 'Received values of form: ', values );

    try {
      await API.post( '/articles', values ); // post data to server
      const refreshedProps = await fetchArticles(); // refresh list of articles
      setArticles( refreshedProps.articles ); // set articles list state
      setVisible( false ); // close modal
    } catch( error ) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      );

      message.error( translateMessage(error.message) );
    }
  };

  return (
    <div>
      <Button
        type='primary'
        onClick={ () => {
          setVisible( true );
        } }
      >
        Nuevo artículo
      </Button>
      <ArticleForm
        visible={ visible }
        onSubmit={ onCreate }
        onCancel={ () => {
          setVisible( false );
        } }
      />

      <ArticleList articles={ articles } />
    </div>
  );
};

ArticleListPage.getInitialProps = fetchArticles;

export default ArticleListPage;
