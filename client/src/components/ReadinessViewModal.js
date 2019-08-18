import React, { Component, Fragment } from 'react';
import ScoreCard from './ScoreCard';
import SleepChart from './charts/SleepChart';
import OuraProgress from './charts/OuraProgress';
import {
    Toast,
    ToastBody,
    ToastHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';

class ReadinessViewModal extends Component {
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

    getSleepRelatedGraphs = () => {
        if(this.props.sleep){
            var rmssd_array = this.props.sleep.rmssd_5min.filter(ele => ele !== 0);
            var avg_variability = Math.floor(rmssd_array.reduce((a, b) => { return a += b }) / rmssd_array.length);
            var hr_array = this.props.sleep.hr_5min.filter(ele => ele !== 0);
            var avg_hr = Math.floor(hr_array.reduce((a, b) => { return a += b }) / hr_array.length);
            return (
                <Fragment>
                    <SleepChart title='Heart Rate Variability' 
                                data={this.props.sleep.rmssd_5min}
                                name={this.props.name}
                                bedtime_start={this.props.sleep.bedtime_start}
                                bedtime_end={this.props.sleep.bedtime_end}
                            />
                    <Toast className='mx-auto mw-100 p-4 mt-2'>
                        <ToastBody className='d-flex flex-column'>
                            <div className='d-flex'>
                                <div className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>AVERAGE</span>
                                    <h4 className='mx-auto d-inline-block'>{avg_variability + ' ms'}</h4>
                                </div>
                                <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>MAX</span>
                                    <h4 className='mx-auto d-inline-block'>{Math.max(...this.props.sleep.rmssd_5min) + ' ms'}</h4>
                                </div>
                            </div>
                        </ToastBody>
                    </Toast>
                    <SleepChart title='Heart Rate' 
                                data={this.props.sleep.hr_5min}
                                name={this.props.name}
                                bedtime_start={this.props.sleep.bedtime_start}
                                bedtime_end={this.props.sleep.bedtime_end}
                            />
                    <Toast className='mx-auto mw-100 p-4 mt-2'>
                        <ToastBody className='d-flex flex-column'>
                            <div className='d-flex'>
                                <div className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>AVERAGE</span>
                                    <h4 className='mx-auto d-inline-block'>{avg_hr + ' bpm'}</h4>
                                </div>
                                <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>MIN</span>
                                    <h4 className='mx-auto d-inline-block'>{this.props.sleep.hr_lowest + ' bpm'}</h4>
                                </div>
                            </div>
                        </ToastBody>
                    </Toast>
                </Fragment>
            )
        }
    }

    getSleepRelatedTitle = () => {
        if(this.props.sleep){
            return (
                <Toast className='mx-auto mw-100 p-4 mt-2'>
                    <ToastBody className='d-flex flex-column'>
                        <div className='d-flex'>
                            <div className='my-2 text-center w-50 d-flex flex-column'>
                                <span className='my-2 small text-muted'>RESTING HEART RATE</span>
                                <h4 className='mx-auto d-inline-block'>{this.props.sleep.hr_lowest + ' bpm'}</h4>
                            </div>
                            <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center w-50 d-flex flex-column'>
                                <span className='my-2 small text-muted'>HEART RATE VARIABILITY</span>
                                <h4 className='mx-auto d-inline-block'>{this.props.sleep.rmssd + ' ms'}</h4>
                            </div>
                        </div>
                        <div className='d-flex' style={{ borderTop: '1px solid #ccc' }}>
                            <div className='my-2 text-center w-50 d-flex flex-column'>
                                <span className='my-2 small text-muted'>BODY TEMPERATURE</span>
                                <h4 className='mx-auto d-inline-block'>
                                    {(Math.round((this.props.sleep.temperature_delta * (9/5))*100)/100) > 0 ? '+' : ''}
                                    {(Math.round((this.props.sleep.temperature_delta * (9/5))*100)/100) + ' ˚F'}
                                </h4>
                            </div>
                            <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center w-50 d-flex flex-column'>
                                <span className='my-2 small text-muted'>RESPIRATORY RATE</span>
                                <h4 className='mx-auto d-inline-block'>
                                    {(Math.round(this.props.sleep.breath_average*10)/10) + ' / min'}
                                </h4>
                            </div>
                        </div>
                    </ToastBody>
                </Toast>
            )
        }
    }

    modalBody = () => {
        if(this.props.readiness){
            return (
                <Fragment>
                    <Toast className='mw-100'>
                        <ToastBody className='my-3 text-center d-flex flex-column'>
                            <h6 className='text-primary'>{this.props.formatted_date.toUpperCase()}</h6>
                            <div className='mt-3 d-flex flex-column'>
                                <h6 className='text-muted my-0'>READINESS</h6>
                                <h1>{this.props.readiness.score}</h1>
                            </div>
                        </ToastBody>
                    </Toast>
                    { this.getSleepRelatedTitle() }

                    <Toast className='mw-100'>
                        <ToastHeader>
                            Sleep contributors
                        </ToastHeader>
                        <ToastBody>
                            <OuraProgress title='Previous Night'
                                          subtext={`Sleep score ${this.props.readiness.score_previous_night}`}
                                          val={this.props.readiness.score_previous_night}
                                          color={this.get_color(this.props.readiness.score_previous_night)}
                                        />
                            <OuraProgress title='Sleep Balance'
                                          subtext={this.get_subtext(this.props.readiness.score_sleep_balance)}
                                          val={this.props.readiness.score_sleep_balance}
                                          color={this.get_color(this.props.readiness.score_sleep_balance)}
                                        />
                            <OuraProgress title='Activity Balance'
                                          subtext={this.get_subtext(this.props.readiness.score_activity_balance)}
                                          val={this.props.readiness.score_activity_balance}
                                          color={this.get_color(this.props.readiness.score_activity_balance)}
                                        />
                            <OuraProgress title='Body Temperature'
                                          subtext={this.get_subtext(this.props.readiness.score_temperature)}
                                          val={this.props.readiness.score_temperature}
                                          color={this.get_color(this.props.readiness.score_temperature)}
                                        />
                            <OuraProgress title='Resting Heart Rate'
                                          subtext={`${this.props.sleep.hr_lowest} bpm`}
                                          val={this.props.readiness.score_resting_hr}
                                          color={this.get_color(this.props.readiness.score_resting_hr)}
                                        />
                            <OuraProgress title='Recovery Index'
                                          subtext={this.get_subtext(this.props.readiness.score_recovery_index)}
                                          val={this.props.readiness.score_recovery_index}
                                          color={this.get_color(this.props.readiness.score_recovery_index)}
                                        />
                        </ToastBody>
                    </Toast> 

                    { this.getSleepRelatedGraphs() }
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
                    <ScoreCard data={this.props.readiness} data_type='Readiness' />
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

export default ReadinessViewModal;