import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditTickModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.state={users:[]}
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

    handleSubmit(event){
        event.preventDefault();
        
        fetch('https://localhost:44326/api/tickets',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.TicketId.value,
                Description:event.target.TicketDescription.value,
                Resume:event.target.TicketResume.value,
                ProjectId:event.target.ProjectId.value,
                Author:event.target.TicketAuthor.value,
                UserAssignedId:event.target.UserAssignedId.value,
                status:event.target.status.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert("Updated successfully !");
        },
        (error)=>{
            alert('Failed');
        })
    }

    render() {
        const {users, depid, depname}=this.state;
        
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Ticket
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TickId">
                                        <Form.Label>Ticket Id</Form.Label>
                                        <Form.Control type="text" name="TicketId" required 
                                        disabled
                                        defaultValue={this.props.tickid} 
                                        placeholder="TicketId"/>

                                        <Form.Label>Ticket Description</Form.Label>
                                        <Form.Control type="text" name="TicketDescription" 
                                        defaultValue={this.props.tickdesc} 
                                        placeholder="TicketDescription"/>

                                        <Form.Label>Ticket Resume</Form.Label>
                                        <Form.Control type="text" name="TicketResume" 
                                        defaultValue={this.props.tickresume} 
                                        placeholder="TicketResume"/>

                                        <Form.Label>Project Id</Form.Label>
                                        <Form.Control type="text" name="ProjectId" 
                                        defaultValue={this.props.tickProjectId} 
                                        placeholder="ProjectId"/>

                                        <Form.Label>Ticket Author</Form.Label>
                                        <Form.Control type="text" name="TicketAuthor" 
                                        defaultValue={this.props.tickauthor} 
                                        placeholder="TicketAuthor"/>
                                        
                                        

                                        <Form.Label>Assign Ticket To </Form.Label>
                                        <Form.Control as="select" name="UserAssignedId">
                                        {users.map((user) => (
                                            <option value={user.Id}>{user.Name} </option>
                                        ))}
                                        </Form.Control>

                                        <Form.Label>Ticket Status</Form.Label>
                                        <Form.Control as="select" name="status">
                                            <option value="TO DO">TO DO</option>
                                            <option value="IN PROGRESS">IN PROGRESS</option>
                                            <option value="DONE">DONE</option>     
                                        </Form.Control>

                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Ticket
                                        </Button>
                                    </Form.Group>
                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    } 
}