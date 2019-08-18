import React, { Component, Fragment } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row
} from 'reactstrap';
import { createClient } from '../actions/clientActions';
import { connect } from 'react-redux';

class AddClientModal extends Component {
    state = {
        modal: false,
        msg: null,
        firstname: '',
        lastname: '',
        email: '',
        birthday: '',
        gender: 'male',
        medications: '',
        RMR: '',
        HDL: '',
        LDL: '',
        TC: '',
        Ratio: '',
        Trigs: '',
        Blood_Glucose: '',
        Hemoglobin: '',
        Body_Fat_Percentage: '',
        Weight: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitForm = e => {
        e.preventDefault();

        // Get vars from state
        var { firstname, lastname, email, medications,
              birthday, gender, RMR, HDL, LDL, TC, Ratio,  
              Trigs, Blood_Glucose, Hemoglobin,
              Body_Fat_Percentage, Weight } = this.state;

        // Call action creator
        this.props.createClient({
            firstname, 
            lastname,
            medications,
            birthday,
            email, 
            gender,
            RMR, 
            HDL,
            LDL, 
            TC,
            Ratio, 
            Trigs,
            Blood_Glucose, 
            Hemoglobin,
            Body_Fat_Percentage, 
            Weight
        });

        this.setState({
            modal: false,
            msg: null,
            firstname: '',
            lastname: '',
            email: '',
            birthday: '',
            gender: 'male',
            medications: '',
            RMR: '',
            HDL: '',
            LDL: '',
            TC: '',
            Ratio: '',
            Trigs: '',
            Blood_Glucose: '',
            Hemoglobin: '',
            Body_Fat_Percentage: '',
            Weight: ''
        });

    }

    render() {
        return (
            <Fragment>
                <Button onClick={this.toggle} 
                        color='primary'
                >Create New Client +</Button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} unmountOnClose={false}>
                    <ModalHeader toggle={this.toggle}>Create Client</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="firstname">First Name</Label>
                                            <Input onChange={this.onChange} type="text" name="firstname" id="firstname" placeholder="First Name" />
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="lastname">Last Name</Label>
                                            <Input onChange={this.onChange} type="text" name="lastname" id="lastname" placeholder="Last Name" />
                                        </FormGroup>
                                    </Col>
                                </Row>
                            <FormGroup row>
                                <Label for="email" sm={2}>Email</Label>
                                <Col sm={10}>
                                    <Input onChange={this.onChange} type="email" name="email" id="email" placeholder="example@gmail.com" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label for="gender" sm={2}>Gender</Label>
                                <Col sm={10}>
                                    <Input onChange={this.onChange} type="select" name="gender" id="gender">
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup>
                                <Label for="birthday">Birthday</Label>
                                <Input
                                    type="date"
                                    name="birthday"
                                    id="birthday"
                                    placeholder="date placeholder"
                                    onChange={this.onChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="medications">Medications/Notes</Label>
                                <Input onChange={this.onChange} type="textarea" name="medications" id="medications" />
                            </FormGroup>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="RMR">Resting Metabolic Rate</Label>
                                        <Input onChange={this.onChange} type="text" name="RMR" id="RMR" placeholder="RMR" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="HDL">High Density Lipoprotein</Label>
                                        <Input onChange={this.onChange} type="text" name="HDL" id="HDL" placeholder="HDL" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="LDL">Low Density Lipoprotein</Label>
                                        <Input onChange={this.onChange} type="text" name="LDL" id="LDL" placeholder="LDL" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="TC">Total Cholesterol</Label>
                                        <Input onChange={this.onChange} type="text" name="TC" id="TC" placeholder="TC" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Trigs">Triglycerides</Label>
                                        <Input onChange={this.onChange} type="text" name="Trigs" id="Trigs" placeholder="Trigs" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Blood_Glucose">Blood Glucose</Label>
                                        <Input onChange={this.onChange} type="text" name="Blood_Glucose" id="Blood_Glucose" placeholder="Blood Glucose" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Hemoglobin">Hemoglobin</Label>
                                        <Input onChange={this.onChange} type="text" name="Hemoglobin" id="Hemoglobin" placeholder="Hemoglobin" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Body_Fat_Percentage">Body Fat Percentage</Label>
                                        <Input onChange={this.onChange} type="text" name="Body_Fat_Percentage" id="Body_Fat_Percentage" placeholder="Body Fat Percentage" />
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Weight">Weight (lbs)</Label>
                                        <Input onChange={this.onChange} type="text" name="Weight" id="Weight" placeholder="Weight" />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button onClick={this.submitForm} 
                                    color='dark'
                                    style={{ marginTop: '2rem' }}
                                    block
                            >Submit</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { createClient }
)(AddClientModal);