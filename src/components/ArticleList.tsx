import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, Col, Row, Radio, Typography, Button } from 'antd';
import { Article, Category } from '../interfaces';
import Routes from '../constants/routes';

const { Text } = Typography;


interface ArticleListProps {
  categories?: Category[]
  articles: Article[]
}

const ArticleList: React.FC<ArticleListProps> = ( props ) => {
  const [ articles, setArticles ] = useState( props.articles );
  useEffect( () => {
    console.log( 'props.articles', props.articles );
    setArticles( props.articles );
  }, [ props.articles ] );
  const handleChangeCategory = ( e ) => {
    console.log( 'e', e );
    setArticles(
      props.articles.filter( ( article ) => e.target.value === 'all' || article.category_data.id === e.target.value )
    );
  };

  return (
    <>
      {
        props.categories &&
        <Row justify='center'>
          <Col>
            <Radio.Group defaultValue='all' buttonStyle='solid' onChange={ handleChangeCategory }>
              <Radio.Button value='all'>Todas</Radio.Button> )
              {
                props.categories.map( ( category, index ) =>
                  <Radio.Button value={ category.id } key={ index }>{ category.name }</Radio.Button> )
              }
            </Radio.Group>
          </Col>
        </Row>
      }
      <Row justify='center' gutter={ 30 }>
        {
          articles.map( ( article, i ) => (
            <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
              <Card
                title={ article.title }
                extra={ <Link href={ Routes.ARTICLES_ID } as={ `${ Routes.ARTICLES }/${ article.id }` }>
                  <a>Más</a>
                </Link> }
                cover={
                  <img
                    alt={ article.title }
                    src={ `http://localhost:8000/storage/${ article.image }` }
                  /> }
              >
                <Text type='secondary'>{ article.created_at }</Text>
                <p> { article.body }</p>
                <Text type='secondary'>Escrito por: <Button type='link'>
                  { article.user_data.name }
                </Button></Text>
              </Card>
            </Col>
          ) )
        }
      </Row>
    </>
  );
};

export default ArticleList;
