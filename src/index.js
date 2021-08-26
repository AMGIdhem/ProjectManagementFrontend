import React from "react";
import ReactDOM from "react-dom";
import Login from './Login';
import Register from './Register';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import { AppLayout } from "./app.layout";
import { ProtectedRoute } from "./protected.route";
import {Home} from './Home';
import {Project} from './Project';
import {Ticket} from './Ticket';
import {Navigation} from './Navigation';
import {TicketDetails} from './TicketDetails';
import {User} from './User'

//import "./index.css";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route 
           
          path="/app" 
          component={AppLayout} 
        />
        <Route exact path="/register" component={Register}/>
        <Route path="*" component={() => "404 NOT FOUND"} />
        {/* <Route path='/app/project' component={Project}></Route>
        <Route path='/app/ticket/:id' component={Ticket} exact></Route>
        <Route path='/app/ticket/:id/details' component={TicketDetails} exact></Route>
        <Route path='/app/users' component={User}></Route> */}
      </Switch>
    </div>
  );

}

const rootElement = document.getElementById("root");
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, rootElement);
