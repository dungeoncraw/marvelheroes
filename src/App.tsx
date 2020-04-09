import React from 'react';
import './styles/App.scss';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './constants/routes';
import HeroesSearch from './components/HeroesSearch';
import About from './components/About';
import AppLayout from './layout/Layout';
import NotFound from './components/NotFound';

const App = React.memo(() => {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path={Routes.Home} component={HeroesSearch} />
          <Route exact path={Routes.About} component={About} />
          <Route component={NotFound} />
        </Switch>
      </AppLayout>
    </Router>
  );
})

export default App;