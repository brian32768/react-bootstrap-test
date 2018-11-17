import React from 'react';
import {
  Router,  Route,  IndexRoute,
  browserHistory,
} from 'react-router';

import App from './App';
//import Home from './Home';
//import Forms from './forms/Forms';
//import Lists from './lists/Lists';
/*       <IndexRoute component={Home} />
      <Route path="forms" component={Forms} />
      <Route path="lists" component={Lists} />
*/

export default (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
    </Route>
  </Router>
);
