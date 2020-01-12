import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom'
import Home from './Home';
import Search from './Search';
import DataTest from './DataTest';

function App() {
  return (
    <div className="App">
       <nav>
        <NavLink exact activeClassName="active-link" to="/">Home</NavLink>
        <br />
        <NavLink exact activeClassName="active-link" to="/search">Search</NavLink>
        <br />
        <NavLink exact activeClassName="active-link" to="/datatest">Data Test</NavLink>
      </nav>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/datatest" component={DataTest} />
      </Switch>
    </div>
  );
}

export default App;
