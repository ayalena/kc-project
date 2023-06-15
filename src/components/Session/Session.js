// when someone clicks a data render the x number of sessions under that date

function Session({ date, start, end, duration, name, group, presence, avatar }) {
    return (
        <>
            <div className="session-container">
                <p>{date}</p>
                <p>{start}</p>
                <p>{end}</p>
                <p>{duration}</p>
                <p>{name}</p>
                <p>{group}</p>
                <p>{presence}</p>
                <p>{avatar}</p>
            </div>
        </>
    )
}

export default Session;