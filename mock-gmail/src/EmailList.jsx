function EmailList(props){
    const list = props.emails;
    const formattedList = list.map(email => {
        return (
            <div className="email" id={email.id} onClick={() => props.handleSelectEmail(email.id)}>
                <h3 className="subject">{email.subject}</h3>
                <h4 className="from">{email.sender}</h4>
            </div>
        )
    });

    return (
        <div>
            {formattedList}
        </div>
    );
}

export default EmailList;