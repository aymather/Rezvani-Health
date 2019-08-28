import React, { Component } from 'react';
import { removeClient } from '../actions/clientActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import LineBreak from './LineBreak';
import moment from 'moment';
import { sendEmail } from '../actions/clientActions';
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
        gender: this.props.client.gender,
        age: moment().diff(moment(this.props.client.birthday).format('YYYY-MM-DD'), 'years'),

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

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    save = () => {
        console.log('Saved!');
    }

    authenticateViaEmail = () => {
        const { id, email } = this.props.client;

        this.props.sendEmail(id, email);
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
                            <p className='text-muted'>{this.props.client.medications}</p>
                        </div>
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
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Weight + ' lbs'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>WATER INTAKE:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.Water_Intake + ' oz'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>BODY MASS INDEX:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.BMI + ' kg/m2'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>BODY FAT PERCENTAGE:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Body_Fat_Percentage + ' %'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>BASEL METABOLIC RATE:</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.RMR.toLocaleString() + ' cal'} />
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
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.LDL + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'HIGH DENSITY LIPID PROFILE (HDL):'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.HDL + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'TOTAL CHOLESTEROL:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.TC + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='my-auto small text-dark-blue font-weight-bold'>{'R. Cool/HDL Ratio:'}</Label>
                                                <h6 className='my-auto ml-3 text-muted mx-5'>{this.props.client.data[0].meta.Ratio}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'TRIGLYCERIDES:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Trigs + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'BLOOD GLUCOSE:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Blood_Glucose + ' mg/dL'} />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row className='my-4'>
                                                <Label style={mdLabel} className='small text-dark-blue font-weight-bold my-auto'>{'HEMOGLOBIN:'}</Label>
                                                <Col className='ml-3'>
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.data[0].meta.Hemoglobin + ' g/dL'} />
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
                                                    <Input type='text' className='ml-1 text-muted' placeholder={this.props.client.email} />
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
                                            <FormGroup row>
                                                <Button outline 
                                                        className='open-sans my-4 d-block custom-outline-btn' 
                                                        color='success'
                                                        onClick={this.save}>
                                                    Save
                                                </Button>
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
    { removeClient, sendEmail }
)(UserProfileBody));