// modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { notification } from 'antd';

// // services
import { tokenVerify } from '../../helper/auth';
import AuthRepository from '../../repositories/AuthRepository';

let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

class Signup extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      userId: '',
      name: '',
      email: '',
      password: '',
      isShowPass: false,
      validation: [],
      isRegisterIssue: false,
      issueMessage: ''
    }
  }

  static async getInitialProps(ctx) {
    return { query: ctx.query };
  }

  componentDidMount() {
    let { auth } = this.props;
    let isValidToken = tokenVerify(auth);
    if (isValidToken) {
      Router.push('/chat');
    }
  }

  componentDidUpdate() {
    let { auth } = this.props;
    let isValidToken = tokenVerify(auth);
    if (isValidToken) {
      Router.push('/chat');
    }
  }

  nameChange = (name) => {
    let { validation } = this.state;
    let index = validation.indexOf('name');
    if (index >= 0) validation.splice(index, 1);
    this.setState({ name, validation });
    this.setState({ issueMessage: "", isRegisterIssue: false });
  }

  userIdChange = (userId) => {
    let { validation } = this.state;
    let index = validation.indexOf('userId');
    if (index >= 0) validation.splice(index, 1);
    this.setState({ userId, validation });
    this.setState({ issueMessage: "", isRegisterIssue: false });
  }

  emailChange = (email) => {
    let { validation } = this.state;
    let index = validation.indexOf('email');
    if (regEmail.test(email)) {
      if (index >= 0) validation.splice(index, 1);
    } else {
      if (index < 0) validation.push('email');
    }
    this.setState({ email, validation });
    this.setState({ issueMessage: "", isRegisterIssue: false });
  }

  passwordChange = (password) => {
    let { validation } = this.state;
    let index = validation.indexOf('password');
    if (password && regPass.test(password)) {
      if (index >= 0) validation.splice(index, 1);
      this.setState({ password, validation });
    } else {
      if (index < 0) validation.push('password');
      this.setState({ password, validation });
    }
    this.setState({ issueMessage: "", isRegisterIssue: false });
  }

  signupOnClick = async () => {
    let { validation, email, password, name, userId } = this.state;
    if (email && password && name && userId && validation.length === 0) {
      try{

      }catch(e){

      }
      let data = await AuthRepository.signup({ email, password, name, userId });
      if (data && data.statusCode === 200) {
        notification.success({
          message : 'Sign Up Successfully.'
        });
        Router.push('/');
      }else if(JSON.parse(data.error).message.includes('406')){
        this.setState({ issueMessage: "User already exists.", isRegisterIssue: true });
      }else{
        this.setState({ issueMessage: "Somthing Wrong.", isRegisterIssue: true });
      }
    } else {
      if (!email) validation.push('email');
      if (!password) validation.push('password');
      if (!name) validation.push('name');
      if (!userId) validation.push('userId');
      this.setState({ validation });
    }
  }

  render() {
    let { validation, email, password, name, userId } = this.state;
    return (
      <div className="centered">
        <div style={{ width: '40%', margin: 'auto' }}>

          <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Sign Up</h3>

          <div className="form-group" style={{ marginBottom: 30 }}>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              style={validation.indexOf('name') >= 0 ? { borderColor: 'red' } : {}}
              onChange={(e) => this.nameChange(e.target.value)}
              value={name}
            />
            <div className="row">
              <div className="col-md-12">
                <i className="fas fa-user" style={{ position: 'absolute', top: '-25px', right: '25px' }}></i>
              </div>
            </div>
            <span style={validation.indexOf('name') >= 0 ? { color: 'red' } : { display: 'none' }}>Please Enter Name</span>
          </div>

          <div className="form-group" style={{ marginBottom: 30 }}>
            <input
              type="text"
              className="form-control"
              placeholder="User Id"
              style={validation.indexOf('userId') >= 0 ? { borderColor: 'red' } : {}}
              onChange={(e) => this.userIdChange(e.target.value)}
              value={userId}
            />
            <div className="row">
              <div className="col-md-12">
                <i className="fas fa-user" style={{ position: 'absolute', top: '-25px', right: '25px' }}></i>
              </div>
            </div>
            <span style={validation.indexOf('userId') >= 0 ? { color: 'red' } : { display: 'none' }}>Please Enter User Id</span>
          </div>

          <div className="form-group" style={{ marginBottom: 30 }}>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              style={validation.indexOf('email') >= 0 ? { borderColor: 'red' } : {}}
              onChange={(e) => this.emailChange(e.target.value)}
              value={email}
            />
            <div className="row">
              <div className="col-md-12">
                <i className="fas fa-envelope" style={{ position: 'absolute', top: '-25px', right: '25px' }}></i>
              </div>
            </div>
            <span style={validation.indexOf('email') >= 0 ? { color: 'red' } : { display: 'none' }}>Please Enter Valid Email</span>
          </div>

          <div className="form-group" style={{ marginBottom: 30 }}>
            <input
              type={this.state.isShowPass ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              style={validation.indexOf('password') >= 0 ? { borderColor: 'red' } : {}}
              onChange={(e) => this.passwordChange(e.target.value)}
              value={password}
            />
            {this.state.isShowPass ?
              <div className="row">
                <div className="col-md-12">
                  <i
                    className="far fa-eye"
                    style={{ position: 'absolute', top: '-25px', right: '25px', cursor: 'pointer' }}
                    onClick={() => this.setState({ isShowPass: false })}>
                  </i>
                </div>
              </div> :
              <div className="row">
                <div className="col-md-12">
                  <i
                    className="far fa-eye-slash"
                    style={{ position: 'absolute', top: '-25px', right: '25px', cursor: 'pointer' }}
                    onClick={() => this.setState({ isShowPass: true })}>
                  </i>
                </div>
              </div>
            }
            <span style={validation.indexOf('password') >= 0 ? { color: 'red' } : { display: 'none' }}>Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters</span>
          </div>

          {this.state.isRegisterIssue &&
            <div style={{ textAlign: 'center', marginBottom : 30 }}>
              <span style={{ color: 'red' }}>{this.state.issueMessage}</span>
            </div>
          }

          <button onClick={this.signupOnClick} type="submit" className="btn btn-primary btn-block">Submit</button>

          <p className="forgot-password text-center" style={{ marginTop: 20 }}>
            Already Have an Account? <Link href="/"><a>Sign In</a></Link>
          </p>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Signup);