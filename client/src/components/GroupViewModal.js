import React, { Component } from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody
} from 'reactstrap';
import SleepChart from './charts/SleepChart';

class GroupViewModal extends Component {
    state = {
        modal: false,
        data: null
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    componentWillReceiveProps({ data }) {
        this.setState({ data })
    }

    render() {
        return (
            <div className='d-inline-block'>
                <Button color='primary'
                        onClick={this.toggle}
                        >View</Button>

                <Modal size='lg' isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Group Modal</ModalHeader>
                    <ModalBody>
                        <SleepChart data={this.state.data}
                                    data_type='hr_5min'
                                    title='Heart Rate'
                                />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default GroupViewModal;