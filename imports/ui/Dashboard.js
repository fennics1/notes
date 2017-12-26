import React from 'react';

import PrivateHeader from './PrivateHeader';

//stateless functional component
export default () => {
  return (
    <div>
      <PrivateHeader title="Your Link"/>
      <div className="page-content">
        Dashboard page content.
      </div>
    </div>
  );
};
