import React, { Component } from 'react'
export default class VerifyDetails extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }

    componentDidMount(){
        console.log("verifydetails",this.props);
    }
    
    render() {
        return (
            <div>
                <h1>Hello verify details</h1>
            </div>
        )
    }
}
