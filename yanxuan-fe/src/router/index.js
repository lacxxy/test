import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from '../pages/Index/index';
import Nav from '../components/Nav/index';
import HeadBar from '../components/HeadBar/index';
const BasicRoute = () => (
    <HashRouter>
        <HeadBar/>
        <Nav />
        <Switch>
            <Route path="/:type" component={Index}/>
            <Route exact path="/detail"/>
        </Switch>
    </HashRouter>
);


export default BasicRoute;