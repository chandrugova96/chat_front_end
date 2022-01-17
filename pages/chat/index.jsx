// modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Router from 'next/router';
import socketClient from 'socket.io-client';
import _ from 'underscore';
import { Menu, Dropdown } from 'antd';

// Components
import Contacts from '../../components/message/Contacts';
import Messages from '../../components/message/Messages';

// // services
import { baseUrl } from '../../config';
import { tokenVerify } from '../../helper/auth';
import { signout } from '../../store/auth/action';
import { getMessage, getContacts } from '../../store/message/action';
import MessageRepository from '../../repositories/MessageRepository';
import AuthRepository from '../../repositories/AuthRepository';

class Signup extends Component {
  constructor({ props }) {
    super(props);
    this.state = {
      selectReceiverId: '',
      messageText: '',
      users: [],
      searchValue: ''
    }
    this.messagesEndRef = React.createRef()
  }
  socket;
  static async getInitialProps(ctx) {
    return { query: ctx.query };
  }

  componentDidMount() {
    this.props.dispatch(getMessage());
    this.props.dispatch(getContacts());
    this.configureSocket();
  }

  configureSocket = () => {
    var socket = socketClient(baseUrl);
    socket.on('connection', () => {
      console.log(' Connected backend')
    });
    socket.on('message', message => {
      let { auth } = this.props;
      if (auth && auth.auth && auth.auth.id === message.receiverId) {
        this.props.dispatch(getMessage());
        this.props.dispatch(getContacts());
      }
    });
    this.socket = socket;
  }

  componentDidUpdate() {
    let { auth } = this.props;
    let isValidToken = tokenVerify(auth);
    if (!isValidToken) {
      this.props.dispatch(signout());
      Router.push('/');
    }
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  selectReceiverClick = (id) => {
    this.setState({ selectReceiverId: id });
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  messageOnChange = (message) => {
    this.setState({ messageText: message });
  }

  sendMessage = async () => {
    let { selectReceiverId, messageText } = this.state;
    let { auth } = this.props;
    let obj = {
      senderId: auth.auth.id,
      receiverId: selectReceiverId,
      message: messageText
    }
    await MessageRepository.createSendMessage(obj);
    this.props.dispatch(getMessage());
    this.setState({ messageText: '' });
    this.messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }

  handleMenuClick = e => {
    if (e.key === 'logout') {
      this.props.dispatch(signout());
    }
  };

  searchOnChange = async (search) => {
    let { auth } = this.props.auth;
    let result = await AuthRepository.getUsers(search);
    if (result && result.data && result.data.length > 0) {
      let users = result.data.filter(u => u._id !== auth.id);
      this.setState({ users, searchValue: search });
    } else {
      this.setState({ users: [], searchValue: search });
    }
  }

  contactClick = (obj) => {
    let { message } = this.props;
    if (message && message.contacts.length > 0) {
      let index = message.contacts.find(c => c.contactId === obj._id);
      if (!index) {
        message.contacts.push({
          contactName: obj.name,
          contactId: obj._id,
          contactEmail: obj.email
        });
      }
      this.setState({ selectReceiverId: obj._id, searchValue: obj.name, users: [] });
    } else {
      message.contacts.push({
        contactName: obj.name,
        contactId: obj._id,
        contactEmail: obj.email
      });
      this.setState({ selectReceiverId: obj._id, searchValue: obj.name, users: [] });
    }
  }

  render() {
    let { selectReceiverId, messageText, users, searchValue } = this.state;
    let { auth } = this.props.auth;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="logout">
          <p>Logout</p>
        </Menu.Item>
      </Menu>
    );
    return (
      <div className="container py-5  contacts">
        <div style={{ width: '100%', height: 60, backgroundColor: '#dee2e6', marginBottom: 20, padding: 20 }}>
          <div style={{ textAlign: 'right' }}>
            <Dropdown trigger={['click']} overlay={menu}>
              <a className="ant-dropdown-link">
                {auth && auth.name ? auth.name : ''} <i className="fas fa-sort-down" style={{ width: '2%', float: 'right', cursor: 'pointer' }}></i>
              </a>
            </Dropdown>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="row">
              <div className="col-md-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    onChange={(e) => this.searchOnChange(e.target.value)}
                    value={searchValue}
                  />
                  <i className="fas fa-search icon"></i>
                </div>
                {users && users.length > 0 &&
                  <div className='dropdown-contact'>
                    <ul style={{ backgroundColor: '#fff' }}>
                      {users.map(u => {
                        return (
                          <li onClick={() => this.contactClick(u)} key={u._id} style={{ cursor: 'pointer' }}>{u.name}</li>
                        )
                      })}
                    </ul>
                  </div>
                }
              </div>
            </div>
            <Contacts
              selectReceiverClick={this.selectReceiverClick}
              selectReceiverId={selectReceiverId}
            />
          </div>
          <div className="col-md-8">
            <Messages
              selectReceiverId={selectReceiverId}
              messageText={messageText}
              messageOnChange={this.messageOnChange}
              sendMessage={this.sendMessage}
              messagesEndRef={this.messagesEndRef}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(mapStateToProps)(Signup);