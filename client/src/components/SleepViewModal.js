import React, { Component, Fragment } from 'react';
import SleepChart from './charts/SleepChart';
import BarComponent from './charts/BarComponent';
import ScoreCard from './ScoreCard';
import OuraProgress from './charts/OuraProgress';
import {
    Toast,
    ToastBody,
    ToastHeader,
    Modal,
    ModalBody,
    ModalHeader
} from 'reactstrap';

class SleepViewModal extends Component {
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
        if(this.props.sleep){
            var awake_mins = this.props.sleep.awake / 60;
            var rem_mins = this.props.sleep.rem / 60;
            var light_mins = this.props.sleep.light / 60;
            var deep_mins = this.props.sleep.deep / 60;
            var awake_text = `AWAKE ${Math.floor(awake_mins / 60)}h ${Math.floor(awake_mins % 60)}m`;
            var rem_text = `REM ${Math.floor(rem_mins / 60)}h ${Math.floor(rem_mins % 60)}m`;
            var light_text = `LIGHT ${Math.floor(light_mins / 60)}h ${Math.floor(light_mins % 60)}m`;
            var deep_text = `DEEP ${Math.floor(deep_mins / 60)}h ${Math.floor(deep_mins % 60)}m`;
            return (
                <Fragment>
                    <Toast className='mw-100'>
                        <ToastBody className='my-3 text-center d-flex flex-column'>
                            <h6 className='text-primary'>{this.props.formatted_date.toUpperCase()}</h6>
                            <div className='mt-3 d-flex flex-column'>
                                <h6 className='text-muted my-0'>SLEEP</h6>
                                <h1>{this.props.sleep.score}</h1>
                            </div>
                        </ToastBody>
                    </Toast>
                    <Toast className='mx-auto mw-100 p-4 mt-2'>
                        <ToastBody className='d-flex flex-column'>
                            <div className='d-flex'>
                                <div className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>SLEEP EFFICIENCY</span>
                                    <h4 className='mx-auto d-inline-block'>{this.props.sleep.efficiency + '%'}</h4>
                                </div>
                                <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>RESTING HEART RATE</span>
                                    <h4 className='mx-auto d-inline-block'>{this.props.sleep.rmssd}</h4>
                                </div>
                            </div>
                            <div className='d-flex' style={{ borderTop: '1px solid #ccc' }}>
                                <div className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>TIME IN BED</span>
                                    <h4 className='mx-auto d-inline-block'>
                                        {Math.floor((this.props.sleep.duration / 60) / 60)}h
                                        {' '}
                                        {Math.floor((this.props.sleep.duration / 60) % 60)}m
                                    </h4>
                                </div>
                                <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>TOTAL SLEEP TIME</span>
                                    <h4 className='mx-auto d-inline-block'>
                                        {Math.floor((this.props.sleep.total / 60) / 60)}h
                                        {' '}
                                        {Math.floor((this.props.sleep.total / 60) % 60)}m
                                    </h4>
                                </div>
                            </div>
                        </ToastBody>
                    </Toast>
                    <Toast className='mw-100'>
                        <ToastHeader>
                            Sleep contributors
                        </ToastHeader>
                        <ToastBody>
                            <OuraProgress title='Total Sleep'
                                          subtext={`${Math.floor((this.props.sleep.total / 60) / 60)}h ${Math.floor((this.props.sleep.total / 60) % 60)}m`}
                                          val={this.props.sleep.score_total}
                                          color={this.get_color(this.props.sleep.score_total)}
                                        />
                            <OuraProgress title='Efficiency'
                                          subtext={`${this.props.sleep.efficiency}%`}
                                          val={this.props.sleep.score_efficiency}
                                          color={this.get_color(this.props.sleep.score_efficiency)}
                                        />
                            <OuraProgress title='Restfulness'
                                          subtext={this.get_subtext(this.props.sleep.score_disturbances)}
                                          val={this.props.sleep.score_disturbances}
                                          color={this.get_color(this.props.sleep.score_disturbances)}
                                        />
                            <OuraProgress title='REM sleep'
                                          subtext={this.get_subtext(this.props.sleep.score_rem)}
                                          val={this.props.sleep.score_rem}
                                          color={this.get_color(this.props.sleep.score_rem)}
                                        />
                            <OuraProgress title='Deep sleep'
                                          subtext={this.get_subtext(this.props.sleep.score_deep)}
                                          val={this.props.sleep.score_deep}
                                          color={this.get_color(this.props.sleep.score_deep)}
                                        />
                            <OuraProgress title='Latency'
                                          subtext={`${Math.round(this.props.sleep.score_deep / 60)}m`}
                                          val={this.props.sleep.score_latency}
                                          color={this.get_color(this.props.sleep.score_latency)}
                                        />
                        </ToastBody>
                    </Toast> 
                    <SleepChart title='Sleep Cycle' 
                                data={this.props.sleep.hypnogram_5min}
                                name={this.props.name}
                                bedtime_start={this.props.sleep.bedtime_start}
                                bedtime_end={this.props.sleep.bedtime_end}
                            />
                    <Toast className='my-2 mw-100'>
                        <ToastBody>
                            <BarComponent color='#E0EEEE' value={awake_mins} text={awake_text} />
                            <BarComponent color='#00FFFF' value={rem_mins} text={rem_text} />
                            <BarComponent color='#00B2EE' value={light_mins} text={light_text} />
                            <BarComponent color='#00688B' value={deep_mins} text={deep_text} />
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
                                    <span className='my-2 small text-muted'>AVERAGE BPMs</span>
                                    <h4 className='mx-auto d-inline-block'>{Math.round(this.props.sleep.hr_average).toLocaleString()}</h4>
                                </div>
                                <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center w-50 d-flex flex-column'>
                                    <span className='my-2 small text-muted'>LOWEST HR</span>
                                    <h4 className='mx-auto d-inline-block'>{Math.round(this.props.sleep.hr_lowest).toLocaleString()}</h4>
                                </div>
                            </div>
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
                    <ScoreCard data={this.props.sleep} data_type='Sleep' />
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

export default SleepViewModal;