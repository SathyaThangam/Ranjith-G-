import React , {Component} from 'react';
import '../css/HeaderComponent.css';

class HeaderComponent extends Component{
    
    //Signout the account from google Account
    signoutHandler = () =>{
        const authInstance = window.gapi.auth2.getAuthInstance();
        authInstance.signOut();
    }
    
    render(){
            return(
                <div className="header">
                    <h1>TicketInsider</h1>
                    <button onClick={this.signoutHandler}>Sign out</button>
                </div>
            )
        }
}

export default HeaderComponent;
