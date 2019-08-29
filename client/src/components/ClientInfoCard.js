import React, { Component } from 'react';
import {
    Toast,
    ToastBody,
    ToastHeader
} from 'reactstrap';

class ClientInfoCard extends Component {
    render() {
        return (
            <Toast className='w-100 h-100'>
                <ToastHeader className='d-block'>
                    <h1 className='text-muted text-center small my-2'>Health Data</h1>
                </ToastHeader>
                <ToastBody className='d-flex flex-column'>
                    <div className='d-flex'>
                        <div className='my-2 text-center height-80 w-50 d-flex flex-column'>
                            <span className='my-2 small text-muted'>RMR</span>
                            <h4 className='mx-auto d-inline-block my-auto'>{this.props.client.data[0].meta.RMR.toLocaleString()}</h4>
                        </div>
                        <div style={{ borderLeft: '1px solid #ccc' }} className='my-2 text-center height-80 w-50 d-flex flex-column'>
                            <span className='my-2 small text-muted'>Metabolic Type</span>
                            <h6 className='mx-auto d-inline-block my-auto px-2'>{this.props.client.Metabolic_Type}</h6>
                        </div>
                    </div>
                </ToastBody>
            </Toast>
        );
    }
}

export default ClientInfoCard;