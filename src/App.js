import LoginForm from "./components/loginForm";
import FriendBook from "./components/FriendBook";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Header from "./components/header";
import axios from "axios";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>

          <li>
            <Link to="/protected">FriendBook</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute
            exact
            path="/protected"
            component={FriendBook}
          ></PrivateRoute>
          <Route exact path="/login" component={LoginForm}></Route>
          <Route component={LoginForm}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
