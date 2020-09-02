import React, { Component } from 'react'
import '../css/AccordianComponent.css';

class AccordianComponent extends Component {

    constructor(props){
        super(props);
        this.state={
            toggle:false
        }
    }

    clickHandler = () => {
        const toggle = this.state.toggle;
        if(toggle)
            this.setState({toggle:false})
        else {
            this.setState({toggle:true})
        }
    }

    render() {

        var message;
        if(this.state.toggle){
            message= <div className="accordian-content">
                    <p>
                        1.Book your ticket for an event you’d like to watch.<br/>
                        2.We will send you a reminder 5 minutes before the event starts.<br/>
                        3.Tap on the BMS notification, or confirmation email/ SMS to find the online streaming page.<br/>
                        4.Tap on Join Now, login if prompted and enjoy the online event at home! <br/>
                    </p>
                    </div>
        }
        else {
            message=<div></div>;
        }
        return (
            <div className="accordian-container">
                <div className="accordian-title" onClick={this.clickHandler}>
                    <h2>heading</h2>
                    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/></svg>
                </div>
                {message}
            </div>
        )
    }
}

export default AccordianComponent
