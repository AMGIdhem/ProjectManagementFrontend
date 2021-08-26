import React,{Component} from 'react';
import {Tab, Table} from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {AddTickModal} from './AddTickModal';
import {EditTickModal} from './EditTickModal';
import {Navigation} from './Navigation';
import {Home} from './Home';
import {Project} from './Project';
import {TicketDetails} from './TicketDetails';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';

export class Ticket extends Component{

    constructor(props){
        super(props);
        this.state={ticks:[], addModalShow:false, editModalShow:false, projectId:this.props.match.params.id}
    }

    refreshList(){
        fetch('https://localhost:44326/api/tickets/'+this.props.match.params.id+'/project')
        .then(response=>response.json())
        .then(jsondata=>{
            this.setState({ticks:jsondata});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteTick(tickid){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:44326/api/tickets/'+tickid,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        }
    }

    render() {
        const {ticks, tickid, tickdesc, tickresume, tickProjectId, tickauthor, tickUserAssignedId, 
            tickstatus, projectId}=this.state;

        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div>
                {/* <Navigation/>
          <Switch>
            <Route path='/' component={Home} exact></Route>
            <Route path='/app/project' component={Project}></Route>
            <Route path='/app/ticket/:id' component={Ticket} exact></Route>
            <Route path='/app/ticket/:id/details' component={TicketDetails} exact></Route>
          </Switch> */}
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Ticket Id</th>
                            <th>Ticket Description</th>
                            <th>Ticket Creation Date</th>
                            <th>Options</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ticks.map(tick=>
                            <tr key={tick.Id}>
                                <td>{tick.Id}</td>
                                <td>{tick.Description}</td>
                                <td>{tick.CreationDate}</td>
                                <td>
                                <ButtonToolbar>
                                        <Button className="mr-2" variant="info" 
                                        onClick={()=>this.setState(
                                            {editModalShow:true,tickid:tick.Id,tickdesc:tick.Description,tickresume:tick.Resume,
                                                tickProjectId:tick.ProjectId,tickauthor:tick.Author,tickUserAssignedId:tick.UserAssignedId,
                                                tickstatus:tick.Status}
                                            )}>
                                            Edit
                                        </Button>

                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deleteTick(tick.Id)}>
                                            Delete
                                        </Button>

                                       <EditTickModal show={this.state.editModalShow} 
                                        onHide={editModalClose}
                                        tickid={tickid}
                                        tickdesc={tickdesc}
                                        tickresume={tickresume}
                                        tickProjectId={tickProjectId}
                                        tickauthor={tickauthor}
                                        tickUserAssignedId={tickUserAssignedId}
                                        tickstatus={tickstatus}/>
                                    </ButtonToolbar>
                                    
                                </td>
                                <td>
                                    <Link to={'/app/ticket/'+tick.Id+'/details'}>More Details</Link>
                                    {/* <a href={'/app/ticket/'+tick.Id+'/details'}>More Details</a> */}
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true, tickProjectId:projectId})}>
                    Add Ticket</Button>

                    <AddTickModal show={this.state.addModalShow}
                    onHide={addModalClose} tickProjectId={tickProjectId}></AddTickModal>
                </ButtonToolbar>
            </div>
        ) 
    }
}