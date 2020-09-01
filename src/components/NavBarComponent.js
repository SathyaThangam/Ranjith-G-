import React, { Component } from 'react'
import '../css/NavBarComponent.css';

export class NavBarComponent extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar-content">
                    <div className="navbar-left">
                        <a href="#">Movies</a>
                        <a href="#">Events</a>
                        <a href="#">Plays</a>
                        <a href="#">Sports</a>
                        <a href="#">Activities</a>
                        <a href="#">Monuments</a>
                        <a href="#">Fanhood</a>
                        <a href="#">Buzz</a>
                    </div>
                    <div className="navbar-right">
                    <a href="#">
                        ListYourShow
                        <span className="new-nav-item">NEW</span>
                    </a>
                    <a href="#">Corporates</a>
                    <a href="#">Offers</a>
                    <a href="#">Gift Cards</a>
                </div>
                </div>
            </div>
        )
    }
}

export default NavBarComponent
