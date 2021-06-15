import React, { Component } from 'react';

class UrlForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      message: false,
      long_url: '',
      title: '',
    };
  }

  validateInputs = () => {
    if (!this.state.long_url || !this.state.title) {
      (this.setState({message: true}))
      return false
    } else {
      this.setState({message: false})
      return true
    }
  }

  handleNameChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.validateInputs()) {
      return
    } else {
    const newUrl = {
      long_url: this.state.long_url,
      title: this.state.title
    }
    fetch('http://localhost:3001/api/v1/urls', {
      method: 'POST',
      body: JSON.stringify(newUrl),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => this.props.addUrl(data))
      .catch(error => error.message)
    this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({title: '', long_url: ''});
  }

  render() {
    return (
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={this.state.title}
          onChange={e => this.handleNameChange(e)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='long_url'
          value={this.state.long_url}
          onChange={e => this.handleNameChange(e)}
        />
        {this.state.message && <p>Please fill out both input fields</p>}
        <button onClick={e => this.handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
    )
  }
}

export default UrlForm;
