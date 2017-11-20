import React from 'react';
import PropTypes from 'prop-types';

class AddRepForm extends React.Component {
  constructor(props) {
    super(props);
    // hasSubmitted is used to make sure messages wont show before the first submition and is not the same as isWaiting
    this.state = { username: '', password: '', hasSubmitted: false };

    this.sendForm = props.sendForm;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: this.state.username,
      password: this.state.password,
      role: 'companyRep',
    };

    this.sendForm(data, this.props.token);
    this.setState({ hasSubmitted: true });
    this.setState({ username: '', password: '' });
  }

  printSubmitMessage() {
    if (this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>Could not add new representative. {this.props.error} </p>
      );
    } else if (!this.props.error && !this.props.isWaiting && this.state.hasSubmitted) {
      return (
        <p>representative added!</p>
      );
    }

    return undefined;
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Add representative to company</h1>
        <fieldset disabled={this.props.isWaiting}>
          <div>
            <label htmlFor="username">
              Username:
              <input
                id="username"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password:
              <input
                id="password"
                name="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <input type="submit" value="Add" />
          {this.printSubmitMessage()}
        </fieldset>
      </form>
    );
  }
}

AddRepForm.propTypes = {
  error: PropTypes.string,
  isWaiting: PropTypes.bool,
  token: PropTypes.string,
  sendForm: PropTypes.func.isRequired,
};

AddRepForm.defaultProps = {
  error: null,
  isWaiting: false,
  token: null,
};

export default AddRepForm;
