import React, { Component } from 'react';
import { removeClient, updateClientProfile } from '../actions/clientActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import LineBreak from './LineBreak';
import moment from 'moment';
import { sendEmail } from '../actions/clientActions';
import validator from 'email-validator';
import Alerts from './Alerts';
import {
    Col,
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Row,
    Form,
    FormGroup,
    Label,
    Container,
    Input,
    Button
} from 'reactstrap';

class UserProfileBody extends Component {

    state = {
        activeTab: '1',
        msg: null,
        visible: true,
        age: moment().diff(moment(this.props.client.birthday).format('YYYY-MM-DD'), 'years'),
        medications: this.props.client.medications,
        gender: this.props.client.gender,
        Weight: this.props.client.data[0].meta.Weight,
        Water_Intake: this.props.client.Water_Intake,
        BMI: this.props.client.data[0].meta.BMI,
        Body_Fat_Percentage: this.props.client.data[0].meta.Body_Fat_Percentage,
        RMR: this.props.client.data[0].meta.RMR,
        LDL: this.props.client.data[0].meta.LDL,
        HDL: this.props.client.data[0].meta.HDL,
        TC: this.props.client.data[0].meta.TC,
        Trigs: this.props.client.data[0].meta.Trigs,
        Blood_Glucose: this.props.client.data[0].meta.Blood_Glucose,
        Hemoglobin: this.props.client.data[0].meta.Hemoglobin,
        email: this.props.client.email,
        birthday: this.props.client.birthday
    };
    
    toggle = tab => {
        if (this.state.activeTab !== tab) {
            this.setState({ activeTab: tab });
        }
    }

    deleteClient = () => {
        const { id } = this.state.client;
        if(window.confirm('You are about to delete this client, are you sure you want to delete them and all their data?')){
            this.props.removeClient(id, this.props.history);
        }
    }

    checkInt = (element, int) => {
        var parsedInt = parseFloat(int.replace(/,/g, ''));
        if(int === ''){
            element.classList.remove('is-valid');
            element.classList.remove('is-invalid');
        } else if(parsedInt){
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        } else {
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
        }
    }

    checkEmail = (element, email) => {
        if(email === ''){
            element.classList.remove('is-valid');
            element.classList.remove('is-invalid');
        } else if(validator.validate(email)){
            element.classList.add('is-valid');
            element.classList.remove('is-invalid');
        } else if(!validator.validate(email)){
            element.classList.add('is-invalid');
            element.classList.remove('is-valid');
        }
    }

    onChange = e => {
        var item = {};
        if(
            e.target.name !== 'medications' &&
            e.target.name !== 'gender' &&
            e.target.name !== 'birthday' &&
            e.target.name !== 'email'
        ){
            this.checkInt(e.target, e.target.value);
        } else if (e.target.name === 'email'){
            this.checkEmail(e.target, e.target.value);
        }
        if(e.target.value === ''){
            if(this.props.client[e.target.name]){
                item[e.target.name] = this.props.client[e.target.name]
            } else if (this.props.client.data[0].meta[e.target.name]){
                item[e.target.name] = this.props.client.data[0].meta[e.target.name]
            } else {
                console.log('Something went wrong setting state for component');
            }
        } else item[e.target.name] = e.target.value;
        this.setState({ ...item });
    };

    parseInput = input => {
        return parseFloat(input.toString().replace(/,/g, ''));
    }

    save = () => {
        // Get items from state
        var {
            medications, gender, Weight, 
            Water_Intake, BMI, Body_Fat_Percentage, 
            RMR, LDL, HDL, TC, Trigs, Blood_Glucose, 
            Hemoglobin, email, birthday
        } = this.state;

        // Look for errors
        var errors = [];

        // Parse what we need to parse
        Weight = this.parseInput(Weight);
        Water_Intake = this.parseInput(Water_Intake);
        BMI = this.parseInput(BMI);
        Body_Fat_Percentage = this.parseInput(Body_Fat_Percentage);
        RMR = this.parseInput(RMR);
        LDL = this.parseInput(LDL);
        HDL = this.parseInput(HDL);
        TC = this.parseInput(TC);
        Trigs = this.parseInput(Trigs);
        Blood_Glucose = this.parseInput(Blood_Glucose);
        Hemoglobin = this.parseInput(Hemoglobin);

        if(
            !Weight || !Water_Intake || !BMI ||
            !Body_Fat_Percentage || !RMR || !LDL ||
            !HDL || !TC || !Trigs || !Blood_Glucose ||
            !Hemoglobin
        ) {
            errors.push({ msg: 'Invalid input' });
        } else if (!validator.validate(email)){
            errors.push({ msg: 'Invalid email' })
        }

        if(errors.length > 0){
            this.setState({ msg: errors[0].msg });
        } else {
            const data = {
                medications, gender, Weight, 
                Water_Intake, BMI, Body_Fat_Percentage, 
                RMR, LDL, HDL, TC, Trigs, Blood_Glucose, 
                Hemoglobin, email, birthday,
                client_id: this.props.client.id
            }
            this.props.updateClientProfile(data)
                .then(() => this.setState({ msg: 'Success!' }))
        }
    }

    authenticateViaEmail = () => {
        const { id, email } = this.props.client;

        this.props.sendEmail(id, email);
    }

    

