import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from 'reactstrap';
import GroupProfileBody from './GroupProfileBody';

class GroupProfile extends Component {
    state = {
        group: null
    }

    groupToState = id => {
        var found = false;
        // Get the correct group from application state
        for(let group of this.props.groups.groups){
            if(group.id === id){
                this.setState({ group });
                found = true;
                break;
            }
        }
        if(!found) this.setState({ group: 'x' })
    }

    componentDidMount(){
        if(!this.state.group &&
            !this.props.groups.isLoading &&
            this.props.groups.groups
         ) {
             const { id } = this.props.match.params;
             this.groupToState(id);
         }
    }

    componentDidUpdate(){
        if(!this.state.group &&
           !this.props.groups.isLoading &&
           this.props.groups.groups
        ) {
            const { id } = this.props.match.params;
            this.groupToState(id);
        }
    }

    get_body = () => {
        if(!this.state.group){
            return <div className='text-center'><Spinner color='dark' /></div>
        } else if (this.state.group === 'x'){
            return <h1>404 Not Found</h1>
        } else return <GroupProfileBody group={this.state.group} />;
    }

    render() {
        return (
            <div>
                { this.get_body() }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    groups: state.groups
})

export default connect(
    mapStateToProps
)(GroupProfile);