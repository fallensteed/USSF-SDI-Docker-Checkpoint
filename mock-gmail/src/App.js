
import './App.css';
import React from 'react'
import EmailList from './EmailList';
import EmailDisplay from './EmailDisplay';
import SearchEmail from './SearchEmail';
import NewEmail from './NewEmail';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            emailImportArr: [],
            filterArr: [],
            currentEmailId: '',
            currentSearchString: '',
            newEmail: false,
            lastID: null,
        }
    }

    async componentDidMount() {
        const response = await fetch('http://localhost:3001/emails');
        const json = await response.json();
        const emailSorted = json.sort((a, b) => new Date(b.date) - new Date(a.date));
        this.setState({ emailImportArr: emailSorted, filterArr: emailSorted, lastID: json.length });

    }

    handleSelectEmail = (value) => {
        this.setState({ currentEmailId: value, newEmail: false })
    }

    handleSearchStringUpdate = (event) => {
        this.setState({ currentSearchString: event.target.value })
        if (event.target.value.length === 0) {
            this.setState({ filterArr: this.state.emailImportArr })
        } else {
            this.setState({ filterArr: this.state.emailImportArr.filter(email => email.subject.toLowerCase().includes(event.target.value.toLowerCase())) })
        }
    }

    handleNewEmail = () => {
        this.setState({ newEmail: true });
    }

    render() {
        return (
            <div className="App">
                <header>
                    <SearchEmail
                        onChange={this.handleSearchStringUpdate}
                        newEmail={this.handleNewEmail}
                    />
                </header>
                <aside>
                    <EmailList
                        emails={this.state.filterArr}
                        handleSelectEmail={this.handleSelectEmail}
                    />
                </aside>
                <main>
                    {this.state.newEmail ?
                        <NewEmail /> :
                        <EmailDisplay
                            emails={this.state.filterArr}
                            id={this.state.currentEmailId}
                        />
                    }
                </main>
            </div>
        );
    }
}

export default App;



// componentDidMount() {
//     // Simple POST request with a JSON body using fetch
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: 'React POST Request Example' })
//     };
//     fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
//         .then(response => response.json())
//         .then(data => this.setState({ postId: data.id }));
// }