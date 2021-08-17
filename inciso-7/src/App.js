import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route} from "react-router-dom";
import Home from './pages/Home/home'
import Bus from './pages/Bus/Bus'
import Ciudades from './pages/Ciudades/ciudades'
import Rutas from './pages/Rutas/rutas'
import Paradas from './pages/Paradas/paradas'
import Reportes from './pages/Reportes/reportes'
import Toolbar from './components/toolbar/Toolbar'
import './assets/css/vivify.min.css';

function App() {
  return (
    <Router>
      <Toolbar></Toolbar>
      <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/buses" component={Bus} />
          <Route exact path="/ciudades" component={Ciudades} />
          <Route exact path="/rutas" component={Rutas} />
          <Route exact path="/paradas" component={Paradas} /> 
          <Route exact path="/reportes" component={Reportes} />                    
      </div>
    </Router>
  );
}

export default App;