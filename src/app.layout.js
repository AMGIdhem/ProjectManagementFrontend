import React from 'react';
import auth from './auth';
import {withRouter} from 'react-router-dom'
import {Home} from './Home';
import {Project} from './Project';
import {Ticket} from './Ticket';
import {Navigation} from './Navigation';
import {TicketDetails} from './TicketDetails';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {User} from './User'

export const AppLayout = (props) => {
    return <div  className="container">
        <BrowserRouter>
    <div>
      <h3 className="m-3 d-flex justify-content-center">
        Project Management
      </h3>
        
        
        <Navigation/>
          <Switch>
            <Route path='/' component={Home} exact></Route>
            <Route path='/app/project' component={Project}></Route>
            <Route path='/app/ticket/:id' component={Ticket} exact></Route>
            <Route path='/app/ticket/:id/details' component={TicketDetails} exact></Route>
            <Route path='/app/users' component={User}></Route>
          </Switch>
    </div>
    </BrowserRouter>
        <br/>
        <button className="btn btn-danger" onClick={() => {
            auth.logout(() => {
                localStorage.clear();
                props.history.push('/');
            })
        }}>Logout</button>
    </div>
};