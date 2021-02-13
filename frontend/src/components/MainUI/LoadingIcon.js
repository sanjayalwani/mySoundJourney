import React from 'react';

export default function LoadingIcon(props) {
  let loaderClass = "text-success mx-1 spinner-grow";
  if (props.small) loaderClass += " spinner-grow-sm";
  return (
  <div className="loading-icon w-100 align-items-center">
    <div className={loaderClass} role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className={loaderClass} role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <div className={loaderClass} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
  )
}