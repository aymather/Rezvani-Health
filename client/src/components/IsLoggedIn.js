import React, { Component } from 'react';
import GroupList from './GroupList';
import moment from 'moment';
import ClientList from './ClientList';
import classnames from 'classnames';
import { loadGroups } from '../actions/groupActions';
import { loadClients, loadClientOuraData } from '../actions/clientActions';
import { connect } from 'react-redux';
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Spinner
} from 'reactstrap';

class IsLoggedIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: '1',
            loadStatus: false
        };
    }

    componentDidMount(){
        this.props.loadClients();
        this.props.loadGroups();
    }

    // Check that we got the clients and that we're done loading
    componentDidUpdate(prevProps){
        var initialDay = new moment().format('YYYY-MM-DD');
        if(!this.props.clients.isLoading && 
            !this.state.loadStatus &&
            prevProps.clients.clients !== this.props.clients.clients){

                this.setState({
                    loadStatus: true
                }, () => {
                    for(let client of this.props.clients.clients){
                        this.props.loadClientOuraData(client.oura_api.oura_access_token, initialDay, client.id);
                    }
                })
        }
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getClientList = () => {
        return this.props.clients.isLoading ? <Spinner color='dark' /> : <ClientList />
    }

    getGroupList = () => {
        return this.props.groups.isLoading ? <Spinner color='dark' /> : <GroupList />
    }

    render() {
        return (
            <div className='container'>
                <Nav tabs>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >Clients</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }} 
                                >Groups</NavLink>
                    </NavItem>
                </Nav>
                <TabContent className='mb-3' activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        { this.getClientList() }
                    </TabPane>
                    <TabPane tabId="2">
                        { this.getGroupList() }
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients,
    groups: state.groups
})

export default connect(
    mapStateToProps, {
        loadClients,
        loadClientOuraData,
        loadGroups
    }
)(IsLoggedIn);