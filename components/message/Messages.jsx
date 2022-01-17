import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Contacts extends Component {
    constructor({ props }) {
        super(props);
    }

    render() {
        let { auth } = this.props.auth;
        let { message } = this.props;
        let contacts = message && message.contacts.length > 0 ? message.contacts : [];
        let { selectReceiverId, messageText } = this.props;
        let selectedContact = contacts.find(c => c.contactId === selectReceiverId);
        let selectedContactName = selectReceiverId && selectedContact ? selectedContact.contactName : '';
        let selectedProName = '';
        if (selectedContactName.split(' ').length > 1) {
            selectedProName = selectedContactName.split(' ')[0][0].toUpperCase() + selectedContactName.split(' ')[1][0].toUpperCase();
        } else {
            selectedProName = selectedContactName ? selectedContactName[0].toUpperCase() + selectedContactName[1].toUpperCase() : '';
        }
        let selectedContactMessages = selectReceiverId ? message.messages.filter(m => (m.senderId === selectReceiverId || m.receiverId === selectReceiverId)) : [];

        let authName = auth && auth.name ? auth.name : '';
        let authProName = '';
        if (authName.split(' ').length > 1) {
            authProName = authName.split(' ')[0][0].toUpperCase() + authName.split(' ')[1][0].toUpperCase();
        } else {
            authProName = authName ? authName[0].toUpperCase() + authName[1].toUpperCase() : '';
        }

        return (
            <div className="chat">
                {selectReceiverId &&
                    <div className="container">
                        <div className="row justify-content-center no-gutters">
                            <div className="col-md-12 shadow">
                                <div className="header-text" style={{ padding: '10px 25px', backgroundColor: '#fb7e72', color: '#ff' }}>
                                    <div className="row">
                                        <div className="col-md-2 col-3 ">
                                            <div className="contact-name">{selectedProName}</div></div>
                                        <div className="col-md-9 col-7 align-self-center">
                                            <h5 className="ft-exbold" style={{ color: '#fff' }}>{selectedContactName}</h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="chat-message-zig">
                                    <ul>
                                        {selectedContactMessages && selectedContactMessages.length > 0 &&
                                            selectedContactMessages.map(mes => {
                                                let isSender = auth && auth.id === mes.senderId;
                                                if (mes.message) {
                                                    return (
                                                        <li key={mes._id}>
                                                            <div style={isSender ? { width: '40%', marginLeft: 'auto' } : { width: '40%', marginRight: 0 }}>
                                                                <div className="col-md-10 col-6 align-self-center" style={{ padding: 10, borderRadius: 10, backgroundColor: '#fff' }}>
                                                                    <p className="m-0" style={{ fontSize: 15 }}>{mes.message}</p>
                                                                    <span style={{ fontSize: 8 }} >{moment(mes.createdAt).format('DD/MM/YYYY HH:mm a')}</span>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                    <div ref={this.props.messagesEndRef} />
                                    <div className="textmessage">
                                        <input
                                            style={{ width: '100%', height: 50, padding: 10 }}
                                            placeholder="Write Your Message"
                                            onChange={(e) => this.props.messageOnChange(e.target.value)}
                                            onKeyPress={event => {
                                                if (event.key === 'Enter' && messageText) {
                                                    this.props.sendMessage()
                                                }
                                            }}
                                            value={messageText}
                                        />
                                        <div className="button_send">
                                            <button
                                                className="send_s"
                                                disabled={!messageText}
                                                onClick={this.props.sendMessage}
                                            >
                                                <i className="fa fa-paper-plane" style={!messageText ? { fontSize: 20, color: '#e6e4e3' } : { fontSize: 20 }}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {!selectReceiverId &&
                    <div className="container">
                        <div className="row justify-content-center no-gutters">
                            <div className="col-md-12 shadow">
                                <div className="chat-message-zig" style={{ padding: 20 }}>
                                    <div className="my-name">{authProName}</div>
                                    <div style={{ textAlign: 'center', marginTop: 10 }}>
                                        <h3>Welcome, {authName}</h3>
                                    </div>
                                    <div style={{ textAlign: 'center', marginTop: 10 }}>
                                        <div style={{ width: '50%', float: 'left' }}>
                                            <b>Email : </b>
                                        </div>
                                        <div style={{ width: '50%', float: 'right', textAlign: 'left' }}>
                                            <b>{ auth && auth.email ? auth.email : ''}</b>
                                        </div>
                                    </div>
                                    <div ref={this.props.messagesEndRef} />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Contacts);