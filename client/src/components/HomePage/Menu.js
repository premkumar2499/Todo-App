import React from 'react'; 
import {Link, Router} from 'react-router-dom'

const Menu = ({handleMenu}) =>{
    return(
        <div className="side-nav">
            <div className="title">
                <p>Prem Todo </p>
                <div className="close" onClick={handleMenu}>X</div> 
            </div>
            <div className="links">
                <Link to="/daily">Daily</Link>
                <Link to="/today">Today</Link>
                <Link to="/completed">Completed</Link>
            </div>
        </div>
    )
}

export default Menu;