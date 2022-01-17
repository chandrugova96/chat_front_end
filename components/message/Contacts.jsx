import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

class Contacts extends Component {
    constructor({ props }) {
        super(props);
    }

    render() {
        let { selectReceiverId } = this.props;
        let { message } = this.props;
        let contacts = message && message.contacts.length > 0 ? message.contacts : [];
        return (
            <div className="table-responsive pt-4">
                <table className="table table-borderless">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">Contacts</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts && contacts.length > 0 &&
                            contacts.map(m => {
                                let contactName = m.contactName;
                                let proName = '';
                                let selectedContactMessages = message.messages.filter(mes => (mes.senderId === m.contactId || mes.receiverId === m.contactId));
                                let lastMessage = selectedContactMessages && selectedContactMessages.length > 0 && selectedContactMessages[selectedContactMessages.length - 1].message;
                                let lastMessageDate = selectedContactMessages && selectedContactMessages.length > 0 && selectedContactMessages[selectedContactMessages.length - 1].createdAt;
                                if (contactName.split(' ').length > 1) {
                                    proName = contactName.split(' ')[0][0].toUpperCase() + contactName.split(' ')[1][0].toUpperCase();
                                } else {
                                    proName = contactName[0].toUpperCase() + contactName[1].toUpperCase();
                                }

                                return (
                                    <tr
                                        key={m.contactId}
                                        className={selectReceiverId === m.contactId ? 'active' : ''}
                                        onClick={() => this.props.selectReceiverClick(m.contactId)}
                                    >
                                        <td>
                                            <div className="row">
                                                <div className="col-2 align-self-center">
                                                    <div className="contact-name">{proName}</div>
                                                </div>
                                                <div className="col-6 align-self-center">
                                                    <h5>{contactName}</h5>
                                                    <p>{lastMessage}</p>
                                                </div>
                                                <div className="col-4">
                                                    <div >{lastMessageDate ? moment(lastMessageDate).format('DD/MM/YYYY') : ''}</div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {contacts && contacts.length === 0 &&
                            <tr>
                                <td>
                                    <h5>No Contacts</h5>
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
};

export default connect(mapStateToProps)(Contacts);