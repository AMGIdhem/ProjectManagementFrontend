import React,{Component} from 'react';
import {Tab, Table} from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {Navigation} from './Navigation';

export class Project extends Component{

    constructor(props){
        super(props);
        this.state={deps:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('https://localhost:44326/api/projects')
        .then(response=>response.json())
        .then(jsondata=>{
            this.setState({deps:jsondata});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteDep(depid){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:44326/api/projects/'+depid,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        }
    }

    render() {
        const {deps, depid, depname}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        const value = JSON.parse(localStorage.getItem('user-info'));
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Project Id</th>
                            <th>Project Name</th>
                            <th>Options</th>
                            <th>Project tickets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deps.map(dep=>
                            <tr key={dep.Id}>
                                <td>{dep.Id}</td>
                                <td>{dep.Name}</td>
                                <td>
                                    <ButtonToolbar>
                                    <div>
                                    { value.Role === "admin" ? (
                                        <Button className="mr-2" variant="info" 
                                        onClick={()=>this.setState({editModalShow:true,depid:dep.Id,depname:dep.Name})}>
                                            Edit
                                        </Button>)

                                     
                                    : ( <div /> )
                                    }
                                    </div>
                                    <div>
                                    { value.Role === "admin" ? (
                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deleteDep(dep.Id)}>
                                            Delete
                                        </Button>)
                                    : ( <div /> )
                                    }
                                    </div>

                                        <EditDepModal show={this.state.editModalShow} 
                                        onHide={editModalClose}
                                        depid={depid}
                                        depname={depname}/>
                                    </ButtonToolbar>
                                </td>
                                <td>
                                    {/* <a href={'/app/ticket/'+dep.Id}> Tickets </a> */}
                                    <Link to={'/app/ticket/'+dep.Id}>Tickets</Link>
                                </td>
                            </tr>)}
                    </tbody>
                </Table>

                <ButtonToolbar>
                    <div>
                    { value.Role === "admin" ? (
                        <Button variant='primary'
                        onClick={()=>this.setState({addModalShow:true})}>
                        Add Project</Button>
                    ) : ( <div /> )
                    }
                    </div>
                    

                    <AddDepModal show={this.state.addModalShow}
                    onHide={addModalClose}></AddDepModal>
                </ButtonToolbar>
            </div>
        ) 
    }
}