import React from 'react';
import { Route, Link, Switch } from "react-router-dom";

import NewsListContainer from '../containers/NewsListContainer';

const NewsListPage = ({match}) => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/newsListPage/:category?" component={NewsListContainer} />
            </Switch>
        </React.Fragment>
    );
};

export default NewsListPage;