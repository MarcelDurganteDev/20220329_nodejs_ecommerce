import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';

const Routes = ( ) => {
    return (
        <BrowserRouter>
            {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
            </Switch>
        </BrowserRouter>
    );
};
                    
export default Routes;
