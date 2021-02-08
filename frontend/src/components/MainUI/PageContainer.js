import React from 'react';

import NavigationLinks from './NavigationLinks';
import './PageContainer.css'

const PageContainer = props => {
    return (
        <div className="page-container">
            {<NavigationLinks />}
            {props.children}
        </div>
    );
}

export default PageContainer;