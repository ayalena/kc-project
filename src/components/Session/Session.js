import './Session.css';

function Session({ date, start, end, duration, name, group, presence, avatar }) {
    return (
        <>
        <div className='flex-container'>
            <div className="session-container">
                <div id="one">Date:  {date}</div>
                <div  id="two">{start} - {end} : {duration}</div >
                <img src={avatar} alt="avatar" id="three"></img>
                <div  id="four">Name:  {name}</div >
                <div  id="five">{group}</div >
                <div  id="six">{presence}</div >
            </div>
        </div>
            
        </>
    )
}

export default Session;