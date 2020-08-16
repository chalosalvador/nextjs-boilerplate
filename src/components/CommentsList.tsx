import { Comment, List, Tooltip, Form, Input, Button, Avatar, message } from 'antd';
import moment from 'moment';
import { NextPage } from 'next';
import React, { useState } from 'react';
import API from '../api/index';
import { translateMessage } from '../helpers/translateMessage';
import ErrorList from './ErrorList';

const { TextArea } = Input;

interface Props {
  // comments: {
  //   id: number,
  //   text: string,
  //   article: any,
  //   user: any,
  //   created_at: string,
  //   updated_at: string
  // },
  articleId: number,
  comments: any[]
}

const CommentsList: NextPage<Props> = ( props: Props ) => {

  const processCommentsData: any = ( comments ) => {
    return comments.map( ( comment ) => ({
      // actions: [ <span key='comment-list-reply-to-0'>Reply to</span> ],
      author: comment.user.name,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: (
        <p>
          { comment.text }
        </p>
      ),
      datetime: (
        <Tooltip
          title={ moment( comment.created_at )
            .format( 'YYYY-MM-DD HH:mm:ss' ) }
        >
        <span>
          { moment( comment.created_at )
            .fromNow() }
        </span>
        </Tooltip>
      ),
    }) );
  };

  const [ submitting, setSubmitting ] = useState( false );
  const [ value, setValue ] = useState( '' );
  const [ commentsData, setCommentsData ] = useState( processCommentsData( props.comments ) );

  const handleSubmit = async() => {
    if( !value ) {
      return;
    }

    setSubmitting( true );

    try {
      await API.post( `/articles/${ props.articleId }/comments`, {
        text: value,
        article_id: props.articleId
      } );
      setSubmitting( false );
      setValue( '' );

      const commentsList = await API.get( `/articles/${ props.articleId }/comments` );
      setCommentsData( processCommentsData( commentsList ) );
    } catch( error ) {
      setSubmitting( false );
      const errorList = error.response.error_list && <ErrorList errors={ error.response.error_list } />;

      message.error( <>
        { translateMessage( error.message ) }
        { errorList }
      </> );
    }
  };


  const Editor = ( { onSubmit, submitting, value } ) => {
    const [ form ] = Form.useForm();

    return (<Form
      form={ form }
      name='form_comment'
    >
      <Form.Item name='text'
                 rules={ [
                   {
                     required: true,
                     message: 'Ingresa el texto de tu comentario'
                   }
                 ] }>
        <TextArea rows={ 4 } />
      </Form.Item>
      <Form.Item>
        <Button htmlType='submit' loading={ submitting } onClick={ onSubmit } type='primary'>
          Add Comment
        </Button>
      </Form.Item>
    </Form>);
  };

  return <>
    <Comment
      avatar={
        <Avatar
          src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
          alt='Han Solo'
        />
      }
      content={
        <Editor
          onSubmit={ handleSubmit }
          submitting={ submitting }
          value={ value }
        />
      }
    />

    <List
      className='comment-list'
      header={ `${ commentsData.length } comentarios` }
      itemLayout='horizontal'
      dataSource={ commentsData }
      renderItem={ ( item: any ) => (
        <li>
          <Comment
            // actions={ item.actions }
            author={ item.author }
            avatar={ item.avatar }
            content={ item.content }
            datetime={ item.datetime }
          />
        </li>
      ) }
    />
  </>;
};

export default CommentsList;
