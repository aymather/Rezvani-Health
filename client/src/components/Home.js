import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import ClientList from './ClientList';
import classnames from 'classnames';
import GroupList from './GroupList';
import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane,
    Spinner
} from 'reactstrap';

class Home extends Component {
    state = {
        activeTab: '1'
    }

    toggle = (tab) => {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    getClientList = () => {
        return this.props.clients.isLoading ? <div className='text-center my-5'><Spinner color='dark' /></div> : <ClientList />
    }

    getGroupList = () => {
        return this.props.groups.isLoading ? <div className='text-center my-5'><Spinner color='dark' /></div> : <GroupList />
    }

    render() {
        return (
            <Fragment>
                <h5 className='open-sans fade-in text-muted text-center mb-3'>{this.props.retreats.selected_retreat.name}</h5>
                <Nav tabs className='fade-in'>
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
                <TabContent className='mb-3 fade-in' activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        { this.getClientList() }
                    </TabPane>
                    <TabPane tabId="2">
                        { this.getGroupList() }
                    </TabPane>
                </TabContent>
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
    mapStateToProps
)(Home);