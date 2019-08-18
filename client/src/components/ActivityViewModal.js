import React, { Component, Fragment } from 'react';
import ScoreCard from './ScoreCard';
import ActivityChart from './charts/ActivityChart';
import BarComponent from './charts/BarComponent';
import OuraProgress from './charts/OuraProgress';
import {
    Toast,
    ToastBody,
    Modal,
    ModalBody,
    ModalHeader,
    ToastHeader
} from 'reactstrap';

class ActivityViewModal extends Component {
    state = {
        modal: false
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    get_color = score => { return score > 65 ? 'primary' : 'danger' }

    get_subtext = score => { 
        if(score >= 85){
            return 'Optimal'
        } else if (score >= 65){
            return 'Good'
        } else {
            return 'Pay Attention'
        }
    }

    modalBody = () => {
        if(this.props.activity){
            var low_mins = this.props.activity.low;
            var medium_mins = this.props.activity.medium;
            var high_mins = this.props.activity.high;
            var low_text = `Low ${Math.round(low_mins / 60)}hrs ${Math.round(low_mins % 60)}mins`;
            var medium_text = `Medium ${Math.round(medium_mins / 60)}hrs ${Math.round(medium_mins % 60)}mins`;
            var high_text = `High ${Math.round(high_mins / 60)}hrs ${Math.round(high_mins % 60)}mins`;
            return (
                <Fragment>
                    <Toast className='mw-100'>
                        <ToastBody className='my-3 text-center d-flex flex-column'>
                            <h6 className='text-primary'>{this.props.formatted_date.toUpperCase()}</h6>
                            <div className='mt-3 d-flex flex-column'>
                                <h6 className='text-muted my-0'>ACTIVITY</h6>
                                <h1>{this.props.activity.score}</h1>
                            </div>
                        </ToastBody>
                    </Toast>
                    <Toast className='mx-auto mw-100 p-4 mt-2'>
                        <ToastBody className='d-flex'>
                            <div className='text-center w-50 d-flex flex-column'>
                                <span className='my-2 small text-muted'>TOTAL BURN</span>
                                <h4 className='mx-auto d-inline-block'>{Math.round(this.props.activity.cal_total).toLocaleString()}</h4>
                            </div>
                            <div style={{ borderLeft: '1px solid #ccc' }} className='text-center w-50 d-flex flex-column'>
                                <span className='my-2 small text-muted'>STEPS</span>
                                <h4 className='mx-auto d-inline-block'>{Math.round(this.props.activity.steps).toLocaleString()}</h4>
                            </div>
                        </ToastBody>
                    </Toast>
                    <Toast className='mw-100'>
                        <ToastHeader>
                            Activity contributors
                        </ToastHeader>
                        <ToastBody>
                            <OuraProgress title='Stay Active'
                                          subtext={`${Math.floor(this.props.activity.inactive / 60)}h ${Math.floor(this.props.activity.inactive % 60)}m inactivity`}
                                          val={this.props.activity.score_stay_active}
                                          color={this.get_color(this.props.activity.score_stay_active)}
                                        />
                            <OuraProgress title='Move Every Hour'
                                          subtext={`${this.props.activity.inactivity_alerts} alert${this.props.activity.inactivity_alerts !== 1 ? 's' : ''}`}
                                          val={this.props.activity.score_move_every_hour}
                                          color={this.get_color(this.props.activity.score_move_every_hour)}
                                        />
                            <OuraProgress title='Meet Daily Goals'
                                          subtext={this.get_subtext(this.props.activity.score_meet_daily_targets)}
                                          val={this.props.activity.score_meet_daily_targets}
                                          color={this.get_color(this.props.activity.score_meet_daily_targets)}
                                        />
                            <OuraProgress title='Training Frequency'
                                          subtext={this.get_subtext(this.props.activity.score_training_frequency)}
                                          val={this.props.activity.score_training_frequency}
                                          color={this.get_color(this.props.activity.score_training_frequency)}
                                        />
                            <OuraProgress title='Training Volume'
                                          subtext={this.get_subtext(this.props.activity.score_training_volume)}
                                          val={this.props.activity.score_training_volume}
                                          color={this.get_color(this.props.activity.score_training_volume)}
                                        />
                            <OuraProgress title='Recovery Time'
                                          subtext={this.get_subtext(this.props.activity.score_recovery_time)}
                                          val={this.props.activity.score_recovery_time}
                                          color={this.get_color(this.props.activity.score_recovery_time)}
                                        />
                        </ToastBody>
                    </Toast>
                    <ActivityChart data={this.props.activity.met_1min}
                                   day_start={this.props.activity.day_start}
                                   day_end={this.props.activity.day_end}
                                />
                    <Toast className='my-2 mw-100'>
                        <ToastBody>
                            <BarComponent color='rgba(239, 4, 4, 0.85)' value={high_mins} text={high_text} />
                            <BarComponent color='rgba(253, 100, 100, 0.75)' value={medium_mins} text={medium_text} />
                            <BarComponent color='rgba(254, 219, 219, 0.75)' value={low_mins} text={low_text} />
                        </ToastBody>
                    </Toast>
                </Fragment>
            )
        } else {
            return (
                <div className='w-100 text-center'>
                    Can't find what you're looking for... >.>
                </div>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <div onClick={this.toggle} className='h-100 pointer'>
                    <ScoreCard data={this.props.activity} data_type='Activity' />
                </div>

                <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                            <span>{this.props.name}</span>
                    </ModalHeader>                    
                    <ModalBody>
                            { this.modalBody() }
                    </ModalBody>
                </Modal>
            </Fragment>
        );
    }
}

export default ActivityViewModal;