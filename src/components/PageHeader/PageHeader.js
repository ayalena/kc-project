import React from 'react';
import './PageHeader.css';
import { Link } from 'react-router-dom';

function PageHeader({icon, title}) {
    return (
        <>
            <div className="title-container">
                <Link to="/"><img src={icon} alt={title}/></Link>
                <h1 className="pageheader">{title}</h1>
            </div>
        </>
    );
}

export default PageHeader;