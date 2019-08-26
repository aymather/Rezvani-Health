import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { removeClient } from '../actions/clientActions';
import { 
    Spinner,
    Form,
    FormGroup,
    Input,
    Button,
    Col
} from 'reactstrap';

class UserProfile extends Component {
    state = {
        client: null
    }

    deleteClient = () => {
        const { id } = this.state.client;
        if(window.confirm('You are about to delete this client, are you sure you want to delete them and all their data?')){
            this.props.removeClient(id, this.props.history);
        }
    }

    profile_body = () => {
        return (
            <Fragment>
                <h1 className='text-muted text-center my-4'>
                    {`${this.state.client.firstname} ${this.state.client.lastname}`}
                </h1>
                <Form style={{ padding: '0px 140px' }}>
                    <FormGroup row className="w-100 d-flex m-0 justify-content-between">
                        <label htmlFor="email" className="m-auto">Email</label>
                        <Col sm={10}>
                            <Input type="email" 
                                name="email" 
                                id="email" 
                                placeholder={this.state.client.email} />
                        </Col>
                    </FormGroup>
                    <div className='w-100 d-flex my-5 justify-content-between px-5'>
                        <h5 className='text-muted'>METABOLIC TYPE</h5>
                        <h5>{this.state.client.Metabolic_Type}</h5>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <Button color='dark' className='my-3 mx-4'>Submit</Button>
                        <Button color='danger' className='my-3 mx-4' onClick={this.deleteClient}>Delete</Button>
                    </div>
                </Form>
            </Fragment>
        )
    }

    clientToState = id => {
        var found = false;
        // Get the correct client from state
        for(let client of this.props.clients.clients){
            if(client.id === id){
                this.setState({ client });
                found = true;
                break;
            }
        }
        if(!found) this.setState({ client: 'x' })
    }

    componentDidMount(){
        if(!this.state.client &&
            !this.props.clients.isLoading &&
            this.props.clients.clients
         ) {
             const { id } = this.props.match.params;
             this.clientToState(id);
         }
    }

    componentDidUpdate(){
        if(!this.state.client &&
           !this.props.clients.isLoading &&
           this.props.clients.clients
        ) {
            const { id } = this.props.match.params;
            this.clientToState(id);
        }
    }

    get_body = () => {
        if(!this.state.client){
            return <div className='text-center'><Spinner color='dark' /></div>
        } else if (this.state.client === 'x'){
            return <h1>404 Not Found</h1>
        } else return this.profile_body();
    }

    render() {
        return (
            <div className='container'>
                { this.get_body() }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients
})

export default connect(
    mapStateToProps,
    { removeClient }
)(UserProfile);