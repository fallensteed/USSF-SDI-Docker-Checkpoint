import React from 'react';

class NewEmail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            sender: '',
            recipient: '',
            subject: '',
            message: '',
            date: '',
        }
    }

    handleChangeSender = (e) => {
        this.setState({ sender: e.target.value });
    }

    handleChangeRecipient = (e) => {
        this.setState({ recipient: e.target.value });
    }

    handleChangeSubject = (e) => {
        this.setState({ subject: e.target.value });
    }

    handleChangeMessage = (e) => {
        this.setState({ message: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const nowDTG = new Date().toISOString();
        this.setState({ date: nowDTG });
        let body = {
            sender: this.state.sender,
            recipient: this.state.recipient,
            subject: this.state.subject,
            message: this.state.message
        }
        this.props.sendEmail(body);
    }

    render() {

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>New Email</h2>
                    <label>TO:
                        <input type="email" name="to" onChange={this.handleChangeRecipient} />
                    </label>
                    <label>FROM:
                        <input type="email" name="from" onChange={this.handleChangeSender} />
                    </label>
                    <label>SUBJECT:
                        <input type="text" name="subject" onChange={this.handleChangeSubject} />
                    </label>
                    <label>MESSAGE:
                        <textarea name="message" onChange={this.handleChangeMessage}></textarea>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );

    }


}

export default NewEmail;