import './Session.css';
import { useState } from 'react';
import Button from '@mui/material/Button';

const style = {
    padding: 12,
    color: 'white',
    backgroundColor: ' #8e0000',
  };

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
                            variant="contained"
                            onClick={handlePresence}
                            label="Primary"
                            primary={true}
                            style={style}  
                        >
                            Change Status
                        </Button>
                    </div >
                </div>
            </div>

        </>
    )
}

export default Session;