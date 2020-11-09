function EmailDisplay(props) {
    let output;
    if (props.id) {
        const selectedEmail = props.emails.filter(email => email.id === props.id)
        output = (
            <div>
                <p className="from">From: {selectedEmail[0].sender}</p>
                <p className="recipient">To: {selectedEmail[0].recipient}</p>
                <p className="date">Date: {selectedEmail[0].date}</p>
                <h2>{selectedEmail[0].subject}</h2>
                <p className="message">{selectedEmail[0].message}</p>
            </div>
        );
    } else {
        output = (
            <div>
                <h2>Select an email from the left.</h2>
            </div>
        );
    }

    return (
        <div>
            {output}
        </div>
        
    );
}

export default EmailDisplay;