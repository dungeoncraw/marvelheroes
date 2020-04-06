import React from 'react';
import './styles/App.css';

import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { Routes } from './constants/routes';
import HeroesSearch from './components/HeroesSearch';
import HeroInfo from './components/HeroInfo';
import About from './components/About';
import AppLayout from './layout/Layout';

const App = React.memo(() => {
  return (
    <Router>
      <AppLayout>
        <Switch>
          <Route exact path={Routes.Home} component={HeroesSearch} />
          <Route exact path={Routes.Detail} component={HeroInfo} />
          <Route exact path={Routes.About} component={About} />
        </Switch>
      </AppLayout>
    </Router>
  );
})

export default App;