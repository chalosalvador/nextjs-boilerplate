import React, { useState } from 'react';
import { Modal, Form, Input, message, Upload, Select } from 'antd';
import { translateMessage } from '../helpers/translateMessage';
import API from '../api/index';
import ErrorList from './ErrorList';
import { PlusOutlined } from '@ant-design/icons/lib';
import { Category } from '../interfaces';

const { Option } = Select;

interface Values {
  title
  body
  modifier
  image
  category_id
}

interface ArticleFormProps {
  categories: Category[]
  visible: boolean;
  update: boolean;
  onSubmit: () => void;
  onCancel: () => void;
}

function getBase64( file, callback ) {
  console.log( 'file', file );
  const reader = new FileReader();
  reader.addEventListener( 'load', () => callback( reader.result ) );
  reader.readAsDataURL( file );
}

const ArticleForm: React.FC<ArticleFormProps> = ( {
  visible,
  update,
  onSubmit,
  onCancel,
  categories
} ) => {
  const [ form ] = Form.useForm();
  const [ imageUrl, setImageUrl ] = useState( null );
  const [ fileList, setFileList ] = useState( [] );
  /**
   * onCreate article
   * Called when the user clicks on button to create article
   * @param values
   */
  const onCreate = async values => {
    console.log( 'Received values of form: ', values );

    form.validateFields()
      .then( async( values: Values ) => {
        console.log( 'values', values );

        // use form data to be able to send a file to the server
        const data = new FormData();
        data.append( 'image', values.image[ 0 ] );
        data.append( 'title', values.title );
        data.append( 'body', values.body );
        data.append( 'category_id', values.category_id );
        try {
          await API.post( '/articles', data ); // post data to server
          form.resetFields();
          setFileList( [] );
          setImageUrl( null );
          onSubmit();
        } catch( error ) {
          console.error(
            'No se pudo ingresar el post',
            error.response
          );

          const errorList = error.response.errors && <ErrorList errors={ error.response.errors } />;

          message.error( <>
            { error.response.message }
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

  // const handleChangePhoto = info => {
  //   getBase64( info.file, imageUrl => setImageUrl( imageUrl ) );
  // };

  const normPhotoFile = e => {
    console.log( 'Upload event:', e );
    const file = e.file;
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if( !isJpgOrPng ) {
      message.error( 'La imagen debe tener formato JPG o PNG' );
      setFileList( [] );
      setImageUrl( null );
      return null;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if( !isLt2M ) {
      message.error( 'La imagen debe ser menor a 2MB' );
      setFileList( [] );
      setImageUrl( null );
      return null;
    }

    if( file.status === 'removed' ) {
      setFileList( [] );
      setImageUrl( null );
      return null;
    }

    getBase64( e.file, imageUrl => setImageUrl( imageUrl ) );

    if( Array.isArray( e ) ) {
      return e;
    }

    console.log( 'e.file', e.file );
    console.log( 'e.fileList', e.fileList );
    setFileList( [ file ] );

    return e && [ e.file ];
  };

  const handleChangeCategory = () => {};

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

        <Form.Item name='image'
                   label='Upload'
                   valuePropName='fileList'
                   getValueFromEvent={ normPhotoFile }
                   rules={ [
                     {
                       required: true,
                       message: 'Sube tu foto'
                     }
                   ] }
        >
          <Upload name='files'
                  accept='image/jpeg,image/png'
                  listType='picture-card'
                  multiple={ false }
                  showUploadList={ false }
                  beforeUpload={ () => false }
            // onChange={ handleChangePhoto }
                  fileList={ fileList }
          >
            { imageUrl
              ? <img src={ imageUrl } alt='Foto' style={ { width: '80px' } } />
              : <div>
                <PlusOutlined />
                <div className='ant-upload-text'>Upload</div>
              </div> }
          </Upload>
        </Form.Item>

        <Form.Item name='category_id'
                   label='Categoría'
                   rules={ [
                     {
                       required: true,
                       message: 'Selecciona una categoría'
                     }
                   ] }
        >
          <Select style={ { width: 120 } } onChange={ handleChangeCategory }>
            {
              categories.map( ( category, index ) =>
                <Option value={ category.id } key={ index }>{ category.name }</Option>
              )
            }
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

export default ArticleForm;
