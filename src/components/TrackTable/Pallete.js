import React from 'react';

const Pallete = (props) => (
  <div style={{ width: '90%', height: '100%', ...props.style }}>{props.children}</div>
);

export default Pallete;