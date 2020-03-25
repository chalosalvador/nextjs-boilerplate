import { NextPage } from 'next';
import API from '../../api';
import { withAuthSync } from '../../api/auth';
import CommentsList from '../../components/CommentsList';

interface Props {
  id: number,
  article: {
    title: string,
    body: string,
  },
  comments: any[]
}

const ArticlePage: NextPage<Props> = ( props: Props ) => (
  <>
    <h1 className='title'>
      Article: { props.article.title }
    </h1>

    <p>{ props.article.body }</p>

    <CommentsList articleId={props.id} comments={props.comments} />

  </>
);

ArticlePage.getInitialProps = async( ctx ) => {
  const { id } = ctx.query;
  let article = {
    title: '',
    body: ''
  };

  let commentsList = [];
  try {
    article = await API.get( `/articles/${ id }` );
    commentsList = await API.get( `/articles/${ id }/comments` );
    // console.log( `Fetched show: ${ article.title }` );
    console.log( `Fetched show: ${ commentsList }` );
  } catch( e ) {
    console.log( 'Error', e.message );
  }

  return {
    id: parseInt(id.toString()),
    article,
    comments: commentsList
  };


};

export default withAuthSync( ArticlePage );
