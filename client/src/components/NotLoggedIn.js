import React, { Component } from 'react';
import {
    Jumbotron
} from 'reactstrap';
import AppLogo from './AppLogo';

class NotLoggedIn extends Component {
    render() {
        return (
            <div className='container'>
                <Jumbotron>
                    <div className='d-flex align-items-end'>
                        <AppLogo size='logo-wrap-lg' color='logo-black' className='mr-4'/>
                        <h1 className='ml-3 d-inline-block'>Rezvani Health</h1>
                    </div>
                    <hr className='my-5' />
                    <p>Please log in</p>
                </Jumbotron>
            </div>
        );
    }
}

export default NotLoggedIn;