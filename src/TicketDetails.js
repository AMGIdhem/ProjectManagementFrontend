import React,{Component} from 'react';
import {Tab, Table} from 'react-bootstrap';
import { Button, ButtonToolbar } from 'react-bootstrap';
import {AddTickModal} from './AddTickModal';
import {EditTickModal} from './EditTickModal';
import {Navigation} from './Navigation';

export class TicketDetails extends Component{

    constructor(props){
        super(props);
        this.state={tick:Object, addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('https://localhost:44326/api/tickets/'+this.props.match.params.id)
        .then(response=>response.json())
        .then(jsondata=>{
            this.setState({tick:jsondata});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    /* componentDidUpdate(){
        this.refreshList();
    } */

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
        const {tick, tickid, tickname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        if(tick.status == 'TO DO') {
            console.log('red')
        }
        else if(tick.status == 'IN PROGRESS') {
            console.log('blue')
        }
        else if(tick.status == 'DONE') {
            console.log('green')
        }
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Ticket Id</th>
                            <th>Ticket Description</th>
                            <th>Ticket Resume</th>
                            <th>Ticket Creation Date</th>
                            <th>Ticket Assigned To</th>
                            <th>Ticket Status</th>
            
                        </tr>
                    </thead>
                    
                    <tbody>
                            <tr key={tick.Id}>
                                <td>{tick.Id}</td>
                                <td>{tick.Description}</td>
                                <td>{tick.Resume}</td>
                                <td>{tick.CreationDate}</td>
                                <td>{tick.UserAssignedId}</td>
                                
                                <td class="p-3 mb-2 bg-danger text-white">
                                    {tick.status}
                                </td>
                    
                            </tr>
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Ticket</Button>

                    <AddTickModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddTickModal>
                </ButtonToolbar>
            </div>
        ) 
    }
}