    getAlerts = () => {
        var color = this.state.msg === 'Success!' ? 'success' : 'danger';
        return <Alerts color={color} msg={this.state.msg} />
    }

    render() {
        const label = { width: '60px' };
        const mdLabel = { width: '130px' };
        return (
            <Container>
                <Row>
                    <Col sm={{size: 12}} md={{size: 4}} className='h-100 p-5 rounded-border mb-4'>
                        <h2 className='my-2 text-dark-blue text-center open-sans'>
                            {this.props.client.firstname + ' ' + this.props.client.lastname}
                        </h2>
                        <p className='my-2 text-center text-muted font-weight-bold'>
                            {this.props.client.Metabolic_Type.toUpperCase()}
                        </p>
                        <LineBreak sm/>
                        <div className='my-4 text-center'>
                            <h6>Notes</h6>
                            <Input type='textarea' name='medications' onChange={this.onChange} placeholder={this.props.client.medications} className='text-muted'/>
                        </div>
                        { this.getAlerts() }
                        <Button outline
                                className='open-sans my-4 d-block custom-outline-btn' 
                                color='success'
                                onClick={this.save}>
                            Save
                        </Button>
                    </Col>
                    <Col sm={{size: 0}} md={{size: 1}}></Col>
                    <Col className='w-100' sm={{size: 12}} md={{size: 7}}>
                        <Nav tabs>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                         onClick={() => { this.toggle('1'); }}
                                        >
                                    Profile
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                                         onClick={() => { this.toggle('2'); }}
                                        >
                                    Settings
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row className='my-4 px-3'>
                                    <Col md={{size:12}} className='my-2 rounded-border p-4'>
                                        <h5 className='mb-4 open-sans text-dark-blue'>Smart Scale</h5>
                                        <Form className='px-3'>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>WEIGHT:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='Weight' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Weight + ' lbs'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>WATER INTAKE:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='Water_Intake' className='ml-1 text-muted' placeholder={this.props.client.Water_Intake + ' oz'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>BODY MASS INDEX:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='BMI' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.BMI + ' kg/m2'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>BODY FAT PERCENTAGE:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='Body_Fat_Percentage' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Body_Fat_Percentage + ' %'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>BASEL METABOLIC RATE:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='RMR' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.RMR.toLocaleString() + ' cal'} />
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                    <Col md={{size:12}} className='my-2 rounded-border p-4'>
                                        <h5 className='mb-3 open-sans text-dark-blue'>Lipid Profile</h5>
                                        <Form className='px-3'>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'LOW DENSITY LIPID PROFILE (LDL):'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='LDL' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.LDL + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'HIGH DENSITY LIPID PROFILE (HDL):'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='HDL' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.HDL + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'TOTAL CHOLESTEROL:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='TC' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.TC + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='my-auto small text-dark-blue font-weight-bold'>{'R. Cool/HDL Ratio:'}</Label>
                                                <h6 className='my-auto ml-3 text-muted mx-5'>{this.props.client.data[0].meta.Ratio}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'TRIGLYCERIDES:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='Trigs' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Trigs + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'BLOOD GLUCOSE:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='Blood_Glucose' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Blood_Glucose + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'HEMOGLOBIN:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='Hemoglobin' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Hemoglobin + ' g/dL'} />
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row className='my-4 px-3'>
                                    <Col md={{size:12}} className='my-2 rounded-border p-4'>
                                        <h5 className='mb-3 open-sans text-dark-blue'>Settings</h5>
                                        <Form className='px-3'>
                                            <FormGroup row className='mb-2'>
                                                <Label style={label} className='small text-dark-blue font-weight-bold'>{'AGE:'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.state.age}<span className='small'>{' years'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='my-3'>
                                                <Label style={label} className='small text-dark-blue font-weight-bold my-auto'>EMAIL:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' onChange={this.onChange} name='email' className='ml-1 text-muted' placeholder={this.props.client.email} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4 d-flex justify-content-between'>
                                                <Label style={label} className='my-auto small text-dark-blue font-weight-bold'>{'ÖURA:'}</Label>
                                                <Button outline 
                                                        className='mr-3 open-sans my-4 d-block custom-outline-btn' 
                                                        color='success'
                                                        onClick={this.authenticateViaEmail}>
                                                    Authenticate
                                                </Button>
                                            </FormGroup>
                                            <FormGroup row className='my-3'>
                                                <Label style={label} className='small text-dark-blue font-weight-bold my-auto'>SEX:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='select'
                                                            name='gender'
                                                            value={this.state.gender} 
                                                            className='ml-1 text-muted'
                                                            onChange={this.onChange}>
                                                        <option>Male</option>
                                                        <option>Female</option>
                                                        <option>Other</option>
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-3'>
                                                <Label style={label} className='small text-dark-blue font-weight-bold my-auto'>BIRTHDAY:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='date'
                                                            name='birthday'
                                                            defaultValue={this.props.client.birthday} 
                                                            className='ml-1 text-muted'
                                                            onChange={this.onChange} />
                                                </Col>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    retreats: state.retreats
})

export default withRouter(connect(
    mapStateToProps,
    { removeClient, sendEmail, updateClientProfile }
)(UserProfileBody));