import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Wrapper';

const withErrorHandling = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };
        clearError = () => {
            this.setState({ error: null });
        };

        componentWillMount () {
            axios.interceptors.request.use(req => {
                this.clearError();
                return req;
            });
            axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error });
            })
        }
        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        modalClosed={this.clearError}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent { ...this.props }/>
                </Aux>
            )
        }
    }
}

export default withErrorHandling;
