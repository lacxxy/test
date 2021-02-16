import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Nav from '../components/Nav/index';
import Index from '../pages/Index/index';
import HeadBar from '../components/HeadBar/index';
import Login from '../pages/Login/index';
import Rgst from '../pages/Register/index';
import Detail from '../pages/Detail/index';
import Personal from '../pages/Personal/index';
const BasicRoute = () => (
    <HashRouter>
        <Login />
        <HeadBar />
        <Nav />
        <Switch>
            <Route path="/index/:type" component={Index} />
            <Route path="/register" component={Rgst} />
            <Route path="/detail/:id" component={Detail} />
            <Route path="/Personal" component={Personal} />
        </Switch>
    </HashRouter>
);


export default BasicRoute;