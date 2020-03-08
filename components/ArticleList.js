import Link from 'next/link';
import { Card, Col, Row } from 'antd';

const ArticleList = ( props ) => (

  <>
    <Row type='flex' justify='center' gutter={ 30 }>
      {
        props.articles.map( ( article, i ) => (
          <Col xs={ 24 } sm={ 12 } md={ 8 } style={ { marginBottom: 30 } } key={ i }>
            <Card
                  title={ article.title }
                  extra={ <Link href='/article/[id]' as={ `/article/${ article.id }` }>
                    <a>Más</a>
                  </Link> }>
              <p>{ article.body }</p>
            </Card>
          </Col>
        ) )
      }
    </Row>
  </>
);

export default ArticleList;
