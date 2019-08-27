import React, { Component, Fragment } from 'react';

class LineBreak extends Component {

    get_body = () => {
        if(this.props.sm){
            return (
                <div className='d-flex justify-content-center my-2'>
                    <p className='d-inline-block mx-1 my-auto'>.</p>
                    <p className='d-inline-block mx-1 my-auto'>.</p>
                    <p className='d-inline-block mx-1 my-auto'>.</p>
                </div>
            )
        } else {
            return (
                <div className='d-flex justify-content-center my-5'>
                    <h4 className='d-inline-block mx-4'>.</h4>
                    <h4 className='d-inline-block mx-4'>.</h4>
                    <h4 className='d-inline-block mx-4'>.</h4>
                </div>
            )
        }
    }

    render() {
        return (
            <Fragment>
                {this.get_body()}
            </Fragment>
        );
    }
}

export default LineBreak;