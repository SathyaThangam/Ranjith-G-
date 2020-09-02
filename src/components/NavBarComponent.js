import React, { Component } from 'react'
import '../css/NavBarComponent.css';

export class NavBarComponent extends Component {
    render() {
        return (
            <div className="navbar">
                <div className="navbar-content">
                    <div className="navbar-left">
                        <a href="/home">Movies</a>
                        <a href="/home">Events</a>
                        <a href="/home">Plays</a>
                        <a href="/home">Sports</a>
                        <a href="/home">Activities</a>
                        <a href="/home">Monuments</a>
                        <a href="/home">Fanhood</a>
                        <a href="/home">Buzz</a>
                    </div>
                    <div className="navbar-right">
                    <a href="/home">
                        ListYourShow
                        <span className="new-nav-item">NEW</span>
                    </a>
                    <a href="/home">Corporates</a>
                    <a href="/home">Offers</a>
                    <a href="/home">Gift Cards</a>
                </div>
                </div>
            </div>
        )
    }
}

export default NavBarComponent
