import logo from './logo.svg';
import './App.css';
import Home from "./Home";
import Matrix from "./Matrix";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/matrix" component={Matrix} />
        </Switch>            
      </Router>
    </div>
  );
}

export default App;
