import './Session.css';
import Button from '../Button/Button';
import { useState } from 'react';

function Session({ date, start, end, duration, name, group, presence, avatar }) {
    const [presenceInfo, setPresenceInfo] = useState(presence)

    function handlePresence() {
        if (presenceInfo === 'unknown') {
            setPresenceInfo('present')
        } else if (presenceInfo === 'present') {
            setPresenceInfo('picked up')
        } else if (presenceInfo === 'picked up') {
            setPresenceInfo('unknown')
        }    
    }

    return (
        <>
            <div className='flex-container'>
                <div className="session-container">
                    <div id="one">Date:  {date}</div>
                    <div id="two">{start} - {end} : {duration}</div >
                    <img src={avatar} alt="avatar" id="three"></img>
                    <div id="four">Name:  {name}</div >
                    <div id="five">{group}</div >
                    <div id="six">
                        {!presenceInfo ?
                            <p>{presence} </p>
                            : <p>{presenceInfo}</p>

                        }
                        <Button
                            className="session-button"
                            type="button"
                            onClick={handlePresence}
                            text="Change"
                        >
                        </Button>
                    </div >
                </div>
            </div>

        </>
    )
}

export default Session;