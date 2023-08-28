import React from "react";
import './Header.css';

const Header = () => {
    return (
        /*<div className="ui secondary menu">
            <div className="left menu">
               MATF RESTAURANTS
            </div>
            <div className="right menu">
                <div className="item">
                    <div className="ui icon input">
                        <input type="text" placeholder="Search..."/>
                        <i className="search link icon"></i>
                    </div>
                </div>
                <a className="ui item">
                    Logout
                </a>
            </div>
        </div>*/
        <div className='header'>
            <div className='left'>
            MATF RESTAURANTS
            </div>
            <div className='right'>
                <div className='search-wrap'>
                    <input type='text' name='restaurants' placeholder='Search' />
                    <button type='button'>Logout</button>
                </div>
                
            </div>
        </div>

    );
};

export default Header;