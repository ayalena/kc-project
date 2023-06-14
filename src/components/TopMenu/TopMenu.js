import React from "react";
import './TopMenu.css';

function TopMenu() {
       return (
        <>
            <div className="nav-container">
                <ul>
                    
                        <li>
                            Home
                        </li>
                 

                   
                        <li>
                            Register
                        </li>
                  

                   
                        <li>
                            Login
                        </li>
                    

                   
                        <li>
                            Profile
                        </li>
                  

                    
                        <li>
                            Sessions
                        </li>
                  

                   
                        <li>
                            Log Out
                        </li>
                   

                </ul>
            </div>
        </>
    );
}

export default TopMenu;