import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Index from '../pages/Index/index';
import HeadBar from '../components/HeadBar/index';
import Login from '../pages/Login/index';
import Rgst from '../pages/Register/index';
const BasicRoute = () => (
    <HashRouter>
        <Login />
        <HeadBar />
        <Switch>
            <Route path="/index/:type" component={Index} />
            <Route path="/register" component={Rgst} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;