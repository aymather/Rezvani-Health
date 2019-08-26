import React, { Component, Fragment } from 'react';
import { createClient } from '../actions/clientActions';
import { connect } from 'react-redux';
import LineBreak from './LineBreak';
import { animateScroll as scroll } from 'react-scroll';
import validator from 'email-validator';
import {
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Row,
    Alert
} from 'reactstrap';

class NewClient extends Component {
    state = {
        modal: false,
        msg: null,
        visible: true,
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
        Trigs: '',
        Blood_Glucose: '',
        Hemoglobin: '',
        Body_Fat_Percentage: '',
        Weight: '',
        BMI: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    validateInputs = () => {

        var {   firstname, lastname,
                email, gender, birthday,
                medications, RMR,
                LDL, HDL, TC,
                Trigs, Blood_Glucose,
                Hemoglobin, Body_Fat_Percentage,
                Weight, BMI } = this.state;

        var errors = [];
        
        if(!firstname || !lastname || !email ||
        !gender || !birthday || !BMI ||
        !RMR || !LDL || !HDL || !TC ||
        !Trigs || !Blood_Glucose || !Hemoglobin ||
        !Body_Fat_Percentage || !Weight){

            errors.push({ msg: "Missing inputs"});
        }

        if(!validator.validate(email)){
            errors.push({ msg: "Invalid Email" });
        }

        RMR = parseFloat(RMR.replace(/,/g, ''));
        LDL = parseFloat(LDL.replace(/,/g, ''));
        HDL = parseFloat(HDL.replace(/,/g, ''));
        TC = parseFloat(TC.replace(/,/g, ''));
        BMI = parseFloat(BMI.replace(/,/g, ''));
        Trigs = parseFloat(Trigs.replace(/,/g, ''));
        Blood_Glucose = parseFloat(Blood_Glucose.replace(/,/g, ''));
        Hemoglobin = parseFloat(Hemoglobin.replace(/,/g, ''));
        Body_Fat_Percentage = parseFloat(Body_Fat_Percentage.replace(/,/g, ''));
        Weight = parseFloat(Weight.replace(/,/g, ''));

        if(!RMR || !LDL || !HDL || !TC ||
        !Trigs || !Blood_Glucose ||
        !Hemoglobin || !Body_Fat_Percentage ||
        !Weight || !BMI){
            
            errors.push({ msg: "Invalid input"});
        }

        if(errors.length > 0){
            this.setState({ msg: errors[0].msg, visible: true })
            scroll.scrollToTop();
            return { status: false };
        } else {
            return { 
                status: true,
                data: {
                    firstname, lastname,
                    email, gender, birthday,
                    medications, RMR,
                    LDL, HDL, TC,
                    Trigs, Blood_Glucose,
                    Hemoglobin, Body_Fat_Percentage,
                    Weight, BMI
                }
            };
        }
            
    }

    submitForm = e => {
        e.preventDefault();

        var state = this.validateInputs();

        if(state.status){
            // Get vars from validated state
            var { firstname, lastname, email, medications,
                    birthday, gender, RMR, HDL, LDL, TC,  
                    Trigs, Blood_Glucose, Hemoglobin,
                    Body_Fat_Percentage, Weight, BMI } = state.data;

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
                Trigs,
                Blood_Glucose, 
                Hemoglobin,
                Body_Fat_Percentage, 
                Weight,
                BMI
            }, this.props.history);

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
                Trigs: '',
                Blood_Glucose: '',
                Hemoglobin: '',
                Body_Fat_Percentage: '',
                Weight: '',
                BMI: ''
            });
        }

    }

    onDismiss = () => {
        this.setState({ visible: false });
    }

    getAlerts = () => {
        if(this.state.msg){
            return (
                <Alert color='danger'
                        isOpen={this.state.visible} 
                        toggle={this.onDismiss}
                >{ this.state.msg }</Alert>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <Form onSubmit={this.onSubmit} className='p-5'>
                    { this.getAlerts() }
                    <FormGroup className='my-4'>
                        <legend className='text-center text-muted my-3'>Personal Data</legend>
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
                    <LineBreak />
                    <Row form>
                        <legend className='text-center text-muted my-3'>Smart Scale Data</legend>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="Weight">Weight (lbs)</Label>
                                <Input onChange={this.onChange} type="text" name="Weight" id="Weight" placeholder="Weight" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="Body_Fat_Percentage">Body Fat Percentage</Label>
                                <Input onChange={this.onChange} type="text" name="Body_Fat_Percentage" id="Body_Fat_Percentage" placeholder="Body Fat Percentage" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="BMI">BMI (kg/m2)</Label>
                                <Input onChange={this.onChange} type="text" name="BMI" id="BMI" placeholder="Body Mass Index" />
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="RMR">Estimated Basel Metabolic Rate</Label>
                                <Input onChange={this.onChange} type="text" name="RMR" id="RMR" placeholder="RMR" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <LineBreak />
                    <FormGroup className='my-4'>
                        <legend className='text-center text-muted my-3'>Lipid Profile Data</legend>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="HDL">High Density Lipoprotein (mg/dL)</Label>
                                    <Input onChange={this.onChange} type="text" name="HDL" id="HDL" placeholder="HDL" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="LDL">Low Density Lipoprotein (mg/dL)</Label>
                                    <Input onChange={this.onChange} type="text" name="LDL" id="LDL" placeholder="LDL" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="TC">Total Cholesterol (mg/dL)</Label>
                                    <Input onChange={this.onChange} type="text" name="TC" id="TC" placeholder="TC" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Trigs">Triglycerides (mg/dL)</Label>
                                    <Input onChange={this.onChange} type="text" name="Trigs" id="Trigs" placeholder="Trigs" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row form>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Blood_Glucose">Blood Glucose (mg/dL)</Label>
                                    <Input onChange={this.onChange} type="text" name="Blood_Glucose" id="Blood_Glucose" placeholder="Blood Glucose" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="Hemoglobin">Hemoglobin (g/dL)</Label>
                                    <Input onChange={this.onChange} type="text" name="Hemoglobin" id="Hemoglobin" placeholder="Hemoglobin" />
                                </FormGroup>
                            </Col>
                        </Row>
                    </FormGroup>
                    <LineBreak />
                    <FormGroup className='my-4'>
                        <legend className='text-center text-muted my-3'>Other</legend>
                        <Label for="medications">Medications/Notes</Label>
                        <Input onChange={this.onChange} 
                               type="textarea" 
                               name="medications" 
                               id="medications"
                               placeholder='Are you on any medications? If so, what?'
                            />
                    </FormGroup>
                    <Button onClick={this.submitForm} 
                            color='dark'
                            style={{ marginTop: '2rem' }}
                            block
                    >Submit</Button>
                    </FormGroup>
                </Form>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    errors: state.error
})

export default connect(
    mapStateToProps,
    { createClient }
)(NewClient);