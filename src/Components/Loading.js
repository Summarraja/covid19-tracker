import React from 'react';
import Loader from 'react-loader-spinner';

const Loading = ({ type, color }) => (
  <div>
    <Loader type={type} color="lightGreen" height="100" width="100" />
  </div>
);

export default Loading;