import React, { lazy } from 'react'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import PageLoader from './components/Loader'
import history from './routerHistory'
import './App.css';

const Home = lazy(() => import('./views/HomePage'))
const DetailView = lazy(() => import('./views/DetailPages/DetailView'))

const App: React.FC = () => {
  return (
    <div className='App'>
      <Router history={history}>
        <Header />
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/character-detail">
              <DetailView />
            </Route>    
          </Switch>
        </SuspenseWithChunkError>
      </Router>
    </div>    
  );
}

export default App;
