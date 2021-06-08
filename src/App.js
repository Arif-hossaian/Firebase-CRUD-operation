import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./components/Layout/Login";
import NavBar from "./components/Layout/NavBar";
import PrivateRoute from "./components/Private/PrivateRoute";
import Student from "./components/Students/Student";
import StudentForm from "./components/Students/StudentForm";
import Students from "./components/Students/Students";

const App = () => {
  return (
    <BrowserRouter>
    <PrivateRoute component={NavBar}/>
      {/* <NavBar /> */}
      <Switch>
        <Route exact path="/" component={Students} />
        <Route exact path="/student/:id" component={Student} />
        <Route exact path="/studentForm/:id?" component={StudentForm} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
