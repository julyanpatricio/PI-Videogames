import './App.css';
import { Route, Switch } from "react-router-dom"
import Nav from './components/Nav';
import Game from './components/Game';
import Games from './components/Games';
import AddGame from './components/AddGame';



function App() {
  return (
    <>
    <Route path="/" component={Nav} />
      <div className="container content">
        <Route path="/games" exact component={Games} />
        <Switch>
          <Route path="/game/add" exact component={AddGame} />
          <Route path="/game/:id" exact component={Game} />
        </Switch>
      </div>
      <hr />
    <div className="App">
      <h1>Henry Videogames</h1>
    </div>
    </>
  );
}

export default App;
