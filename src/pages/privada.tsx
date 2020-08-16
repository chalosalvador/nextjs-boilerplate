import React from 'react';
import { NextPage } from 'next';
import withAuth from '../hocs/withAuth';

const PrivatePage: NextPage = () => {
  return <>
    <h1 className='title'>
      Private Page
    </h1>
  </>;
};

export default withAuth( PrivatePage );
