// modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import jwtDecode from "jwt-decode";
import Router from 'next/router';

// // services
import { signinSuccess } from '../store/auth/action';
import { tokenVerify } from '../helper/auth';
import AuthRepository from '../repositories/AuthRepository';

class Signin extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isShowPass: false,
      validation: [],
      isLoginIssue: false,
      issueMessage: ''
    }
  }

  static async getInitialProps(ctx) {
    return { query: ctx.query };
  }

  componentDidUpdate() {
    let { auth } = this.props;
    let isValidToken = tokenVerify(auth);
    if (isValidToken) {
      Router.push('/chat');
    }
  }

  emailChange = (email) => {
    let { validation } = this.state;
    let index = validation.indexOf('email');
    if (index >= 0) validation.splice(index, 1);
    this.setState({ email, validation });
    this.setState({ issueMessage: "", isLoginIssue: false });
  }

  passwordChange = (password) => {
    let { validation } = this.state;
    let index = validation.indexOf('password');
    if (index >= 0) validation.splice(index, 1);
    this.setState({ password, validation });
    this.setState({ issueMessage: "", isLoginIssue: false });
  }

  signinOnClick = async () => {
    let { email, password, validation } = this.state;
    this.setState({ issueMessage: "", isLoginIssue: false });
    if (email && password) {
      try {
        let data = await AuthRepository.signin({ email, password });
        if (data && data.statusCode === 200) {
          let user = jwtDecode(data.token);
          this.props.dispatch(signinSuccess({ user: user, token: data.token }));
        } else if (data && data.statusCode === 400) {
          this.setState({ issueMessage: "Invalid Password.", isLoginIssue: true });
        } else if (data && data.statusCode === 404) {
          this.setState({ issueMessage: "User Not Found", isLoginIssue: true });
        } else if (data && data.statusCode === 406) {
          this.setState({ issueMessage: "Somthing Wrong", isLoginIssue: true });
        } else {
          this.setState({ issueMessage: "Somthing Wrong.", isLoginIssue: true });
        }
      } catch (err) {
        this.setState({ issueMessage: "Somthing Wrong.", isLoginIssue: true });
      }
    } else {
      if (!email) validation.push('email');
      if (!password) validation.push('password');
      this.setState({ validation });
    }
  }

  render() {
    let { validation, email, password } = this.state;
    return (
      <div className="centered">
        <div style={{ width: '40%', margin: 'auto' }}>

          <h3 style={{ textAlign: 'center', marginBottom: 30 }}>Sign In</h3>

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
            <span style={validation.indexOf('email') >= 0 ? { color: 'red' } : { display: 'none' }}>Please Enter Email</span>
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
            <span style={validation.indexOf('password') >= 0 ? { color: 'red' } : { display: 'none' }}>Please Enter Password</span>
          </div>

          {this.state.isLoginIssue &&
            <div style={{ textAlign: 'center', marginBottom : 30 }}>
              <span style={{ color: 'red' }}>{this.state.issueMessage}</span>
            </div>
          }

          <button type="submit" onClick={this.signinOnClick} className="btn btn-primary btn-block">Submit</button>

          <p className="forgot-password text-center" style={{ marginTop: 20 }}>
            Don't Have an Account? <Link href="/signup"><a>Sign Up</a></Link>
          </p>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Signin);