import React, { useState } from 'react';
import { Modal, Form, Input, message, List } from 'antd';
import { translateMessage } from '../helpers/translateMessage';
import API from '../api';
import ErrorList from './ErrorList';

interface Values {
  title: string;
  body: string;
  modifier: string;
}

interface ArticleFormProps {
  visible: boolean;
  update: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ( {
  visible,
  update,
  onSubmit,
  onCancel,
} ) => {
  const [ form ] = Form.useForm();
  /**
   * onCreate article
   * Called when the user clicks on button to create article
   * @param values
   */
  const onCreate = async values => {
    console.log( 'Received values of form: ', values );

    form.validateFields()
      .then( async( values: Values ) => {
        try {
          await API.post( '/articles', values ); // post data to server
          form.resetFields();
          onSubmit();
        } catch( error ) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          );

          const errorList = error.response.error_list && <ErrorList errors={ error.response.error_list } />;

          message.error( <>
            { translateMessage( error.message ) }
            { errorList }
          </> );
        }
      } )
      .catch( info => {
        console.log( 'Validate Failed:', info );
      } );

  };

  const onUpdate = async values => {
    console.log( 'Received values of form: ', values );

    form.validateFields()
      .then( async( values: Values ) => {
        try {
          await API.put( '/articles', values ); // post data to server
          form.resetFields();
          onSubmit();
        } catch( error ) {
          console.error(
            'You have an error in your code or there are Network issues.',
            error
          );

          message.error( translateMessage( error.message ) );
        }
      } )
      .catch( info => {
        console.log( 'Validate Failed:', info );
      } );

  };

  return (
    <Modal
      visible={ visible }
      title='Crear nuevo artículo'
      okText='Crear'
      cancelText='Cancelar'
      onCancel={ onCancel }
      onOk={ !update
        ? onCreate
        : onUpdate }
    >
      <Form
        form={ form }
        layout='vertical'
        name='form_in_modal'
      >
        <Form.Item
          name='title'
          label='Título'
          rules={ [
            {
              required: true,
              message: 'Ingresa un título'
            }
          ] }
        >
          <Input />
        </Form.Item>
        <Form.Item
          name='body'
          label='Texto'
          rules={ [
            {
              required: true,
              message: 'Ingresa el texto del artículo'
            }
          ] }>
          <Input type='textarea' />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ArticleForm;
