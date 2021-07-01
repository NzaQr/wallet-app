import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ToggleTheme from "./components/ToggleTheme";

const App = () => {
  return (
    <>
      <Router>
        <ToggleTheme />
        <Switch>
          <Route exact path="/" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
