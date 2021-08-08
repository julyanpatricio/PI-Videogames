import './App.css';
import { Route, Switch } from "react-router-dom"
import Nav from './components/Nav';
import Game from './components/Game';
import Games from './components/Games';
import AddGame from './components/AddGame';
import Landing from './components/Landing'



function App() {
  return (
    <>
    <div className="App">
      <h1>Henry Videogames</h1>
    
    <Route path="/" component={Nav} />
    <Route path="/" exact component={Landing} />
      <div className="container content">
        <Route path="/games" exact component={Games} />
        <Switch>
          <Route path="/game/add" exact component={AddGame} />
          <Route path="/game/:id" exact component={Game} />
        </Switch>
      </div>
      </div>
      
    </>
  );
}

export default App;
