import React, { Component } from 'react';
import { removeClient } from '../actions/clientActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import LineBreak from './LineBreak';
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
    Container
} from 'reactstrap';

class UserProfileBody extends Component {

    state = {
        activeTab: '1'
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

    render() {
        console.log(this.props.client);
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
                            <p>{this.props.client.medications}</p>
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
                                    <Col md={{size:12}} className='my-2 rounded-border'>
                                        <h5 className='my-3 open-sans text-dark-blue'>Smart Scale</h5>
                                        <Form className='px-3'>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>WEIGHT:</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.Weight}<span className='small'>{' lbs'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>WATER INTAKE:</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.Water_Intake}<span className='small'>{' oz'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>BODY MASS INDEX:</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.BMI}<span className='small'>{' kg/m2'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>BODY FAT PERCENTAGE:</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.Body_Fat_Percentage}<span className='small'>{' %'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>BASEL METABOLIC RATE:</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.RMR.toLocaleString()}<span className='small'>{' cal'}</span></h6>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                    <Col md={{size:12}} className='my-2 rounded-border'>
                                        <h5 className='my-3 open-sans text-dark-blue'>Lipid Profile</h5>
                                        <Form className='px-3'>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>{'LOW DENSITY LIPID PROFILE (LDL):'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.LDL}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>{'HIGH DENSITY LIPID PROFILE (HDL):'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.HDL}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>{'TOTAL CHOLESTEROL:'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.TC}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>{'R. Cool/HDL Ratio:'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.Ratio}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>{'TRIGLYCERIDES:'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.Ratio}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>{'BLOOD GLUCOSE:'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.Blood_Glucose}<span className='small'>{' mg/dL'}</span></h6>
                                            </FormGroup>
                                            <FormGroup row className='mb-2'>
                                                <Label className='small text-dark-blue font-weight-bold'>{'HEMOGLOBIN:'}</Label>
                                                <h6 className='ml-3 text-muted'>{this.props.client.data[0].meta.Hemoglobin}<span className='small'>{' g/dL'}</span></h6>
                                            </FormGroup>
                                        </Form>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col>
                                        
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

export default withRouter(connect(
    null,
    { removeClient }
)(UserProfileBody));