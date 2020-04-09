import { Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import { Routes } from '../constants/routes';

const NotFound = React.memo(() => {
    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you visited does not exist."
            extra={<Link to={Routes.Home}>Home</Link>}
        />
    );
});

export default NotFound;