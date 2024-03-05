import React from 'react';
import { useHistory } from 'react-router-dom'

import './ErrorPage.css';

const ErrorPage = (props) => {
    let history = useHistory();

    function redirectHome() {
        history.push('/');
    }

    return (
    <div>
        <p>The application encountered an error.</p>
        <button onClick={redirectHome}>Return Home</button>
    </div>
    );
}

export default ErrorPage;
