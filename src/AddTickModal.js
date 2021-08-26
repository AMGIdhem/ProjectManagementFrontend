import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class AddTickModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        const value = JSON.parse(localStorage.getItem('user-info'));
        event.preventDefault();
        fetch('https://localhost:44326/api/tickets',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:null,
                Description:event.target.TicketDescription.value,
                Resume:event.target.TicketResume.value,
                ProjectId:event.target.ProjectId.value,
                Author:value.Id,
                Status:'TO DO'
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert('Added successfully !');
        },
        (error)=>{
            alert('Failed');
        })
    }

    render() {
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Add Ticket
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="TicketName">
                                        <Form.Label>Project Id</Form.Label>
                                        <Form.Control type="text" name="ProjectId" required 
                                        disabled
                                        defaultValue={this.props.tickProjectId} 
                                        placeholder="ProjectId"/>
                                        <Form.Label>Ticket Description</Form.Label>
                                        <Form.Control type="text" name="TicketDescription" required 
                                        placeholder="TicketDescription"/>
                                        <Form.Label>Ticket Resume</Form.Label>
                                        <Form.Control type="text" name="TicketResume" required 
                                        placeholder="TicketResume"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Add Ticket
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