import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CreatePost from '../components/CreatePost';
import { mockSendPost } from '../actions/post'; // change here to use non mock action

const sendPost = mockSendPost; // change here to use non mock action

// use like this:     <CreatePostContainer threadId="{thread._id}" /> ? I changed to get id from current thread instead /Henrik
class CreatePostContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackbarError: false,
      snackbarSuccess: false,
    };

    this.sendPostOnClick = this.sendPostOnClick.bind(this);
  }

  sendPostOnClick(body, callback) {
    if (body !== '') {
      const data = { body, threadId: this.props.threadId };
      this.props.sendPost(data, this.props.auth.token)
        .then(() => {
          if (this.props.error) {
            this.setState({ snackbarError: true });
          } else {
            callback();
            this.setState({ snackbarSuccess: true });
          }
        });
    }
  }

  render() {
    return (
      <CreatePost
        sendPostOnClick={this.sendPostOnClick}
        {...this.state}
        {...this.props}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendPost: (data, token) => dispatch(sendPost(data, token)),
});

const mapStateToProps = state => ({
  error: state.post.error,
  isWaiting: state.post.isWaiting,
  auth: state.auth,
  threadId: state.thread.currentThread._id,
});

CreatePostContainer.propTypes = ({
  error: PropTypes.string,
  isWaiting: PropTypes.bool.isRequired,
  sendPost: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
  auth: PropTypes.shape({
    token: PropTypes.string,
  }).isRequired,
});

CreatePostContainer.defaultProps = ({
  error: null,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePostContainer);