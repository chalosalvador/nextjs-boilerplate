import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

interface Values {
  title: string;
  body: string;
  modifier: string;
}

interface ArticleFormProps {
  visible: boolean;
  onSubmit: ( values: Values ) => void;
  onCancel: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ( {
  visible,
  onSubmit,
  onCancel,
} ) => {
  const [ form ] = Form.useForm();
  return (
    <Modal
      visible={ visible }
      title='Crear nuevo artículo'
      okText='Crear'
      cancelText='Cancelar'
      onCancel={ onCancel }
      onOk={ () => {
        form
          .validateFields()
          .then( ( values: Values ) => {
            form.resetFields();
            onSubmit( values );
          } )
          .catch( info => {
            console.log( 'Validate Failed:', info );
          } );
      } }
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
