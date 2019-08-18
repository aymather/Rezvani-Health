import React, { Component } from 'react';
import ActivityViewModal from './ActivityViewModal';
import ReadinessViewModal from './ReadinessViewModal';
import Cal from './Cal';
import SleepViewModal from './SleepViewModal';
import moment from 'moment';
import oura from 'oura';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import {
    Toast,
    ToastHeader,
    ToastBody,
    Spinner
} from 'reactstrap';
import { connect } from 'react-redux';

class OuraScores extends Component {
    state = {
        day: new moment().format('YYYY-MM-DD'),
        sleep: null,
        readiness: null,
        activity: null
    }

    changeDate = day => {
        this.getOuraData(this.props.client.oura_api.oura_access_token, day)
            .then(res => {
                this.setState({
                    sleep: res.sleep,
                    readiness: res.readiness,
                    activity: res.activity,
                    day,
                    sleep_switch: true,
                    readiness_switch: true,
                    activity_switch: true
                })
            })
    }

    getOuraData = (access_token, day) => {
        return new Promise((resolve) => {
            var oura_client = new oura.Client(access_token);
            var readiness_and_sleep_day = new moment(day).subtract(1, 'days').format('YYYY-MM-DD');
            var activity_day = new moment(day).format('YYYY-MM-DD');
            var sleep = oura_client.sleep(readiness_and_sleep_day, readiness_and_sleep_day);
            var readiness = oura_client.readiness(readiness_and_sleep_day, readiness_and_sleep_day);
            var activity = oura_client.activity(activity_day, activity_day);
            Promise.all([ sleep, readiness, activity ]
                .map(p => p.catch(() => undefined)))
                .then(data => {
                    const sleep = data[0] ? data[0].sleep[0] : null;
                    const readiness = data[1] ? data[1].readiness[0] : null;
                    const activity = data[2] ? data[2].activity[0] : null;
                    resolve({ sleep, readiness, activity })
                })
        })
    }

    get_icon = () => {
        if(this.props.client.isLoading) return <Spinner color='dark' className='mr-2' size='sm' />;
        return null;
    }

    getToastBody = () => {
        if(!this.props.client.isLoading){
            return (<ToastBody className='d-flex justify-content-around align-items-center h-100'>
                        <SleepViewModal name={this.props.client.firstname + ' ' + this.props.client.lastname} 
                                        sleep={this.props.switch ? this.props.client.sleep : this.state.sleep }
                                        className='mt-2'
                                        formatted_date={this.get_date()}
                                    />
                        <ActivityViewModal name={this.props.client.firstname + ' ' + this.props.client.lastname}
                                           activity={this.props.switch ? this.props.client.activity : this.state.activity }
                                           className='mt-2'
                                           formatted_date={this.get_date()}
                                        />
                        <ReadinessViewModal name={this.props.client.firstname + ' ' + this.props.client.lastname}
                                            readiness={this.props.switch ? this.props.client.readiness : this.state.readiness }
                                            sleep={this.props.switch ? this.props.client.sleep : this.state.sleep }
                                            className='mt-2'
                                            formatted_date={this.get_date()}
                                        />
                    </ToastBody>)
        } else {
            return (
                <ToastBody className='d-flex justify-content-center'>
                    <Spinner color='dark' />
                </ToastBody>)
        }
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

    render() {
        return (
            <Toast className='w-100 h-100'>
                <ToastHeader className='d-block' >
                    <h1 className='text-muted small text-center my-1'>ÖURA</h1>
                    <div className='d-flex justify-content-center align-items-center my-1'>
                        <div className='mx-3 pointer' onClick={this.dateBackward}>
                            <FontAwesomeIcon icon={faArrowLeft} color='#007bff' size='sm' />
                        </div>
                        <Cal text={this.get_date().toUpperCase()} changeDate={this.changeDate} day={this.state.day} />
                        <div className='mx-3 pointer' onClick={this.dateForward}>
                            <FontAwesomeIcon icon={faArrowRight} color='#007bff' size='sm' />
                        </div>
                    </div>
                </ToastHeader>
                { this.getToastBody() }
            </Toast>
        );
    }
}

const mapStateToProps = state => ({
    switch: state.clients.switch
})

export default connect(
    mapStateToProps
)(OuraScores);