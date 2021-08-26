import React,{Component} from 'react';
import {Modal, Button, Row, Col, Form} from 'react-bootstrap';

export class EditDepModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch('https://localhost:44326/api/projects',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Id:event.target.DepartmentId.value,
                Name:event.target.DepartmentName.value
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
        return (
            <div className="container">
                <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                >
                    <Modal.Header clooseButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Project
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="DepartmentId">
                                        <Form.Label>Project Id</Form.Label>
                                        <Form.Control type="text" name="DepartmentId" required 
                                        disabled
                                        defaultValue={this.props.depid} 
                                        placeholder="ProjectId"/>
                                    </Form.Group>

                                    <Form.Group controlId="DepartmentName">
                                        <Form.Label>Project Name</Form.Label>
                                        <Form.Control type="text" name="DepartmentName" required 
                                        defaultValue={this.props.depname}
                                        placeholder="ProjectName"/>
                                    </Form.Group>

                                    <Form.Group>
                                        <Button variant="primary" type="submit">
                                            Update Project
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