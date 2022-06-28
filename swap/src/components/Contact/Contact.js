import React from 'react';
import axios from 'axios';
import style from  './Contact.css';
import appStyle from '../../pages/App.module.css';

class Contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      message: '',
      errorMessage: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form is submitted');
    const that = this;

    axios
      .post(
        '/ajax.php',
        {
          request: 'contact',
          name: this.state.name,
          email: this.state.email,
          message: this.state.message,
        },
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      )
      .then(function(response) {
        that.setState({errorMessage:response.data});
      })
      .catch((error) => {
          if( error.response ){
              that.setState({errorMessage:error.response.data});
          }
      });
  }
  
  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  render() {
    return (
      <div className='contact-form'>
        <div className={appStyle.container}>
          <div className='main-form'>
            <div className='left-form'>
              {this.state.errorMessage && (
                <p className={style.error}> {this.state.errorMessage} </p>
              )}
            </div>

            <div className='right-form'>
              <form onSubmit={this.handleSubmit}>
                <div className={style.form}>
                  <input
                    name='name'
                    id='name'
                    placeholder='Name'
                    value={this.state.name}
                    onChange={this.onChange}
                  ></input>
                  <input
                    name='email'
                    id='email'
                    placeholder='E-mail'
                    value={this.state.email}
                    onChange={this.onChange}
                  ></input>
                  <textarea
                    value={this.state.message}
                    onChange={this.onChange} 
                    name='message'
                    id='message'
                    rows='6'
                    placeholder='Message'
                  />

                  <button type='submit'>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
