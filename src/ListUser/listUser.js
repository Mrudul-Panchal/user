import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';

class List extends React.Component {
    componentDidMount() {
        this.props.getAllUsers();
    }

    handleDeleteUser(id){
        return (e) =>
        this.props.deleteUser(id);
    }

    render(){
        const {user, users} = this.props;
        return (
            <div>
                <h1>Hi {user.firstName}</h1>
                <h3>All user are:</h3>
                {users.loading && <emm>Loading</emm>}
                {users.error && <emm>error</emm>}
                {users.items && 
                <ul>
                    {users.items.map((users, index) =>
                    <li key={user.id}>
                        {user.firstName + ' ' + user.lastName}
                        {
                            user.deleting ? <em>deleting</em> : <span> - <a onClick = {this.handleDeleteUser(user.id)}>Delete</a></span>
                        }
                    </li>)}
                </ul>
                }
                <p>
                    <Link to="/login">logout</Link>
                </p>
            </div>
            );
        }
}

function mapState(state){
    const {user, authentication } = state;
    const { user } = authentication;
    return {user, users};
}

const actionCreators = {
    getUsers : userActions.getAll,
    deleteUser : userActions.delete
}

const connectedListPage = connect(mapState, actionCreators)(HomePage);
export { connectedListPage as ListPage };