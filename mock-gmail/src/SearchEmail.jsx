
function SearchEmail(props) {
    return (
        <div>
            <input onChange={props.onChange} placeholder="Filter Emails" />
            <button onClick={props.newEmail}>New Email</button>
        </div>
    )
}

export default SearchEmail