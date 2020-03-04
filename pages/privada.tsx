import { NextPage } from 'next';
import React from 'react';
import { withAuthSync } from '../api/auth';

const PrivatePage: NextPage = () => {
  return <>
    <h1 className='title'>
      Private Page
    </h1>
  </>;
};

export default withAuthSync( PrivatePage );
