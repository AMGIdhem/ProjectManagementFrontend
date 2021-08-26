import React,{Component} from 'react';
import {Tab, Table} from 'react-bootstrap';

import { Button, ButtonToolbar } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import {AddDepModal} from './AddDepModal';
import {EditDepModal} from './EditDepModal';
import {Navigation} from './Navigation';

export class User extends Component{

    constructor(props){
        super(props);
        this.state={users:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch('https://localhost:44326/api/users')
        .then(response=>response.json())
        .then(jsondata=>{
            this.setState({users:jsondata});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteAcc(userid){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:44326/api/users/'+userid,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        }
    }

    blockAcc(userid,useremail,username,userpassword,userrole){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:44326/api/users/',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:userid,
                Email:useremail,
                Name:username,
                Password:userpassword,
                Role:userrole,
                UserStatus:'blocked'
            })
        })
        }
    }

    unblockAcc(userid,useremail,username,userpassword,userrole){
        if(window.confirm('Are you sure?')){
            fetch('https://localhost:44326/api/users/',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:userid,
                Email:useremail,
                Name:username,
                Password:userpassword,
                Role:userrole,
                UserStatus:'activated'
            })
        })
        }
    }

    render() {
        const {users, userid, username}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        const value = JSON.parse(localStorage.getItem('user-info'));
        return(
            <div>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>User Name</th>
                            <th>User Email</th>
                            <th>Role</th>
                            <th>User Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>
                            <tr key={user.Id}>
                                <td>{user.Id}</td>
                                <td>{user.Name}</td>
                                <td>{user.Email}</td>
                                <td>{user.Role}</td>
                                <td>{user.UserStatus}</td>
                                <td>
                                    <ButtonToolbar>
                                        { user.UserStatus === "blocked" ? (
                                            <Button className="mr-2" variant="info" 
                                            onClick={()=>this.unblockAcc(user.Id, user.Email, user.Name, user.Password, user.Role)}>
                                                Unblock Account
                                            </Button>)
                                        : ( 
                                            <Button className="mr-2" variant="warning" 
                                            onClick={()=>this.blockAcc(user.Id, user.Email, user.Name, user.Password, user.Role)}>
                                                Block Account
                                            </Button>
                                        )
                                    }

                                    <div>
                                        <Button className="mr-2" variant="danger" 
                                        onClick={()=>this.deleteAcc(user.Id)}>
                                            Delete Account
                                        </Button>
                                    </div>

                                        <EditDepModal show={this.state.editModalShow} 
                                        onHide={editModalClose}
                                        userid={userid}
                                        username={username}/>
                                    </ButtonToolbar>
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