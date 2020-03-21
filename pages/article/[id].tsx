import { NextPage } from 'next';
import API from '../../api';
import { withAuthSync } from '../../api/auth';

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

ArticlePage.getInitialProps = async( ctx ) => {
  const { id } = ctx.query;
  let article = {
    title: '',
    body: ''
  };
  try {
    article = await API.get( `/articles/${ id }` );
    console.log( `Fetched show: ${ article.title }` );
  } catch( e ) {
    console.log( 'Error', e.message );
  }

  return { article };


};

export default withAuthSync( ArticlePage );
