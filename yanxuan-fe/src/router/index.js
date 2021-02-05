import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from '../pages/Index/index';
import Nav from '../components/Nav/index';
const BasicRoute = () => (
    <HashRouter>
        <Nav></Nav>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/detail"/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;