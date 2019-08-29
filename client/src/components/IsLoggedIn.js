import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { loadGroups } from '../actions/groupActions';
import { loadRetreats } from '../actions/retreatActions';
import { loadClients, loadClientOuraData } from '../actions/clientActions';
import { connect } from 'react-redux';
import { Route } from "react-router-dom";
import ClientFinished from './ClientFinished';
import Home from './Home';
import NewClient from './NewClient';
import UserProfile from './UserProfile';
import SelectRetreat from './SelectRetreat';
import AppNavbar from './AppNavbar';
import GroupProfile from './GroupProfile';

class IsLoggedIn extends Component {
    state = {
        loadStatus: false
    }

    componentDidMount(){
        this.props.loadRetreats();
        this.props.loadClients();
        this.props.loadGroups();
    }

    // Check that we got the clients and that we're done loading
    componentDidUpdate(prevProps){
        if(
            this.props.retreats.selected_retreat.id &&
            !this.props.clients.isLoading && 
            !this.state.loadStatus &&
            prevProps.clients.clients !== this.props.clients.clients
        ){
            var initialDay = new moment().format('YYYY-MM-DD');
            this.setState({ loadStatus: true }, () => {
                for(let client of this.props.clients.clients){
                    this.props.loadClientOuraData(client.oura_api.oura_access_token, initialDay, client.id);
                }
            })
        }
    }

    render() {
        return (
            <Fragment>
                <AppNavbar />
                <div className='container'>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/new-client" component={NewClient} />
                    <Route exact path="/new-client/success" component={ClientFinished} />
                    <Route exact path="/view/:id" component={UserProfile} />
                    <Route exact path="/retreats" component={SelectRetreat} />
                    <Route exact path="/group/:id" component={GroupProfile} />
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients,
    groups: state.groups,
    retreats: state.retreats
})

export default connect(
    mapStateToProps, {
        loadClients,
        loadClientOuraData,
        loadGroups,
        loadRetreats
    }
)(IsLoggedIn);