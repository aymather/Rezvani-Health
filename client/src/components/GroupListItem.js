import React, { Component } from 'react';
import Cal from './Cal';
import { loadClientOuraData } from '../actions/clientActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
    ListGroupItem, 
    ListGroupItemHeading,
    Table,
    Spinner
} from 'reactstrap';
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class GroupListItem extends Component {
    state = {
        day: new moment().format('YYYY-MM-DD')
    }

    changeDate = day => {
        this.setState({ day: new moment(day).format('YYYY-MM-DD') })
    }

    get_group_members = () => {
        var group_members = [];
        for(let client_id of this.props.group.members){
            for(let client of this.props.clients.clients){
                if(client.id === client_id){
                    group_members.push(client);
                    break;
                }
            }
        }
        return group_members;
    }

    getItem = (member, type, item) => member[type] ? member[type][item].toLocaleString() : 'Pending...';

    getRow = member => {
        return (
            <tr key={member.id}>
                <th scope="row">{member.firstname + ' ' + member.lastname}</th>
                <td>{ !member.isLoading ? this.getItem(member, 'sleep', 'score') : <Spinner color='dark' /> }</td>
                <td>{ !member.isLoading ? this.getItem(member, 'activity', 'score') : <Spinner color='dark' /> }</td>
                <td>{ !member.isLoading ? this.getItem(member, 'readiness', 'score') : <Spinner color='dark' /> }</td>
                <td>{ !member.isLoading ? this.getItem(member, 'activity', 'steps') : <Spinner color='dark' /> }</td>
            </tr>
        )
    }

    getTable = () => {
        if(this.props.clients.isLoading) return (<Spinner color='dark' />);

        var group_members = this.get_group_members();
        if(group_members.length === 0) return (<span>{'Start by adding some group members :)'}</span>)

        return (
            <Table className='mt-3 p-3' borderless striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Sleep</th>
                        <th>Activity</th>
                        <th>Readiness</th>
                        <th>Steps</th>
                    </tr>
                </thead>
                <tbody>
                    { group_members.map(member => this.getRow(member)) }
                </tbody>
            </Table>
        )
    }

    changeDate = day => {
        this.setState({ day }, () => {
            for(let client of this.props.clients.clients){
                this.props.loadClientOuraData(client.oura_api.oura_access_token, day, client.id);
            }
        })
    }

    dateForward = () => this.changeDate((new moment(this.state.day).add(1, 'days').format('YYYY-MM-DD')))

    dateBackward = () => this.changeDate((new moment(this.state.day).subtract(1, 'days').format('YYYY-MM-DD')))
    
    get_date = () => {
        var mlist = [ "Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ];
        var date = new moment(this.state.day);
        var month = mlist[date.get('month')];
        var year = date.get('year');
        var day = date.get('date');
        return `${month} ${day}, ${year}`;
    }

    toGroupProfile = () => {
        this.props.history.push(`/group/${this.props.group.id}`);
    }

    render() {
        return (
            <ListGroupItem key={this.props.group.id} className="justify-content-between">
                <ListGroupItemHeading className='d-flex flex-column text-center'>
                    <div className='my-2 open-sans text-muted pointer darken-hover' onClick={this.toGroupProfile}>
                        {this.props.group.name}
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='mx-3 pointer' onClick={this.dateBackward}>
                            <FontAwesomeIcon icon={faArrowLeft} color='#007bff' size='sm' />
                        </div>
                        <Cal text={this.get_date().toUpperCase()} changeDate={this.changeDate} day={this.state.day} />
                        <div className='mx-3 pointer' onClick={this.dateForward}>
                            <FontAwesomeIcon icon={faArrowRight} color='#007bff' size='sm' />
                        </div>
                    </div>
                </ListGroupItemHeading>
                { this.getTable() }
            </ListGroupItem>
        );
    }
}

const mapStateToProps = state => ({
    clients: state.clients
})

export default withRouter(connect(
    mapStateToProps,
    { loadClientOuraData }
)(GroupListItem));