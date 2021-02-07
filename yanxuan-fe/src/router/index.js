import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from '../pages/Index/index';
import HeadBar from '../components/HeadBar/index';
import Login from '../pages/Login/index';
const BasicRoute = () => (
    <HashRouter>
        <Login />
        <HeadBar />
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/index/:type" component={Index} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;